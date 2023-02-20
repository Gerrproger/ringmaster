import crypto from 'node:crypto';
import readline from 'node:readline';
import wrapAnsi from 'wrap-ansi';
import interactive from 'is-interactive';
import chalk from 'chalk';

export default class LogUI {
  stream = process.stdout;
  write = this.stream.write.bind(this.stream);

  codes = {
    nl: '\n',
    screenClear: '\u001B[3J',
    screenNorm: '\u001B[?1049l',
    screenAlt: '\u001B[?1049h',
    cursorShow: '\u001B[?25h',
    cursorHide: '\u001B[?25l',
    beep: '\u0007',
  };

  initialized = false;
  endedWith = {
    newline: 0,
    separator: 0,
  };

  chunks = new Map();
  spinners = new Map();
  separators = new Map();
  activeSpinners = new Set();

  updateTimout = null;
  startPos = NaN;
  input = null;

  constructor({
    disabled = !interactive(this.stream),
    paused = false,
    spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    spinnerFormatDone = (str) => str,
  } = {}) {
    this.disabled = disabled;
    this.paused = paused;
    this.frames = spinnerFrames;
    this.format = spinnerFormatDone;
  }

  enable() {
    if (this.initialized && !this.disabled) {
      return this;
    }

    this.disabled = false;
    this.initialized = true;

    process.on('exit', this.onExit.bind(this));

    this.stream.on('resize', () => {
      this.updateSeparators();
      this.update();
    });

    if (!this.paused) {
      this.resume();
    }

    this.write(this.codes.screenAlt);

    return this;
  }

  disable() {
    if (this.disabled) {
      return this;
    }

    this.disabled = true;

    if (!this.initialized) {
      return this;
    }

    process.off('exit', this.onExit);

    this.clear();
    this.write(this.codes.screenNorm);
    this.pause();

    return this;
  }

  separate(color = 'grey', char = '―', idetifier = this.rand()) {
    if (this.endedWith.separator) {
      return this;
    }

    const startNl = this.endedWith.newline;
    const string = `${startNl ? '' : this.codes.nl}${char.repeat(this.width)}${
      this.codes.nl
    }`;
    const colored = chalk[color](string);

    this.separators.set(idetifier, {
      idetifier,
      color,
      startNl,
      char,
    });
    this.log(colored, idetifier);

    this.endedWith.separator = 1;
    this.endedWith.newline = 0;

    return this;
  }

  updateSeparators() {
    if (!this.separators.size) {
      return this;
    }

    for (const inst of this.separators) {
      const string = `${
        inst[1].startNl ? '' : this.codes.nl
      }${inst[1].char.repeat(this.width)}${this.codes.nl}`;
      const colored = chalk[inst[1].color](string);

      this.chunks.set(inst[0], colored);
    }

    return this;
  }

  newline(num = 1, force = false, idetifier = this.rand()) {
    if (this.endedWith.newline >= num && !force) {
      return this;
    }

    const string = this.codes.nl.repeat(
      num - (force ? 0 : this.endedWith.newline)
    );

    this.log(string, idetifier);

    this.endedWith.newline = num;
    this.endedWith.separator = 0;

    return this;
  }

  indent(num = 2, idetifier = this.rand()) {
    this.log(' '.repeat(num), idetifier);

    this.endedWith.newline = 0;
    this.endedWith.separator = 0;

    return this;
  }

  style(string, styles) {
    const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    let construct = chalk;
    let opts = {
      bold: false,
      underline: false,
      color: '',
      bgColor: '',
    };

    if (typeof styles === 'object') {
      opts = {
        ...opts,
        ...styles,
      };
    } else if (typeof styles === 'string') {
      switch (styles) {
        case 'error':
          opts.color = 'red';
          break;
        case 'success':
          opts.color = 'green';
          break;
        case 'info':
          opts.color = 'magenta';
          break;
        case 'bold':
          opts.bold = true;
          break;
        case 'underline':
          opts.underline = true;
          break;
        case 'italic':
          opts.italic = true;
          break;
        case 'strikethrough':
          opts.strikethrough = true;
      }
    }

    if (opts.bold) {
      construct = construct.bold;
    }

    if (opts.underline) {
      construct = construct.underline;
    }

    if (opts.italic) {
      construct = construct.italic;
    }

    if (opts.strikethrough) {
      construct = construct.strikethrough;
    }

    if (opts.color) {
      construct = construct[opts.color];
    }

    if (opts.bgColor) {
      construct = construct[`bg${capitalize(opts.bgColor)}`];
    }

    return construct(string);
  }

  styleReset(string) {
    return chalk.reset(string);
  }

  text(string = ' ', styles, idetifier = this.rand()) {
    this.log(styles ? this.style(string, styles) : string, idetifier);

    this.endedWith.newline = 0;
    this.endedWith.separator = 0;

    return this;
  }

  line(string, styles, indt = 0) {
    this.newline();
    this.indent(indt);
    this.text(string, styles);
    this.newline();
  }

  log(string, idetifier = this.rand()) {
    if (this.disabled || !string) {
      return this;
    }

    if (this.chunks.has(idetifier)) {
      throw new Error(`Chunk idetifier '${idetifier}' already exists!`);
    }

    this.chunks.set(idetifier, string.toString());
    this.update();

    return this;
  }

  render(final = false) {
    if (this.disabled) {
      return this;
    }

    if (!this.initialized) {
      this.enable();
    }

    if (!final) {
      this.clearScreen();
    }

    let accum = '';

    for (const chunk of this.chunks) {
      accum += chunk[1];
    }

    if (final) {
      this.write(accum);

      return this;
    }

    const lines = wrapAnsi(accum, this.width, {
      wordWrap: false,
      trim: false,
    }).split(this.codes.nl);
    const lineLen = lines.length;

    if (Number.isNaN(this.startPos)) {
      this.startPos = lineLen - this.height;
    }

    if (this.startPos < 0) {
      this.startPos = 0;
    }

    if (this.height > lineLen) {
      this.startPos = 0;
      this.renderEnd = true;
    } else if (this.renderEnd || this.startPos + this.height > lineLen) {
      this.startPos = lineLen - this.height + 1;
      this.renderEnd = true;
    }

    const content = lines
      .slice(this.startPos, this.startPos + this.height)
      .join(this.codes.nl);

    this.write(content);

    return this;
  }

  updateSpinners() {
    if (!this.activeSpinners.size) {
      return this;
    }

    for (const inst of this.spinners) {
      if (!inst[1].active) {
        continue;
      }

      const nextFrame = inst[1].frame + 1;
      const newFrame = nextFrame === this.frames.length ? 0 : nextFrame;
      const string = `${inst[1].prefix}${chalk[inst[1].color](
        this.frames[newFrame]
      )} ${inst[1].text}${this.codes.nl}`;

      this.spinners.set(inst[0], {
        ...inst[1],
        frame: newFrame,
      });
      this.chunks.set(inst[0], string);
    }

    this.update();

    return this;
  }

  update() {
    if (this.disabled || this.paused) {
      return this;
    }

    this.stopUpdater();
    this.render();

    if (this.activeSpinners.size) {
      this.startUpdater();
    }

    return this;
  }

  startUpdater(delay = 80) {
    this.stopUpdater();
    this.updateTimout = setTimeout(this.updateSpinners.bind(this), delay);
  }

  stopUpdater() {
    clearTimeout(this.updateTimout);
    this.updateTimout = null;
  }

  clear() {
    if (this.disabled || !this.initialized) {
      return this;
    }

    this.stopUpdater();
    this.clearScreen();

    this.chunks.clear();
    this.spinners.clear();
    this.separators.clear();
    this.activeSpinners.clear();
    this.endedWith.newline = 0;
    this.endedWith.separator = 0;

    return this;
  }

  removeLog(id) {
    this.chunks.delete(id);
    this.spinners.delete(id);
    this.separators.delete(id);
    this.activeSpinners.delete(id);
    this.update();
  }

  clearScreen() {
    this.write(this.codes.screenClear);
    this.stream.cursorTo(0, 0);
    this.stream.clearScreenDown();

    return this;
  }

  spinner(idetifier, text = '', { color = 'white', indent = 0 } = {}) {
    if (this.disabled) {
      return this;
    }

    if (!idetifier || typeof idetifier !== 'string') {
      throw new Error('Spinner idetifier absent!');
    }

    if (this.spinners.has(idetifier)) {
      throw new Error(`Spinner idetifier '${idetifier}' already exists!`);
    }

    const prefix = `${
      this.endedWith.newline || this.endedWith.separator ? '' : this.codes.nl
    }${' '.repeat(indent)}`;
    const string = `${prefix}${chalk[color](this.frames[0])} ${text}${
      this.codes.nl
    }`;

    this.spinners.set(idetifier, {
      idetifier,
      text,
      color,
      prefix,
      active: true,
      frame: 0,
    });
    this.activeSpinners.add(idetifier);

    this.log(string, idetifier);

    this.endedWith.newline = 1;
    this.endedWith.separator = 0;

    return this;
  }

  spinnerDone(idetifier, { text, color, char = '✱' } = {}) {
    if (this.disabled) {
      return this;
    }

    const inst = this.spinners.get(idetifier);

    if (!inst || !inst.active) {
      return this;
    }

    const resText = text || this.format.call(this, inst.text);
    const resColor = color || inst.color;

    const string = `${inst.prefix}${chalk[resColor](char)} ${resText}${
      this.codes.nl
    }`;

    this.spinners.set(idetifier, {
      ...inst,
      color: resColor,
      text: resText,
      active: false,
    });
    this.chunks.set(idetifier, string);
    this.activeSpinners.delete(idetifier);
    this.update();

    return this;
  }

  spinnerDoneAll(char = '✸') {
    if (this.disabled) {
      return this;
    }

    for (const inst of this.spinners) {
      if (!inst[1].active) {
        continue;
      }

      const string = `${inst[1].prefix}${chalk[inst[1].color](char)} ${
        inst[1].text
      }${this.codes.nl}`;

      this.spinners.set(inst[0], {
        ...inst[1],
        active: false,
      });
      this.chunks.set(inst[0], string);
    }

    this.activeSpinners.clear();
    this.update();

    return this;
  }

  beep() {
    if (this.disabled) {
      return this;
    }

    this.write(this.codes.beep);

    return this;
  }

  waitInteraction(text, config) {
    return new Promise((success) => {
      if (this.disabled) {
        success(this);
      }

      const spinId = this.rand();
      const spaceId = this.rand();

      const cb = (chunk, key) => {
        if (
          key &&
          !['up', 'down', 'k', 'j', 'home', 'end'].includes(key.name)
        ) {
          process.stdin.off('keypress', cb);
          this.removeLog(spaceId);
          this.removeLog(spinId);
          success(this);
        }
      };

      this.newline(1, false, spaceId);
      this.spinner(spinId, text, config);
      process.stdin.on('keypress', cb);
    });
  }

  resume() {
    if (this.disabled) {
      return this;
    }

    this.pause();

    this.paused = false;

    this.write(this.codes.cursorHide);

    this.input = readline.createInterface({
      input: process.stdin,
      escapeCodeTimeout: 50,
    });

    readline.emitKeypressEvents(process.stdin, this.input);

    process.stdin.on('keypress', (chunk, key) => {
      if (!key) {
        return;
      }

      if ((key.ctrl && key.name === 'c') || key.name === 'q') {
        process.exit();
      }

      if (Number.isNaN(this.startPos)) {
        return;
      }

      if (!key.shift && (key.name === 'up' || key.name === 'k')) {
        this.startPos--;
        this.renderEnd = false;
        this.update();
        return;
      }

      if (!key.shift && (key.name === 'down' || key.name === 'j')) {
        this.startPos++;
        this.renderEnd = false;
        this.update();
        return;
      }

      if ((key.shift && key.name === 'up') || key.name === 'home') {
        this.startPos = 0;
        this.renderEnd = false;
        this.update();
        return;
      }

      if ((key.shift && key.name === 'down') || key.name === 'end') {
        this.renderEnd = true;
        this.update();
      }
    });

    process.stdin.setRawMode(true);

    return this;
  }

  pause() {
    this.paused = true;

    this.write(this.codes.cursorShow);

    if (this.input) {
      this.input.close();
      this.input = null;
    }

    return this;
  }

  onExit() {
    this.stopUpdater();
    this.spinnerDoneAll();
    this.write(this.codes.screenNorm);
    this.render(true);
    this.write(this.codes.nl);
    this.pause();
  }

  rand() {
    return crypto.randomBytes(16).toString('hex');
  }

  get width() {
    return (
      this.stream?.columns || Number.parseInt(process.env.COLUMNS, 10) || 80
    );
  }

  get height() {
    return this.stream?.rows || Number.parseInt(process.env.ROWS, 10) || 40;
  }
}

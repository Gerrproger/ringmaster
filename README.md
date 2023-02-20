# Ringmaster

**CLI package for testing websites & checking their contents.**

## Usage

Install package - `npm install ringmaster -g` | `yarn global add ringmaster`.

Run `ringmaster` from CLI.  
Or you can launch it directly as executable from the **[bin folder](./bin)**.

It will search your config files in the folder `./_tests` by default.  
You can pass desired folders as arguments: `ringmaster ./tests-folder ~/another-folder`.  
Or you can pass folders as `--dir` option - `ringmaster --dir dir1 --dir dir2`.

Result files are exported to the `./_results` folder by default.  
You can change it with `--outupt` option - `ringmaster --no-output`.

### Options

You can use options with this library, for example - `ringmaster --sample`.  
**Supported options:**

- `--help` - displays help for commands.
- `--version` - displays package version.
- `--interactive` - launches package in interactive mode.
- `--sample` - adds sample directory to `dirs`.

And other options from the **[CLI options list](./docs/schema_cli-properties-options.md)** (that will override options of all included test suits).

### Configuration

The library uses JSON schemas to configure tests cases.
You need to always have a `config.json` file with the main test suit **[Configuration](./docs/schema_config.md)**.

For test cases, you need a separate config file for each test type.
**Supported test types:**

- **[Selectors](./docs/schema_selectors.md)**

You can configure actions to perform before the test check through the **[Before](./docs/schema_before.md)** section.

### Example

Check out **[sample-test folder](./sample-test)**.

## Development & Testing

### Installation

Clone repo - `git clone https://github.com/Gerrproger/ringmaster.git`.  
Install dependencies - `npm install` | `yarn install`.  
Run `npm run start` | `yarn start` command.  
Pass arguments casually - `npm run start -- --sample` | `yarn start --sample`.

Or you can link package - `npm link`.  
Then just use command `ringmaster` from CLI.  
To uninstall linked package, run - `npm uninstall -g ringmaster`.

### Building

To build executables and schema docs, run `npm run build` | `yarn build`.

### Testing

To run tests, use `npm run test` | `yarn test`.

### TODO

- Add new test type: content comparison.
- Make it possible to declare configs directly as objects and not only from files.
- Add exported config file formats and not only JSON (config.js/.mjs/.cjs).
- Write more tests with coverage.

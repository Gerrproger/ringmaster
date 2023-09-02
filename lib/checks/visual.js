import fs from 'node:fs/promises';
import path from 'node:path';
import { statSync } from 'node:fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import logger from '../logger.js';
import { scrollPage, delay } from '../utils.js';
import prepareCheck from './prepare-check.js';

export default async function (check, baseUrl, page, config, defaults) {
  const dateName = new Date()
    .toLocaleString()
    .replace(/,\s/, '_')
    .replace(/\.|:|\//g, '-');

  const safeName = (name) =>
    name
      ? name.replace(/[^\p{L}\p{M}0-9_,\s\-.]/giu, '_')
      : defaults.defaultName;

  const saveFile = async (fileName, data) => {
    logger.spinner(
      fileName,
      logger.style('Generating screenshot...', { color: 'grey' }),
      {
        color: 'grey',
      }
    );
    await fs.writeFile(
      path.resolve(folderScreenshots, fileName),
      PNG.sync.write(data)
    );
    logger.spinnerDone(fileName);
  };

  const deleteOldScreenshots = async (list) => {
    const maxScreenshots = check.maxScreenshots ?? defaults.maxScreenshots;
    if (!maxScreenshots) {
      return;
    }
    const toDelete = list.splice(maxScreenshots - 1);
    for (const file of toDelete) {
      await fs.rm(file.path);
    }
  };

  const folderScreenshots = check.directory || defaults.folderScreenshots;
  const checkName = `${safeName(config.name)} — ${safeName(check.name)}`;
  const fileName = `${checkName} [${dateName}].png`;

  const result = {
    name: check.name,
    screenshot: path.resolve(folderScreenshots, fileName),
  };

  try {
    await prepareCheck(check, baseUrl, page);

    if (check.scrollPage) {
      await scrollPage(page);
    }

    if (check.delay) {
      await delay(check.delay);
    }

    await fs.mkdir(folderScreenshots, {
      recursive: true,
    });

    const newData = await page.screenshot({
      path: null,
      type: 'png',
      encoding: 'binary',
      fullPage: true,
      captureBeyondViewport: false,
      omitBackground: false,
    });

    const newImgData = PNG.sync.read(newData);

    const dirents = await fs.readdir(folderScreenshots, {
      withFileTypes: true,
    });
    const filesList = dirents
      .filter(
        (ent) =>
          ent.isFile() &&
          ent.name.match(
            new RegExp(
              `^${checkName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.+\\.png$`,
              'i'
            )
          )
      )
      .map((ent) => {
        const entPath = path.resolve(folderScreenshots, ent.name);
        return {
          path: entPath,
          time: statSync(entPath).mtime.getTime(),
        };
      })
      .sort((a, b) => b.time - a.time);

    const oldImgPath = filesList.length ? filesList[0].path : null;

    if (!oldImgPath) {
      await saveFile(fileName, newImgData);

      throw new Error('No previous screenshots found to compare');
    }

    const oldImg = await fs.readFile(oldImgPath);
    const oldImgData = PNG.sync.read(oldImg);

    if (
      newImgData.height !== oldImgData.height ||
      newImgData.width !== oldImgData.width
    ) {
      await saveFile(fileName, newImgData);
      await deleteOldScreenshots(filesList);

      throw new Error(
        `Page size changed (${oldImgData.width}x${oldImgData.height} -> ${newImgData.width}x${newImgData.height})`
      );
    }

    const diffImgData = new PNG({
      width: newImgData.width,
      height: newImgData.height,
    });
    const diffPixels = pixelmatch(
      oldImgData.data,
      newImgData.data,
      diffImgData.data,
      newImgData.width,
      newImgData.height,
      {
        threshold: check.sensitivity,
        includeAA: true,
        alpha: 0.6,
      }
    );

    if (diffPixels > check.allowedDifference) {
      await saveFile(fileName, newImgData);
      if (check.createDiffImg) {
        await saveFile(`diff — ${fileName}`, diffImgData);
      }
      await deleteOldScreenshots(filesList);

      throw new Error(`Too much of a difference (${diffPixels}px)`);
    }

    logger.text('✔ Success', 'success').newline();

    return {
      ...result,
      screenshot: path.resolve(oldImgPath),
      success: true,
      error: null,
    };
  } catch (e) {
    logger
      .text('✘ Failed', 'error')
      .newline()
      .text('Error description: ', 'error')
      .text(e.message, 'bold')
      .newline();

    return {
      ...result,
      success: false,
      error: e.message,
    };
  }
}

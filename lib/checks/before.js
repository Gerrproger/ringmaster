export default async function (check, page) {
  const selector = check.selector;
  const processors = {
    click: async () => {
      try {
        await page.click(selector);
      } catch (e) {
        if (
          e.message !== 'Node is either not clickable or not an HTMLElement'
        ) {
          throw e;
        }

        await page.$eval(selector, (el) => el.click());
      }
    },
    hover: async () => {
      await page.hover(selector);
    },
    focus: async () => {
      await page.focus(selector);
    },
    blur: async () => {
      await page.$eval(selector, (el) => el.blur());
    },
    select: async () => {
      await page.select(selector, ...check.values);
    },
    type: async () => {
      await page.type(selector, check.text, { delay: 10 });
    },
    reload: async () => {
      await page.reload();
    },
    back: async () => {
      await page.goBack();
    },
    offline: async () => {
      await page.setOfflineMode(true);

      //! https://github.com/puppeteer/puppeteer/issues/2469#issuecomment-740691555
      const targets = await page.browser().targets();
      const workers = targets.filter((target) =>
        ['other', 'service_worker'].includes(target.type())
      );
      for (const worker of workers) {
        const workerConnection = await worker.createCDPSession();
        await workerConnection.send('Network.enable');
        await workerConnection
          .send('Network.emulateNetworkConditions', {
            offline: true,
            latency: 0,
            downloadThroughput: 0,
            uploadThroughput: 0,
          })
          .catch(() => {});
      }
    },
  };

  if (!processors[check.event]) {
    throw new Error(
      `Unsupported '${check.event}' event type in before config section`
    );
  }

  if (selector) {
    await page.waitForSelector(selector);
  }

  await processors[check.event]();
}

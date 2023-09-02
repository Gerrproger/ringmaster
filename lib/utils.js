export async function scrollPage(page, maxScrolls = Infinity) {
  await page.evaluate(async (maxScrolls) => {
    await new Promise((resolve) => {
      // eslint-disable-next-line no-undef
      const wind = window;
      const distance = 100;

      let totalHeight = 0;
      let scrolls = 0;

      const timer = setInterval(() => {
        wind.scrollBy(0, distance);
        totalHeight += distance;
        scrolls++;
        if (
          // eslint-disable-next-line no-undef
          totalHeight >= document.body.scrollHeight - wind.innerHeight ||
          scrolls >= maxScrolls
        ) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  }, maxScrolls);
}

export async function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

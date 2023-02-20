import t from 'tap';
import ringmaster from '../lib/index.js';

const result = {
  error: null,
  suits: [
    {
      error: null,
      name: 'ringmaster test',
      host: 'github.com',
      cases: [
        {
          error: null,
          type: 'selectors',
          results: [
            {
              name: 'Main header',
              selector: 'h1',
              success: true,
              error: null,
            },
            {
              name: 'Trial links',
              selector: 'a[href^="https://enterprise.github.com/trial"]',
              success: true,
              error: null,
            },
            {
              name: 'Login button',
              selector: 'input[name="commit"]',
              success: true,
              error: null,
            },
          ],
        },
      ],
    },
  ],
};

t.test('Sample test', async () => {
  t.match(await ringmaster(['./sample-test']), result);
});

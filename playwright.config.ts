import 'dotenv/config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: [['html', { open: 'never' }]],

use: {
  baseURL: 'https://practicesoftwaretesting.com',
  storageState: 'storageState.json',
}
,

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
  ],
});


import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run twinkl-react-tech-test-main:serve',
        production: 'nx run twinkl-react-tech-test-main:preview',
      },
      ciWebServerCommand: 'nx run twinkl-react-tech-test-main:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});

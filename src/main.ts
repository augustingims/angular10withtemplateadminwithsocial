import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {SERVER_API_URL} from './app/app.constants';
import {ProdConfig} from './app/blocks/config/prod.config';

ProdConfig();

platformBrowserDynamic().bootstrapModule(AppModule, { preserveWhitespaces: true })
  .then(() => {
    console.log('Application started');
    console.log(SERVER_API_URL);
  })
  .catch(err => console.error(err));

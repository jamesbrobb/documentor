import {ApplicationConfig} from '@angular/core';
import {getDocumentorProviders} from "@jamesbenrobb/documentor";
import {
  getAnalyticsConfigProviders,
  getAppConfigProviders,
  getGAAnalyticsConfigProviders,
  getGithubConfigProviders
} from "@jamesbenrobb/ng";
import {getExampleProvider} from "./examples/example.providers";


export const appConfig: ApplicationConfig = {
  providers: [
    getAppConfigProviders('assets/json/app-config.json'),
    getGithubConfigProviders(),
    getAnalyticsConfigProviders(),
    getGAAnalyticsConfigProviders(),
    getExampleProvider(),
    ...getDocumentorProviders(
      'assets/json/routes-config.json'
    )
  ]
};

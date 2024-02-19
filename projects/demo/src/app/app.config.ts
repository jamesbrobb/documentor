import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {getDocumentorProviders} from "@jamesbenrobb/documentor";
import {
  getAnalyticsConfigProviders,
  getAppConfigProviders,
  getGAAnalyticsConfigProviders,
  getGithubConfigProviders
} from "@jamesbenrobb/ng";



export const appConfig: ApplicationConfig = {
  providers: [
    getAppConfigProviders('assets/json/app-config.json'),
    getGithubConfigProviders(),
    getAnalyticsConfigProviders(),
    getGAAnalyticsConfigProviders(),
    ...getDocumentorProviders(
      'assets/json/routes-config.json'
    )
  ]
};

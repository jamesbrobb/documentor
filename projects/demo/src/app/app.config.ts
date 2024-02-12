import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {getDocumentorProviders} from "@jamesbenrobb/documentor";
import {
  getAnalyticsConfigProviders,
  getAppConfigProviders,
  getGAAnalyticsConfigProviders,
  getGithubConfigProviders
} from "@jamesbenrobb/ng";
import {getExampleProvider} from "./examples/example.providers";
import {getControlsOptionsProviders} from "./config/controls-options.provider";
import {
  iconConfig,
  IconsModule,
  LessonPlanParser,
  svgConfig,
  SvgModule,
  AssetService,
  AssetServiceConfiguration,
  TagParser
} from "@jamesbenrobb/product";



export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      IconsModule.forRoot(iconConfig),
      SvgModule.forRoot(svgConfig),
    ),
    getAppConfigProviders('assets/json/app-config.json'),
    getGithubConfigProviders(),
    getAnalyticsConfigProviders(),
    getGAAnalyticsConfigProviders(),
    ...getDocumentorProviders(
      'assets/json/routes-config.json'
    ),
    getExampleProvider(),
    getControlsOptionsProviders(),
    {
      provide: LessonPlanParser,
      useFactory: () => {
        const assetServiceConfig: AssetServiceConfiguration = {
          baseUrl: '',
          paths: {}
        }
        return new LessonPlanParser(new AssetService(assetServiceConfig), new TagParser())
      }
    }
  ]
};

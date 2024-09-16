import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { LayoutModule } from './components/layouts/app.layout.module';
import { SurveyService } from './services/survey.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,
    withViewTransitions({
      skipInitialTransition:true,
    })),
    provideHttpClient(),
    LayoutModule,
    SurveyService
  ]
};

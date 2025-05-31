import { provideHttpClient, withFetch } from "@angular/common/http";
import type { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import {
  QueryClient,
  provideTanStackQuery,
  withDevtools,
} from "@tanstack/angular-query-experimental";
import { providePrimeNG } from "primeng/config";
import { routes } from "./app.routes";

import Aura from "@primeng/themes/aura";
import { ConfirmationService } from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideTanStackQuery(new QueryClient(), withDevtools()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: true,
        },
      },
    }),
    ConfirmationService,
  ],
};

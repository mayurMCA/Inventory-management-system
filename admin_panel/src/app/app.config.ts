import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { routes } from "./app.routes";
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from "@angular/router";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideClientHydration } from "@angular/platform-browser";

// icons
import { TablerIconsModule } from "angular-tabler-icons";
import * as TablerIcons from "angular-tabler-icons/icons";

// perfect scrollbar
import { NgScrollbarModule } from "ngx-scrollbar";

//Import all material modules
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JwtInterceptor } from "./core/helpers/jwt.interceptor";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";
import { StorageService } from "./core/services";
import { ApiService } from "./core/services/api.service";

export const appConfig: ApplicationConfig = {
  providers: [
    StorageService,
    ApiService,
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "enabled",
        anchorScrolling: "enabled",
      }),
      withComponentInputBinding()
    ),
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TablerIconsModule.pick(TablerIcons),
      NgScrollbarModule,
      NgxSpinnerModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: "toast-top-right",
        closeButton: true,
        progressBar: true,
      }),
    ),
  ],
};

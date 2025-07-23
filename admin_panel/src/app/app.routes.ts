import { Routes } from "@angular/router";
import { DefaultComponent } from "./features/default-layout/default.component";

export const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./features/pages/pages.routes").then((m) => m.PagesRoutes),
      },
    ],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth-layout/authentication.routes").then(
        (m) => m.AuthenticationRoutes
      ),
  },
  {
    path: "**",
    redirectTo: "pages/error",
  },
];

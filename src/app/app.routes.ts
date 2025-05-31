import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "quiz",
    pathMatch: "full",
  },
  {
    path: "quiz",
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: () =>
          import("./components/quiz/quiz.component").then(
            (m) => m.QuizComponent
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "quiz",
  },
];

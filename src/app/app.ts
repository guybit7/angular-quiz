import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { appConfig } from "./app.config";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="h-full">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = "quiz-form-angular";
}
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

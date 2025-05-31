import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "error-page",
  standalone: true,
  templateUrl: "./error-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {}

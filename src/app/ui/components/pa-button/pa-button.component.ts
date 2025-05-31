import { ButtonAbstractBase } from "@/ui/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "pa-button",
  imports: [],
  templateUrl: "./pa-button.component.html",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaButtonComponent extends ButtonAbstractBase {}

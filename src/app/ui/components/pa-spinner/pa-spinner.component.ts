import { ElementAbstractBase } from "@/ui/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@Component({
  selector: "pa-spinner",
  imports: [ProgressSpinnerModule],
  templateUrl: "./pa-spinner.component.html",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaSpinnerComponent extends ElementAbstractBase {}

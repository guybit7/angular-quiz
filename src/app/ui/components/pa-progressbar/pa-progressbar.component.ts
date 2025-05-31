import { ElementAbstractBase } from "@/ui/core";
import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { ProgressBarModule } from "primeng/progressbar";

@Component({
  standalone: true,
  selector: "pa-progressbar",
  imports: [CommonModule, ProgressBarModule],
  templateUrl: "./pa-progressbar.component.html",
  styleUrl: "pa-progressbar.component.scss",
})
export class PaProgressbarComponent extends ElementAbstractBase {
  value = input<string | number | null>(null);
}

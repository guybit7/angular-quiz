import { ElementAbstractBase } from "@/ui/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "pa-sidebar",
  imports: [],
  templateUrl: "./pa-sidebar.component.html",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaSidebarComponent extends ElementAbstractBase {}

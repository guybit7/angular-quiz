import { Directive, input, output } from "@angular/core";
import { ElementAbstractBase } from "./element-abstract-base";

@Directive()
export abstract class ButtonAbstractBase extends ElementAbstractBase {
  type = input<string>("button");
  onClick = output<void>();
  disabled = input<boolean>(false);
}

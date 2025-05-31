import { Directive, input } from "@angular/core";

@Directive()
export abstract class ElementAbstractBase {
  id = input.required<string>();
  label = input<string | null>(null);
}

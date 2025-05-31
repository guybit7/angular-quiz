import { PaButtonComponent } from "@/ui/components";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  output,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ViewType } from "../quiz/types";
@Component({
  selector: "app-welcome",
  standalone: true,
  imports: [FormsModule, PaButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./welcome.component.html",
  styles: [],
})
export class WelcomeComponent {
  viewChange = output<ViewType>();
  fullNameChange = output<string>();
  passwordChange = output<string>();

  inputFullName = signal("");
  inputPassword = signal("");

  canSubmit = computed(() => {
    return (
      this.inputFullName().trim() !== "" && this.inputPassword().trim() !== ""
    );
  });

  handleSubmit() {
    if (this.canSubmit()) {
      this.fullNameChange.emit(this.inputFullName());
      this.passwordChange.emit(this.inputPassword());
      this.viewChange.emit("test");
    }
  }
}

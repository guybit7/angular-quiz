import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { Question, ViewType } from "../quiz/types";

@Component({
  selector: "sidebar-question-item",
  standalone: true,
  templateUrl: "./sidebar-question-item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarQuestionItemComponent {
  index = input.required<number>();
  question = input.required<Question>();
  completedQuiz = input<boolean>();
  currentQuestionIndex = input<number>();
  itemClick = output<void>();
  currentView = input<ViewType>();
}

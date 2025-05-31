import { GenericEvent } from "@/common/interfaces";
import { ResultItem } from "@/types";
import { PaSidebarComponent } from "@/ui/components";
import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { Question, ViewType } from "../quiz/types";
import { SidebarQuestionItemComponent } from "../sidebar-question-item/sidebar-question-item.component";

@Component({
  selector: "sidebar",
  standalone: true,
  imports: [CommonModule, PaSidebarComponent, SidebarQuestionItemComponent],
  templateUrl: "./sidebar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  completedQuiz = input<boolean>();
  currentView = input<ViewType>();
  currentQuestionIndex = input<number>();
  results = input<Array<ResultItem>>();
  questions = input<Array<Question>>();
  sidebarEvent = output<GenericEvent<ViewType, string | null>>();

  onItemClick(type: ViewType, payload?: number): void {
    this.sidebarEvent.emit({
      type: type as ViewType,
      payload: payload ? String(payload) : null,
    });
  }
}

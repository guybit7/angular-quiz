import { Result } from "@/api/api";
import { PaProgressbarComponent } from "@/ui/components";
import { CommonModule, DecimalPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { QueryClient } from "@tanstack/angular-query-experimental";
import { questionsKeys } from "../quiz/quiz.query-keys";

@Component({
  selector: "app-summary",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./summary.component.html",
  imports: [CommonModule, PaProgressbarComponent, DecimalPipe],
})
export class SummaryComponent {
  readonly passScore = 70;

  queryClient = inject(QueryClient);
  postResults: Result | undefined = this.queryClient.getQueryData(
    questionsKeys.postResults()
  );

  result = computed(() => {
    return this.postResults;
  });

  isPassed = computed(() => {
    if (!this.postResults) {
      return false;
    }
    return this.postResults.score >= this.passScore;
  });
}

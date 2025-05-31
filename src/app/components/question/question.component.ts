import { PaButtonComponent } from "@/ui/components";
import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { Question } from "../quiz/types";
import { QuestionService } from "./question.service";
import { ResultItem } from "@/types";

@Component({
  selector: "app-question",
  standalone: true,
  imports: [FormsModule, CommonModule, PaButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./question.component.html",
  styles: [],
})
export class QuestionComponent implements OnInit, OnDestroy {
  private questionService = inject(QuestionService);
  private destroyRef = inject(DestroyRef);

  completedQuiz = input.required<boolean>();
  currentQuestionIndex = input.required<number>();
  totalsQuestions = input.required<number>();
  question = input.required<Question>();
  results = input.required<Array<ResultItem>>();

  answerSelected = output<{ questionId: string; answerId: string }>();

  selectedAnswerId = signal("");

  submittedAnswerId = computed(
    () =>
      this.results().find((result) => result.questionId === this.question().id)
        ?.answerId
  );

  timerValue = this.questionService.getCurrentTime();

  constructor() {
    effect(() => {
      if (!this.completedQuiz()) {
        this.startTimer();
      }
    });
  }

  ngOnInit(): void {
    if (!this.completedQuiz()) {
      this.initTimeCompleteListener();
    }
  }

  startTimer() {
    if (this.question().id !== this.questionService.currentQuestionId) {
      this.questionService.startTimer(this.question().id);
    }
  }

  initTimeCompleteListener() {
    this.questionService
      .getCountdownComplete()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isComplete) => {
        if (isComplete) {
          this.emitAnswer();
          this.questionService.setCountdownComplete(false);
        }
      });
  }

  handleAnswerSelectionOption(answerId: string) {
    if (this.completedQuiz()) {
      return;
    }
    if (this.selectedAnswerId() === answerId) {
      this.selectedAnswerId.set("");
    } else {
      this.selectedAnswerId.set(answerId);
    }
  }

  handleNext() {
    if (!this.completedQuiz() && this.selectedAnswerId()) {
      this.emitAnswer();
    }
  }

  private emitAnswer() {
    this.answerSelected.emit({
      questionId: this.question().id,
      answerId: this.selectedAnswerId(),
    });
    this.selectedAnswerId.set("");
  }

  ngOnDestroy(): void {
    this.questionService.stopTimer();
  }
}

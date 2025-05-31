import { Result } from "@/api/api";
import { GenericEvent } from "@/common/interfaces";
import { PostResult } from "@/types";
import { PaSpinnerComponent } from "@/ui/components";
import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { QueryClient } from "@tanstack/angular-query-experimental";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ErrorPageComponent } from "../error-page/error-page.component";
import { QuestionComponent } from "../question/question.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SummaryComponent } from "../summary/summary.component";
import { WelcomeComponent } from "../welcome/welcome.component";
import { injectPostResultsMutation } from "./quiz.mutations";
import { injectAllQuestions } from "./quiz.queries";
import { QuizService } from "./quiz.service";
import { ViewType } from "./types";

@Component({
  selector: "app-quiz",
  standalone: true,
  imports: [
    CommonModule,
    WelcomeComponent,
    QuestionComponent,
    SummaryComponent,
    SidebarComponent,
    PaSpinnerComponent,
    ConfirmDialogModule,
    ErrorPageComponent,
  ],
  providers: [QuizService],
  templateUrl: "./quiz.component.html",
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent {
  private queryClient = inject(QueryClient);
  private confirmationService = inject(ConfirmationService);

  currentView = signal<ViewType>("welcome");
  fullName = signal("");
  password = signal("");
  currentQuestionIndex = signal(0);
  answers = signal<Record<string, string>>({});
  result = signal<Result | null>(null);
  completedQuiz = signal(false);
  loadingPostResults = signal(false);
  isPostResultsFailed = signal(false);

  isUserRegisterd = computed(() => {
    return this.fullName() !== "" && this.password() !== "";
  });

  currentQuestion = computed(
    () => this.injectAllQuestions.data()?.[this.currentQuestionIndex()] || null
  );

  hasMoreQuestions = computed(() => {
    const nextIndex = this.currentQuestionIndex() + 1;
    return nextIndex < (this.injectAllQuestions.data()?.length ?? 0);
  });

  results = computed(() => {
    return Object.entries(this.answers()).map(([questionId, answerId]) => ({
      questionId,
      answerId,
    }));
  });

  injectAllQuestions = injectAllQuestions(this.currentView);

  injectPostResultsMutation = injectPostResultsMutation({
    onSuccess: (result: Result) => {
      this.currentView.set("summary");
      this.currentQuestionIndex.set(0);
      this.completedQuiz.set(true);
    },
    onError: (error) => {
      console.error("Error in post results", error);
      this.isPostResultsFailed.set(true);
    },
    onMutate: () => {
      this.loadingPostResults.set(true);
    },
    onSettled: () => {
      this.loadingPostResults.set(false);
    },
  });

  setView(view: ViewType) {
    this.currentView.set(view);
    if (view === "test") {
      this.initializeFirstQuestion();
    }
  }

  setFullName(name: string) {
    this.fullName.set(name);
  }

  setPassword(password: string) {
    this.password.set(password);
  }

  handleAnswer(questionId: string, answerId: string) {
    this.updateAnswers(questionId, answerId);
    this.handleNextQuestionOrSummary();
  }

  handleSidebarEvent(event: GenericEvent<ViewType, string | null>) {
    if (this.currentView() !== "welcome" && event.type === "welcome") {
      this.confirmationService.confirm({
        message:
          "Are you sure you want to start over? All your progress and the result will be lost.",
        header: "Confirmation",
        accept: () => {
          this.answers.set({});
          this.currentView.set(event.type);
          this.currentQuestionIndex.set(0);
          this.fullName.set("");
          this.password.set("");
          this.completedQuiz.set(false);
          this.isPostResultsFailed.set(false);
          this.queryClient.clear();
        },
      });
    } else {
      console.log("event.type", event.type);
      console.log("event.payload", event.payload);
      this.currentView.set(event.type);
      this.currentQuestionIndex.set(Number(event.payload ?? 0));
    }
  }

  private initializeFirstQuestion() {
    this.currentQuestionIndex.set(0);
  }

  private updateAnswers(questionId: string, answerId: string) {
    this.answers.set({
      ...this.answers(),
      [questionId]: answerId,
    });
  }

  private handleNextQuestionOrSummary() {
    if (this.hasMoreQuestions()) {
      this.moveToNextQuestion();
    } else {
      this.handleQuizCompletion();
    }
  }

  private moveToNextQuestion() {
    this.currentQuestionIndex.update((index) => index + 1);
  }

  private handleQuizCompletion() {
    if (this.completedQuiz()) {
      console.error("The quiz already completed - something wrong");
      this.currentView.set("summary");
      return;
    }
    this.confirmationService.close(); // In case the confirmation dialog is open, after the quiz is completed, the dialog will be closed.
    this.isPostResultsFailed.set(false);
    const postPayload: PostResult = {
      password: this.password(),
      fullName: this.fullName(),
      results: this.results(),
    };
    this.injectPostResultsMutation.mutate(postPayload);
  }
}

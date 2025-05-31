import { inject, Signal } from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { catchError, forkJoin, lastValueFrom, map } from "rxjs";
import { questionsKeys } from "./quiz.query-keys";
import { QuizService } from "./quiz.service";
import { Question, ViewType } from "./types";

export const injectAllQuestions = (view: Signal<ViewType>) => {
  const quizService = inject(QuizService);

  return injectQuery(() => ({
    queryKey: questionsKeys.all(),
    queryFn: () =>
      lastValueFrom(
        forkJoin({
          questions: quizService.sortedQuestions$,
          images: quizService.getImages$,
        }).pipe(
          map(({ questions, images }) =>
            questions.map((question: Question) => ({
              ...question,
              imageUrl: images[question.imageId],
            }))
          ),
          catchError((error) => {
            console.error("Error in forkJoin operation:", {
              error,
              errorMessage: error.message,
              errorStack: error.stack,
            });
            throw error;
          })
        )
      ),
    staleTime: Infinity,
    enabled: view() === "test",
  }));
};

import { Result } from "@/api/api";
import { MutationCallbacks } from "@/common";
import { PostResult } from "@/types";
import { inject } from "@angular/core";
import {
  injectMutation,
  QueryClient,
} from "@tanstack/angular-query-experimental";
import { lastValueFrom } from "rxjs";
import { questionsKeys } from "./quiz.query-keys";
import { QuizService } from "./quiz.service";

export const injectPostResultsMutation = (
  callbacks?: MutationCallbacks<Result>
) => {
  const quizService = inject(QuizService);
  const queryClient = inject(QueryClient);

  return injectMutation(() => ({
    mutationFn: async (payload: PostResult) => {
      return await lastValueFrom(quizService.postResults$(payload));
    },
    onSuccess: (result: Result) => {
      queryClient.setQueryData(questionsKeys.postResults(), result);
      if (callbacks?.onSuccess) {
        callbacks.onSuccess(result);
      }
    },
    onError: (error: Error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
    onMutate: () => {
      if (callbacks?.onMutate) {
        callbacks.onMutate();
      }
    },
    onSettled: () => {
      if (callbacks?.onSettled) {
        callbacks.onSettled();
      }
    },
  }));
};

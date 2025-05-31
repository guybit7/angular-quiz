import { getImages, getQuestions, postResults, Result } from "@/api/api";
import { PostResult } from "@/types";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable()
export class QuizService {
  sortedQuestions$ = getQuestions().pipe(
    map((questions) => questions.sort((a, b) => a.priority - b.priority))
  );

  getImages$ = getImages().pipe(
    map((images) =>
      images.reduce(
        (acc, img) => {
          acc[img.id] = img.url;
          return acc;
        },
        {} as Record<string, string>
      )
    )
  );

  postResults$(payload: PostResult): Observable<Result> {
    return postResults(payload.password, payload.fullName, payload.results);
  }
}

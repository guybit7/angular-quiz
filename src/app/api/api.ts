import questions from "./questions.json";
import images from "./images.json";
import { Question } from "../components/quiz/types";
import { Observable, of, delay, throwError } from "rxjs";

export interface Image {
  id: string;
  url: string;
}

export interface Result {
  score: number;
  correctAnswers: number;
  totalAnswers: number;
}

export function getQuestions(): Observable<Question[]> {
  return of(questions).pipe(delay(300));
  // return throwError(() => new Error("Simulated error in getQuestions")); //I left it in the code for simulation of error
}

export function getImages(): Observable<Image[]> {
  return of(images).pipe(delay(300));
  // return throwError(() => new Error("Simulated error in getImages")); //I left it in the code for simulation of error
}

export function postResults(
  applicantId: string,
  applicantName: string,
  results: Array<{ questionId: string; answerId: string }>
): Observable<Result> {
  // return throwError(() => new Error("Simulated error in Post result")); //I left it in the code for simulation of error
  console.log("Posting results for", applicantId, applicantName, results);
  const correctAnswers = Math.floor(Math.random() * results.length) + 1;
  return of({
    score: (correctAnswers / results.length) * 100,
    correctAnswers,
    totalAnswers: results.length,
  }).pipe(delay(3000));
}

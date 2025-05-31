import { Injectable, Signal, signal } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  Subject,
  interval,
  takeUntil,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  readonly countdownStartValue = 30;
  private countdownCompleteSubject$ = new BehaviorSubject<boolean>(false);
  private timeLeft = signal<number>(this.countdownStartValue);
  private destroy$ = new Subject<void>();

  currentQuestionId: string | null = null;

  startTimer(questionId: string) {
    this.destroy$.next();
    this.timeLeft.set(this.countdownStartValue);
    this.currentQuestionId = questionId;
    this.countdownCompleteSubject$.next(false);

    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const currentValue = this.timeLeft();
        if (currentValue > 0) {
          this.timeLeft.set(currentValue - 1);
        } else {
          this.countdownCompleteSubject$.next(true);
          this.stopTimer();
        }
      });
  }

  stopTimer() {
    this.destroy$.next();
  }

  getCurrentTime(): Signal<number> {
    return this.timeLeft;
  }

  getCountdownComplete(): Observable<boolean> {
    return this.countdownCompleteSubject$.asObservable();
  }

  setCountdownComplete(value: boolean) {
    this.countdownCompleteSubject$.next(value);
  }
}

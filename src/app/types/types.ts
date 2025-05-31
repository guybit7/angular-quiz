export interface PostResult {
  password: string;
  fullName: string;
  results: Array<ResultItem>;
}
export interface ResultItem {
  questionId: string;
  answerId: string;
}

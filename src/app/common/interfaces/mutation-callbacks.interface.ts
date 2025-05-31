export interface MutationCallbacks<T> {
  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
}

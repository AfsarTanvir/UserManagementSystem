export function debounce<F extends (...args: any[]) => void>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeout: number;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => fn(...args), delay);
  };
}

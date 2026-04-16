export const mockApi = <T>(payload: T, delay = 600): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(payload), delay);
  });


const cached = <T, P extends Array<unknown>>(
  factory: (...params: P) => T,
  ...params: P
): (() => T) => {
  let cache: T;

  return () => {
    if (!cache) {
      cache = factory(...params);
    }

    return cache;
  };
};

export { cached };

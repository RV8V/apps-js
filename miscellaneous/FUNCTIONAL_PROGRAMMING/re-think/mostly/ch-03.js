// чистые функции являются математическими функциями, и именно в этом заключается функциональное программирование. Программирование с этими маленькими ангелами даёт огромные преимущества

const memoize = (f) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    cache[key] = cache[key] || f(...args);
    console.log({ cache });
    return cache[key];
  };
};

const makeRequest = (url, params) => `${url}-${JSON.stringify(params)}`;

const pureHttpCall = memoize((url, params) => () => makeRequest(url, params));

const getNotPureFn = pureHttpCall('https', { data: true });

console.log({ result: getNotPureFn() });

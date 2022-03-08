const makeRequest = (callback) => callback('data');

const getInfo = (callback) => makeRequest((json) => callback(json));

const getInfo1 = (callback) => makeRequest(callback);
const getInfo2 = makeRequest;

console.log({
  1: getInfo((val) => ({ val })),
  2: getInfo1((val) => ({ val })),
  3: getInfo2((val) => ({ val })),
});

export const postMessageWebView = (type, data) => {
  if (window) {
    window.ReactNativeWebView?.postMessage(JSON.stringify({ type, data }));
    return true;
  }
  return false;
};

const baseURL = {
  development: "http://localhost:8081",
  production: ""
};
const headers = {
  "Content-Type": "application/json;charset=utf-8"
};
const loaderTypes = {
  loading: "loading",
  success: "success",
  error: "error"
};
const getApiUrl = (action) => `${baseURL[process.env.NODE_ENV]}/${action}`;

export { getApiUrl, headers, loaderTypes };

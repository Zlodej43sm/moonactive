// local files
import { getApiUrl, headers, loaderTypes } from "./utils";
import { SET_LOADER } from "store/types";

const requestHandler = (action, method) => ({
  body,
  successCb = () => {},
  errorCb = () => {},
  loadingMsg
}) => async (dispatch) => {
  try {
    const apiUrlString = getApiUrl(action);
    const apiUrl = new URL(apiUrlString);
    const fetchOptions = {
      method
    };

    if (loadingMsg) {
      dispatch({
        type: SET_LOADER,
        payload: { type: loaderTypes.loading, message: loadingMsg }
      });
    }

    if (method === "get" || method === "head") {
      Object.keys(body).forEach((param) =>
        apiUrl.searchParams.append(param, body[param])
      );
    } else {
      fetchOptions.body = JSON.stringify(body);
      fetchOptions.headers = headers;
    }

    const responseData = await fetch(apiUrl, fetchOptions);

    if (responseData.ok) {
      const responseJson = await responseData.json();

      dispatch({
        type: SET_LOADER,
        payload: { type: loaderTypes.success, message: responseJson.message }
      });
      successCb(responseJson, dispatch);
    } else {
      throw new Error(responseData.statusText);
    }
  } catch (error) {
    const { message } = error;

    dispatch({
      type: SET_LOADER,
      payload: { type: loaderTypes.error, message }
    });
    errorCb(message, dispatch);
  }
};

export { requestHandler };

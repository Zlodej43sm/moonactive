const generateOptionsObject = (options) => {
  const { body, loadingMsg, type, dispatch } = options;
  const optionsObject = {
    body,
    loadingMsg,
    successCb: (res) => {
      const { result } = res;
      const payloadKey = Array.isArray(result) ? "rows" : "row";

      dispatch({
        type,
        payload: { [payloadKey]: result }
      });
    }
  };

  return optionsObject;
};

export { generateOptionsObject };

const getToken = state => state.login.token;
const getLoginingMistakeInInput = state => state.login.loginingMistakeInInput;
const getLoading = state => state.login.loading;
const getTokenIsEnd = state => state.login.tokenIsEnd;
const getError = state => state.login.error;

export default {
  getToken,
  getLoginingMistakeInInput,
  getLoading,
  getTokenIsEnd,
  getError,
};

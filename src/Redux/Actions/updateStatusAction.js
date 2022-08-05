import api from "../Api/Api";
import { UPDATE_STATUS_START,
        UPDATE_STATUS_SUCCESS,
        UPDATE_STATUS_ERROR
      } from "./Types";
import { alertActions } from "./alertAction";

// change suggestion boxes status
export const updateSuggestionBoxStatus = (id, data) => async (dispatch) => {
  dispatch({
    type: UPDATE_STATUS_START,
  });
  try {
    const res = await api.put("/suggestions/updateStatus/"+id, data);
    if (res) {
      dispatch({
        type: UPDATE_STATUS_SUCCESS,
        payload: res.data && res.data,
      });
      dispatch(alertActions.success(res.data.msg));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: UPDATE_STATUS_ERROR,
      payload: err.response && err.response,
    });
    dispatch(alertActions.error(err.response.data.msg));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};


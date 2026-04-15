import { AppDispatch } from "../store";
import { showToast } from "./my-toast-action";

export const ToastService = {
  show: (dispatch: AppDispatch, msg: string, duration?: number) =>
    dispatch(showToast(msg, duration)),
};

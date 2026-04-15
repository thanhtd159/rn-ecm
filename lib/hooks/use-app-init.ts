import { useEffect } from "react";
import { initApp } from "../store/app-init/app-init-slice";
import { useAppDispatch } from "../store/useRedux";

export const useInitApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initApp());
  }, [dispatch]);
};

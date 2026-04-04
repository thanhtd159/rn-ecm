import { createLogger } from "redux-logger";
import { RootState } from "./store";

export const logger = createLogger({
  collapsed: (getState, action) => !action.type.includes("ERROR"),
  duration: true,
  stateTransformer: (state: RootState) => ({
    auth: state.auth,
  }),
  predicate: (getState, action) =>
    action.type.startsWith("auth/") || action.type.startsWith("product/"),
});

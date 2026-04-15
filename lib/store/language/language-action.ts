/** @format */

import { createAction } from "@reduxjs/toolkit";
import { SwitchLanguagePayload } from "./language-type";

export const switchLanguageRequest = createAction<SwitchLanguagePayload>(
  "language/switchLanguageRequest",
);

export const switchRtlRequest = createAction<boolean>(
  "language/switchRtlRequest",
);

/** @format */

import { Color } from "@/lib/common";

export default {
  container: (dark: any) => ({
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 15,
    backgroundColor: dark ? "#717070" : "#f2f4f8",
    marginRight: 4,
    marginBottom: 6,
  }),
  text: (dark: any) => ({
    fontSize: 14,
    color: dark ? "#fff" : Color.primary,
  }),
  selected: (dark: any) => ({
    backgroundColor: dark ? "#434343" : "#fff",
    borderWidth: 1,
    borderColor: dark ? "#fff" : Color.primary,
  }),
} as any;

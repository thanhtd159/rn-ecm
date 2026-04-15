export const showToast = (msg: string, duration?: number) => ({
  type: "toast/showToast",
  payload: { msg, duration },
});

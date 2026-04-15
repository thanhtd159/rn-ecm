/** @format */

export const getAppConfigJson = async (url: string) => {
  const resp = await fetch(url);

  return resp.json();
};

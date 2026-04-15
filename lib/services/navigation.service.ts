export const ROUTES = {
  login: "/(public)/login",
  home: "/(private)/(tabs)/home",
  productDetail: (id: string) => `/(private)/product/${id}`,
  orderDetail: (id: string) => `/(private)/order/${id}`,
};

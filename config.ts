export const config = {
  redirectUri_dev: "/",
  redirectUri_prod: "/",
  routes_basename: import.meta.env.BASE_URL || "/",
  postLogoutRedirectUri: "/",
};

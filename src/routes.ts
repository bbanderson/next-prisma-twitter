const PAGE_ROUTES = {
  HOME: "/",
  CREATE_ACCOUNT: "/create-account",
  LOG_IN: "/log-in",
} as const;

const API_ROUTES = {
  API_CREATE_ACCOUNT: "/api/user/create-account",
  API_LOG_IN: "/api/user/log-in",
  API_ME: "/api/user/me",
  API_LOG_OUT: "/api/user/log-out",
  API_TWEET: "/api/tweet",
} as const;

const ROUTES = {
  ...PAGE_ROUTES,
  ...API_ROUTES,
} as const;

export default ROUTES;

const PAGE_ROUTES = {
  HOME: "/",
  CREATE_ACCOUNT: "/create-account",
  LOG_IN: "/log-in",
} as const;

const API_ROUTES = {
  API_CREATE_ACCOUNT: "/api/create-account",
  API_LOG_IN: "/api/log-in",
  API_ME: "/api/me",
  API_LOG_OUT: "/api/log-out",
} as const;

const ROUTES = {
  ...PAGE_ROUTES,
  ...API_ROUTES,
} as const;

export default ROUTES;

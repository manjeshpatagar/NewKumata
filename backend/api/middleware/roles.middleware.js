import { ApiError } from "../utils/ApiError.js";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const PERMISSIONS = {
  // intraday
  MANAGE_INTRADAY_STOCK: "manage_intraday_stock", // Update details, settings
  VIEW_INTRADAY_STOCK: "view_intraday_stock",

  // Market News
  MANAGE_MARKET_NEWS: "manage_market_news",
  VIEW_MARKET_NEWS: "view_market_news",

  //Results
  MANAGE_RESULTS: "manage_results",
  VIEW_RESULTS: "view_results",

  //Stock News
  MANAGE_STOCK_NEWS: "manage_stock_news",
  VIEW_STOCK_NEWS: "view_stock_news",

  //Intraday Results
  MANAGE_INTRADAY_RESULTS: "manage_intraday_results",
  VIEW_INTRADAY_RESULTS: "view_intraday_results",
};

const rolePermissions = new Map();
rolePermissions.set(ROLES.ADMIN, Object.values(PERMISSIONS));

rolePermissions.set(ROLES.ADMIN, [
  PERMISSIONS.MANAGE_INTRADAY_STOCK,
  PERMISSIONS.MANAGE_MARKET_NEWS,
  PERMISSIONS.MANAGE_RESULTS,
  PERMISSIONS.MANAGE_STOCK_NEWS,
  PERMISSIONS.MANAGE_INTRADAY_RESULTS,
  PERMISSIONS.VIEW_INTRADAY_STOCK,
  PERMISSIONS.VIEW_MARKET_NEWS,
  PERMISSIONS.VIEW_RESULTS,
  PERMISSIONS.VIEW_STOCK_NEWS,
  PERMISSIONS.VIEW_INTRADAY_RESULTS,
]);
rolePermissions.set(ROLES.USER, [
  PERMISSIONS.VIEW_INTRADAY_STOCK,
  PERMISSIONS.VIEW_MARKET_NEWS,
  PERMISSIONS.VIEW_RESULTS,
  PERMISSIONS.VIEW_STOCK_NEWS,
  PERMISSIONS.VIEW_INTRADAY_RESULTS,
]);

// export const hasPermission = (requiredPermission) => {
//   return (req, res, next) => {
//     const userRole = req.user?.role;
//     const userPermissions = rolePermissions.get(userRole) || [];
//     const userHasPermission = userPermissions.includes(requiredPermission);

//     // Allow user-specific custom permissions to override role permissions
//     const hasCustomPermission =
//       req.user?.customPermissions?.includes(requiredPermission);

//     if (userHasPermission || hasCustomPermission) {
//       return next();
//     }

//     return next(
//       new ApiError(
//         403,
//         "Forbidden: You do not have permission to perform this action."
//       )
//     );
//   };
// };



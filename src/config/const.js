/**
 * Const.js
 * ---
 * Will hold all of the main contants for the application
 * by making use of .env file
 */

// API
export const API_URL = process.env.REACT_APP_API_URL;
export const API_KEY = process.env.REACT_APP_API_KEY;

// Strapi
export const STRAPI_API_URL = process.env.REACT_APP_STRAPI_API_URL;
export const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN_KEY;
export const BEARER = process.env.REACT_APP_BEARER;

// App
export const APP_TITLE = process.env.REACT_APP_APP_TITLE;
export const APP_DESCRIPTION = process.env.REACT_APP_APP_DESCRIPTION;
export const APP_KEYWORDS = process.env.REACT_APP_APP_KEYWORDS;
export const APP_AUTHOR = process.env.REACT_APP_APP_AUTHOR;
export const APP_URL = process.env.REACT_APP_APP_URL;

export const APP_CHARSET = process.env.REACT_APP_APP_CHARSET;
export const APP_VIEWPORT = process.env.REACT_APP_APP_VIEWPORT;

// Enviroment
export const APP_ENV = process.env.REACT_APP_APP_ENV;
export const APP_VERSION = process.env.REACT_APP_APP_VERSION;
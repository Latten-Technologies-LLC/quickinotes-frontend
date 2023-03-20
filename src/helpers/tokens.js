import { AUTH_TOKEN } from '../config/const.js';

// Will get auth token from local storage
export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
}

// Will set auth token to local storage
export const setToken = (token) => {
    if(token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
}

// Will remove auth token from local storage
export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
}
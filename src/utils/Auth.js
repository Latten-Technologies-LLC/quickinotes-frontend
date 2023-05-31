/**
 * Auth
 * Type: Utility
 * Description: This file contains the Auth class, which is used to check if the user is authenticated.
 * 
 */
import { BEARER } from '../config/const';
import { getToken } from '../helpers/tokens';
import { http } from '../helpers/http';
import { useEffect } from 'react';

export const isAuthenticated = () => {
    const token = getToken();

    if (token) {
        // We have a token, so we are authenticated, but let's check if it's expired
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp < Date.now() / 1000) {
            // Token has expired
        }

        // It's not expired, lets see if the token exists in the database
        const result = async () => {
            await http.get("/users/me?populate=*", {
                headers: { Authorization: `${BEARER} ${token}` },
            }).then((response) => {
                return true;
            }).catch((err) => {
                console.log(err);
                return err;
            });
        };

        if (result()) {
            return true;
        } else {
            return false;
        }
    }
}

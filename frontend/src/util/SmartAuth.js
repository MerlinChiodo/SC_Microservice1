import { useLocation } from "react-router-dom";
import { Login } from "../pages/Login";
import Cookies from 'js-cookie';

export class SmartAuth {

    static #citizen = null;

    static async #fetchData(token) {
        const url = `http://auth.smartcityproject.net:8080/verify`;
        fetch(url, {
            method: 'POST',
            body: encodeURIComponent('code') + '=' + encodeURIComponent(token),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(data => {
                console.log("received user data:", data);
                this.#citizen = data;
            })
            .catch(error => console.error(error));
    }

    static isLoggedIn() {
        if (this.#citizen !== null) {
            return true;
        }

        //check if cookie user_session_token is set
        const tokenCookie = Cookies.get('user_session_token');
        if (tokenCookie !== undefined) {
            console.log("using token from cookie");
            this.#fetchData(tokenCookie);
            return true;
        }

        //check if token is in url search params
        let params = (new URL(document.location)).searchParams;
        const tokenUrl = params.get('token');
        if (tokenUrl !== null) {
            console.log("using token from url");
            this.#fetchData(tokenUrl);
            //if on localhost, set cookie
            if (window.location.hostname === "localhost") {
                console.log("setting cookie for localhost");
                Cookies.set('user_session_token', tokenUrl);
            }
            return true;
        }

        return false;
    }

    static getMyCitizenID() {
        if (this.#citizen !== null) {
            return this.#citizen.citizen_id;
        }
        return null;
    }

    static logout() {
        Cookies.remove('user_session_token', { path: '/', domain: 'localhost' });
        Cookies.remove('user_session_token', { path: '/', domain: 'smartcityproject.net' });
        SmartAuth.citizen = null;
    }

}

export function RequireAuth({ children }) {
    let location = useLocation();
    let auth = SmartAuth.isLoggedIn();
    return auth ? children : <Login redirect={location.pathname} />;
}

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const storage ={
    setToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token);
    },
    getToken(){
        return localStorage.getItem(TOKEN_KEY);
    },
    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },
    setUser(user: unknown) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    getUser() {
        const data = localStorage.getItem(USER_KEY);
        return data ? JSON.parse(data) : null;
    },
    removeUser() {
        localStorage.removeItem(USER_KEY);
    },
};
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const cookie = cookies();

export const setCookie = (key: string, value: string, options: ResponseCookie) => cookie.set(key, value, options);

export const setCookieAll = (options: ResponseCookie) => cookie.set(options);

export const getCookie = (key: string) => cookie.get(key);

export const getCookieAll = () => cookie.getAll();

export const deleteCookie = (key: string) => cookie.delete(key);

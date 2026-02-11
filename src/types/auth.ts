export const AUTH_COOKIE = 'auth_token';
export const USER_COOKIE = 'user_profile';

export type UserRole = 'admin' | 'customer';

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}
export interface UserProfile {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
}

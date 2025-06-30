export interface IAuthUser {
  name: string;
  email: string;
  password: string;
  photoURL?: string;
}
export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
    photoURL?: string;
  };
}

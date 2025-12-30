export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}
export interface RegisterUserResponse {
  id: number;
  name: string;
  email: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}
export interface LoginUserResponse {
  name: string;
  token: string;
}

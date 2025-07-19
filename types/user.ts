export interface User {
  username: string;
  email: string;
  avatar: string;
}

export interface UserRequest {
  email: string;
  password: string;
}

export interface CheckSessionResponse {
  message: string;
}
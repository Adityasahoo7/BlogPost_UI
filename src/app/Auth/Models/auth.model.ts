export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  
  Username: string;
  password: string;
  
}

export interface LoginResponse {
  status: number;
  message: string;
  data: LoginData;
}

export interface LoginData {
  token: string;
  role: string;
}
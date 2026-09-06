export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  
  Username: string;
  password: string;
  
}

export interface LoginResponse {
  token: string;
  role: string;
 
}
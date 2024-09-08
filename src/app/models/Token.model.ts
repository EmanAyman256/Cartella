import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    id: string;
    name: string;
    role: string;
  }
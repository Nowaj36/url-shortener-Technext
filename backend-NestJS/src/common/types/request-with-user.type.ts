export interface JwtPayload {
  sub: number;
  email: string;
}

export interface RequestWithUser extends Request {
  user: JwtPayload;
  cookies: {
    refresh_token?: string;
    [key: string]: any;
  };
}

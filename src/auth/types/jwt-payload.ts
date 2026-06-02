export type JwtPayload = {
  sub: string;
  username: string;
  roles: string[];
};

export type JwtValidatedUser = {
  userId: string;
  username: string;
  roles: string[];
};

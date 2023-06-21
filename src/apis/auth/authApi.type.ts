export type User = {
  email: string;
  password: string;
};

export type Token = {
  access_token: string;
};

export type Error = {
  error: string;
  message: string;
  statusCode: number;
};

export type UserRole = "vendor" | "noibo" | "phongtuyenthong";

export type LoginUser = {
  username: string;
  email: string;
  password: string;
  type: UserRole;
};

export const USER_VENDOR: LoginUser = {
  username: "vendor",
  email: "vendor@vna.com",
  password: "123456",
  type: "vendor",
};

export const USER_NOIBO: LoginUser = {
  username: "noibo",
  email: "noibo@vna.com",
  password: "123456",
  type: "noibo",
};

export const USER_PTT: LoginUser = {
  username: "ptt",
  email: "ptt@vna.com",
  password: "123456",
  type: "phongtuyenthong",
};

export const LOGIN_USERS: LoginUser[] = [USER_VENDOR, USER_NOIBO, USER_PTT];


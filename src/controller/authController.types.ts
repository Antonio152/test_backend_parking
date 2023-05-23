export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type INewUser = Omit<IUser, "id">;

export type ILoginUser = Omit<INewUser, "name">;

/* Login responses */
export interface ILogguedUserR {
  ok: boolean;
  uid: number;
  name: string;
  token: any;
}
export interface INoLogguedUserR {
  ok: boolean;
  msg: string;
}

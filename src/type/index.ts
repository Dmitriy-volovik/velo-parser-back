import { shopsNames, shopsURL, roles } from '../const/const';

export type TSearchResult = {
  image: string,
  title: string,
  price: string | number,
  link: string,
  shop: TShops,
  shopURL: TShopURL
};

export type TSignUpData = {
  email: string,
  password: string
};

export type TShops = typeof shopsNames[number];
export type TShopURL = typeof shopsURL[number];
export type TRoles = typeof roles[number];
export type TUserField = 'email' | 'id' | 'role';


export type TJwtPayload = {
  id: number;
  email: string;
  firstName?: string;
};

export type TRegistrationStatus = {
  success: boolean;
  message: string;
};

export type TToken = {
  readonly token: string;
};

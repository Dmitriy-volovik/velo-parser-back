import { shopsNames, shopsURL } from '../const/const';

export type TSearchResult = {
  image: string,
  title: string,
  price: string | number,
  link: string,
  shop: TShops,
  shopURL: TShopURL
};

export type TShops = typeof shopsNames[number];
export type TShopURL = typeof shopsURL[number];

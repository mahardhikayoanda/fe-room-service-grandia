export type MenusType = {
  uuid: string;
  name: string;
  description: string;
  category: string;
  price: string;
  image: {
    uuid: string;
    url: string;
  };
  best_seller: boolean;
  recommended: boolean;
};

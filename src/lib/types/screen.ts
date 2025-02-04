import { Member } from "./member";
import { Product } from "./product";

/** REACT APP STATE */
export interface AppRootInterface {
  homePage: HomePageState;
}

/** HOMEPAGE */
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}
/** PRODUCTS PAGE */
/** ORDERS PAGE */

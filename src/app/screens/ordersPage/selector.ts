import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePopularDishes = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pausedOrders
);

export const retrieveNewDishes = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders
);

export const retrieveTopUsers = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedOrders
);

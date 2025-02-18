import React from "react";
import { Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { T } from "../../../lib/types/common";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrieverProcessedOrders } from "./selector";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { serverApi, Messages } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";

/** Redux  */
const processedOrdersRetriever = createSelector(
  retrieverProcessedOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessedOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessedOrders(props: ProcessedOrdersProps) {
  const { processOrders } = useSelector(processedOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();
  const { setValue } = props;

  /** HANDLER */
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw Error(Messages.error2);

      const orderId = e.target.value; // e.currentTarget.value
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3"); // move to finishedOrders tab
        setOrderBuilder(new Date()); // refresh order page
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2">
      <Stack>
        {/* for each order in processedOrders */}
        {processOrders.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {/* for each OrderItem in order */}
                {order.orderItems.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Box key={item._id} className="orders-name-price">
                      <Stack className="order-dish-class">
                        <img
                          src={imagePath}
                          className="order-dish-img"
                          alt=""
                        />
                        <p className="title-dish">{product.productName}</p>
                      </Stack>
                      <Stack className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>${item.itemQuantity}</p>
                        <img src="/icons/pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemPrice * item.itemQuantity}
                        </p>
                      </Stack>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img
                    src="/icons/plus.svg"
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p> Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src="/icons/pause.svg"
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <p className="data-compl">
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
                <Button
                  value={order._id}
                  variant="contained"
                  className="verify-button"
                  onClick={finishOrderHandler}
                >
                  Verify to fulfill
                </Button>
              </Box>
            </Box>
          );
        })}

        {!processOrders ||
          (processOrders.length <= 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                style={{ width: 300, height: 300 }}
                alt=""
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}

import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { useState, SyntheticEvent } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";

/** redux slice & selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    // get paused orders
    order
      .getMyOrders({
        ...orderInquiry,
        orderStatus: OrderStatus.PAUSE,
      })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    // get process orders
    order
      .getMyOrders({
        ...orderInquiry,
        orderStatus: OrderStatus.PROCESS,
      })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    // get finished orders
    order
      .getMyOrders({
        ...orderInquiry,
        orderStatus: OrderStatus.FINISH,
      })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry]);

  /** HANDLERS */
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Container className="order-container">
        {/* order list */}
        <Stack className="order-left">
          <TabContext value={value}>
            <Stack className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table-list"
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Stack>

            <Stack className="order-main-content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        {/* card info */}
        <Stack className="order-right">
          <Stack className="member-box order-info-box">
            <div className="order-user-img">
              <img
                src="/icons/default-user.svg"
                className="order-user-avatar"
                alt=""
              />
              <div className="order-user-icon-box">
                <img
                  src="/icons/user-badge.svg"
                  className="order-user-prof-img"
                  alt=""
                />
              </div>
            </div>
            <Box className="order-user-name">Justin</Box>
            <Box className="order-user-prof">USER</Box>
            <Box className="liner" />
            <Stack className="order-user-address">
              <LocationOnIcon />
              <Box className="spec-address-text">South Korea, Busan</Box>
            </Stack>
          </Stack>

          <Stack className="card-info order-info-box">
            <Box className="card-input">Card Number: 5243 4090 2002 7495</Box>
            <Stack className="card-half">
              <Box className="card-half-input">07 / 24</Box>
              <Box className="card-half-input">CVV: 010</Box>
            </Stack>
            <Box className="card-input">Justin Robertson</Box>
            <Stack className="cards-box">
              <img src="/icons/western-card.svg" alt=""></img>
              <img src="/icons/master-card.svg" alt=""></img>
              <img src="/icons/paypal-card.svg" alt=""></img>
              <img src="/icons/visa-card.svg" alt=""></img>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

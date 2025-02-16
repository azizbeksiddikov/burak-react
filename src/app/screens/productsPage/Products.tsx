import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** Redux slice and selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** Handlers Section */
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.page = 1;
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const PaginationHandler = (e: ChangeEvent, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems="center">
          <Stack className="avatar-big-box">
            <Box className="title">Burak Restaurant</Box>
            <Stack className="searchForm">
              <input
                type="search"
                className="single-search-input"
                name="singleSearch"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />

              <Button
                variant="contained"
                className="searchButton"
                endIcon={<SearchIcon />}
                onClick={searchProductHandler}
              >
                SEARCH
              </Button>
            </Stack>
          </Stack>

          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button
                variant="contained"
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                className="order"
                onClick={() => {
                  searchOrderHandler("createdAt");
                }}
              >
                New
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                className="order"
                onClick={() => {
                  searchOrderHandler("productPrice");
                }}
              >
                Price
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                className="order"
                onClick={() => {
                  searchOrderHandler("productViews");
                }}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className="list-category-section">
            <Stack className="product-category ">
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DISH
                    ? "primary"
                    : "secondary"
                }
                className="type"
                onClick={() => {
                  searchCollectionHandler(ProductCollection.DISH);
                }}
              >
                Dish
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.SALAD
                    ? "primary"
                    : "secondary"
                }
                className="type"
                onClick={() => {
                  searchCollectionHandler(ProductCollection.SALAD);
                }}
              >
                Salad
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DRINK
                    ? "primary"
                    : "secondary"
                }
                className="type"
                onClick={() => {
                  searchCollectionHandler(ProductCollection.DRINK);
                }}
              >
                Drink
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DESSERT
                    ? "primary"
                    : "secondary"
                }
                className="type"
                onClick={() => {
                  searchCollectionHandler(ProductCollection.DESSERT);
                }}
              >
                Dessert
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                    ? "primary"
                    : "secondary"
                }
                className="type"
                onClick={() => {
                  searchCollectionHandler(ProductCollection.OTHER);
                }}
              >
                Other
              </Button>
            </Stack>

            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`,
                    sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + " litre"
                        : product.productSize + " size";
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => {
                        chooseDishHandler(product._id);
                      }}
                    >
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="products-sale">{sizeVolume}</div>
                        <Button
                          className="shop-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                          }}
                        >
                          <img
                            src="/icons/shopping-cart.svg"
                            style={{ display: "flex" }}
                            alt=""
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc">
                          <MonetizationOnIcon /> {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available</Box>
              )}
            </Stack>
          </Stack>

          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={PaginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Container className="brands-container">
          <Box className="family-title">Our Family Brands</Box>
          <Stack className="brand-wrapper">
            <Stack className="brand-card">
              <img src="img/doner.webp" className="brand-img" alt="" />
            </Stack>
            <Stack className="brand-card">
              <img src="img/seafood.webp" className="brand-img" alt="" />
            </Stack>
            <Stack className="brand-card">
              <img src="img/sweets.webp" className="brand-img" alt="" />
            </Stack>
            <Stack className="brand-card">
              <img src="img/gurme.webp" className="brand-img" alt="" />
            </Stack>
          </Stack>
        </Container>
      </div>

      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our Address</Box>
            <iframe
              title="map"
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.467927012871!2d-122.0841436846819!3d37.42199977982518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e3c3e4e3c6d%3A0x4b6b6b1d3e3c0b2e!2sGoogleplex!5e0!3m2!1sen!2str!4v1634742459931!5m2!1sen!2str"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}

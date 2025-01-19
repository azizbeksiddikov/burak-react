import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

const newDishes = [
  { producName: "Lavash", imagePath: "img/lavash.webp" },
  { producName: "Cutlet", imagePath: "img/cutlet.webp" },
  { producName: "Kebab", imagePath: "img/kebab.webp" },
  { producName: "Kebab", imagePath: "img/kebab-fresh.webp" },
];

export default function NewDishes() {
  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Fresh Menu</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {newDishes.map((ele, index) => {
                return (
                  <Card key={index} variant="outlined" className="card">
                    <CardOverflow>
                      <div className="product-sale">Normal size</div>
                      <AspectRatio ratio="1">
                        <img src={ele.imagePath} alt="" />
                      </AspectRatio>
                    </CardOverflow>

                    <CardOverflow variant="soft" className="product-detail">
                      <Stack className="info">
                        <Stack flexDirection={"row"}>
                          <Typography className="title">
                            {ele.producName}
                          </Typography>
                          <Divider width="2" height="24" bg="#d9d9d9" />
                          <Typography className="price">$20</Typography>
                        </Stack>
                        <Stack>
                          <Typography className="views">
                            20
                            <VisibilityIcon sx={{ fontSize: 20, ml: "5px" }} />
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

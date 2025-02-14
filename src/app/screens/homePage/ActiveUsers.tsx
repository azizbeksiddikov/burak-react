import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { retrieveTopUsers } from "./selector";
import { createSelector } from "reselect";
import MemberService from "../../services/MemberService.ts";
import { Member } from "../../../lib/types/member";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";

const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active User</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member) => {
                  const image_path = `${serverApi}/${member.memberImage}`;

                  return (
                    <Card key={member._id} variant="outlined" className="card">
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={image_path} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="member-detail">
                        <Typography className="member-nickname">
                          {member.memberNick}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users !</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

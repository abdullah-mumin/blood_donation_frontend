import { Box, Divider, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { UserRole } from "@/types";
import SidebarItem from "./SidebarItem";
import { useEffect, useState } from "react";
import { drawerItems } from "@/utils/drawerItems";
import { getUserInfo } from "@/services/authServices";
import { setCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

const Sidebar = () => {
  // const [userRole, setUserRole] = useState("user");
  const user = useAppSelector(setCurrentUser);
  //   const userInfo = getUserInfo();
  //   console.log(userInfo);
  // useEffect(() => {
  //   const { role } = getUserInfo() as any;
  //   // console.log(role);
  //   setUserRole(role);
  // }, []);

  const roleBasedSidebarItems = drawerItems(
    user?.role?.toLowerCase() as UserRole
  );

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        sx={{ py: 1, my: 1 }}
        // component={Link}
        // href="/"
      >
        <Typography variant="h5" component={Link} href="/" fontWeight={600}>
          <Box component="span" color="primary.main">
            Blood
          </Box>{" "}
          Hero
        </Typography>
      </Stack>
      <Divider />
      <List>
        {roleBasedSidebarItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

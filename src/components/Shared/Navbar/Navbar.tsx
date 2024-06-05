"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Drawer,
  IconButton,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/hooks";
import { setCurrentUser } from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const user = useAppSelector(setCurrentUser);

  useEffect(() => {
    if (user?.email) {
      setIsMounted(true);
    }
  }, [user]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    if (isMobile) {
      setIsMenuOpen(false); // Close the drawer on mobile after clicking a link
    }
  };

  const linkStyle = (link: string) => ({
    color: activeLink === link ? theme.palette.primary.main : "inherit",
  });

  const drawerContent = (
    <Stack
      direction="column"
      gap={2}
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Typography
        component={Link}
        href="/donors"
        onClick={() => handleLinkClick("/donors")}
        sx={linkStyle("/donors")}
      >
        Donors
      </Typography>
      <Typography
        component={Link}
        href="/requests"
        onClick={() => handleLinkClick("/requests")}
        sx={linkStyle("/requests")}
      >
        Requests
      </Typography>
      {isMounted && user ? (
        <Typography
          component={Link}
          href="/blood-request"
          onClick={() => handleLinkClick("/blood-request")}
          sx={linkStyle("/blood-request")}
        >
          Request Blood
        </Typography>
      ) : null}
      <Typography
        component={Link}
        href="/about"
        onClick={() => handleLinkClick("/about")}
        sx={linkStyle("/about")}
      >
        About
      </Typography>
      <AuthButton />
    </Stack>
  );

  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h4"
          component={Link}
          href="/"
          fontWeight={600}
          onClick={() => handleLinkClick("/")}
        >
          <Box component="span" color="primary.main">
            Blood
          </Box>{" "}
          Hero
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={isMenuOpen} onClose={handleMenuToggle}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <Stack
            direction="row"
            gap={isTablet ? 2 : 5}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              component={Link}
              href="/donors"
              onClick={() => handleLinkClick("/donors")}
              sx={linkStyle("/donors")}
            >
              Donors
            </Typography>
            <Typography
              component={Link}
              href="/requests"
              onClick={() => handleLinkClick("/requests")}
              sx={linkStyle("/requests")}
            >
              Requests
            </Typography>
            {isMounted && user ? (
              <Typography
                component={Link}
                href="/blood-request"
                onClick={() => handleLinkClick("/blood-request")}
                sx={linkStyle("/blood-request")}
              >
                Request Blood
              </Typography>
            ) : null}
            <Typography
              component={Link}
              href="/about"
              onClick={() => handleLinkClick("/about")}
              sx={linkStyle("/about")}
            >
              About
            </Typography>
            <AuthButton />
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default Navbar;

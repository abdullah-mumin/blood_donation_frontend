"use client";

import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DrawerItem } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type TSidebarProps = {
  item: DrawerItem;
};

const SidebarItem = ({ item }: TSidebarProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const currentPath = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(currentPath === linkPath);
  }, [currentPath, linkPath]);

  return (
    <Link href={linkPath} passHref>
      <ListItem
        disablePadding
        sx={{
          ...(isActive
            ? {
                borderRight: "3px solid #1586FD",
                backgroundColor: "lightgray",
                "& svg": {
                  color: "#1586FD",
                },
                "& .MuiListItemText-primary": {
                  color: "#1586FD",
                },
              }
            : {}),
          mb: 1,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item?.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item?.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;

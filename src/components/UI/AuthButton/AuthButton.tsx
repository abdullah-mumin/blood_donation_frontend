import assets from "@/assets";
import { logout, setCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeUser } from "@/services/authServices";
import { Button, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import person from "../../../assets/images/person.jpg";
import { toast } from "sonner";

const AuthButton = () => {
  const router = useRouter();
  const user = useAppSelector(setCurrentUser);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleLogOut = () => {
  //   removeUser();
  //   router.refresh();
  //   handleMenuClose();
  // };

  const handleLogout = () => {
    const toastId = toast.loading("Logging out...");
    try {
      dispatch(logout());
      // window.location.reload();
      toast.success("Logout successful", { id: toastId, duration: 2000 });
      router.refresh();
      handleMenuClose();
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  const personSrc = person.src;

  return (
    <>
      {user?.email && user?.role ? (
        <>
          <IconButton onClick={handleMenuOpen}>
            <Avatar alt="User Avatar" src={personSrc} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem component={Link} href="/dashboard">
              Dashboard
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;

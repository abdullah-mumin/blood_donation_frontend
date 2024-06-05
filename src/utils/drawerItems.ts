import { DrawerItem, UserRole } from "@/types";
import { USER_ROLE } from "@/constants/role";

//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import TryIcon from "@mui/icons-material/Try";
import Person2Icon from "@mui/icons-material/Person2";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: ManageAccountsIcon,
        },
        {
          title: "Blood Requests",
          path: `${role}/requests`,
          icon: BloodtypeIcon,
        },
        {
          title: "My Requests",
          path: `${role}/my-requests`,
          icon: AccessTimeIcon,
        },
        {
          title: "Profile",
          path: `${role}/profile`,
          icon: Person2Icon,
        }
      );
      break;

    case USER_ROLE.USER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Profile",
          path: `${role}/profile`,
          icon: Person2Icon,
        },
        {
          title: "Blood Requests",
          path: `${role}/requests`,
          icon: BloodtypeIcon,
        },
        {
          title: "My Requests",
          path: `${role}/my-requests`,
          icon: AccessTimeIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus];
};

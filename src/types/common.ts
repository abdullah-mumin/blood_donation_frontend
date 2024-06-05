import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export const BloodType = [
  {
    label: "A+",
    value: "A_POSITIVE",
  },
  {
    label: "A-",
    value: "A_NEGATIVE",
  },
  {
    label: "B+",
    value: "B_POSITIVE",
  },
  {
    label: "B-",
    value: "B_NEGATIVE",
  },
  {
    label: "AB+",
    value: "AB_POSITIVE",
  },
  {
    label: "AB-",
    value: "AB_NEGATIVE",
  },
  {
    label: "O+",
    value: "O_POSITIVE",
  },
  {
    label: "O-",
    value: "O_NEGATIVE",
  },
];

export const UserAvailability = [
  {
    label: "Available",
    value: "1",
  },
  {
    label: "Unavailable",
    value: "2",
  },
];

export const UserStatus = [
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },
];

export type UserRole = keyof typeof USER_ROLE;

export const AvailabilityStatus = [
  {
    label: "Available",
    value: 1,
  },
  {
    label: "Unavailable",
    value: 2,
  },
];

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: DrawerItem[];
}

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ResponseSuccessType = {
  data: any;
  meta?: TMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

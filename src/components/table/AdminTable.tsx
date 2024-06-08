"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";
import { MenuItem, Select } from "@mui/material";
import {
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "@/redux/features/user/userApi";
import { useRouter } from "next/navigation";
import { getBloodTypeLabel } from "@/types";

export default function AdminTable({
  data,
  loading,
  refetch,
}: {
  data: any;
  loading: boolean;
  refetch: () => void;
}) {
  // console.log(data);
  const router = useRouter();

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleUserStatusUpdate = async (status: string, info: string) => {
    // console.log({ status, info });
    const toastId = toast.loading("Updating user status ...");
    try {
      const options = {
        id: info,
        data: {
          status: status,
        },
      };
      //   console.log(options);
      const res = await updateUserStatus(options).unwrap();
      // console.log(res);
      if (res?.statusCode === 200) {
        toast.success("User status updated successfully", {
          id: toastId,
          duration: 2000,
        });
        refetch();
        router.refresh();
      }
    } catch (error: any) {
      // console.error(error);
      if (typeof error === "object" && error !== null && "status" in error) {
        const { status, data } = error;
        if (status === 400) {
          const errorMessage = data?.message;
          toast.error(errorMessage, { id: toastId, duration: 2000 });
        }
        if (status === 403) {
          const errorMessage = data?.message;
          toast.error(errorMessage, { id: toastId, duration: 2000 });
        } else {
          toast.error("Something went wrong!", { id: toastId, duration: 2000 });
        }
      } else {
        toast.error("Something went wrong!", { id: toastId, duration: 2000 });
      }
    }
  };

  const handleUserRoleUpdate = async (role: string, info: string) => {
    // console.log({ status, info });
    const toastId = toast.loading("Updating user role ...");
    try {
      const options = {
        id: info,
        data: {
          role: role,
        },
      };
      //   console.log(options);
      const res = await updateUserRole(options).unwrap();
      // console.log(res);
      if (res?.statusCode === 200) {
        toast.success("User role updated successfully", {
          id: toastId,
          duration: 2000,
        });
        refetch();
        router.refresh();
      }
    } catch (error: any) {
      // console.error(error);
      if (typeof error === "object" && error !== null && "status" in error) {
        const { status, data } = error;
        if (status === 400) {
          const errorMessage = data?.message;
          toast.error(errorMessage, { id: toastId, duration: 2000 });
        }
        if (status === 403) {
          const errorMessage = data?.message;
          toast.error(errorMessage, { id: toastId, duration: 2000 });
        } else {
          toast.error("Something went wrong!", { id: toastId, duration: 2000 });
        }
      } else {
        toast.error("Something went wrong!", { id: toastId, duration: 2000 });
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      sortable: false,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Select
          size="small"
          value={params.value}
          onChange={(e) =>
            handleUserStatusUpdate(e.target.value, params?.row?.userId)
          }
        >
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="INACTIVE">Inactive</MenuItem>
          <MenuItem value="BLOCKED">Blocked</MenuItem>
        </Select>
      ),
    },
    {
      field: "donationDate",
      headerName: "Last Donation Date",
      flex: 1,
    },
    {
      field: "available",
      headerName: "Availability",
      flex: 1,
    },
    {
      field: "role",
      headerName: "User Role",
      flex: 1,
      renderCell: (params) => (
        <Select
          size="small"
          value={params.value}
          onChange={(e) =>
            handleUserRoleUpdate(e.target.value, params?.row?.userId)
          }
        >
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="USER">User</MenuItem>
        </Select>
      ),
    },
  ];

  const rows = data?.map((item: any, index: any) => ({
    id: index + 1,
    userId: item?.id,
    name: item?.name,
    email: item?.email,
    location: item?.location,
    status: item?.status,
    bloodType: getBloodTypeLabel(item?.bloodType || ""),
    available: item?.availability === true ? "Available" : "Unavailable",
    donationDate: item?.profile?.lastDonationDate,
    role: item?.profile?.user?.role,
    handleUserStatusUpdate: handleUserStatusUpdate,
    handleUserRoleUpdate: handleUserRoleUpdate,
  }));
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <DataGrid
        rows={rows || []}
        columns={columns}
        hideFooterPagination
        autoHeight
        hideFooter
        loading={loading}
        // pagination={false}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 5 },
        //   },
        // }}
        // pageSizeOptions={[5, 10]}
      />
    </div>
  );
}

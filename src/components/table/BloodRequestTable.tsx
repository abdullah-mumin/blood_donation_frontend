"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getBloodTypeLabel } from "@/app/(withDashboardLayout)/dashboard/user/profile/page";
import { toast } from "sonner";
import { useAcceptBloodRequestMutation } from "@/redux/features/user/requestApi";
import { useRouter } from "next/navigation";
import { MenuItem, Select } from "@mui/material";

export default function BloodRequestTable({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  const router = useRouter();
  //   console.log(data);
  const [acceptBloodRequest] = useAcceptBloodRequestMutation();

  const handleUpdateBloodRequest = async (status: string, info: string) => {
    // console.log({ status, info });
    const toastId = toast.loading("Updating Blood request status ...");
    try {
      const options = {
        id: info,
        data: {
          status: status,
        },
      };
      // console.log(data);
      const res = await acceptBloodRequest(options).unwrap();
      // console.log(res);
      if (res?.statusCode === 200) {
        toast.success("Blood request status updated successfully", {
          id: toastId,
          duration: 2000,
        });
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
    { field: "name", headerName: "Requester", flex: 1 },
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    {
      field: "numberOfBag",
      headerName: "Number Od Bag",
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
            handleUpdateBloodRequest(e.target.value, params?.row?.requestId)
          }
        >
          <MenuItem value="PENDING">Pending</MenuItem>
          <MenuItem value="APPROVED">Approved</MenuItem>
          <MenuItem value="REJECTED">Rejected</MenuItem>
        </Select>
      ),
    },
  ];

  const rows = data?.map((item: any, index: any) => ({
    id: index + 1,
    requestId: item?.id,
    name: item?.requester?.name,
    bloodType: getBloodTypeLabel(item?.bloodType || ""),
    numberOfBag: item?.numberOfBag,
    status: item?.requestStatus,
    handleUpdateBloodRequest: handleUpdateBloodRequest,
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

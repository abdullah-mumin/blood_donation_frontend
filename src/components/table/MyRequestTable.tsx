"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getBloodTypeLabel } from "@/app/(withDashboardLayout)/dashboard/user/profile/page";
import { convertToTitleCase } from "@/utils/convertTitle";

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
  },
  {
    field: "donorName",
    headerName: "Donor Name",
    flex: 1,
  },
  {
    field: "donorLocation",
    headerName: "Donor Location",
    flex: 1,
  },
  {
    field: "donorStatus",
    headerName: "Donor Status",
    flex: 1,
  },
];

export default function MyRequestTable({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  //   console.log(data);

  const rows = data?.map((item: any, index: any) => ({
    id: index + 1,
    name: item?.requester?.name,
    donorName: item?.donor?.name,
    donorLocation: item?.donor?.location,
    donorStatus: convertToTitleCase(item?.donor?.status),
    bloodType: getBloodTypeLabel(item?.bloodType || ""),
    numberOfBag: item?.numberOfBag,
    status: item?.requestStatus,
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

"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getBloodTypeLabel } from "@/app/(withDashboardLayout)/dashboard/user/profile/page";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Donate to User", flex: 1 },
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
];

export default function HistoryTable({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  // console.log(data);

  const rows = data?.map((item: any, index: any) => ({
    id: index + 1,
    name: item?.requester?.name,
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

import { GridColDef } from "@mui/x-data-grid";

export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type SideMenuProps = {
  setAppState: Function;
  setAuth: Function;
};

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 90,
  },
  {
    field: "status",
    headerName: "Status",
    width: 90,
  },
];

export const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "2px solid #000",
  p: 4,
};

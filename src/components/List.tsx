import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { columns, User } from "../types";

const List = () => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    fetch(process.env.REACT_APP_API || "", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <div>
      {users ? (
        <>
          <div
            style={{
              height: 640,
              padding: "1rem 3rem 3rem 3rem",
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "left", padding: "1rem" }}
            >
              Users
            </Typography>
            <DataGrid
              sortingOrder={["asc", "desc"]}
              rows={users}
              columns={columns}
              pageSize={10}
            />
          </div>
        </>
      ) : (
        <div style={{ margin: "1rem" }}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
};

export default List;

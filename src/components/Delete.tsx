import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { boxStyle } from "../types";

const Delete = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    };

    fetch(process.env.REACT_APP_API + data.id, requestOptions).then(
      (response) => {
        if (response.status === 204)
          alert(`Successfully deleted user with ID ${data.id}`);
        else alert(`User with with ID ${data.id} does not exist`);
      }
    );
  };

  return (
    <Box sx={boxStyle}>
      <div style={{ margin: "2rem" }}>
        <Typography variant="h5">Delete User by ID</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="margins">
            <TextField
              label="User ID"
              variant="outlined"
              error={errors.id}
              inputProps={{ maxLength: 10 }}
              {...register("id", { required: true })}
            />
          </div>

          <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#6200EE" }}
          >
            Delete User
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default Delete;

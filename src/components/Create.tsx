import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { boxStyle } from "../types";

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      body: JSON.stringify(data),
    };

    fetch(`${process.env.REACT_APP_API}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        if (resData[0]?.message)
          alert(resData[0].field + " " + resData[0].message);
        else alert(`Successfully created user.`);
      });
  };

  return (
    <Box sx={boxStyle}>
      <div style={{ margin: "2rem" }}>
        <Typography variant="h5">Create New User</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="margins">
            <TextField
              label="Name"
              variant="standard"
              error={errors.name}
              inputProps={{ maxLength: 50 }}
              {...register("name", { required: true })}
            />
          </div>

          <div className="margins">
            <TextField
              label="Email"
              variant="standard"
              error={errors.email}
              inputProps={{ maxLength: 64 }}
              {...register("email", { required: true })}
            />
          </div>

          <div className="margins">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              id="gender-select"
              defaultValue="male"
              {...register("gender", { required: true })}
              style={{ width: "223px" }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </div>

          <div className="margins">
            <InputLabel>Status</InputLabel>
            <Select
              defaultValue="active"
              {...register("status", { required: true })}
              style={{ width: "223px" }}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </div>

          <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#6200EE" }}
          >
            Save
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default Create;

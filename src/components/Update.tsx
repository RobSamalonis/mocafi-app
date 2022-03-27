import { useState } from "react";

import { useForm } from "react-hook-form";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { boxStyle, User } from "../types";

const Update = () => {
  const [user, setUser] = useState<User>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    fetch(`${process.env.REACT_APP_API}${data.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.id) setUser(res);
        else alert(`User with ID ${data.id} does not exist.`);
      });
  };

  const onUpdate = (data: any) => {
    fetch(`${process.env.REACT_APP_API}${user?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200)
        alert(`Successfully updated user with ID ${user?.id}.`);
      else
        alert(`Something went wrong.. user with ID ${user?.id} not updated.`);
    });
  };

  const getSearch = () => {
    return (
      <div>
        <Typography variant="h5">Search User by ID</Typography>
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

          <Button variant="contained" type="submit" className="button">
            Search
          </Button>
        </form>
      </div>
    );
  };

  const getEditUser = () => (
    <>
      <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
        Update User with ID: {user?.id}
      </Typography>
      <form onSubmit={handleSubmit(onUpdate)}>
        <div className="margins">
          <TextField
            label="Name"
            variant="outlined"
            defaultValue={user?.name}
            error={errors.name}
            inputProps={{ maxLength: 50 }}
            {...register("name", { required: true })}
          />
        </div>

        <div className="margins">
          <TextField
            error={errors.email}
            defaultValue={user?.email}
            label="Email"
            variant="outlined"
            inputProps={{ maxLength: 64 }}
            {...register("email", { required: true })}
          />
        </div>

        <div className="margins">
          <InputLabel>Gender</InputLabel>
          <Select
            defaultValue={user?.gender}
            style={{ width: "223px" }}
            {...register("gender", { required: true })}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </div>

        <div className="margins">
          <InputLabel>Status</InputLabel>
          <Select
            defaultValue={user?.status}
            style={{ width: "223px" }}
            {...register("status", { required: true })}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </div>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          component="span"
          sx={{ mr: 1 }}
          onClick={() => setUser(undefined)}
        >
          <ArrowBackIcon /> Back
        </IconButton>
        <Button variant="contained" type="submit" className="button">
          Save
        </Button>
      </form>
    </>
  );

  return (
    <Box sx={boxStyle}>
      <div style={{ margin: "2rem" }}>
        {!user ? getSearch() : getEditUser()}
      </div>
    </Box>
  );
};

export default Update;

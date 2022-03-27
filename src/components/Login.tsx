import { useState } from "react";

import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { boxStyle } from "../types";

const Login = (props: any) => {
  const { setAuth } = props;
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (data.password === process.env.REACT_APP_PASSWORD) setAuth(true);
    else setFailed(true);
  };

  return (
    <Box sx={boxStyle}>
      <Typography variant="h5">
        Login to <b>MoCaFi</b>
      </Typography>
      <Typography variant="h5">Take Home App</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="margins">
          {failed && (
            <div style={{ color: "red", margin: "1rem" }}>
              Incorrect password, please try again.
            </div>
          )}
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            error={errors.password || failed}
            {...register("password", { required: true })}
          />
        </div>

        <Button variant="contained" type="submit" className="button">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;

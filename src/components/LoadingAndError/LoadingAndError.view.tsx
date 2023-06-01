import { loadingAndErrorType } from "../../types";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingAndError = (props: loadingAndErrorType) => {
  const { error, children, loading, page , componentName = "none"} = props;

  if (page > 1) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant={componentName === "tiles" ? "h6" : "h1"} component="h2" color={"red"}>
        Ops Something Went Wrong
      </Typography>
    );
  }
  return <>{children}</>;
};

export default LoadingAndError;

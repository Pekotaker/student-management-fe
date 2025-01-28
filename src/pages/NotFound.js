import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function NotFound() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        404 Not Found
      </Typography>
      <Typography>The page you requested does not exist.</Typography>
    </Container>
  );
}

export default NotFound;

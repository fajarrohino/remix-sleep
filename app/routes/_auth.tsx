import { Box } from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";

export default function auth() {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

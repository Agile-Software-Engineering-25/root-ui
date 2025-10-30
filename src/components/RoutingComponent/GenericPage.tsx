import { Box, Typography } from "@mui/joy";
import React from "react";
import EmbeddedApplication from "../EmbeddedApplication/EmbeddedApplication";

type GenericPageProps = {
  title?: string;
  subtitle?: string;
  embedName?: string;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
};

const GenericPage = ({
  title,
  subtitle,
  embedName,
  children,
  sx,
}: GenericPageProps) => {
  // If an embedded application name is provided, render that application container.
  if (embedName) {
    return <EmbeddedApplication name={embedName} sx={{ flexGrow: 1, ...sx }} />;
  }

  // If children were passed, render them inside a flexible container.
  if (children) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          ...sx,
        }}
      >
        {children}
      </Box>
    );
  }

  // Default: render a simple centered title/subtitle view.
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      {title && (
        <Typography level={"title-md"} fontSize={"64px"} component={"h1"}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography level={"title-md"} fontSize={"32px"} component={"h2"}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default GenericPage;

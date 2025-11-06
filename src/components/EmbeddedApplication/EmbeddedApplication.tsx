import { Box } from "@mui/joy";
import React from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent.tsx";

const EmbeddedApplication = (props: {
    name: string;
    sx?: React.CSSProperties;
    placeholder?: React.ReactNode;
}) => {
    return (
        <Box
            style={{
                ...props.sx,
            }}
            id={`single-spa-application:${props.name}`}
        >
            {props.placeholder ? props.placeholder :
                <LoadingComponent />
            }
        </Box>
    );
};

export default EmbeddedApplication;

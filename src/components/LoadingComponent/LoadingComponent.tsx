import { Box, CircularProgress, Typography } from "@mui/joy";

const LoadingComponent = (props: { sx?: React.CSSProperties, hideLabel?: boolean, progressSize?: "sm" | "md" | "lg" }) => {
    return <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            ...props.sx
        }}>
        <CircularProgress size={props.progressSize ?? "lg"} />
        {!props.hideLabel &&
            <Typography color={"neutral"}>Application Loading</Typography>
        }
    </Box>
}

export default LoadingComponent;
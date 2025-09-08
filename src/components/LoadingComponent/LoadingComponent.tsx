import {Box, CircularProgress, Typography} from "@mui/joy";

const LoadingComponent = () => {
    return <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }}>
        <CircularProgress size="lg"/>
        <Typography color={"neutral"}>Application Loading</Typography>
    </Box>
}

export default LoadingComponent;
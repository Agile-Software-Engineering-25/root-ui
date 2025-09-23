import {Box} from "@mui/joy";
import LoadingComponent from "../LoadingComponent/LoadingComponent.tsx";

const EmbeddedApplication = (props: {
    name: string;
    sx: React.CSSProperties;
}) => {
    return (
        <Box
            style={{
                ...props.sx,
            }}
            id={`single-spa-application:${props.name}`}
        >
            <LoadingComponent/>
        </Box>
    );
};

export default EmbeddedApplication;

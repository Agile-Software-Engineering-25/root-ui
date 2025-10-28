import EmbeddedApplication from "../../components/EmbeddedApplication/EmbeddedApplication.tsx";
import useUser from "../../hooks/useUser.ts";

const ExamPage = () => {
    const user = useUser();
    return (
        <>
            <EmbeddedApplication
                name="@agile-software-engineering/ase-13-student-service"
                sx={{ flexGrow: 1, display: user.hasRole("student") ? "block" : "none" }}
            />
            <EmbeddedApplication
                name="@agile-software-engineering/ase-12-lecturer-service"
                sx={{ flexGrow: 1, display: user.hasRole("lecturer") ? "block" : "none" }}
            />
            <EmbeddedApplication
                name="@agile-software-engineering/ase-14-examination-service"
                sx={{ flexGrow: 1, display: user.hasRole("university-administrative-staff") || user.hasRole("sau-admin") ? "block" : "none" }}
            />
        </>
    );
};

export default ExamPage;

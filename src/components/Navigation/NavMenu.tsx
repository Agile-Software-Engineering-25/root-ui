import { Modal } from "@agile-software/shared-components";
import { Person } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/joy";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-context";
import useUser from "../../hooks/useUser";
import EmbeddedApplication from "../EmbeddedApplication/EmbeddedApplication";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

type User = ReturnType<typeof useUser>;

const userCreds = [
  { name: "user.cred.userId", func: (user: User) => user.getUserId() },
  { name: "user.cred.name", func: (user: User) => user.getFullName() },
  { name: "user.cred.email", func: (user: User) => user.getEmail() },
];

export default function NavMenu() {
  const auth = useAuth();
  const user = useUser();
  const [openUserModal, setOpenUserModal] = useState(false);
  const { t } = useTranslation();

  const logout = () => {
    auth.signoutRedirect().catch((e) => {
      console.error(e);
      enqueueSnackbar(t("snackbar.logoutError"), {
        variant: "error",
      });
    });
  };

  const copyToken = () => {
    const token = user.getAccessToken();
    if (token) {
      navigator.clipboard
        .writeText(token)
        .then(() =>
          enqueueSnackbar(t("snackbar.tokenCopied"), { variant: "success" })
        )
        .catch((e) => console.error(e));
    }
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: { sm: 1, md: 2, lg: 3 },
      }}
    >
      <LanguageToggle />
      {/* Notice bell modal */}
      <EmbeddedApplication
        name="@agile-software-engineering/ase-15-notification-service"
        placeholder={
          <LoadingComponent
            sx={{
              width: "40px",
              height: "40px",
            }}
            progressSize="sm"
            hideLabel
          />
        }
      />

      {/* User data and logout modal */}
      <IconButton
        onClick={() => setOpenUserModal(true)}
        key={"logout-button"}
        color={"primary"}
        variant={"plain"}
      >
        <Person />
      </IconButton>
      <Modal
        header={t("user.info.header")}
        open={openUserModal}
        setOpen={setOpenUserModal}
        disableEscape={false}
        modalSX={{
          zIndex: 9999999,
        }}
      >
        <Stack spacing={1} sx={{ marginBottom: 2 }}>
          {userCreds.map((cred, idx) => (
            <Stack key={`cred-${idx}`} direction="row" spacing={1}>
              <span style={{ fontWeight: "bold", minWidth: "80px" }}>
                {t(cred.name)}:
              </span>
              <span>{cred.func(user)}</span>
            </Stack>
          ))}
        </Stack>
        <Stack direction={"row"} gap={2}>
          <Button onClick={logout}>{t("button.logout")}</Button>
          <Button onClick={copyToken} variant="outlined">
            {t("button.copyToken")}
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}

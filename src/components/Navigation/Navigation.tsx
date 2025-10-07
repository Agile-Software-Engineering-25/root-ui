import { useState } from "react";
import { Stack } from "@mui/joy";
import NavBar from "../NavBar/NavBar.tsx";
import SubNav from "../SubNav/SubNav.tsx";

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <Stack width="100%">
      <NavBar setActiveMenu={setActiveMenu} />
      <SubNav activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    </Stack>
  );
};

export default Navigation;

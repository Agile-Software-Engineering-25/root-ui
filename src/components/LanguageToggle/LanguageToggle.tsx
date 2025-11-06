import LanguageIcon from "@mui/icons-material/Language";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../i18n";

const languages = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
];

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const setLanguage = (language: string) => {
    changeLanguage(language);
  };

  return (
    <Dropdown>
      <MenuButton color="primary" variant="plain">
        <LanguageIcon />
      </MenuButton>
      <Menu>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            selected={i18n.language === lang.code}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default LanguageToggle;

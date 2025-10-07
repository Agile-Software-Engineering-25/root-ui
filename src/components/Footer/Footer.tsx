import { Box, Stack, Typography, Link as JoyLink, IconButton } from "@mui/joy";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";
import provadisIcon from "@assets/provadis_logo.png";

const companyLinks = ["ABOUT US", "BLOG", "PARTNERSHIPS", "CAREERS", "PRESS", "IMPRESSUM"];
const resourceLinks = ["APPLICATION", "SYSTEMS", "FAQ"];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#002E6D",
        px: 6,
        py: 6,
        mt: "auto",
      }}
    >
      {/* Hauptbereich */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ maxWidth: "1200px", mx: "auto", width: "100%" }}
      >
        {/* Logo */}
        <Stack spacing={2}>
          <img src={provadisIcon} alt="Provadis Logo" style={{ height: 30 }} />
        </Stack>

        {/* Company */}
        <Stack spacing={2}>
          <Typography level="body-sm" fontWeight="lg" sx={{ color: "white" }}>
            COMPANY
          </Typography>
          <Stack spacing={1.2}>
            {companyLinks.map((link) => (
              <JoyLink
                key={link}
                level="body-sm"
                underline="none"
                sx={{
                  color: "white",
                  "&:hover": { color: "primary.300" },
                }}
                href="#"
              >
                {link}
              </JoyLink>
            ))}
          </Stack>
        </Stack>

        {/* Resources */}
        <Stack spacing={2}>
          <Typography level="body-sm" fontWeight="lg" sx={{ color: "white" }}>
            RESOURCES
          </Typography>
          <Stack spacing={1.2}>
            {resourceLinks.map((link) => (
              <JoyLink
                key={link}
                level="body-sm"
                underline="none"
                sx={{
                  color: "white",
                  "&:hover": { color: "primary.300" },
                }}
                href="#"
              >
                {link}
              </JoyLink>
            ))}
          </Stack>
        </Stack>

        {/* Contact */}
        <Stack spacing={2} maxWidth={300}>
          <Typography level="body-sm" fontWeight="lg" sx={{ color: "white" }}>
            CONTACT
          </Typography>
          <Stack spacing={1.2}>
            {[
              "Provadis School of International",
              "Management and Technology AG",
              "Industriepark Höchst, Gebäude B845",
              "65926 Frankfurt am Main",
              "Telefon: +49 69 395-81051",
              "E-Mail: Info@provadis-hochschule.de",
            ].map((line, idx) => (
              <Typography key={idx} level="body-sm" sx={{ color: "white" }}>
                {line}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Stack>

      {/* Divider */}
      <Box
        sx={{
          borderTop: "1px solid white",
          mt: 4,
          pt: 2,
          mx: "2",
        }}
      />

      {/* Social Media */}
      <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
        <IconButton variant="plain" sx={{ color: "white" }}>
          <Facebook />
        </IconButton>
        <IconButton variant="plain" sx={{ color: "white" }}>
          <Twitter />
        </IconButton>
        <IconButton variant="plain" sx={{ color: "white" }}>
          <LinkedIn />
        </IconButton>
        <IconButton variant="plain" sx={{color: "white"}}>
          <Instagram />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;

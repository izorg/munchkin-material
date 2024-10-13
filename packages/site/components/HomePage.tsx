import { mdiApple, mdiGooglePlay, mdiMicrosoftWindows } from "@mdi/js";
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

import { getServerIntl, type Language, localeByLanguage } from "../lib/i18n";

import { StoreButton } from "./StoreButton";

type HomePageProps = {
  language: Language;
};

export const HomePage = async (props: HomePageProps) => {
  const { language } = props;

  const intl = await getServerIntl(localeByLanguage[language]);

  const { locale } = intl;

  return (
    <>
      <title>
        {intl.formatMessage({
          defaultMessage: "Level Counter",
          id: "e5KeUK",
        })}
      </title>
      <Container component={Stack} spacing={8}>
        <AppBar color="transparent" elevation={0} position="static">
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Button
              color="inherit"
              component={NextLink}
              disabled={language === "en"}
              href="/en"
              size="small"
            >
              EN
            </Button>
            <Button
              color="inherit"
              component={NextLink}
              disabled={locale === "ru"}
              href="/ru"
              size="small"
            >
              RU
            </Button>
          </Toolbar>
        </AppBar>
        <Stack component="main" spacing={4}>
          <div>
            <Typography
              align="center"
              gutterBottom
              sx={{
                fontFamily: "var(--munchkin-font)",
              }}
              variant="h1"
            >
              {intl.formatMessage({
                defaultMessage: "Level Counter",
                id: "e5KeUK",
              })}
            </Typography>
            <Typography align="center" gutterBottom>
              {intl.formatMessage({
                defaultMessage:
                  "Simple but powerful level counter for Munchkin",
                id: "m9AxN5",
              })}
            </Typography>
          </div>

          <Box sx={{ textAlign: "center" }}>
            <Button
              color="primary"
              href="https://web.allmunchkins.com"
              sx={{
                minWidth: 120,
              }}
              variant="contained"
            >
              {intl.formatMessage({
                defaultMessage: "Try",
                id: "6lbvZe",
              })}
            </Button>
          </Box>

          <Stack
            direction={{
              md: "row",
              xs: "column",
            }}
            spacing={4}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StoreButton
              href="https://play.google.com/store/apps/details?id=com.izorg.munchkin"
              startIcon={
                <SvgIcon>
                  <path d={mdiGooglePlay} />
                </SvgIcon>
              }
            >
              Google Play
            </StoreButton>
            <StoreButton
              href="https://itunes.apple.com/us/app/level-counter-for-munchkin/id1448937097?mt=8"
              startIcon={
                <SvgIcon sx={{ marginTop: "-4px" }}>
                  <path d={mdiApple} />
                </SvgIcon>
              }
            >
              App Store
            </StoreButton>
            <StoreButton
              href="https://apps.microsoft.com/detail/9pdvk4cf6nmf"
              startIcon={
                <SvgIcon sx={{ marginTop: "-2px" }}>
                  <path d={mdiMicrosoftWindows} />
                </SvgIcon>
              }
            >
              Windows
            </StoreButton>
          </Stack>
        </Stack>

        <Box
          component="footer"
          sx={{
            textAlign: "center",
          }}
        >
          <Link component={NextLink} href="/privacy" underline="always">
            {intl.formatMessage({
              defaultMessage: "Privacy Policy",
              id: "vx0nkZ",
            })}
          </Link>
        </Box>
      </Container>
    </>
  );
};

import { defineMessages } from "@formatjs/intl";
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

// eslint-disable-next-line formatjs/enforce-id
const messages = defineMessages({
  description: {
    defaultMessage: "Simple but powerful level counter for Munchkin",
    id: "home.description",
  },

  privacy: {
    defaultMessage: "Privacy Policy",
    id: "home.privacy",
  },

  title: {
    defaultMessage: "Level Counter",
    id: "home.title",
  },

  try: {
    defaultMessage: "Try",
    id: "home.try",
  },
});

type HomePageProps = {
  language: Language;
};

export const HomePage = async (props: HomePageProps) => {
  const { language } = props;

  const intl = await getServerIntl(localeByLanguage[language]);

  const { locale } = intl;

  return (
    <>
      <title>{intl.formatMessage(messages.title)}</title>
      <Container>
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
        <Typography
          align="center"
          gutterBottom
          sx={{
            fontFamily: "var(--munchkin-font)",
          }}
          variant="h1"
        >
          {intl.formatMessage(messages.title)}
        </Typography>
        <Typography align="center" gutterBottom>
          {intl.formatMessage(messages.description)}
        </Typography>

        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Button
            color="primary"
            href="https://web.allmunchkins.com"
            sx={{
              minWidth: 120,
            }}
            variant="contained"
          >
            {intl.formatMessage(messages.try)}
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
            marginTop: 4,
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

        <Box
          sx={{
            marginTop: 6,
            textAlign: "center",
          }}
        >
          <Link component={NextLink} href="/privacy" underline="always">
            {intl.formatMessage(messages.privacy)}
          </Link>
        </Box>
      </Container>
    </>
  );
};

"use client";

import { mdiApple, mdiGooglePlay, mdiMicrosoftWindows } from "@mdi/js";
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  SvgIcon,
  type Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import type { Language } from "../lib/i18n";

import { StoreButton } from "./StoreButton";

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

type ParamsProps = { language: Language };

export const Home = () => {
  const intl = useIntl();
  const { language } = useParams<ParamsProps>();

  const { locale } = intl;

  return (
    <Container>
      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            color="inherit"
            component={NextLink}
            href="/en"
            disabled={language === "en"}
            size="small"
          >
            EN
          </Button>
          <Button
            color="inherit"
            component={NextLink} // eslint-disable-line @typescript-eslint/no-unsafe-assignment
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
        // className={munchkinFont.className}
        gutterBottom
        sx={{
          fontFamily: (theme: Theme) =>
            `var(--munchkin-font), ${theme.typography.fontFamily || ""}`,
        }}
        variant="h1"
      >
        <FormattedMessage {...messages.title} />
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
            <SvgIcon style={{ marginTop: -4 }}>
              <path d={mdiApple} />
            </SvgIcon>
          }
        >
          App Store
        </StoreButton>
        <StoreButton
          href="https://www.microsoft.com/store/apps/9PDVK4CF6NMF"
          startIcon={
            <SvgIcon style={{ marginTop: -2 }}>
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
        <Link
          component={NextLink} // eslint-disable-line @typescript-eslint/no-unsafe-assignment
          href="/packages/site/components/PrivacyPolicy"
          underline="always"
        >
          {intl.formatMessage(messages.privacy)}
        </Link>
      </Box>
    </Container>
  );
};

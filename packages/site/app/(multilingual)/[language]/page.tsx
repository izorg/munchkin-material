import { defineMessages } from "@formatjs/intl";
import { mdiApple, mdiGooglePlay, mdiMicrosoftWindows } from "@mdi/js";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import NextLink from "next/link";

import { StoreButton } from "../../../components/StoreButton";
import { getServerIntl, localeByLanguage } from "../../../lib/i18n";
import type { Language } from "../../../lib/i18n";
import * as languages from "../../../lib/languages";

export const generateStaticParams = () =>
  Object.values(languages).map((language) => ({
    language,
  }));

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

type Params = { language: Language };

type MetadataProps = {
  params: Params;
};

export const generateMetadata = async ({
  params,
}: MetadataProps): Promise<Metadata> => {
  const { language } = params;

  const intl = await getServerIntl(localeByLanguage[language]);

  return {
    title: intl.formatMessage({
      id: "home.title",
    }),
  };
};

type PageProps = {
  params: Params;
};

const Page = async (props: PageProps) => {
  const { params } = props;
  const { language } = params;

  const intl = await getServerIntl(localeByLanguage[language]);

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
          href="https://www.microsoft.com/store/apps/9PDVK4CF6NMF"
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
  );
};

export default Page;

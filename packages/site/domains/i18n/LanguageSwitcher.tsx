"use client";

import { mdiWeb } from "@mdi/js";
import { IconButton, Menu, MenuItem, SvgIcon, Tooltip } from "@mui/material";
import { type Route } from "next";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { type MouseEvent, useState } from "react";
import { useIntl } from "react-intl";

import { LANGUAGE } from "./constants";

const LANGUAGE_SWITCHER = "language-switcher";
const LANGUAGE_SWITCHER_MENU = "language-switcher-menu";

const languages: [language: LANGUAGE, value: string][] = [
  [LANGUAGE.DE, "Deutsch"],
  [LANGUAGE.EN, "English"],
  [LANGUAGE.RU, "Русский"],
];

export const LanguageSwitcher = () => {
  const intl = useIntl();
  const params = useParams<{
    language: LANGUAGE;
  }>();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const open = Boolean(anchorEl);

  const onClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip
        title={intl.formatMessage({
          defaultMessage: "Choose language",
          id: "uIgWIr",
        })}
      >
        <IconButton
          aria-controls={open ? LANGUAGE_SWITCHER_MENU : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          color="inherit"
          id={LANGUAGE_SWITCHER}
          onClick={onClick}
        >
          <SvgIcon>
            <path d={mdiWeb} />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        id={LANGUAGE_SWITCHER_MENU}
        MenuListProps={{
          "aria-labelledby": LANGUAGE_SWITCHER,
          component: "div",
        }}
        onClose={onClose}
        open={open}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        {languages.map(([language, value]) => (
          <MenuItem<typeof NextLink>
            component={NextLink}
            href={`/${language}` as Route}
            key={language}
            selected={language === params.language}
          >
            {value}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router";

import levelLimitMessages from "../../messages/levelLimit";
import { useGoBack } from "../../utils/location";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";

import { LevelLimitForm } from "./LevelLimitForm";

const formId = "level-limit-form";

const LevelLimitDialog = () => {
  const intl = useIntl();
  const [searchParams] = useSearchParams();

  const open = searchParams.get("levelLimit") !== null;

  const goBack = useGoBack();

  return (
    <Dialog onClose={goBack} open={open}>
      <DialogTitle>{intl.formatMessage(levelLimitMessages.label)}</DialogTitle>
      <DialogContent>
        <LevelLimitForm id={formId} onSubmit={goBack} />
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={goBack} />
        <SubmitButton form={formId} />
      </DialogActions>
    </Dialog>
  );
};

export default LevelLimitDialog;

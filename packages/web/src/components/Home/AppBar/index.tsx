import { mdiClose, mdiFlagCheckered, mdiTrashCanOutline } from "@mdi/js";
import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import { type FC, type ReactElement, type ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import { setCombatPlayerBonus } from "../../../ducks/combat/actions";
import useDeletePlayers from "../../../hooks/useDeletePlayers";
import useEditMode from "../../../hooks/useEditMode";
import useMultiMode from "../../../hooks/useMultiMode";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";
import { useGoBack } from "../../../utils/location";
import DiceButton from "../../DiceButton";
import SettingsIconButton from "../../SettingsIconButton";
import Title from "../../Title";
import TopAppBar from "../../TopAppBar";
import TopIconButton from "../../TopIconButton";

import EditButton from "./EditButton";
import ResetButton from "./ResetButton";
import ShuffleButton from "./ShuffleButton";

type HomeAppBarProps = {
  empty: boolean;
  singleMode: boolean;
};

const HomeAppBar: FC<HomeAppBarProps> = (props) => {
  const { empty, singleMode } = props;
  const dispatch = useAppDispatch();

  const deletePlayers = useDeletePlayers();
  const goBack = useGoBack();

  const { editMode } = useEditMode();
  const { multiMode } = useMultiMode();

  const selectedPlayerIds = usePresentSelector(
    (state) => state.ui.selectedPlayerIds,
  );

  let title: ReactNode = (
    // eslint-disable-next-line formatjs/enforce-id
    <FormattedMessage defaultMessage="Munchkins" id="player.list.title" />
  );

  if (multiMode) {
    title = selectedPlayerIds.length;
  }

  if (singleMode) {
    title = (
      // eslint-disable-next-line formatjs/enforce-id
      <FormattedMessage defaultMessage="Munchkin" id="home.single.title" />
    );
  }

  let buttons = [
    !empty && <ResetButton key="reset" />,
    !empty && <EditButton key="edit" />,
    <DiceButton key="dice" />,
    <SettingsIconButton edge="end" key="settings" />,
  ].filter((item): item is ReactElement => item !== false);

  if (editMode) {
    buttons = [
      <ShuffleButton key="shuffle" />,
      <EditButton edge="end" key="save" />,
    ];
  }

  if (multiMode) {
    buttons = [
      <TopIconButton
        edge="end"
        key="delete"
        onClick={() => {
          deletePlayers(selectedPlayerIds);
          goBack();
        }}
      >
        <SvgIcon>
          <path d={mdiTrashCanOutline} />
        </SvgIcon>
      </TopIconButton>,
    ];
  }

  if (singleMode) {
    buttons = [
      <ResetButton key="reset" />,
      <TopIconButton
        key="finish"
        onClick={() => dispatch(setCombatPlayerBonus(0))}
      >
        <SvgIcon>
          <path d={mdiFlagCheckered} />
        </SvgIcon>
      </TopIconButton>,
      <DiceButton key="dice" />,
      <SettingsIconButton edge="end" key="settings" />,
    ];
  }

  return (
    <TopAppBar>
      {multiMode && (
        <TopIconButton edge="start" onClick={goBack}>
          <SvgIcon>
            <path d={mdiClose} />
          </SvgIcon>
        </TopIconButton>
      )}

      <Title sx={[!multiMode && { paddingLeft: { xs: 0 } }]}>{title}</Title>

      {buttons}
    </TopAppBar>
  );
};

HomeAppBar.propTypes = {
  empty: PropTypes.bool.isRequired,
  singleMode: PropTypes.bool.isRequired,
};

export default HomeAppBar;

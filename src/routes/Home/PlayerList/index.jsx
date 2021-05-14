import { List, Paper } from "@material-ui/core";
import { motion } from "framer-motion";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import { useLocationQuery } from "../../../utils/location";
import usePresentSelector from "../../../utils/usePresentSelector";
import { EDIT } from "../modes";

import Item from "./Item";

const HomePlayerList = (props) => {
  const query = useLocationQuery();
  const playerList = usePresentSelector((state) => state.playerList);

  const [items, setItems] = useState(playerList.map((id) => ({ id })));

  if (query[EDIT] !== undefined) {
    return (
      <ReactSortable
        handle=".handle"
        list={items}
        setList={setItems}
        tag={List}
      >
        {items.map(({ id: playerId }) => (
          <Item
            key={playerId}
            ContainerComponent={Paper}
            ContainerProps={{
              component: motion.li,
              square: true,
            }}
            playerId={playerId}
          />
        ))}
      </ReactSortable>
    );
  }

  return (
    <List disablePadding {...props}>
      {playerList.map((playerId) => (
        <Item key={playerId} playerId={playerId} />
      ))}
    </List>
  );
};

export default HomePlayerList;

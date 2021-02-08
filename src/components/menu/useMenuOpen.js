import { useLocationQuery } from "../../utils/location";

const useMenuOpen = () => useLocationQuery().menu === null;

export default useMenuOpen;

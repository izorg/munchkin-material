import { useLocationQuery } from "../../utils/location";

const useMenuOpen = (): boolean => useLocationQuery().menu === null;

export default useMenuOpen;

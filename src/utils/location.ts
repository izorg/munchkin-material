import { useNavigate } from "react-router-dom";

export const useGoBack = () => {
  const navigate = useNavigate();

  return () => navigate(-1);
};

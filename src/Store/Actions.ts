import { selectedMethod } from "./Reducers";
export const addSelectedCripto = (payload: selectedMethod) => {
  return {
    type: "addSelectedCripto",
    payload,
  };
};
export const addSelectedPromo = (payload: selectedMethod) => {
  return {
    type: "addSelectedPromo",
    payload,
  };
};

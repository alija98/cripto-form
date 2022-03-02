// export interface singleSelectInterface {
//   name: string;
//   value?: number;
// }
// interface initialStateInterface {
//   cripto: singleSelectInterface[];
//   promo: singleSelectInterface[];
// }

// const initalState: initialStateInterface = {
//   cripto: [{ name: "", value: 1 }],
//   promo: [{ name: "" }],
// };

export interface selectedMethod {
  name: string;
  icon: string;
  value?: number;
}
const initalState = {
  paymentMethod: {
    name: "Cripto currency",
    icon: "currency_bitcoin",
  },
  cripto: {
    name: "",
    icon: "",
    value: 1,
  },
  promo: {
    name: "",
    icon: "",
  },
};

const criptoPaymentReducer = (state = initalState, action: any) => {
  switch (action.type) {
    case "addSelectedCripto":
      return { ...state, cripto: action.payload };
    case "addSelectedPromo":
      return { ...state, promo: action.payload };
    default:
      return state;
  }
};

export default criptoPaymentReducer;

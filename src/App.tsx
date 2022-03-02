import React from "react";
import { Stepper } from "./Stepper/Stepper";
import CriptoPaymentStep from "./CriptoPaymentStep/CriptoPaymentStep";
import "./App.css";

// this isn't part of this task, let say that this is price of item in USD
const price = 100;

function App() {
  return (
    <div className="wrapper">
      <Stepper
        price={price}
        steps={[
          {
            data: {
              title: "Select your crypto currency",
              id: "1",
            },
            element: (stepProps) => <CriptoPaymentStep {...stepProps} />,
            type: "FORM",
          },
          {
            data: {
              title: "Select promo",
              id: "2",
            },
            element: (stepProps) => <CriptoPaymentStep {...stepProps} />,
            type: "FORM",
          },
          {
            element: (stepProps) => <CriptoPaymentStep {...stepProps} />,
            type: "FORM",
            data: {
              title: "Send your payment to",
              id: "3",
            },
          },
          {
            element: (stepProps) => <CriptoPaymentStep {...stepProps} />,
            type: "TRANSACTION",
            data: {
              id: "4",
              title: "",
            },
          },
        ]}
      />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

import { StepProps } from "../Stepper/Stepper";
import SingleSelect from "../SingleSelect/SingleSelect";
import "./CriptoPaymentStep.css";
import { addSelectedCripto, addSelectedPromo } from "../Store/Actions";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import PreviousSteps from "../PreviousSteps/PreviousSteps";

export type singleSelectType = "CRIPTO" | "PROMO";
export interface singleSelectData {
  name: string;
  value?: number;
  icon: string;
}

const CriptoPaymentStep: React.FC<StepProps> = ({
  goNextStep,
  isLast,
  step,
  data,
  currentStep,
  price,
  goToStep,
  type,
}) => {
  const selectedOption = useAppSelector((state) => state?.cripto);
  const selectedOptions = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [criptoData, setCriptoData] = useState<singleSelectData[]>([
    { name: "", value: 1, icon: "" },
  ]);
  const [promoData, setPromoData] = useState<singleSelectData[]>([
    { name: "", icon: "" },
  ]);
  const [paymentAddress, setPaymentAddress] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({
    state: "",
    id: "",
    error: null,
  });

  const totalValue = selectedOption.value && selectedOption.value * price;

  const postSelectedOptions = () => {
    //If I have api, i would make api post call here with selected Options as a body Data
    //If api call was successful, I would got payment address from it
    //Here i am mocking like i got payment address
    setPaymentAddress("0xa81fsdjka7fds2231kx09766");
  };
  const confirmTransaction = () => {
    //Here I would make api call and get transactionID, If  have error i would show some error, here I dont do it
    setPaymentStatus((prev) => {
      return {
        ...prev,
        state: "proccessing",
        id: "321423543543h543j5h4jhko23jo423j4o32dd",
      };
    });
  };
  const isPaymentSuccessfull = () => {
    //here if I got data that transaction is successfull I would show success message, or with error, error message
    setPaymentStatus((prev) => {
      return {
        ...prev,
        state: "successfull",
        id: "321423543543h543j5h4jhko23jo423j4o32dd",
      };
    });
  };
  const getCriptoData = () => {
    fetch("./criptoData.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCriptoData(data);
        dispatch(addSelectedCripto(data[0]));
      });
  };
  const getPromoData = () => {
    fetch("./promoData.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPromoData(data);
        dispatch(addSelectedPromo(data[0]));
      });
  };

  useEffect(() => {
    copySuccess &&
      setTimeout(() => {
        setCopySuccess(false);
      }, 1500);
  }, [copySuccess]);

  useEffect(() => {
    data?.id === "1" && getCriptoData();
    data?.id === "2" && getPromoData();
    data?.id === "3" && postSelectedOptions();
    data?.id === "4" && confirmTransaction();
  }, []);

  return (
    <div className="step">
      <div className="step-left">
        <div className="title-description">
          <h4 style={{ paddingBottom: "20px" }}>Pay with Crypto</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        {type === "FORM" && (
          <>
            <PreviousSteps
              currentStep={currentStep}
              goToStep={goToStep}
            ></PreviousSteps>
            <div
              className="total-select-container"
              style={{
                flexDirection: currentStep === 1 ? "column" : "column-reverse",
              }}
            >
              {currentStep <= 2 && (
                <SingleSelect
                  data={currentStep === 1 ? criptoData : promoData}
                  title={
                    currentStep === 1
                      ? "Select your crypto currency"
                      : "Select promo"
                  }
                  type={currentStep === 1 ? "CRIPTO" : "PROMO"}
                />
              )}

              {currentStep === 3 && (
                <div>
                  <div className="payment-address">
                    <input readOnly={true} value={paymentAddress}></input>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paymentAddress);
                        setCopySuccess(true);
                      }}
                    >
                      COPY
                    </button>
                  </div>
                  {copySuccess && (
                    <span style={{ fontSize: "14px" }}>
                      You successfully copied to clipboard
                    </span>
                  )}
                </div>
              )}
              {selectedOption && (
                <div className="total-wrapper">
                  <h4 style={{ paddingBottom: "20px", color: "#3F4048" }}>
                    Total
                  </h4>
                  <div>
                    <h4 style={{ color: "#53545a" }}>
                      {selectedOption.name} {totalValue.toFixed(5)}
                    </h4>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {type === "TRANSACTION" && (
          <>
            <div className="transaction-wrappper">
              <div>
                <span className="material-icons blue">
                  {paymentStatus.state === "proccessing" ? "refresh" : "done"}
                </span>
                {
                  <>
                    {paymentStatus.state === "proccessing" && (
                      <>
                        <h2>Transaction pending</h2>
                        <span>Transaction ID</span>
                        <p className="transaction-id">{paymentStatus.id}</p>
                        <span>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod...
                        </span>
                      </>
                    )}
                    {paymentStatus.state === "successfull" && (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <h2>Payment Successfull</h2>
                        <p>
                          Nullam placerat erat volutpat mollis congue. Nunc
                          felis libero, interdum eu purus eget, posuere
                          porttitor nisi. Suspendisse potenti. Etiam ut lectus
                          augue.
                        </p>
                        <button
                          className="refresh"
                          onClick={() => {
                            //does nothing here
                          }}
                        >
                          HOME
                        </button>
                      </div>
                    )}
                  </>
                }
              </div>
            </div>
            {paymentStatus.state === "proccessing" && (
              <button
                onClick={() => {
                  isPaymentSuccessfull();
                }}
                className="refresh"
              >
                <span className="material-icons">refresh</span>REFRESH
              </button>
            )}
          </>
        )}
        {type === "FORM" && (
          <div className="step-actions">
            <button
              className="step-button"
              disabled={isLast}
              onClick={async () => {
                goNextStep();
              }}
            >
              GO NEXT
            </button>
          </div>
        )}
      </div>
      <div className="step-right">
        <div className="text">
          <h4 style={{ paddingBottom: "30px" }}>
            Easy, fast and secure payments
          </h4>
          <p style={{ fontSize: "14px" }}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="logo">
          <p>Powered by</p>
          <img
            style={{ marginTop: "15px" }}
            src={require("../assets/logo.png")}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default CriptoPaymentStep;

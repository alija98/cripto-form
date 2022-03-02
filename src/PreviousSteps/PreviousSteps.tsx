import React from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import "./PreviousSteps.css";
import { selectedMethod } from "../Store/Reducers";
interface PreviousStepProps {
  currentStep: number;
  goToStep: (step: number) => void;
}

const PreviousSteps: React.FC<PreviousStepProps> = ({
  currentStep,
  goToStep,
}) => {
  const selectedMethods = useAppSelector((state) => state);

  const objectToArray = (obj: any) => {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  };

  return (
    <div className="previous-steps-wrapper">
      {objectToArray(selectedMethods).map((item: any, index) => {
        return (
          <React.Fragment key={index}>
            {currentStep > index && (
              <div className="singlePrevious">
                <div className="single-left">
                  <div className="icon">
                    <span className="material-icons md-light md-inactive white">
                      {item.icon.length === 0 ? "done" : item.icon}
                    </span>
                  </div>
                  <h4>{item.name}</h4>
                </div>
                <div onClick={() => goToStep(index === 0 ? 1 : index)}>
                  <span style={{ color: "blue", fontSize: "14px" }}>
                    Change
                  </span>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PreviousSteps;

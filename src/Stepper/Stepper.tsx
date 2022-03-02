import React, { useState, useRef, useEffect } from "react";
import "./Stepper.css";

type PaymentStepType = "FORM" | "TRANSACTION";

interface StepperProps {
  steps: Step[];
  price: number;
}

interface Step {
  data?: {
    title: string;
    id: string;
  };
  element: (stepProps: StepProps) => JSX.Element;
  type: PaymentStepType;
}
export interface StepProps {
  goNextStep: () => void;
  currentStep: number;
  isLast: boolean;
  step: number;
  data?: {
    title: string;
    id: string;
  };
  price: number;
  goToStep: (step: number) => void;
  type: PaymentStepType;
}

export const Stepper: React.FC<StepperProps> = ({ steps, price }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const stepperSelector = useRef<HTMLDivElement>(null);
  useEffect(() => {
    moveStepper();
  }, [currentStep]);

  const goNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= steps.length) {
      setCurrentStep(nextStep);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const moveStepper = () => {
    if (stepperSelector.current) {
      const stepper = stepperSelector.current;
      const stepWidth = stepper.offsetWidth / steps.length;
      stepper.style.transform = `translateX(-${
        stepWidth * (currentStep - 1)
      }px)`;
    }
  };
  return (
    <div className="stepper">
      <div className="stepper-selector" ref={stepperSelector}>
        {steps.map((step, index) => (
          <div className="step-wrapper">
            <step.element
              key={index}
              data={step.data}
              step={index + 1}
              goNextStep={goNextStep}
              currentStep={currentStep}
              isLast={index === steps.length - 1}
              price={price}
              goToStep={goToStep}
              type={step.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

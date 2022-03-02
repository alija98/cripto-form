import React, { useState } from "react";

import "./SingleSelect.css";
import {
  singleSelectData,
  singleSelectType,
} from "../CriptoPaymentStep/CriptoPaymentStep";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { selectedMethod } from "../Store/Reducers";
import { addSelectedCripto, addSelectedPromo } from "../Store/Actions";

interface SingleSelectProps {
  data: singleSelectData[];
  title: string;
  type: singleSelectType;
}

const SingleSelect: React.FC<SingleSelectProps> = ({ data, title, type }) => {
  const selectedOption = useAppSelector((state) =>
    type === "CRIPTO" ? state?.cripto?.name : state.promo.name
  );
  const dispatch = useAppDispatch();

  const setSelectedItem = (item: selectedMethod) => {
    type === "CRIPTO"
      ? dispatch(addSelectedCripto(item))
      : dispatch(addSelectedPromo(item));
  };
  return (
    <div className="select-wrapper">
      <h4
        style={{ paddingBottom: "20px", fontWeight: "500", color: "#3F4048" }}
      >
        {title}
      </h4>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className="single-option"
            onClick={() => setSelectedItem(item)}
          >
            <div
              className="icon"
              style={{
                backgroundColor:
                  selectedOption === item.name ? "blue" : " #edeff0",
              }}
            >
              {selectedOption === item.name ? (
                <span className="material-icons md-light md-inactive white">
                  done
                </span>
              ) : null}
            </div>
            <h4>{item.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default SingleSelect;

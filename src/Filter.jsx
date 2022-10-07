import React from "react";
import Moon from "./images/icon-moon.svg";
import axios from "axios";

const Filter = (props) => {
  const All = () => {
    axios.get("http://localhost:4001").then((response) => {
      props.setTodoList(response.data);
    });
  };

  const filterActive = () => {
    axios.get("http://localhost:4001").then((response) => {
      const filteredActive = response.data.filter(
        (todo) => todo.status === true
      );

      props.setTodoList(filteredActive);
    });
  };

  const filterCompleted = () => {
    axios.get("http://localhost:4001").then((response) => {
      const filteredCompleted = response.data.filter(
        (todo) => todo.status === false
      );
      props.setTodoList(filteredCompleted);
    });
  };

  return (
    <>
      <div
        className={`flex mt-4 bg-white p-3 justify-center items-center gap-2 ${
          props.mode === Moon ? "bg-white" : "bg-[#25273D]"
        }`}
      >
        <p className="text-base font-bold text-[#9495A5]" onClick={All}>
          {" "}
          All
        </p>
        <p className="text-base text-[#9495A5]" onClick={filterActive}>
          Active
        </p>
        <p className="text-base text-[#9495A5]" onClick={filterCompleted}>
          Completed
        </p>
      </div>
    </>
  );
};

export default Filter;

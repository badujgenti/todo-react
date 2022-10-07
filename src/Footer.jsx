import React from "react";
import Filter from "./Filter";
import Moon from "./images/icon-moon.svg";
import axios from "axios";

const Footer = (props) => {
  const clearCompleted = () => {
    const trues = props.todoList.filter((todo) => todo.status);
    trues.forEach((element) => {
      axios.delete(`http://localhost:4001/${element.id}`).then((response) => {
        props.setTodoList(response.data.rows);
      });
    });
  };

  return (
    <>
      <div
        className={`flex justify-between rounded-[5px] h-12 items-center px-5 py-4 ${
          props.mode === Moon ? "bg-white" : "bg-[#25273D]"
        }`}
      >
        <span className="text-sm text-[#9495A5]">
          {props.todoList.length} items left
        </span>
        <span className="text-sm text-[#9495A5]" onClick={clearCompleted}>
          Clear completed
        </span>
      </div>
      <Filter
        mode={props.mode}
        todoList={props.todoList}
        setTodoList={props.setTodoList}
      />
    </>
  );
};

export default Footer;

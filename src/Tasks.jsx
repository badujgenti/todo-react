import React from "react";
import Footer from "./Footer";
import Moon from "./images/icon-moon.svg";
import Delete from "./images/icon-cross.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Tasks = (props) => {
  const Deletion = async (id) => {
    const filteredTodo = props.todoList.filter((todo) => todo.id !== id);
    props.setTodoList(filteredTodo);

    const res = await fetch(`http://localhost:4001/${id}`, {
      method: "DELETE",
    });
  };

  const putMethod = async (id, text, status) => {
    const response = await axios.put(`http://localhost:4001/${id}`, {
      todoText: text,
      todoStatus: !status,
    });
    const filteredTodo = props.todoList.map((todo) => {
      if (todo.id === id) {
        todo.status = !todo.status;
      }
      return todo;
    });

    props.setTodoList(filteredTodo);
  };

  useEffect(() => {
    const getMethod = async () => {
      const response = await axios.get("http://localhost:4001");
      props.setTodoList(response.data);
    };
    getMethod();
  }, []);

  return (
    <>
      <ul>
        {props.todoList.map((item, index) => {
          return (
            <li key={index}>
              <Taskdiv isDark={props.isDark}>
                <Circle
                  Active={item.status}
                  isDark={props.isDark}
                  htmlFor={item.id}
                >
                  <input
                    onChange={() => putMethod(item.id, item.text, item.status)}
                    style={{ display: "none" }}
                    id={item.id}
                    type="checkbox"
                  />
                  <span />
                  <p className="text-xs  text-[#494C6B]">{item.text} </p>
                </Circle>

                <img
                  onClick={() => Deletion(item.id)}
                  className="ml-auto mr-3 h-4 w-4"
                  src={Delete}
                  alt=""
                />
              </Taskdiv>
            </li>
          );
        })}
      </ul>
      <Footer
        mode={props.mode}
        todoList={props.todoList}
        setTodoList={props.setTodoList}
      />
    </>
  );
};

export default Tasks;

const Circle = styled.label`
  margin-left: 20px;
  display: flex;
  gap: 20px;

  span {
    display: block;
    height: 20px;
    width: 20px;
    border: 1px solid ${(props) => (props.isDark ? "#E3E4F1" : "#393A4B")};
    border-radius: 50%;
    background: ${(props) =>
      props.Active
        ? `url("./images/icon-check.svg"),
      linear-gradient(135deg, #55ddff 0%, #c058f3 100%)`
        : " "};
    background-repeat: no-repeat;
    background-position: center;
  }

  p {
    user-select: none;
    text-decoration: ${(props) => (props.Active ? "line-through" : "")};
  }
`;

const Taskdiv = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => (props.isDark ? " #E3E4F1" : "#393A4B")};
  align-items: center;
  border-radius: 5px;
  height: 48px;
  background-color: ${(props) => (props.isDark ? "#FAFAFA" : "#25273D")};
`;

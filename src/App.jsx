import { useState } from "react";
import img from "./images/bg-mobile-light.jpg";
import Moon from "./images/icon-moon.svg";
import Tasks from "./Tasks";
import Sun from "./images/icon-sun.svg";
import imgNight from "./images/bg-mobile-dark.jpg";
import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

function App() {
  const [todoList, setTodoList] = useState([]);

  const [mode, setMode] = useState(Moon);

  const handleClick = () => {
    if (mode === Moon) {
      setMode(Sun);
    } else {
      setMode(Moon);
    }
  };

  const [inputValue, setInputValue] = useState("");

  const enterComment = (event) => {
    if (event.key === "Enter") {
      axios
        .post("http://localhost:4001", {
          todoText: event.target.value,
          todoStatus: false,
        })
        .then((response) => {
          setTodoList(response.data.rows);
          setInputValue("");
        });
    }
  };

  return (
    <Background isDark={mode === Moon}>
      <Around>
        <Todoicon className="flex justify-between ">
          <Todo> T O D O </Todo>
          <Image onClick={handleClick} src={mode} />
        </Todoicon>
        <Inputdiv isDark={mode === Moon}>
          <Circle isDark={mode === Moon} />
          <Input
            isDark={mode === Moon}
            onKeyDown={enterComment}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Create a new todo..."
          ></Input>
        </Inputdiv>

        <Tasks
          mode={mode}
          todoList={todoList}
          setTodoList={setTodoList}
          isDark={mode === Moon}
        />
      </Around>
    </Background>
  );
}

export default App;

const Background = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => (props.isDark ? "#FAFAFA" : "#171823")};
  background-image: ${(props) =>
    props.isDark
      ? `url(${process.env.PUBLIC_URL}/images/bg-mobile-light.jpg)`
      : `url(${process.env.PUBLIC_URL}/images/bg-mobile-dark.jpg)`};
  background-repeat: no-repeat;
  background-size: 100% 35%;
  @media (min-width: 768px) {
    background-image: ${(props) =>
      props.isDark
        ? `url(${process.env.PUBLIC_URL}/images/bg-desktop-light.jpg)`
        : `url(${process.env.PUBLIC_URL}/images/bg-desktop-dark.jpg)`};
  }
`;

const Around = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 48px;
`;

const Todoicon = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Todo = styled.p`
  font-size: 20px;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 700;
  color: white;
`;
const Image = styled.img`
  height: 20px;
  width: 20px;
`;
const Inputdiv = styled.div`
  display: flex;
  align-items: center;
  width: 327px;
  border-radius: 5px;
  height: 48px;
  margin-top: 40px;
  margin-bottom: 16px;
  background-color: ${(props) => (props.isDark ? "#FAFAFA" : "#25273D")};
  @media (min-width: 768px) {
    width: 540px;
  }
`;
const Circle = styled.div`
  height: 20px;
  width: 20px;
  border: 1px solid ${(props) => (props.isDark ? "#E3E4F1" : "#393A4B")};
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 10px;
`;
const Input = styled.input`
  width: 80%;
  height: 100%;
  outline: none;
  color: #9495a5;
  font-size: 12px;
  background-color: ${(props) => (props.isDark ? "#FAFAFA" : "#25273D")};
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  // state
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodo);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodo = [...incompleteTodos];
    newTodo.splice(index, 1);
    setIncompleteTodos(newTodo);
  };
  const onClickComplete = (index) => {
    const newincompleteTodo = [...incompleteTodos];
    const deletTodo = newincompleteTodo.splice(index, 1);
    const newCompleteTodo = [...completeTodos, deletTodo];
    setIncompleteTodos(newincompleteTodo);
    setCompleteTodos(newCompleteTodo);
  };
  const onClickBack = (index) => {
    const newCompleteTodo = [...completeTodos];
    const backTodo = newCompleteTodo.splice(index, 1);
    const newincompleteTodo = [...incompleteTodos, backTodo];
    setIncompleteTodos(newincompleteTodo);
    setCompleteTodos(newCompleteTodo);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOは5個までですよん</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

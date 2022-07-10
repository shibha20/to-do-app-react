import logo from './logo.svg';
import './App.css';
import React , {useState,useRef, useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {

  //setting initial stage of todos 
  const [todos,setTodos]= useState([])
  //creating ref to save to do list in multiple render 
  const todoNameRef=useRef()

  //save todos from local storage to our app's storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])

  //save todos in local storage everytime it changes, useEffect has a function inside it
  useEffect(() => {
    //change string stored in browser's local storage to json 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  //change the status of completed todos
  function toggleTodo (id){
    //create a copy of the current todo list
    const newTodos = [...todos]
    //find the todo whose status needs to be changed
    const todo = newTodos.find(todo => todo.id == id)
    //change the status
    todo.complete = !todo.complete
    //set the current todos to be newtodos 
    setTodos(newTodos)
  }


  function handleAddTodo(e){
    const name = todoNameRef.current.value
    //if name is empty, return the previous list 
    if (name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos,{id:uuidv4(), name:name, complete:false}]
    })
    todoNameRef.current.value = null
  }

  //clearing completed todos 
  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
 
  //add todos obtained from multiple button clicks 
  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/> 
      <input ref={todoNameRef} type= "text" />
      <button onClick ={handleAddTodo}> Add Todo</button>
      <button onClick ={handleClearTodos}> Clear completed Todos</button>
      <div> {todos.filter(todo => !todo.complete).length} left to do</div>
    </>
    )
}

export default App;






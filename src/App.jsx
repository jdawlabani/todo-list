import { useState, useEffect } from "react";
import "./App.css";
import Task from "./Components/Task";

function App() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('list'));
    if (list) {
      setList(list);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);



  //submit task to todo list
  const submitTask = (e) => {
    e.preventDefault();
    if (task) {
      // console.log(task);
      // console.log(list);
      //store task along with it's completed state, which is defaulted as false
      const t = {
        task: task,
        completed: false
      }
      setList([...list, t]);
      setTask("");
    }
  };

  //deletes task, where i is the index of the task
  const deleteTask = (i) => {
    const filteredList = list.filter((task, index) => {return index !== i})
    setList(filteredList)
  };

  //toggles checkbox to allow completion/reversal of completion of task, i is index of task
  const toggleComplete = i => {
    const updatedList = list.map((task, index) => {
      if (index === i){
        const updatedTask = {...task, completed: !task.completed}
        return updatedTask
      }
      return task;
    })
    setList(updatedList)
  }


  return(
    <div className="App">
    <form onSubmit={submitTask} className="App">
    <label htmlFor="task"></label>
    <input onChange={(e) => {setTask(e.target.value);}} value={task} type="text"/>
    <br />
    <button>Add</button>
    </form>
    {list.map((task, index) => {
    const taskClass = []
    if (task.completed){
        taskClass.push("strike")
    }
    return (
        <Task key={index} index={index} task={task} 
        toggleComplete={toggleComplete} taskClass={taskClass}
        deleteTask={deleteTask}/>
    );
    })}
    </div>
  )
}

export default App;

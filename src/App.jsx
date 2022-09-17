import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");

  //submit task to todo list
  const submitTask = (e) => {
    e.preventDefault();
    if (task) {
      console.log(task);
      console.log(list);
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
    console.log(filteredList)
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


  return (
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
          <div key={index}>
            <span className={taskClass.join(" ")}>{task.task}</span>
            <input className="space" onChange={e => toggleComplete(index)} checked={task.completed} type="checkbox"/>
            <button onClick={e => deleteTask(index)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;

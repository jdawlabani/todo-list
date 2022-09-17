const Task = props => {
    return(
        <div>
        <span className={props.taskClass.join(" ")}>{props.task.task}</span>
        <input className="space" onChange={e => props.toggleComplete(props.index)} checked={props.task.completed} type="checkbox"/>
        <button onClick={e => props.deleteTask(props.index)}>Delete</button>
        </div>
    )
}

export default Task;
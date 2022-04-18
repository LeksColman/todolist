import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {v1} from "uuid";
import s from "./Components/Todolist/Todolist.module.css";
import {InputUniversal} from "./Components/InputUniversal/InputUniversal";

function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();

    let [todolists, setTodolists] = useState([
        {id: todolistID1, title: "Todolist #1", filter: 'all'},
        {id: todolistID2, title: "Todolist #2", filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "111", isDone: true},
            {id: v1(), title: "222", isDone: false},
            {id: v1(), title: "333", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "444", isDone: true},
            {id: v1(), title: "555", isDone: true},
            {id: v1(), title: "666", isDone: false},
        ],
    })

    const addTask = (todolistID: string, newTitle: string) => {
        tasks[todolistID] = [{id: v1(), title: newTitle, isDone: false}, ...tasks[todolistID]]
        setTasks({...tasks})
    }

    const removeTask = (todolistID: string, taskID: string) => {
        tasks[todolistID] = tasks[todolistID].filter((el) => el.id !== taskID)
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let newTodolistID = v1()
        setTodolists([{id: newTodolistID, title: title, filter: 'all'}, ...todolists])
        setTasks({[newTodolistID]: [], ...tasks})
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
    }

    return (
        <div>
            <div className={s.todolistField}>
                <div>{'Add NEW Todolist'}</div>
                <InputUniversal
                    buttonTitle={'+'}
                    callback={(title) => {
                        addTodolist(title)
                    }}
                />
            </div>
            <div className={'App'}>
                {todolists.map((td) =>
                    <Todolist
                        key={td.id}
                        id={td.id}
                        title={td.title}
                        tasks={tasks[td.id]}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                    />)}
            </div>
        </div>
    );
}

export default App;
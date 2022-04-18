import React, {useState} from 'react';
import './App.css';
import {FilterButtonsPropsType, Todolist} from "./Components/Todolist/Todolist";
import {v1} from "uuid";
import s from "./Components/Todolist/Todolist.module.css";
import {InputUniversal} from "./Components/InputUniversal/InputUniversal";

export type FilterValueType = 'all' | 'active' | 'completed'

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

    let filterButtons: FilterButtonsPropsType[] = [
        {id: v1(), title: 'All', filterValue: 'all'},
        {id: v1(), title: 'Active', filterValue: 'active'},
        {id: v1(), title: 'Completed', filterValue: 'completed'},
    ]

    const addTask = (todolistID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]:
                [{id: v1(), title: newTitle, isDone: false}, ...tasks[todolistID]]})
    }

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]:
                tasks[todolistID].filter((el) => el.id !== taskID)})
    }

    const changeTaskStatus = (todolistID: string, taskID: string, statusValue: boolean) => {
        setTasks({...tasks, [todolistID]:
                tasks[todolistID].map((el) => el.id === taskID ? {...el, isDone: statusValue} : el)})
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

    const changeTodolistFilter = (todolistID: string, filterValue: FilterValueType) => {
        setTodolists(todolists.map((td) => td.id === todolistID ? {...td, filter: filterValue} : td))
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
                {todolists.map((td) => {
                    let tasksForTodolist = tasks[td.id]
                    if (td.filter === 'active') {
                        tasksForTodolist = tasks[td.id].filter(task => !task.isDone)
                    }
                    if (td.filter === 'completed') {
                        tasksForTodolist = tasks[td.id].filter(task => task.isDone)
                    }
                    return (
                        <Todolist
                            key={td.id}
                            id={td.id}
                            title={td.title}
                            tasks={tasksForTodolist}
                            addTask={addTask}
                            removeTask={removeTask}
                            removeTodolist={removeTodolist}
                            changeTodolistFilter={changeTodolistFilter}
                            filterButtons={filterButtons}
                            changeTaskStatus={changeTaskStatus}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
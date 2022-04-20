import React from 'react';
import s from './Todolist.module.css'
import {InputUniversal} from "../InputUniversal/InputUniversal";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {FilterValueType} from "../../App";
import {Button} from "../Button/Button";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType ={
    id: string
    title: string
    filter: FilterValueType
}
export type FilterButtonsType = {
    id: string
    title: string
    filterValue: FilterValueType
}

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TasksType[]
    addTask: (todolistID: string, newTitle: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTodolistFilter: (todolistID: string, filterValue: FilterValueType) => void
    filterButtons: FilterButtonsType[]
    changeTaskStatus: (todolistID: string, taskID: string, statusValue: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (text: string) => {
      props.changeTodolistTitle(props.id, text)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const removeTask = (taskID: string) => {
        props.removeTask(props.id, taskID)
    }
    const changeTaskStatus = (taskID: string, statusValue: boolean) => {
        props.changeTaskStatus(props.id, taskID, statusValue)
    }
    const changeTaskTitle = (taskID: string, text: string) => {
        props.changeTaskTitle(props.id, taskID, text)
    }


    return (
        <div className={s.todolistField}>
            <h2>
                <EditableSpan
                    text={props.title}
                    callBack={changeTodolistTitle}
                />
                <Button
                    buttonTitle={'x'}
                    callBack={removeTodolist}
                />
            </h2>
            <InputUniversal
                buttonTitle={'+'}
                callback={addTask}
            />
            <ul>
                {props.tasks.map((el) =>
                    <li key={el.id}>
                        <input
                            type={"checkbox"}
                            checked={el.isDone}
                            onChange={(e)=>changeTaskStatus(el.id, e.currentTarget.checked)}
                        />
                        <EditableSpan
                            text={el.title}
                            callBack={(text)=>changeTaskTitle(el.id, text)}
                        />
                        <Button
                            buttonTitle={'x'}
                            callBack={() => removeTask(el.id)}
                        />
                    </li>
                )}
            </ul>
            <div>
                {props.filterButtons.map((el) => {
                    const changeFilterHandler = () => {
                        props.changeTodolistFilter(props.id, el.filterValue)
                    }
                    return (
                        <Button
                            key={el.id}
                            buttonTitle={el.title}
                            callBack={changeFilterHandler}
                        />
                    )
                })}
            </div>
        </div>
    );
};
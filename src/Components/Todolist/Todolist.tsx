import React from 'react';
import s from './Todolist.module.css'
import {InputUniversal} from "../InputUniversal/InputUniversal";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {FilterValueType} from "../../App";
import {Button} from "../Button/Button";

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterButtonsPropsType = {
    id: string
    title: string
    filterValue: FilterValueType
}

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TasksPropsType[]
    addTask: (todolistID: string, newTitle: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTodolistFilter: (todolistID: string, filterValue: FilterValueType) => void
    filterButtons: FilterButtonsPropsType[]
}

export const Todolist = (props: TodolistPropsType) => {

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const removeTask = (taskID: string) => {
        props.removeTask(props.id, taskID)
    }

    return (
        <div className={s.todolistField}>
            <h2>
                <EditableSpan
                    text={props.title}
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
                        />
                        <EditableSpan
                            text={el.title}
                        />
                        <Button
                            buttonTitle={'x'}
                            callBack={() => {
                                removeTask(el.id)
                            }}
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
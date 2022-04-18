import React from 'react';
import s from './Todolist.module.css'
import {InputUniversal} from "../InputUniversal/InputUniversal";

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TasksPropsType[]
    addTask: (todolistID: string, newTitle: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    removeTodolist: (todolistID: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const onClickHandlerRemoveTask = (taskID: string) => {
        props.removeTask(props.id, taskID)
    }
    const onClickHandlerRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div className={s.todolistField}>
            <h1>
                <span>{props.title}</span>
                <button
                    onClick={onClickHandlerRemoveTodolist}>
                    {'x'}
                </button>
            </h1>
            <InputUniversal
                buttonTitle={'+'}
                callback={(title) => {
                    props.addTask(props.id, title)
                }}
            />
            <ul>
                {props.tasks.map((el) =>
                    <li key={el.id}
                        className={s.liElement}>
                        <input type={"checkbox"} checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button
                            onClick={() => {
                                onClickHandlerRemoveTask(el.id)
                            }}>
                            {'x'}
                        </button>
                    </li>
                )}
            </ul>
            <div>
                <button>{'All'}</button>
                <button>{'Active'}</button>
                <button>{'Completed'}</button>
            </div>
        </div>
    );
};
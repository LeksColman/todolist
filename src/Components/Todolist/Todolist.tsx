import React from 'react';

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: TasksPropsType[]
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <>
                <input/>
                <button>{'+'}</button>
            </>
            <ul>
                {props.tasks.map((el) =>
                    <li key={el.id}>
                        {el.title}
                        <input type={"checkbox"} checked={el.isDone}/>
                    </li>
                )}
            </ul>
        </div>
    );
};
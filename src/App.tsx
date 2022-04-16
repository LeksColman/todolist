import React from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {v1} from "uuid";

function App() {

    const tasks = [
        {id: v1(), title: "111", isDone: true},
        {id: v1(), title: "222", isDone: false},
        {id: v1(), title: "333", isDone: false},
    ]

    return (
        <div className='App'>
            <Todolist
                title={'What to learn'}
                tasks={tasks}
            />
        </div>
    );
}

export default App;
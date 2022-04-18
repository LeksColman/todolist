import React, {useState} from 'react';
import s from './InputUniversal.module.css';

type InputUniversalPropsType = {
    buttonTitle: string
    callback: (inputText: string) => void
}

export const InputUniversal = (props: InputUniversalPropsType) => {

    let [inputText, setInputText] = useState('')
    let [error, setError] = useState(false)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
        setError(false)
    }
    const onClickHandler = () => {
        if (inputText.trim() !== '') {
            props.callback(inputText)
            setInputText('')
            setError(false)
        } else setError(true)
    }

    return (
        <>
            <>
                <input
                    placeholder={'Enter text...'}
                    value={inputText}
                    onChange={onChangeHandler}
                />
                <button
                    disabled={error}
                    onClick={onClickHandler}>
                    {props.buttonTitle}
                </button>
            </>
            <div className={s.errorMessage}>
                {error && "Title is required"}
            </div>
        </>
    );
};
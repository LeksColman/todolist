import React, {useState} from 'react';
import s from './InputUniversal.module.css';

type InputUniversalPropsType = {
    buttonTitle: string
    callback: (inputText: string) => void
    classNameInput?: string
    classNameButton?: string
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
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputText.trim() !== '') {
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
                    onKeyPress={onKeyPressHandler}
                    className={props.classNameInput}
                />
                <button
                    disabled={error}
                    className={props.classNameButton}
                    onClick={onClickHandler}>
                    {props.buttonTitle}
                </button>
            </>
            <div className={s.errorMessage}>
                {error && "Text is required..."}
            </div>
        </>
    );
};
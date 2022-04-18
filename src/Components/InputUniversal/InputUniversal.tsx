import React, {useState} from 'react';

type InputUniversalPropsType = {
    buttonTitle: string
    callback: (inputText: string) => void
}

export const InputUniversal = (props: InputUniversalPropsType) => {

    let [inputText, setInputText] = useState('')

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
    }
    const onClickHandler = () => {
        props.callback(inputText)
        setInputText('')
    }

    return (
        <>
            <input value={inputText} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>{props.buttonTitle}</button>
        </>
    );
};
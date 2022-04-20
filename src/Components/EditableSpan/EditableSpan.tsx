import React, {useState} from 'react';
import s from "../EditableSpan/EditableSpan.module.css";

type EditableSpanPropsType = {
    text: string
    callBack: (text: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editable, setEditable] = useState(false)
    let [error, setError] = useState(false)
    const onDoubleClickHandler = () => {
        setEditable(true)
    }
    const onBlurHandler = () => {
        if (inputText.trim() !== '') {
            setEditable(false)
        } else setError(true)
    }

    let [inputText, setInputText] = useState(props.text)
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
        setError(false)
        props.callBack(inputText)
    }

    return (
        <>
            {editable
                ? <span>
                    <input
                        autoFocus
                        placeholder={'Enter text...'}
                        value={error ? "" : inputText}
                        onChange={onChangeHandler}
                        onBlur={onBlurHandler}
                    />
                    <div className={s.errorMessage}>
                        {error && "Title is required"}
                    </div>
                </span>
                : <span onDoubleClick={onDoubleClickHandler}>{inputText}</span>
            }
        </>
    );
};
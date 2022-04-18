import React from 'react';

type ButtonPropsType = {
    buttonTitle: string
    callBack: ()=>void
}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button onClick={onClickHandler}>
            {props.buttonTitle}
        </button>
    );
};
import React, {useCallback} from 'react';
import {InputProps} from "./types";
import Input from "./Input";
import {escapeRegExp, inputRegex} from "../../utils";

const SingleInputNumber = React.memo(({ onChange, ...props }: InputProps) => {

    const onChangeAmount = useCallback((value: string) => {
        let nextUserInput = value.replace(/,/g, '.')
        if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
            onChange(nextUserInput)
        }
    }, [onChange])

    return (
        <Input onChange={onChangeAmount} {...props} isRequired={props.isRequired} />
    );
})

export default SingleInputNumber;
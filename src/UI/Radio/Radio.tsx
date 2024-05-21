import React, { FC } from 'react';
import {
    RadioCheckmarkStyled,
    RadioContainerStyled,
    RadioInputStyled,
    RadioNameStyled,
    RadioWrapperStyled
} from "./styled";

export type Field = {
    label: string;
    value: string | number | null | boolean;
};

type Props = {
    fields: Field[];
    selectHandler: (value: Field) => void;
    value: Field['value'];
};


export const Radio: FC<Props> = React.memo(({ fields, selectHandler, value }) => {
    const values = fields.map((field) => ({
        ...field,
        isSelected: field.value === value,
    }));

    return (
        <RadioWrapperStyled>
            {values &&
                values.map((field, index) => (
                    <RadioContainerStyled key={field.label}>
                        <RadioInputStyled
                            type="radio"
                            checked={field.isSelected}
                            onChange={() => selectHandler(field)}
                        />
                        <RadioCheckmarkStyled checked={field.isSelected} className="checkmark"/>
                        <RadioNameStyled>{field.label}</RadioNameStyled>
                    </RadioContainerStyled>
                ))}
        </RadioWrapperStyled>
    );
});

import { FC } from "react";
import { CustomSelect } from "./styled";

interface ISelectProps {
    options: {label: string, value: string, name: string}[];
    onChangeHandler: any;
    selected: any;
}

export const Select: FC<ISelectProps> = ({ options, onChangeHandler, selected }) => {
    console.log(selected)
    return (
        <CustomSelect 
            onChange={(option)=>onChangeHandler(option)}
            options={options}
            classNamePrefix="Select"
            defaultValue={selected}
        />
    )
}
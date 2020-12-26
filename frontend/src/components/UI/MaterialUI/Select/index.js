import { MenuItem, Select } from '@material-ui/core';
import React from 'react';

const createOptions = (options, defaultSelect, defaultSelectValue) => {
    let optionList = [];
    options.map((op, index) => {
        if (index === 0)
            optionList.push(
                <MenuItem id={`defaultOption${index}`} key={`defaultMenuOption${index}`} value={defaultSelectValue}>{defaultSelect}</MenuItem>
            );
        return optionList.push(
            <MenuItem id={`menuItem${index}`} key={op.value + "_" + index} value={op.value}>{op.name}</MenuItem>
        );
    })
    return optionList;
}
const MaterialSelect = ({ labelId, id, value, onChange, options = [], defaultSelect, defaultSelectValue }) => {
    return (
        <Select
            key={labelId}
            labelId={labelId}
            id={id}
            value={value}
            onChange={onChange}
            displayEmpty
        >
            {createOptions(options, defaultSelect, defaultSelectValue)}
        </Select>
    );
}

export default MaterialSelect;
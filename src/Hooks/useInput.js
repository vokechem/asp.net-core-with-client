import { useState } from 'react';

const useInput = (initialState) => {
    const [values, setValues] = useState(initialState);
    const [selectOptions, setSelectOptions] = useState([]);

    const reset = () => {
        setValues(initialState)
        setSelectOptions([])
    }
    const HandleChange = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setValues({
            ...values,
            [name]: value
        });
    }
    const handleSelectChange = (data, actionMeta) => {
        setValues({...values, [actionMeta.name]: data.value });
        setSelectOptions({...selectOptions, [actionMeta.name]: data })
    };
    const FillData = (e, record = []) => {
        setValues(e)
        setSelectOptions(record)
    }

    return { values, HandleChange, reset, FillData, handleSelectChange, selectOptions }
}

export default useInput;
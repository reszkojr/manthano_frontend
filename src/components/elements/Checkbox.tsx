import React from "react";

type CheckboxProps = {
    id: string;
    text: string;
    contentEditable: boolean;
    checked: boolean;
    onChange: React.ChangeEventHandler;
};

const styles = {
    container: 'flex space-x-2 items-center',
    checkbox: 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
};

const Checkbox = ({id, text, checked, onChange, contentEditable, ...rest}: CheckboxProps) => {
    return (
        <div className={styles.container}>
            <input checked={checked} onChange={onChange} id={id} type='checkbox' {...rest} className={styles.checkbox}/>
            <label htmlFor={id} contentEditable={contentEditable}>{text}</label>
        </div>
    );
};

export default Checkbox;

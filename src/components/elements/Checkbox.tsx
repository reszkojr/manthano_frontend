type CheckboxProps = {
    id: string;
    text: string;
    contentEditable: boolean;
};

const styles = {
    container: 'flex space-x-2 items-center',
    checkbox: 'w-4 h-4 text-blue-60 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-700',
};

const Checkbox = ({id, text, contentEditable, ...rest}: CheckboxProps) => {
    return (
        <div className={styles.container}>
            <input id={id} type='checkbox' {...rest} className={styles.checkbox}/>
            <span contentEditable={contentEditable}>{text}</span>
        </div>
    );
};

export default Checkbox;

import {ChangeEvent, useState} from "react";
import {FaPlusCircle} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {v4 as uuid} from "uuid";
import Checkbox from "../../../../components/elements/Checkbox.tsx";
import ComponentProps from "./Props.tsx";

export function Title({title, provided, className, innerRef, onChange}: ComponentProps) {
    return (
        <div className={className} ref={innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <h1 className={'text-2xl font-bold'} contentEditable
                suppressContentEditableWarning
                onInput={event => onChange(event as unknown as ChangeEvent)}>{title}</h1>
        </div>
    );
}

export function Subtitle({title, provided, className, innerRef, onChange}: ComponentProps) {
    return (
        <div className={className} ref={innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <h1 className={'text-lg font-bold'} contentEditable
                suppressContentEditableWarning
                onInput={event => onChange(event as unknown as ChangeEvent)}>{title}</h1>
        </div>
    );
}

export function Text({title, provided, className, innerRef, onChange}: ComponentProps) {
    return (
        <div className={className} ref={innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <div contentEditable onInput={event => onChange(event as unknown as ChangeEvent)}
                 suppressContentEditableWarning
                 className={'bg-transparent border-0 resize-none outline-none focus-none w-full border-none text-gray-100 h-fit'}>
                {title}
            </div>
        </div>
    );
}

export function MultipleSelection({
    id,
    title,
    description,
    provided,
    className,
    innerRef,
}: ComponentProps) {
    const [checkboxes, setCheckboxes] = useState<{ id: string, label: string }[]>([
        {id: uuid(), label: 'Checkbox 1'},
    ]);

    const addCheckbox = () => {
        setCheckboxes([...checkboxes, {id: uuid(), label: `Checkbox ${checkboxes.length + 1}`}]);
    };

    const removeCheckbox = (checkboxId: string) => {
        setCheckboxes(checkboxes.filter(checkbox => checkbox.id !== checkboxId));
    };

    return (
        <div className={`flex flex-col ${className}`}
             ref={innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <h1 contentEditable className={'text-lg font-bold'}>{title}</h1>
            <h2 contentEditable className={'mb-3'}>{description || 'Description'}</h2>
            <form name={id}>
                {checkboxes.map(checkbox => (
                    <div key={checkbox.id} className="flex items-center mb-2">
                        <Checkbox text={checkbox.label} id={checkbox.id} contentEditable/>
                        <MdDelete
                            onClick={() => removeCheckbox(checkbox.id)}
                            className="w-4 h-auto text-red-500 ml-2 cursor-pointer"
                        />
                    </div>
                ))}
                <button type="button" onClick={addCheckbox} className="flex items-center text-blue-500 mt-2">
                    <FaPlusCircle className="w-3 h-auto mr-1"/>
                    Add Checkbox
                </button>
            </form>
        </div>
    );
}

export function SingleSelection({
    id,
    title,
    description,
    provided,
    className,
    innerRef,
}: ComponentProps) {
    const [options, setOptions] = useState<{ id: string, label: string }[]>([
        {id: uuid(), label: 'Option 1'},
        {id: uuid(), label: 'Option 2'},
    ]);

    const addOption = () => {
        setOptions([...options, {id: uuid(), label: `Option ${options.length + 1}`}]);
    };

    const removeOption = (optionId: string) => {
        setOptions(options.filter(option => option.id !== optionId));
    };

    return (
        <div className={`flex flex-col ${className}`}
             ref={innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <h1 contentEditable className={'text-lg font-bold'}>{title}</h1>
            <h2 contentEditable className={'mb-3'}>{description || 'Description'}</h2>
            <div>
                {options.map(option => (
                    <div key={option.id} className="flex items-center mb-2">
                        <input
                            type="radio"
                            id={option.id}
                            name={id}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor={option.id} contentEditable className="ml-2">{option.label}</label>
                        <MdDelete
                            onClick={() => removeOption(option.id)}
                            className="w-4 h-auto text-red-500 ml-2 cursor-pointer"
                        />
                    </div>
                ))}
            </div>
            <button onClick={addOption} className="flex items-center text-blue-500 mt-2">
                <FaPlusCircle className="w-3 h-auto mr-1"/>
                Add Option
            </button>
        </div>
    );
}

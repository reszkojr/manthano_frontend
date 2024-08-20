import React from "react";
import {IoIosCloseCircle} from "react-icons/io";
import {MultipleSelection, Section, SingleSelection, Subtitle, Text, Title} from "./Components.tsx";
import ComponentProps from "./Props.tsx";

function FormComponent({type, ...otherProps}: { type: string } & ComponentProps) {

    const componentMap: { [type: string]: React.ReactElement } = {
        title: <Title {...otherProps} />,
        subtitle: <Subtitle {...otherProps} />,
        text: <Text {...otherProps}/>,
        section: <Section {...otherProps}/>,
        multiSelect: <MultipleSelection {...otherProps} />,
        singleSelect: <SingleSelection {...otherProps} />,
    };

    const removeComponent = (componentId: string) => {
        const newColumns = {...otherProps.columns};
        const componentIndex = newColumns['formColumn'].findIndex(x => x.id === componentId);
        newColumns['formColumn'].splice(componentIndex, 1);

        otherProps.setColumns(newColumns);
    }

    return <>
        <div
            className={'relative'}
            onClick={() => removeComponent(otherProps.id)}>
            <IoIosCloseCircle
                className={'absolute cursor-pointer top-4 right-4 h-auto w-5 text-gray-400'}/>
        </div>
        {componentMap[type]}
    </>
}

export default FormComponent;
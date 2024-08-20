import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";
import {ChangeEvent, useState} from "react";
import {v4 as uuid} from "uuid";
import Button from "../../../../components/elements/Button.tsx";
import Submit from "../../../../components/elements/Submit.tsx";
import FormComponent from "./FormComponent.tsx";
import {Component} from "./Props.tsx";


const getComponentStyle = (isDragging: boolean) => {
    return 'p-4 text-gray-100 mb-2 ' + (isDragging ? 'bg-gray-800' : 'bg-gray-800') + ' border-dashed border-gray-600 border-2 duration-150 rounded-md';
}

function EvalCreate() {
    const components: Component[] = [
        {id: uuid(), description: null, type: 'title', title: 'Title'},
        {id: uuid(), description: null, type: 'subtitle', title: 'Subtitle'},
        {id: uuid(), description: null, type: 'text', title: 'Text'},
        {
            id: uuid(),
            description: 'Add, edit or remove the current checkboxes.',
            type: 'multiSelect',
            title: 'Multiple selection'
        },
        {
            id: uuid(),
            description: 'Add, edit or remove the current radio buttons.',
            type: 'singleSelect',
            title: 'Single selection'
        },
    ]

    const [columns, setColumns] = useState<{ [index: string]: Component[] }>({
        "formColumn": [],
        "componentsColumn": [components[0], components[1], components[2], components[3], components[4]],
    });

    const reorder = (componentList: Component[], startIndex: number, endIndex: number) => {
        const result = Array.from(componentList);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    const onDragEnd = (result: DropResult) => {
        const {source, destination} = result;
        if (!destination || destination.droppableId === "componentsColumn") return;

        const sourceComponentsList = columns[source.droppableId];
        const destinationComponentsList = columns[destination.droppableId];

        if (source.droppableId === destination.droppableId) {
            const newComponents = reorder(sourceComponentsList, source.index, destination.index);
            setColumns(prevState => ({...prevState, [source.droppableId]: newComponents}))
            return;
        }

        const component = {...sourceComponentsList[source.index]};
        component.id = uuid()
        destinationComponentsList.push(component);

        setColumns(prevState => ({
            ...prevState,
            [destination.droppableId]: destinationComponentsList,
        }));
    }

    const onChange = (id: string, changeEvent: ChangeEvent) => {
        if (id && changeEvent) {
            console.log('s')
        }
    }

    return (
        <div className={'flex w-full h-full'}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={'w-2/3 m-4 mt-0 overflow-auto'}>
                    <h1 className={'text-md p-2 font-bold text-gray-200'}>Formulary</h1>
                    <div
                        className={'rounded-lg bg-gray-800 relative min-h-2/3 h-full border rounded-b-none border-gray-700 text-teal-900'}>
                        <Droppable droppableId={"formColumn"}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={'p-4 h-full relative'}
                                >
                                    {columns['formColumn'].map((component, index) => (
                                        <Draggable key={component.id} draggableId={component.id} index={index}>
                                            {(provided, snapshot) => (
                                                <FormComponent id={component.id}
                                                               columns={columns}
                                                               setColumns={setColumns}
                                                               type={component.type}
                                                               title={component.title}
                                                               provided={provided}
                                                               innerRef={provided.innerRef}
                                                               className={getComponentStyle(snapshot.isDragging)}
                                                               onChange={event => onChange(component.id, event)}
                                                               description={component.description}/>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className='mt-auto flex w-full justify-between gap-2 bg-gray-700 px-2 py-3 rounded-b'>
                        <Button label='Cancel' onClick={() => alert()}/>
                        <Submit label={'Save'}/>
                    </div>
                </div>
                <Droppable droppableId={"componentsColumn"}>
                    {(provided) => (
                        <div className={"rounded-lg overflow-none h-screen w-1/3 bg-blue-700 p-2"}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >

                            <h1 className={'text-md font-bold text-gray-200 p-2'}>Components</h1>
                            {columns['componentsColumn'].map((component, index) => (
                                <Draggable key={component.id} draggableId={component.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={getComponentStyle(snapshot.isDragging)}
                                        >
                                            {component.title}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                    }
                </Droppable>
            </DragDropContext>
        </div>
    );
}


export default EvalCreate;
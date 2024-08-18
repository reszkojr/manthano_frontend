import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";
import {useState} from "react";
import {v4 as uuid} from "uuid";

interface Component {
    id: string;
    type: string;
    content: string;
}

const getComponentStyle = (isDragging: boolean) => {
    return 'p-4 text-gray-100 mb-2 ' + (isDragging ? 'bg-gray-800' : 'bg-gray-800') + ' border-dashed border-gray-600 border-2 duration-150 rounded-md';
}

function EvalCreate() {
    const components: Component[] = [
        {id: uuid(), type: 'Title', content: 'Title'},
        {id: uuid(), type: 'Description', content: 'Description'},
        {id: uuid(), type: 'TextBox', content: 'Text Box'},
        {id: uuid(), type: 'MultiSelect', content: 'Multiple Choice'},
        {id: uuid(), type: 'Checkbox', content: 'Checkboxes'},
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
        if (!destination) return;

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

    return (
        <div className={'flex w-full p-4 gap-2'}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={"formColumn"}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={'rounded-lg border border-gray-700 text-teal-900 bg-gray-800 w-2/3 p-4'}
                        >
                            {columns['formColumn'].map((component, index) => (
                                <Draggable key={component.id} draggableId={component.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={getComponentStyle(snapshot.isDragging)}
                                        >
                                            {component.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId={"componentsColumn"}>
                    {(provided) => (
                        <div className={"rounded-lg w-1/3 p-4"}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >
                            {columns['componentsColumn'].map((component, index) => (
                                <Draggable key={component.id} draggableId={component.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={getComponentStyle(snapshot.isDragging)}
                                        >
                                            {component.content}
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
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";
import {ChangeEvent, useEffect, useState} from "react";
import {HiAdjustments} from "react-icons/hi";
import {MdDashboard} from "react-icons/md";
import {v4 as uuid} from "uuid";
import Button from "../../../../components/elements/Button.tsx";
import Checkbox from "../../../../components/elements/Checkbox.tsx";
import Submit from "../../../../components/elements/Submit.tsx";
import TextInput from "../../../../components/elements/TextInput.tsx";
import FormComponent from "./FormComponent.tsx";
import {Component} from "./Props.tsx";


const getComponentStyle = (isDragging: boolean) => {
    return 'p-2 text-gray-100 mb-2 ' + (isDragging ? 'bg-gray-600' : 'bg-gray-700') + ' border-dashed border-gray-600 border-2 duration-150 rounded-md';
}

function EvalCreate() {
    const components: Component[] = [
        {id: uuid(), description: null, type: 'title', title: 'Title'},
        {id: uuid(), description: null, type: 'subtitle', title: 'Subtitle'},
        {id: uuid(), description: null, type: 'text', title: 'Text'},
        {id: uuid(), description: null, type: 'section', title: 'Section'},
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
        "componentsColumn": [...components],
    });
    const [activeTab, setActiveTab] = useState<number>(0);

    const [evaluationTitle, setEvaluationTitle] = useState<string>('Formulary title');

    const reorder = (componentList: Component[], startIndex: number, endIndex: number) => {
        const result = Array.from(componentList);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    const onDragEnd = (result: DropResult) => {
        const {source, destination} = result;
        if (!destination || destination.droppableId === "componentsColumn") return;

        const sourceCol = columns[source.droppableId];
        const destinationCol = columns[destination.droppableId];

        if (source.droppableId === destination.droppableId) {
            const newComponents = reorder(sourceCol, source.index, destination.index);
            setColumns(prevState => ({...prevState, [source.droppableId]: newComponents}))
            return;
        }

        const component = {...sourceCol[source.index]};
        component.id = uuid();
        destinationCol.splice(destination.index, 0, component);

        setColumns(prevState => ({
            ...prevState,
            [destination.droppableId]: destinationCol,
        }));
    }

    const onChange = (id: string, changeEvent: ChangeEvent) => {
        if (id && changeEvent) {
            console.log('s')
        }
    }

    useEffect(() => {
        let newComponents = [components[0], components[1], components[3], components[2]]
        newComponents = newComponents.map(c => ({...c, id: uuid()}))
        setColumns(prevState => ({...prevState, ['formColumn']: newComponents}))
    }, []);

    return (
        <div className={'flex w-full h-full'}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={'w-2/3 p-4 overflow-auto'}>
                    <h1 className={'w-full mb-4 text-center text-2xl font-bold'} contentEditable
                        onChange={event => setEvaluationTitle(event.currentTarget.innerText)}
                    >
                        {evaluationTitle}
                    </h1>
                    <div
                        className={'rounded-lg bg-gray-800 relative border rounded-b-none border-gray-700 text-teal-900'}>
                        <Droppable droppableId={"formColumn"}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={'p-4 min-h-[500px] relative'}
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
                    <div className='mt-auto flex w-full justify-between gap-2 bg-gray-700 p-2 rounded-b-lg '>
                        <Button label='Cancel' onClick={() => alert()}/>
                        <Submit label={'Save'}/>
                    </div>
                </div>
                <Droppable droppableId={"componentsColumn"}>
                    {(provided) => (
                        <div className={"overflow-none h-screen overflow-hidden w-1/3"}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >
                            <div className={'w-full flex bg-gray-900 pt-3'}>
                                <div
                                    onClick={() => setActiveTab(0)}
                                    className={`flex p-3 rounded-b-none gap-2 cursor-pointer transition-all duration-50 select-none rounded-xl w-fit ${activeTab === 0 ? 'text-bold bg-gray-800 text-teal-300' : 'text-gray-400 bg-gray-900'}`}>
                                    <MdDashboard className={'w-5 h-auto'}/>
                                    Components
                                </div>
                                <div
                                    onClick={() => setActiveTab(1)}
                                    className={`flex p-3 rounded-b-none gap-2 cursor-pointer transition-all duration-50 select-none rounded-xl w-fit ${activeTab === 1 ? 'text-bold bg-gray-800 text-teal-300' : 'text-gray-400 bg-gray-900'}`}>
                                    <HiAdjustments className={'w-5 h-auto'}/>
                                    Configuration
                                </div>
                            </div>
                            <div className={'w-full bg-gray-800 px-3 pt-4 h-full'}>
                                {
                                    activeTab === 0 &&
                                    <ComponentsColumn componentsColumn={columns['componentsColumn']}/>
                                }
                                {
                                    activeTab === 1 && <ConfigurationColumn/>
                                }
                                {provided.placeholder}
                            </div>
                        </div>
                    )
                    }
                </Droppable>
            </DragDropContext>
        </div>
    );
}

const ComponentsColumn = ({componentsColumn}: { componentsColumn: Component[] }) => {
    return (
        <>
            {componentsColumn.map((component, index) => (
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
        </>
    )
}

const ConfigurationColumn = () => {
    const [isGraded, setIsGraded] = useState(false);
    const [defaultScore, setDefaultScore] = useState(1);
    const [showScore, setShowScore] = useState(false);
    const [shuffleQuestions, setShuffleQuestions] = useState(false);
    const [areQuestionsMandatory, setAreQuestionsMandatory] = useState(true);
    const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false);
    const [timeLimit, setTimeLimit] = useState<number | null>(null);

    return (
        <div className="p-4 space-y-6">
            <section>
                <h2 className="font-semibold mb-2">Grading Settings</h2>
                <Checkbox
                    id="isGraded"
                    text="Will this test be graded?"
                    contentEditable={false}
                    checked={isGraded}
                    onChange={() => setIsGraded(!isGraded)}
                />
                {isGraded && (
                    <div className="flex items-center">
                        <label className="mr-2">Default score per question:</label>
                        <TextInput
                            name="score_per_question"
                            type="number"
                            className="p-1 w-16"
                            value={defaultScore}
                            onChange={event => setDefaultScore(Number(event.currentTarget.value))}
                        />
                    </div>
                )}
            </section>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
            <section>
                <h2 className="font-semibold mb-2">Score Display Settings</h2>
                <Checkbox
                    id="showScore"
                    text="Show score to students after completion"
                    contentEditable={false}
                    checked={showScore}
                    onChange={() => setShowScore(!showScore)}
                />
            </section>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
            <section>
                <h2 className="font-semibold mb-2">Question Settings</h2>
                <Checkbox
                    id="shuffleQuestions"
                    text="Shuffle questions for each student"
                    contentEditable={false}
                    checked={shuffleQuestions}
                    onChange={() => setShuffleQuestions(!shuffleQuestions)}
                />
                <Checkbox
                    id="areQuestionsMandatory"
                    text="Are all questions mandatory?"
                    contentEditable={false}
                    checked={areQuestionsMandatory}
                    onChange={() => setAreQuestionsMandatory(!areQuestionsMandatory)}
                />
            </section>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
            <section>
                <h2 className="font-semibold mb-2">Other Settings</h2>
                <Checkbox
                    id="multipleAttempts"
                    text="Allow multiple attempts"
                    contentEditable={false}
                    checked={allowMultipleAttempts}
                    onChange={() => setAllowMultipleAttempts(!allowMultipleAttempts)}
                />
                <div className="flex items-center">
                    <label className="mr-2">Time limit for completion (minutes):</label>
                    <TextInput
                        name="time_limit"
                        type="number"
                        className="p-1 w-20"
                        value={timeLimit || ''}
                        onChange={event => setTimeLimit(Number(event.currentTarget.value))}
                    />
                </div>
            </section>
        </div>
    );
};


export default EvalCreate;
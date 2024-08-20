import {DraggableProvided} from "@hello-pangea/dnd";
import React, {ChangeEventHandler} from "react";

export default interface ComponentProps {
    id: string;
    columns: { [index: string]: Component[] };
    setColumns: React.Dispatch<React.SetStateAction<{ [p: string]: Component[] }>>
    description: string | null;
    title: string;
    provided: DraggableProvided;
    innerRef: (element?: (HTMLElement | null | undefined)) => void,
    className: string;
    onChange: ChangeEventHandler;
}

export interface Component {
    id: string;
    type: string;
    title: string;
    description: string | null;
}

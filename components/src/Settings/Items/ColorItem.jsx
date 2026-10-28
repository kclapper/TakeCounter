import React from 'react';
import { useCallback, useState } from "react";

import { SketchPicker } from 'react-color';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { Item } from "./Item";

function getDemoColor(color) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill={ color } className="bi bi-square-fill fs-1" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"/>
        </svg>
    );
}

export function ColorItem({ name, value, onChange, children }) {
    const [color, setColor] = useState(value);

    const handleChange = useCallback((color) => {
        setColor(color.hex);
    }, [setColor])

    const handleToggle = useCallback((nextShow) => {
        if (nextShow) {
            return;
        }
        onChange(color);
    }, [color, onChange]);

    const popover = (
        <Popover>
            <Popover.Body>
                <SketchPicker color={ color } onChange={ handleChange } />
            </Popover.Body>
        </Popover>
    )

    return (
        <Item name={ name } description={ children }>
            <div className='d-flex justify-content-end align-items-center w-100 h-100' >
                <OverlayTrigger trigger='click' placement='left' overlay={ popover } onToggle={ handleToggle } rootClose>
                    <div className='border border-black bg-black rounded-1'>
                        <div className='border border-white bg-white rounded-1'>
                            { getDemoColor(value) }
                        </div>
                    </div>
                </OverlayTrigger>
            </div>
        </Item>
    );
}
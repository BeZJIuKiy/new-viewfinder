import React from 'react';
import './drawer.css';
import { SimpleList } from './SimpleList';

export const Drawer = (props) => {
    return (
        <div className='drawer'>
            <SimpleList />
        </div>
    )
}
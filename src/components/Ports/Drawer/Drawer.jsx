import React from 'react';
import './drawer.css';
import { SimpleList } from './SimpleList';

export const Drawer = (props) => {
    return (
        <div className='drawer'>
            <SimpleList
                state={props.state}
                icons={props.icons}
                showCameras={props.showCameras}
                notification={props.notification}
                dispatch={props.dispatch}
            />
        </div>
    )
}
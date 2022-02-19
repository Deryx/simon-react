import React from 'react';
import ColoredButton from '../colored-button/colored-button';
import ControlPanel from '../control-panel/control-panel';
import './styles.css';

const Console = (): any => {
    return (
        <div id="console">
            <div className="buttons">
                <div className="row">
                    <ColoredButton buttonId="1" buttonClass="green-button" />
                    <ColoredButton buttonId="2" buttonClass="red-button" />
                </div>
                <div className="row">
                    <ColoredButton buttonId="3" buttonClass="yellow-button" />
                    <ColoredButton buttonId="4" buttonClass="blue-button" />
                </div>
            </div>
            <ControlPanel />
        </div>
    );
}

export default Console;
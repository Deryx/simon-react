import * as React from 'react';
import ColoredButton from '../colored-button/colored-button';
import ControlPanel from '../control-panel/control-panel';
import './styles.css';

class Console extends React.Component {
    public render() {
        return (
            <div id="console">
                <div className="buttons">
                    <div className="row">
                        <ColoredButton buttonId="0" buttonClass="green-button" />
                        <ColoredButton buttonId="1" buttonClass="red-button" />
                    </div>
                    <div className="row">
                        <ColoredButton buttonId="2" buttonClass="yellow-button" />
                        <ColoredButton buttonId="3" buttonClass="blue-button" />
                    </div>
                </div>
                <ControlPanel />
            </div>
        );
    }
}

export default Console;
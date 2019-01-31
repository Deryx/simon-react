import * as React from 'react';
import NamePlate from '../name-plate/name-plate';
import OnOffSwitch from '../on-off-switch/on-off-switch';
import PatternCounter from '../pattern-counter/pattern-counter';
import StartButton from '../start-button/start-button';
import StrictButton from '../strict-button/strict-button';
import './styles.css';

class ControlPanel extends React.Component {
    public render() {
        return (
            <div className="controls">
                <NamePlate />
                <div className="row">
                    <PatternCounter />
                    <StartButton />
                    <StrictButton />
                </div>
                <OnOffSwitch />
            </div>
        );
    }
}

export default ControlPanel;
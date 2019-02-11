import * as React from 'react';
import './styles.css';

interface IActionProps {
    startAction: any
}

class StartButton extends React.Component<IActionProps> {
    public render() {
        return (
            <div className="start">
                <div className="button" onClick={this.props.startAction} />
                <p>start</p>
            </div>
        );
    }
}

export default StartButton;
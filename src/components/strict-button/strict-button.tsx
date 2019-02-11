import * as React from 'react';
import './styles.css';

interface IActionProps {
    strictAction: any
}

class StrictButton extends React.Component<IActionProps> {
    public render() {
        return (
            <div className="strict">
                <div className="indicator" />
                <div className="button" onClick={this.props.strictAction} />
                <p>strict</p>
            </div>
        );
    }
}

export default StrictButton;
import * as React from 'react';
import './styles.css';

interface IActionProps {
    switchAction: any
}

class OnOffSwitch extends React.Component<IActionProps> {

    public render() {
        return (
            <div className="row">
                <div className="off">off</div>
                <div className="case">
                    <div className="switch" onClick={this.props.switchAction} />
                </div>
                <div className="on">on</div>
            </div>
        );
    }
}

export default OnOffSwitch;
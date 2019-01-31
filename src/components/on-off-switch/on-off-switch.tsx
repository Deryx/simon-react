import * as React from 'react';
import './styles.css';

class OnOffSwitch extends React.Component {
    public render() {
        return (
            <div className="row">
                <div className="off">off</div>
                <div className="case">
                    <div className="switch" />
                </div>
                <div className="on">on</div>
            </div>
        );
    }
}

export default OnOffSwitch;
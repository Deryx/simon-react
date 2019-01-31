import * as React from 'react';
import './styles.css';

class StrictButton extends React.Component {
    public render() {
        return (
            <div className="strict">
                <div className="indicator" />
                <div className="button" />
                <p>strict</p>
            </div>
        );
    }
}

export default StrictButton;
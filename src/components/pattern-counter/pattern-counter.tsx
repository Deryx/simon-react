import * as React from 'react';
import './styles.css';

class PatternCounter extends React.Component {
    public render() {
        return ( 
            <div className="counter">
                <div className="count">
                    <p>--</p>
                </div>
                <p>count</p>
            </div>
        );
    }
}

export default PatternCounter;
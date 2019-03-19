import * as React from 'react';
import './styles.css';

interface ICounterProps {
    counterState: string;   
}

class PatternCounter extends React.Component<ICounterProps> {
    public render() {
        return ( 
            <div className="counter">
                <div className="count">
                    <p>{this.props.counterState}</p>
                </div>
                <p>count</p>
            </div>
        );
    }
}

export default PatternCounter;

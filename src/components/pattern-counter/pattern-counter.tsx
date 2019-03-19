import * as React from 'react';
import './styles.css';

interface IPatternCounterProps {
    patternCount: number;   
}

class PatternCounter extends React.Component<IPatternCounterProps> {
    public render() {
        return ( 
            <div className="counter">
                <div className="count">
                    <p>{this.props.patternCount}</p>
                </div>
                <p>count</p>
            </div>
        );
    }
}

export default PatternCounter;

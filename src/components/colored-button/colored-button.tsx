import * as React from 'react';
import './styles.css';

interface IButtonProps {
    buttonId: string;
    buttonClass: string
}

class ColoredButton extends React.Component<IButtonProps> {
    public render() {
        return (
            <div id={this.props.buttonId} className={this.props.buttonClass}>
                <audio />
            </div>
        );
    }
}

export default ColoredButton;
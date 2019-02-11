import * as React from 'react';
import NamePlate from '../name-plate/name-plate';
import OnOffSwitch from '../on-off-switch/on-off-switch';
import PatternCounter from '../pattern-counter/pattern-counter';
import StartButton from '../start-button/start-button';
import StrictButton from '../strict-button/strict-button';
import './styles.css';

const MAX_STEPS: number = 20;
const BLANK_COUNTER: string = '';
const ON_COUNTER: string = '--';
const WRONG_COUNTER: string = '!!';

let stepNumber = 0;
let strictState: string = 'off';
let switchState: string = 'off';

let playerPattern: number[] = [];
let computerPattern: number[] = [];

function showDoubleDigit( num: number ): any {
    if( num >= 0 && num <= 9 ) {
        return "0" + num;
    } else {
        return num;
    }
}

function arraysIdentical( arr1: any, arr2: any ): boolean {
    if( arr1.length !== arr2.length ) {
        return false;
    }
    for( let i = 0, len = arr1.length; i <= len; i++ ) {
        if( arr1[i] !== arr2[i] ) {
            return false;
        }
    }

    return true;
}

function getRandomButton(): number {
    return Math.floor( Math.random() * 4 );
}

function playNextRound() {
    stepNumber++;
}

function resetGame(): void {
    stepNumber = 0;
    playerPattern = [];
    computerPattern = [];
}

function playGame(): any {
    if( stepNumber < MAX_STEPS ) {
        stepNumber++;
    } else {
        return playGame();
    }
}

class ControlPanel extends React.Component {
    constructor(props: any) {
        super(props);
    }

    public handleStartAction(evt: any) {       
        const patternCounter: any = document.querySelector('.count > p');

        evt.preventDefault();

        if(switchState && switchState === 'on') {
            patternCounter.textContent = showDoubleDigit(0);
            playGame();
        }
    }

    public handleStrictAction(evt: any) {
        const indicator: any = document.querySelector('.indicator');

        evt.preventDefault();

        strictState = strictState === 'off' ? 'on' : 'off';
        if(switchState && switchState === 'on') {
            if(strictState && strictState === 'off') {
                indicator.style.background = "green";
            } else {
                indicator.style.background = "red";
            }
        }
    }

    public handleSwitchAction(evt: any) {
        const switchButton: any = document.querySelector('.switch');
        const patternCounter: any = document.querySelector('.count > p');

        evt.preventDefault();

        switchState  = switchState === 'off' ? 'on' : 'off';
        if(switchState && switchState === 'off') {
            switchButton.style.float = 'left';
            patternCounter.textContent = BLANK_COUNTER;
        } else {
            switchButton.style.float = 'right';
            patternCounter.textContent = ON_COUNTER;
        }
    }

    public render() {
        return (
            <div className="controls">
                <NamePlate />
                <div className="row">
                    <PatternCounter />
                    <StartButton startAction={this.handleStartAction} />
                    <StrictButton strictAction={this.handleStrictAction} />
                </div>
                <OnOffSwitch switchAction={this.handleSwitchAction} />
            </div>
        );
    }
}

export default ControlPanel;
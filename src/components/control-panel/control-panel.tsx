import * as React from 'react';
import NamePlate from '../name-plate/name-plate';
import OnOffSwitch from '../on-off-switch/on-off-switch';
import PatternCounter from '../pattern-counter/pattern-counter';
import StartButton from '../start-button/start-button';
import StrictButton from '../strict-button/strict-button';
import './styles.css';

const simonButtons: any = [
    {color: "#008000", sound: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"},
    {color: "#FF0000", sound: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"},
    {color: "#F5AB35", sound: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"},
    {color: "#0000FF", sound: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"}
];

const MAX_STEPS: number = 20;
const BLANK_COUNTER: string  = '';
const ON_COUNTER: string = '--';
const WRONG_COUNTER: string = '!!';
const lightTime: number = 800;

let playerPattern: number[] = [];
let simonPattern: number[] = [];

class ControlPanel extends React.Component {
    public state: any;
 
    constructor( props: any ) {
        super(props);

        this.state = {
            _counter: 1,
            _strictState: 'off',
            _switchState: 'off'
        }

        this.handleSwitchAction = this.handleSwitchAction.bind(this);
        this.handleStrictAction = this.handleStrictAction.bind(this);
        this.handleStartAction = this.handleStartAction.bind(this);
        this.playGame = this.playGame.bind(this);
    }

    public handleSwitchAction(evt: any) {
        const patternCounter: any = document.querySelector( '.count > p' );
        const switchButton: any = document.querySelector( '.case > .switch' );
        evt.preventDefault();
        this.changeSwitchState();
        if(this.state._switchState && this.state._switchState === 'off') {
            switchButton.style.float = 'left';
            patternCounter.textContent = BLANK_COUNTER;
            this.resetGame();
        } else {
            switchButton.style.float = 'right';
            patternCounter.textContent = ON_COUNTER;
        }
    }

    public handleStrictAction(evt: any) {
        const indicator: any = document.querySelector( '.strict > .indicator' );
        const gameStatus: any = this.state._switchState;
        evt.preventDefault();
        this.changeStrictState();
        if(gameStatus === 'on' && (this.state._strictState && this.state._strictState === 'on')) {
            indicator.style.background = "green";
        } else {
            indicator.style.background = "red";
        }
    }

    public handleStartAction(evt: any) {
        const gameStatus: any = this.state._switchState;
        evt.preventDefault();
        if(gameStatus === 'on') {
            this.playGame();
        }
    };

    public playGame(): any {
        const patternCounter: any = document.querySelector( '.count > p' );
        ( () => {
            if( this.state._counter < MAX_STEPS ) {
                this.playRound( this.state._counter );
        
                setTimeout( () => {
                    if(this.arraysIdentical( simonPattern, playerPattern )) {
                    this.increaseRound();
                    return this.playGame();
                    } else {
                        patternCounter.textContext = WRONG_COUNTER;
                        if( this.state._strictState && this.state._strictState === "on") {
                            this.resetGame();
                            return this.playGame();
                        } else {
                            return this.playGame();
                        }
                    }
                }, this.state._counter * 2400 );
            }
        })();
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

    protected changeSwitchState(): void {
        let switchState: string = this.state._switchState;
        switchState = switchState === 'off' ? 'on' : 'off';
        this.setState({_switchState: switchState});
    }

    protected changeStrictState(): void {
        let strictState: string = this.state._strictState;
        strictState = strictState === 'off' ? 'on' : 'off';
        this.setState({_strictState: strictState});
    }

    protected increaseRound(): void {
        let counter = parseInt( this.state._counter, 10 );
        counter = counter++;
        this.setState({_counter: counter});
    }

    protected resetRound(): void {
        this.setState({_counter: 1})
    }

    protected showDoubleDigit( num: number ): string {
        if( num >= 0 && num <= 9 ) {
            return "0" + num;
        } else {
            return num.toString();
        }
    }
    
    protected arraysIdentical( arr1: number[], arr2: number[] ): any {
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
    
    protected resetGame(): void {
        playerPattern = [];
        simonPattern = [];
    }
    
    protected playRound( num: number ): void {
        const patternCounter: any = document.querySelector( '.count > p' );
        patternCounter.textContent = this.showDoubleDigit( num );
        simonPattern.push( this.getRandomButton() );
        this.playSimonPattern();
        this.getPlayerPattern();
    }
    
    protected playSimonPattern(): void {
        const simonLength: number = simonPattern.length;
		for (let i = 0; i < simonLength; i++) {
			( () => {
				setTimeout( () => {
					const button = simonPattern[i];
					this.lightSimonButton( button );
                }, i * lightTime);
			})();
		}
    }
    
    protected getPlayerPattern(): void {
        const simonLength: number = simonPattern.length;
		for (let i = 0; i < simonLength; i++) {
			( () => {
				setTimeout( () => {
					this.getSimonButton();
				}, i * lightTime);
			})();
		}
    }
    
    protected getSimonButton(): any {
        let btnClicked;
        const colorButton: any = document.querySelector( '[class$="button"]' );
        colorButton.onclick = ( event: any ) => {
            event = event || window.event;
            const target = event.target || event.srcElement;
    
            if( !isNaN( target.id ) ) {
                btnClicked = target.id;
                playerPattern.push( parseInt( btnClicked, 10 ) );
                this.lightSimonButton( btnClicked );
            }
        };
    }
    
    protected getRandomButton(): number {
        return Math.floor( Math.random() * 4 );
    }
    
    protected lightSimonButton( btn: number ): any {
        let originalColor: any = simonButtons[ btn ].color;
    
        const lightColor: any = this.lightenDarkenColor( originalColor, 90 );
    
        const button: any = document.getElementById( btn.toString() );
        button.style.backgroundColor = lightColor;
    
        this.playSound( btn );
        setTimeout( () => button.style.background = originalColor, lightTime / 2 );
        originalColor = '';
    }
    
    protected lightenDarkenColor( col: any, amt: number ): any {
        let usePound = false;
    
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }
    
        const num: any = parseInt( col, 16 );
        /* tslint:disable:no-bitwise */
        let r = (num >> 16) + amt;
    
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
    
        let b = ((num >> 8) & 0x00FF) + amt;
    
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
    
        let g = (num & 0x0000FF) + amt;
    
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
    
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
        /* tslint:enable:no-bitwise */
}
    
    protected playSound( btn: number ): void {
        const sound = simonButtons[ btn ].sound;
    
        const button: any = document.querySelector( "div[id='" + btn + "'] audio" );
    
        button.innerHTML = "<source src='" + sound + "'>";
        button.play();
    }
}

export default ControlPanel;
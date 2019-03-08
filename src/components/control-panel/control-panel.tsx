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
    {color: "#0000FF", sound: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"},
    {color: "#F5AB35", sound: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"}
];
// const patternCounter: any = document.querySelector( '.count > p' );
// const switchButton: any = document.querySelector( '.case > .switch' );

const MAX_STEPS: number = 20;
const BLANK_COUNTER: string  = '';
const ON_COUNTER: string = '--';
const WRONG_COUNTER: string = '!!';
const lightTime: number = 800;

let round: number = 1;
let playerPattern: number[] = [];
let simonPattern: number[] = [];
let strictState: string = 'off';
let switchState: string = 'off';

class ControlPanel extends React.Component {
    constructor( props: any ) {
        super(props);

        this.handleSwitchAction = this.handleSwitchAction.bind(this);
        this.handleStrictAction = this.handleStrictAction.bind(this);
        this.handleStartAction = this.handleStartAction.bind(this);
        this.playGame = this.playGame.bind(this);
    }

    public handleSwitchAction(evt: any) {
        const patternCounter: any = document.querySelector( '.count > p' );
        const switchButton: any = document.querySelector( '.case > .switch' );

        evt.preventDefault();
        switchState = switchState === 'off' ? 'on' : 'off';
        if(switchState && switchState === 'off') {
            switchButton.style.float = 'left';
            patternCounter.textContent = BLANK_COUNTER;
        } else {
            switchButton.style.float = 'right';
            patternCounter.textContent = ON_COUNTER;
        }
    }

    public handleStrictAction(evt: any) {
        const indicator: any = document.querySelector( '.indicator' );
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

    public handleStartAction(evt: any) {
        evt.preventDefault();
        if(switchState && switchState === 'on') {
            this.playGame();
        }
    };

    public playGame(): any {
        const patternCounter: any = document.querySelector( '.count > p' );
        ( () => {
            if( round < MAX_STEPS ) {
                patternCounter.textContext = this.showDoubleDigit( round );
                this.playRound();
        
                setTimeout( () => {
                    if(this.arraysIdentical( simonPattern, playerPattern )) {
                    round++;
                    return this.playGame();
                    } else {
                        patternCounter.textContext = WRONG_COUNTER;
                        if( strictState && strictState === "on") {
                            this.resetGame();
                            return this.playGame();
                        } else {
                            return this.playGame();
                        }
                    }
                }, round * 2400 );
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
        round = 1;
        playerPattern = [];
        simonPattern = [];
    }
    
    protected playRound(): void {
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
        simonPattern.forEach( ( button ) => setTimeout( () => {
            this.getSimonButton();
        }), lightTime );
    }
    
    protected getSimonButton(): void {
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
        const originalColor = simonButtons[ btn ].color;
    
        const lightColor = this.lightenDarkenColor( originalColor, 90 );
    
        const button: any = document.querySelector( "[id='" + btn + "']" );
        button.style.backgroundColor = lightColor;
    
        this.playSound( btn );
        setTimeout( () => button.style.backgroundColor = originalColor, lightTime/2 );
    }
    
    protected lightenDarkenColor( col: any, amt: any ): any {
        let usePound = false;
    
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }
    
        const num = parseInt( col, 16 );
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
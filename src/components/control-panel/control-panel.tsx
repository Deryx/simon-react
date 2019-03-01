import * as React from 'react';
import NamePlate from '../name-plate/name-plate';
import OnOffSwitch from '../on-off-switch/on-off-switch';
import PatternCounter from '../pattern-counter/pattern-counter';
import StartButton from '../start-button/start-button';
import StrictButton from '../strict-button/strict-button';
import './styles.css';

class ControlPanel extends React.Component {
    private readonly simonButtons = [
        {color: "#008000", sound: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"},
        {color: "#FF0000", sound: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"},
        {color: "#0000FF", sound: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"},
        {color: "#F5AB35", sound: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"}
    ];

    private readonly MAX_STEPS: number = 20;
    private readonly BLANK_COUNTER: string = '';
    private readonly ON_COUNTER: string = '--';
    private readonly WRONG_COUNTER: string = '!!';
    private readonly lightTime: number = 800;
    
    private round: number = 1;
    private playerPattern: number[] = [];
    private simonPattern: number[] = [];
    private strictState: string = 'off';
    private switchState: string = 'off';

    constructor(props:any) {
        super(props);

        this.state = {
            round: 1
        }

        this.handleStartAction = this.handleStartAction.bind(this);
        this.handleStrictAction = this.handleStrictAction.bind(this);
        this.handleSwitchAction = this.handleSwitchAction.bind(this);
    }

    public handleStartAction(evt: any) {       
        evt.preventDefault();
        if(this.switchState && this.switchState === 'on') {
            this.playGame();
        }
    }

    public handleStrictAction(evt: any) {
        const indicator:any = document.querySelector('.indicator');
        evt.preventDefault();
        this.strictState = this.strictState === 'off' ? 'on' : 'off';
        if(this.switchState && this.switchState === 'on') {
            if(this.strictState && this.strictState === 'off') {
                indicator.style.background = "green";
            } else {
                indicator.style.background = "red";
            }
        }
    }

    public handleSwitchAction(evt: any) {
        const patternCounter:any = document.querySelector('.count > p');
        const switchButton:any = document.querySelector('.case > .switch');
        evt.preventDefault();
        this.switchState = this.switchState === 'off' ? 'on' : 'off';
        if(this.switchState && this.switchState === 'off') {
            switchButton.style.float = 'left';
            patternCounter.textContent = this.BLANK_COUNTER;
        } else {
            switchButton.style.float = 'right';
            patternCounter.textContent = this.ON_COUNTER;
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

    protected showDoubleDigit( num: number ): any {
        if( num >= 0 && num <= 9 ) {
            return "0" + num;
        } else {
            return num;
        }
    }
    
    protected arraysIdentical( arr1: any, arr2: any ): boolean {
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
        this.round = 1;
        this.playerPattern = [];
        this.simonPattern = [];
    }
    
    protected playGame(): any {
        const patternCounter:any = document.querySelector('.count > p');
        if( this.round < this.MAX_STEPS ) {
            patternCounter.textContext = this.showDoubleDigit( this.round );
            this.playRound();
    
            if(this.arraysIdentical( this.simonPattern, this.playerPattern )) {
                this.round++;
                return this.playGame();
            } else {
                patternCounter.textContext = this.WRONG_COUNTER;
                if( this.strictState && this.strictState === "on") {
                    this.resetGame();
                    return this.playGame();
                } else {
                    return this.playGame();
                }
            }
        }
    }
    
    protected playRound(): void {
        this.simonPattern.push( this.getRandomButton() );
        this.playSimonPattern();
        this.getPlayerPattern();
    }
    
    protected playSimonPattern(): void {
        this.simonPattern.forEach( (button: number) => setTimeout( () => {
            this.lightSimonButton( button );
        }), this.lightTime );
    }
    
    protected getPlayerPattern(): void {
        this.simonPattern.forEach( (button:number) => setTimeout( () => {
            this.getSimonButton();
        }), this.lightTime );
    }
    
    protected getSimonButton(): void {
        let btnClicked: any;
        const colorButton: any = document.querySelector( '[class$="button"]' );
        colorButton.onclick = ( event: any ) => {
            event = event || window.event;
            const target: any = event.target || event.srcElement;
    
            if( !isNaN( target.id ) ) {
                btnClicked = target.id;
                this.playerPattern.push( parseInt(btnClicked, 10) );
                this.lightSimonButton( btnClicked );
            }
        };
    }
    
    protected getRandomButton(): number {
        return Math.floor( Math.random() * 4 );
    }
    
    protected lightSimonButton( btn: number ): void {
        const originalColor = this.simonButtons[ btn ].color;
    
        const lightColor = this.lightenDarkenColor( originalColor, 90 );
    
        const button: any = document.querySelector( "[id='" + btn + "']" );
        button.style.backgroundColor = lightColor;
    
        this.playSound( btn );
        setTimeout( () => button.style.backgroundColor = originalColor, this.lightTime/2);
    }
    
    protected lightenDarkenColor( col: any, amt: any ): any {
        let usePound = false;
    
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }
    
        const num: number = parseInt(col,16);
    
        /* tslint:disable:no-bitwise */
        let r: number = (num >> 16) + amt;
    
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
    
        let b: number = ((num >> 8) & 0x00FF) + amt;
    
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
    
        let g: number = (num & 0x0000FF) + amt;
    
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
    
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
        /* tslint:enable:no-bitwise */
    }
    
    protected playSound( btn: number ): void {
        const sound = this.simonButtons[ btn ].sound;
    
        const button: any = document.querySelector( "div[id='" + btn + "'] audio" );
    
        button.innerHTML = "<source src='" + sound + "'>";
        button.play();
    }
}

export default ControlPanel;
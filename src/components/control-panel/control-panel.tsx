import React from 'react';
import NamePlate from '../name-plate/name-plate';
import OnOffSwitch from '../on-off-switch/on-off-switch';
import StartButton from '../start-button/start-button';
import StrictButton from '../strict-button/strict-button';
import './styles.css';

const simonButtons: any = {
    1: {
        color: "#008000", 
        sound: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
        },
    2: {
        color: "#FF0000", 
        sound: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
        },
    3: {
        color: "#F5AB35", 
        sound: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
        },
    4: {
        color: "#0000FF", 
        sound: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
        }
};

const MAX_STEPS: number = 20;
const BLANK_COUNTER: string  = '';
const ON_COUNTER: string = '--';
const WRONG_COUNTER: string = '! !';
const lightTime: number = 800;

let simonOn: boolean = false;
let strictOn: boolean = false;
let playerPattern: any = {};
let simonPattern: any = {};
let count: number = 1;

const ControlPanel = (): any => {
    const getRandomButton = (): number => {
        return Math.floor( Math.random() * 4 + 1 );
    }

    const addSimonButton = (): void => {
        simonPattern[count] = getRandomButton();
    }

    const showCurrentCount = ( currentCnt: any ) => {
        const counterSpan: any = document.querySelector( '.counter .count span' );
        const currentNumber: string = count >= 0 && count <= 9 ? "0" + count : count.toString();
        counterSpan.innerText = typeof currentCnt === "string" ? currentCnt : currentNumber;
    }
    
    const resetGame = (): void => {
        count = 1;
        simonPattern = {};
    }

    const handleSwitchAction = () => {
        const switchButton: any = document.querySelector( '.case .switch' );
        const indicator: any = document.querySelector( '.strict .indicator' );

        let switchPosition: any = switchButton.style.float;

        if( switchPosition === 'left' ) {
            switchButton.style.float = 'right';
            showCurrentCount( ON_COUNTER );	
            indicator.style.background = "red";
            simonOn = true;
        } else {
            switchButton.style.float = 'left';
            showCurrentCount( BLANK_COUNTER );	
            resetGame();
            simonOn = false;
        }
    }

    const handleStrictAction = () => {
        const indicator: any = document.querySelector( '.strict .indicator' );
        strictOn = simonOn && !strictOn;
        indicator.style.background = strictOn ? 'green' : 'red';
    }

    const handleStartAction = () => {
        if( simonOn ) {
            console.log( strictOn );
            playGame();
        } else {
            showCurrentCount(BLANK_COUNTER);	
        }
    };
    
    const playSimonPattern = ( round: number ): void => {
        if( round === 1 ) {
            setTimeout( () => {
                lightSimonButton( simonPattern[1] );
            }, lightTime );
        } else {
            for (let i = 1; i <= round; i++) {
                const button = simonPattern[i];
                setTimeout( () => {
                    lightSimonButton( button );
                }, i * lightTime);
            }
        }
    }
    
    const getPlayerClick = (): void => {
        const greenButton: any = document.querySelector( '.green-button' );
        const redButton: any = document.querySelector( '.red-button' );
        const blueButton: any = document.querySelector( '.blue-button' );
        const yellowButton: any = document.querySelector( '.yellow-button' );
        
        greenButton.onclick = ( event: any ) => {
            processPlayerClick( event );
        }

        redButton.onclick = ( event: any ) => {
            processPlayerClick( event );
        }

        blueButton.onclick = ( event: any ) => {
            processPlayerClick( event );
        }

        yellowButton.onclick = ( event: any ) => {
            processPlayerClick( event );
        }
    }
	
    const processPlayerClick = ( event: any ): void => {
        event.preventDefault();

        event = event || window.event;
        const target = event.target || event.srcElement;

        const playerClick = parseInt( target.id, 10 );
        playerPattern[count] = playerClick;
        lightSimonButton( playerClick );
    }
    
    const lightSimonButton = ( btn: number ): any => {
        let originalColor: any = simonButtons[ btn ].color;
        const lightColor: any = lightenDarkenColor( originalColor, 90 );    
        const button: any = document.getElementById( btn.toString() );
    
        button.style.backgroundColor = lightColor;
    
        playSound( btn );
        setTimeout( () => button.style.background = originalColor, lightTime / 2 );
        originalColor = '';
    }
    
    const lightenDarkenColor = ( col: any, amt: number ): any => {
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
    
    const playSound = ( btn: number ): void => {
        const sound = simonButtons[ btn ].sound;    
        const button: any = document.querySelector( "div[id='" + btn + "'] audio" );

        button.innerHTML = "<source src='" + sound + "'>";
        button.play();
    }

    const playGame = (): any => {
        if( count <= MAX_STEPS ) {
            addSimonButton();
            showCurrentCount( count );
            playSimonPattern( count );
            for( let i = 1; i <= count; i++){
                getPlayerClick();
                setTimeout( () => {
                    if( Object.prototype.hasOwnProperty.call( playerPattern, i ) ){
                        clearTimeout();
                    } 
                }, 5000 );
                if( ( playerPattern[i] && simonPattern[i] !== playerPattern[i] ) ){
                    showCurrentCount( WRONG_COUNTER );
                    if( strictOn ){
                        resetGame();
                    }
                }
            }
            playerPattern = {};
            setTimeout( () => {
                count++; 
                playGame();
            }, count * 3000 );
        }	
    }
    
    return (
        <div className="controls">
            <NamePlate />
            <div className="row">
                <div className="counter">
                    <div className="count">
                        <span>{ BLANK_COUNTER }</span>
                    </div>
                    <p>count</p>
                </div>
                <StartButton startAction={ handleStartAction } />
                <StrictButton strictAction={ handleStrictAction } />
            </div>
            <OnOffSwitch switchAction={ handleSwitchAction } />
        </div>
    );
}

export default ControlPanel;
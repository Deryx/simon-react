import React from 'react';

const StartButton = ( props: any ): any =>  {
    return (
        <div className="start">
            <div className="button" onClick={ props.startAction } />
            <p>start</p>
        </div>
    );
}

export default StartButton;
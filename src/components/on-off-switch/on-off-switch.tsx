import React from 'react';
import './styles.css';

const OnOffSwitch = ( props: any ): any => {

    return (
        <div className="row">
            <div className="off">off</div>
            <div className="case">
                <div className="switch" onClick={ props.switchAction } />
            </div>
            <div className="on">on</div>
        </div>
    );
}

export default OnOffSwitch;
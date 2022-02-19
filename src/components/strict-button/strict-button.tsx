import React from 'react';

const StrictButton = ( props: any ): any => {

    return (
        <div className="strict">
            <div className="indicator" />
            <div className="button" onClick={ props.strictAction } />
            <p>strict</p>
        </div>
    );
}

export default StrictButton;
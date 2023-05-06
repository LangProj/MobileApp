import React from 'react';

import { useSelector } from 'react-redux';

const cardMenuWrapper = (WrappedComponent) => {
    return (props) => {
        const localization = useSelector(state => state.localization);
        return <WrappedComponent localization={localization} {...props}/>
    }
}

export default cardMenuWrapper;
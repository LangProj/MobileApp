import React from 'react';

import { useSelector } from 'react-redux';

const cardMenuWrapper = (WrappedComponent) => {
    return (props, navigation) => {
        const localization = useSelector(state => state.localization);
        const user = useSelector(state => state.user);
        return <WrappedComponent localization={localization} user={user} navigation={navigation} {...props}/>
    }
}

export default cardMenuWrapper;
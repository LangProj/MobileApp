import React from 'react';

import { useSelector } from 'react-redux';

const cardMenuWrapper = (WrappedComponent) => {
    return (props, navigation) => {
        const localization = useSelector(state => state.localization);
        const settings = useSelector(state => state.settings);
        const user = useSelector(state => state.user);

        return <WrappedComponent user={user} localization={localization} settings={settings} navigation={navigation} {...props}/>
    }
}

export default cardMenuWrapper;
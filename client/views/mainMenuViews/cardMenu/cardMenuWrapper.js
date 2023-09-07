import React, {useRef} from 'react';

import { useSelector } from 'react-redux';
import {Animated, PanResponder} from 'react-native';


const cardMenuWrapper = (WrappedComponent) => {
    return (props, navigation) => {
        const localization = useSelector(state => state.localization);
        const settings = useSelector(state => state.settings);
        const user = useSelector(state => state.user);
        const pan = useRef(new Animated.ValueXY()).current;
        const panResponder = useRef(
            PanResponder.create({
                onMoveShouldSetPanResponder: () => true,
                onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
                onPanResponderRelease: () => {
                    console.log("Workkkkk");
                  pan.extractOffset();
                },
              }),
        ).current;

        return <WrappedComponent pan={pan} panResponder={panResponder} user={user} localization={localization} settings={settings} navigation={navigation} {...props}/>
    }
}

export default cardMenuWrapper;
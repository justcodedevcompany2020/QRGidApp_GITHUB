// import React from 'react';
// import { Text, TouchableOpacity } from 'react-native';
// import * as TaskManager from 'expo-task-manager';
// import * as Location from 'expo-location';
//
// const LOCATION_TASK_NAME = 'background-location-task';
// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
//     if (error) {
//         // Error occurred - check `error.message` for more details.
//         return;
//     }
//     if (data) {
//         const { locations } = data;
//         // do something with the locations captured in the background
//     }
// });
// const requestPermissions = async () => {
//     const {status} = await Location.requestBackgroundPermissionsAsync();
//     if (status === 'granted') {
//         await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//             accuracy:Location.Accuracy.High,
//             timeInterval: 10000,
//             distanceInterval: 80,
//         });
//
//         let location = await Location.getCurrentPositionAsync({});
//         console.log(location, 'locationlocationlocation')
//     }
// };
//
// const PermissionsButton = () => (
//     <TouchableOpacity onPress={requestPermissions}>
//         <Text>Enable background location</Text>
//     </TouchableOpacity>
// );
//
//
// export default PermissionsButton;

import React, { useState, useEffect } from 'react';
import {Platform, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import Svg, {Defs, G, Path, Rect} from "react-native-svg";
import {SafeAreaView} from "react-native-safe-area-context";

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             setErrorMsg('Permission to access location was denied');
    //             return;
    //         }
    //
    //         let location = await Location.getCurrentPositionAsync({});
    //         console.log(location, 'locationlocationlocation')
    //         setLocation(location);
    //     })();
    // }, []);

    // let text = 'Waiting..';
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (location) {
    //     text = JSON.stringify(location);
    // }


    const test = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }

    return (
        <TouchableOpacity
            style={{
                width: 88,
                height: 88,
                position:'absolute',
                // right: 0,
                bottom:10,
                zIndex: 66,
                alignSelf:'center'
            }}
            onPress={() => {test()}}

        >
            <Svg xmlns="http://www.w3.org/2000/svg" width={88} height={88} viewBox="0 0 88 88" fill="none">
                <G filter="url(#filter0_dd_2458_3805)"><Rect x={16} y={12} width={56} height={56} rx={28} fill="#E1C1B7" /><Path fillRule="evenodd" clipRule="evenodd" d="M44 28.5a.5.5 0 000 1c.653 0 1.29.06 1.91.173a.5.5 0 10.18-.983A11.56 11.56 0 0044 28.5zm7.318 2.629a.5.5 0 00-.636.77A10.478 10.478 0 0154.5 40c0 2.86-1.144 5.454-3 7.349V45.5a.5.5 0 00-1 0v2.986a.5.5 0 00.5.5h3a.5.5 0 000-1h-1.725A11.463 11.463 0 0055.5 40c0-3.571-1.629-6.763-4.182-8.871zM34 31.014a.5.5 0 000 1h1.725A11.463 11.463 0 0032.5 40c0 6.351 5.149 11.5 11.5 11.5a.5.5 0 000-1c-5.799 0-10.5-4.701-10.5-10.5 0-2.86 1.144-5.454 3-7.349V34.5a.5.5 0 001 0v-2.986a.5.5 0 00-.5-.5h-3zM48 38.5c0 3-2.5 7-4 7s-4-4-4-7a4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z" fill="#1D1D20"/></G>
                <Defs></Defs>
            </Svg>

            {/*<Image style={{width: '100%', height: '100%'}} source={require('../../assets/fab.png')}/>*/}
        </TouchableOpacity>
    );
}

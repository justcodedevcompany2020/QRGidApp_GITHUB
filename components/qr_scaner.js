import React, { useState, useEffect } from 'react';
import {Button, Dimensions, StyleSheet, TouchableOpacity, Text, View, NativeModules, Platform} from 'react-native';

// import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import Svg, { Path, Defs, G, ClipPath, Circle, Mask } from "react-native-svg"

import { Camera } from 'expo-camera';

const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - 280) / 2;
const viewMinY = (height - 230) / 2;


import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {bel, en, ru} from "../i18n/supportedLanguages";
import * as Location from "expo-location";


export default function App(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    const [language, setLanguage] = useState('bel');
    const [language_name, setLanguageName] = useState('bel');
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off );
    const { navigation } = props;

    const goToDashboard = () => {
        setScanned(true);
        navigation.navigate('Dashboard')
    }

    useEffect(() => {
        (async () => {

            const unsubscribe = navigation.addListener('focus', async ()  =>  {


                await AsyncStorage.getItem('language',async (err,item) => {

                    let language = item ? JSON.parse(item) : {};
                    let set_language = ru;
                    let language_name = 'ru';

                    if (language.hasOwnProperty('language')) {
                        set_language = language.language == 'ru' ? ru : language.language == 'bel' ?  bel : en;
                        language_name = language.language == 'ru' ? 'ru' : language.language == 'bel' ?  'bel' : 'en';
                    }


                    setLanguage(set_language)
                    setLanguageName(language_name)

                    const { status } = await Camera.requestCameraPermissionsAsync();
                    setHasPermission(status === 'granted');

                })

            });
        })();
    }, []);


    const handleBarCodeScanned = async ({ type, data }) => {


        setScanned(true);

        let data_arr = data.split('ID=');


        if (data_arr.length == 2) {


            if (data_arr[0] == 'https://qr-gid.by/api/by/detail/?'  || data_arr[0] == 'https://qr-gid.by/api/detail/?' || data_arr[0] == 'https://qr-gid.by/api/en/detail/?')  {

                // Get user  location start
                    let { status } = await Location.requestForegroundPermissionsAsync();

                    if (status !== 'granted') {
                        return;
                    }

                    let location = await Location.getCurrentPositionAsync({});

                let url = 'https://qr-gid.by/api/detail/?';

                switch (language_name) {
                    case "bel":
                        url = 'https://qr-gid.by/api/by/detail/?';
                        break;
                    case "ru":
                        url = 'https://qr-gid.by/api/detail/?';
                        break;
                    case "en":
                        url = 'https://qr-gid.by/api/en/detail/?';
                        break;
                }


                // let data_arr2 = data_arr[1].split('&');
                // if (data_arr2.length == 2) {
                let user_id = await AsyncStorage.getItem('userId');

                let req = {
                    ID:data_arr[1],
                    coords: location.coords.latitude + ',' + location.coords.longitude ,
                    no_redirect:true,
                    user_id: user_id
                }

                axios.post(url,req).then((response) => {
                    // console.log(response.data);

                    navigation.navigate('Object', {
                        params: response.data,
                    })
                });

                // }


            } else {

                alert('Error wrong QR')
            }

        } else {
            alert('Error wrong QR')

        }


    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={ styles.topPanel}>

                <TouchableOpacity style={{marginRight:16,padding:10}} onPress={() => goToDashboard()}>
                    <Svg width={18} height={16} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path  d="M16.75 8H1m0 0l6.3-7M1 8l6.3 7"  stroke="#000"  strokeLinecap="round"  strokeLinejoin="round"/>
                    </Svg>
                </TouchableOpacity>

                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    {/*QR-сканер*/}
                    {language.qr_scaner}
                </Text>

                <View style={{flex: 1, height:'100%', alignItems:'flex-end', justifyContent:'center', paddingRight:12}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>




                        {Platform.OS !== 'ios' &&

                            <Svg  width={26}  height={26}  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                <Path fillRule="evenodd" clipRule="evenodd" d="M5.98 5H4a2 2 0 00-2 2 3 3 0 013 3v6h7.598a6.002 6.002 0 010-11H8v9a.5.5 0 01-1 0V5H5.98zM20 16h-2.598a6.002 6.002 0 000-11H20a2 2 0 012 2v7a2 2 0 01-2 2zM8 4h12a3 3 0 013 3v7l-.001.085c.014.02.028.042.04.065.297.58.461 1.201.461 1.85 0 1.641-1.04 3.073-2.61 4.149a.5.5 0 11-.565-.826C21.75 18.35 22.5 17.183 22.5 16c0-.105-.006-.21-.018-.315A2.997 2.997 0 0120 17H4a2.997 2.997 0 01-2.482-1.315A2.83 2.83 0 001.5 16c0 1.192.761 2.365 2.204 3.344 1.234.837 2.918 1.493 4.876 1.852l-.52-.958a.5.5 0 11.88-.476l1 1.844a.5.5 0 01-.07.574l-1.5 1.656a.5.5 0 11-.74-.672l.874-.965c-2.109-.375-3.967-1.082-5.361-2.028C1.553 19.093.5 17.653.5 16c0-.68.18-1.325.5-1.925V7a3 3 0 013-3h1a1 1 0 011-1h1a1 1 0 011 1zm11 6.5a4 4 0 11-8 0 4 4 0 018 0zm1 0a5 5 0 11-10 0 5 5 0 0110 0zm-2.5 2a.5.5 0 11-1 0 .5.5 0 011 0zm-4.785-3.015l-.914-.407A3.513 3.513 0 0112.9 7.7l.6.8c-.34.254-.611.593-.785.985zm1.494-1.357l-.316-.95C14.24 7.064 14.613 7 15 7c.506 0 .987.108 1.422.301l-.407.914a2.491 2.491 0 00-1.806-.087zm4.477 13.177a.5.5 0 10-.372-.928 15.557 15.557 0 01-3.39.903.5.5 0 00.152.988c1.31-.202 2.529-.53 3.61-.963z" fill="#393840"/>
                            </Svg>

                        }

                        {Platform.OS === 'ios' &&

                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={30}
                                height={30}
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <Path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6 3a1 1 0 00-1 1H4a3 3 0 00-3 3v10a3 3 0 003 3h16a3 3 0 003-3V7a3 3 0 00-3-3H8a1 1 0 00-1-1H6zM4 5a2 2 0 00-2 2v2a3 3 0 013 3v7h15a2 2 0 002-2V7a2 2 0 00-2-2H4zm5.5 7a4.5 4.5 0 118.626 1.8.5.5 0 10.916.4 5.5 5.5 0 10-10.391-.917l-1.025-.267a.5.5 0 00-.252.968l1.916.5.33.086.201-.277 1.084-1.5a.5.5 0 00-.81-.586l-.504.697A4.524 4.524 0 019.5 12zm7.8 4.4a.5.5 0 00-.6-.8c-.752.566-1.686.9-2.7.9a.5.5 0 000 1c1.238 0 2.381-.41 3.3-1.1z"
                                    fill="#393840"
                                />
                            </Svg>

                        }

                    </TouchableOpacity>
                </View>




                {flash == Camera.Constants.FlashMode.torch && Platform.OS === 'ios' &&

                <TouchableOpacity
                    style={{ position:'absolute', top:70, right:16, zIndex: 6666666666}}
                    onPress={() => setFlash( Camera.Constants.FlashMode.off )    }
                >
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M5.468 12.59l8.386-10.463c.327-.408.982-.104.88.409l-1.461 7.448a1 1 0 00.981 1.192h3.772c.878 0 1.33 1.05.727 1.687l-8.481 8.979c-.36.38-.989.022-.845-.481l1.68-5.87a1 1 0 00-.96-1.276H6.247a1 1 0 01-.78-1.625z" fill="#fff" />
                    </Svg>
                </TouchableOpacity>
                }




                {flash == Camera.Constants.FlashMode.off  && Platform.OS === 'ios' &&

                <TouchableOpacity
                    style={{ position:'absolute', top:70, right:16, zIndex: 6666666666}}
                    onPress={() => setFlash( Camera.Constants.FlashMode.torch )    }
                >
                    <Svg   width={24}  height={24}  viewBox="0 0 24 24"  fill="red"  xmlns="http://www.w3.org/2000/svg">
                        <Path fillRule="evenodd" clipRule="evenodd" d="M1.353.646a.5.5 0 10-.707.708l7.676 7.675-2.854 3.56a1 1 0 00.78 1.626h3.898a1 1 0 01.962 1.276l-1.68 5.87c-.145.503.484.861.844.48l5.276-5.585 7.098 7.098a.5.5 0 00.707-.708l-7.118-7.118 2.518-2.665c.603-.638.15-1.687-.727-1.687h-3.772a1 1 0 01-.981-1.192l1.462-7.448c.1-.513-.554-.817-.881-.409L8.951 8.244 1.353.646z" fill="#fff"/>
                    </Svg>
                </TouchableOpacity>
                }


            </View>


            {!scanned &&
                <Camera
                    type={type}
                    flashMode={flash}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{flex: 1, width:'100%'}}
                >

                </Camera>
            }

            {scanned &&

                <TouchableOpacity style={{backgroundColor: '#FF9161', padding:10, borderRadius:5, zIndex: 666}} title={'Tap to Scan Again'} onPress={() => setScanned(false)} >
                    <Text style={{color:'white'}}>
                        {/*Сканировать еще раз*/}
                        {language.qr_scann_again}
                    </Text>
                </TouchableOpacity>
            }

            <View style={{width:'100%', alignItems: 'center', justifyContent: 'center', paddingVertical:10, zIndex: 555}}>

                 <Text style={{color:'white', width:320, textAlign: 'center'}}>
                     {/*Поместите код в середину квадрата. {'\n'}Он будет отсканирован автоматически*/}
                     {language.qr_scaner_bottom_text}
                 </Text>

            </View>

            {flash == Camera.Constants.FlashMode.torch  && Platform.OS !== 'ios'&&

                <TouchableOpacity
                    style={{ position:'absolute', top:STATUSBAR_HEIGHT+72, right:16, zIndex: 6666666666}}
                    onPress={() => setFlash( Camera.Constants.FlashMode.off )    }
                >
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M5.468 12.59l8.386-10.463c.327-.408.982-.104.88.409l-1.461 7.448a1 1 0 00.981 1.192h3.772c.878 0 1.33 1.05.727 1.687l-8.481 8.979c-.36.38-.989.022-.845-.481l1.68-5.87a1 1 0 00-.96-1.276H6.247a1 1 0 01-.78-1.625z" fill="#fff" />
                    </Svg>
                </TouchableOpacity>
            }




            {flash == Camera.Constants.FlashMode.off && Platform.OS !== 'ios' &&

                <TouchableOpacity
                    style={{ position:'absolute', top:STATUSBAR_HEIGHT+72, right:16, zIndex: 6666666666}}
                    onPress={() => setFlash( Camera.Constants.FlashMode.torch )    }
                >
                    <Svg   width={24}  height={24}  viewBox="0 0 24 24"  fill="red"  xmlns="http://www.w3.org/2000/svg">
                        <Path fillRule="evenodd" clipRule="evenodd" d="M1.353.646a.5.5 0 10-.707.708l7.676 7.675-2.854 3.56a1 1 0 00.78 1.626h3.898a1 1 0 01.962 1.276l-1.68 5.87c-.145.503.484.861.844.48l5.276-5.585 7.098 7.098a.5.5 0 00.707-.708l-7.118-7.118 2.518-2.665c.603-.638.15-1.687-.727-1.687h-3.772a1 1 0 01-.981-1.192l1.462-7.448c.1-.513-.554-.817-.881-.409L8.951 8.244 1.353.646z" fill="#fff"/>
                    </Svg>
                </TouchableOpacity>
            }




            <BarcodeMask style={{zIndex: 55, position:'relative'}} edgeColor="#62B1F6" showAnimatedLine/>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    topPanel:{
        backgroundColor:'white',
        width:'100%',
        height:56,
        zIndex:555,
        paddingLeft:12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection:'row'
    }
});

import React, { Component } from 'react';
import {
    Text,
    Alert,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    ImageBackground,
    Platform,
    StatusBar,
    NativeModules,
    BackHandler, Modal
} from 'react-native';
const { StatusBarManager } = NativeModules;

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
// import LoaderComponent from './Loader';

// import axios from 'axios';
import { AuthContext } from './AuthContext/context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path, Defs, G, ClipPath, Circle, Mask } from "react-native-svg"

// import i18n from 'i18n-js';
import { ru, bel, en} from '../i18n/supportedLanguages';
// import {TouchableHighlight} from "react-native-web";

import {FiraSans_400Regular, FiraSans_500Medium} from "@expo-google-fonts/fira-sans";
import {
    useFonts,
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';
import * as Font from "expo-font";
import i18n from "i18n-js";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: {},
            isLogin: false,
            isLoading: false,
            show_unautorize_modal: false,
            fontsLoaded: false,
            open_set_language_popup: false,

            rus_l: false,
            belarus_l: false,
            eng_l: false,

        };

    }

    static contextType = AuthContext

    goToQrScanner = () => {
        this.props.navigation.navigate('QrScanner')
    }
    goToObjectMap = () => {
        // console.log(this.props.navigation, 'this.props.navigation')
        // this.props.navigation.push('ObjectMap')
        this.props.navigation.navigate('ObjectMap')
    }

    goToLogin = () => {
        this.props.navigation.navigate('Login')
    }

    goToResetPSW = () => {
        this.props.navigation.navigate('ResetPassword')
    }

    goToProfile = () => {
        this.props.navigation.navigate('Profile')
    }

    closeModal = () => {
        this.setState({
            show_unautorize_modal:false
        })
    }

    setLanguageFromStorage = async ()=> {

        // AsyncStorage.clear();
        // return false
        // ru, bel, en

        await AsyncStorage.getItem('language',(err,item) => {

            let language = item ? JSON.parse(item) : {};

            console.log(language, 'languagelanguagelanguage')
            let set_language = ru;

            if (language.hasOwnProperty('language')) {
                set_language = language.language == 'ru' ? ru : language.language == 'bel' ?  bel : language.language == 'en' ? en : ru;
            } else {
                this.setState({
                    open_set_language_popup: true,
                })
            }

            this.setState({
                language:set_language,
                isLoading: true,
            })

        })

    }

    _onBackPress = () => {
        // this.props.navigation.navigate('Dashboard')
        // this.props.navigation.navigate.goBack()
        // return true
    }

    checkLogin = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let userId = await AsyncStorage.getItem('userId');
        if (userToken) {
            this.setState({
                isLogin: true
            })
        } else {
            this.setState({
                isLogin: false
            })
        }

    }

    async loadFonts() {
        await Font.loadAsync({
            FiraSans_400Regular,
            FiraSans_500Medium,
            Ubuntu_400Regular,
            Ubuntu_500Medium,
        });
        await this.setState({ fontsLoaded: true });

    }


    componentDidMount() {
        const { navigation } = this.props;
        // BackHandler.addEventListener('hardwareBackPress', this._onBackPress)
        // AsyncStorage.removeItem('selected_oblast_and_region');

        this.checkLogin();
        this.setLanguageFromStorage();
        this.loadFonts();

        this.focusListener = navigation.addListener("focus", () => {
            this.checkLogin();
            this.setLanguageFromStorage();
            this.loadFonts();
        });
    }


    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();
            console.log('Bum END')
        }
        // BackHandler.removeEventListener('hardwareBackPress', this._onBackPress)

        // this.focusListener();

    }


     MyStatusBar = () => {

        return (
            <View style={[styles.statusBar, { backgroundColor:"#5E8D48" }]}>
                <SafeAreaView>
                    <StatusBar translucent backgroundColor={"#5E8D48"} barStyle="light-content" />
                </SafeAreaView>
            </View>
        )
     }

    changeLanguage = async (language) => {

        await this.setState({
            rus_l: language.rus_l,
            belarus_l: language.belarus_l,
            eng_l: language.eng_l
        })


    }

    saveNewLanguage = async () => {

        await this.setState({
            isLoading: false
        })

        let {rus_l, belarus_l, eng_l} = this.state;
        let locale_lng = rus_l ? 'ru' :  belarus_l ? 'bel' : 'en';

        i18n.locale = locale_lng;

        let set_language = locale_lng == 'ru' ? ru : locale_lng == 'bel' ?  bel : en;

        await AsyncStorage.setItem('language', JSON.stringify({language: locale_lng}))
        await AsyncStorage.removeItem('selected_oblast_and_region');

        await this.setState({
            isLoading: true,
            language:set_language,
            open_set_language_popup:false
            // isOpenChangeTerrain: true
        })

    }

    render() {

        if (!this.state.fontsLoaded) {
            return null;
        }

        if( !this.state.isLoading ) {
            return(
                <View style={{width: '100%', height: '100%', backgroundColor: '#FF9161', justifyContent:'center', alignItems:'center'}}>
                    <Svg
                        width={192}
                        height={192}
                        viewBox="0 0 192 192"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <Path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M64 4c33.137 0 60 26.863 60 60v60H64C30.863 124 4 97.137 4 64S30.863 4 64 4zm0 92c17.673 0 32-14.327 32-32 0-17.673-14.327-32-32-32-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32zm84-92h-16v28h16c6.627 0 12 5.373 12 12s-5.373 12-12 12h-16v28.714L154 124h34l-24.212-43.236C178.028 74.64 188 60.484 188 44c0-22.091-17.909-40-40-40zM4 152c0-11.046 8.954-20 20-20h36v18H30a8 8 0 00-8 8v30H4v-36zm64-20h18v28l18-28h20v56h-18v-28l-18 28H68v-56zm64 24c0-13.255 10.745-24 24-24h32v56h-56v-32zm18 2a8 8 0 018-8h12v20h-20v-12z"
                            fill="#fff"
                        />
                    </Svg>
                </View>
            );
        }





        {/*Language popup*/}


        {/*open_set_language_popup*/}


        {/*Language popup*/}


        if (Platform.OS === 'ios') {
            return (

                <SafeAreaProvider style={styles.container}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.open_set_language_popup}
                    >
                        <View
                            onPress={() => {
                                // this.setState({
                                //     open_set_language_popup:false
                                // })
                            }}
                            style={[styles.centeredView, ]}
                        >

                            <View style={[styles.modalView, {backgroundColor: '#F9F3F1', width: 280, padding: 0}]}>

                               <View style={{width:'100%', borderBottomWidth:1, borderBottomColor:'#EDDAD4', padding:20, flexDirection:'row', justifyContent:'space-between'}}>

                                   <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular', fontSize: 24}]}>
                                       {this.state.language.change_app_language2}
                                   </Text>

                                   <TouchableOpacity
                                       onPress={() => {
                                           this.setState({
                                               open_set_language_popup:false
                                           })
                                       }}
                                   >
                                       <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <Path d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z" fill="#393840" />
                                       </Svg>
                                   </TouchableOpacity>

                               </View>

                                <View style={{width: '100%', backgroundColor:'transparent', paddingLeft:24}}>

                                    <TouchableOpacity
                                        style={styles.languageItemWrapper}
                                        onPress={()=> {
                                             this.changeLanguage({rus_l: true, belarus_l: false,eng_l: false})
                                        }}
                                    >
                                        <View style={[styles.languageItemCheckBox, !this.state.rus_l ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>
                                            {this.state.rus_l &&
                                                <View style={styles.languageItemCheckBoxActive}></View>
                                            }
                                        </View>
                                        <Text  style={[styles.languageItemText, {fontFamily:'FiraSans_400Regular'}]}>Русский</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={styles.languageItemWrapper}
                                        onPress={()=> {
                                            this.changeLanguage({rus_l: false, belarus_l: true,eng_l: false})
                                        }}
                                    >
                                        <View style={[styles.languageItemCheckBox, !this.state.belarus_l ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>
                                            {this.state.belarus_l && <View style={styles.languageItemCheckBoxActive}></View>}
                                        </View>
                                        <Text  style={[styles.languageItemText, {fontFamily:'FiraSans_400Regular'}]}>Беларуская</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={styles.languageItemWrapper}
                                        onPress={()=> {
                                            this.changeLanguage({rus_l: false, belarus_l: false,eng_l: true})
                                        }}
                                    >
                                        <View style={[styles.languageItemCheckBox, !this.state.eng_l ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>
                                            {this.state.eng_l &&  <View style={styles.languageItemCheckBoxActive}></View>}
                                        </View>
                                        <Text  style={[styles.languageItemText, {fontFamily:'FiraSans_400Regular'}]}>English</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row',padding:20,borderTopWidth:1, borderTopColor:'#EDDAD4',}}>

                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => {
                                            this.saveNewLanguage();
                                        }}
                                    >

                                        <Text style={[styles.textStyle, {color: '#55545F'}, {fontFamily:'FiraSans_400Regular', fontSize: 14, fontWeight: 'bold',  textTransform: 'uppercase', }]}>
                                            {/*Сохранить*/}
                                            {this.state.language.save}
                                        </Text>

                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    </Modal>



                    {/*custom StatusBar*/}
                        <View style={ { backgroundColor:"#5E8D48", height: STATUSBAR_HEIGHT }}>
                            <StatusBar translucent backgroundColor={"#5E8D48"} barStyle="dark-content" />
                        </View>
                    {/*custom StatusBar*/}

                    <View style={styles.topBlock}>

                        {this.state.isLogin ?
                            <TouchableOpacity style={ styles.topBlockButton }
                                              onPress={() => this.goToProfile()}
                            >
                                <Text style={[styles.topBlockButtonText, {fontFamily:'Ubuntu_400Regular'}]}>
                                    {this.state.language.personal_area}

                                </Text>
                                <View style={styles.topBlockButtonIcon} >
                                    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Circle cx={40} cy={40} r={40} fill="#EDDAD4" />
                                        <Mask id="a" fill="#fff">
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M69 40c0 20.225-15.011 36.945-34.5 39.625 1.798.247 3.634.375 5.5.375 22.092 0 40-17.909 40-40S62.092 0 40 0c-1.866 0-3.702.128-5.5.375C53.99 3.055 69 19.775 69 40zm-2-1.041c0 5.144-1.443 9.951-3.947 14.041C58.31 45.253 49.76 40.082 40 40.082c-9.76 0-18.31 5.17-23.053 12.918A26.802 26.802 0 0113 38.959C13 24.069 25.088 12 40 12s27 12.07 27 26.959z"/>
                                        </Mask>
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M69 40c0 20.225-15.011 36.945-34.5 39.625 1.798.247 3.634.375 5.5.375 22.092 0 40-17.909 40-40S62.092 0 40 0c-1.866 0-3.702.128-5.5.375C53.99 3.055 69 19.775 69 40zm-2-1.041c0 5.144-1.443 9.951-3.947 14.041C58.31 45.253 49.76 40.082 40 40.082c-9.76 0-18.31 5.17-23.053 12.918A26.802 26.802 0 0113 38.959C13 24.069 25.088 12 40 12s27 12.07 27 26.959z"  fill="#E1C1B7"                                />
                                        <Path d="M34.5 79.625l-.409-2.972v5.944l.41-2.972zm0-79.25l-.409-2.972v5.944l.41-2.972zM63.053 53l-2.558 1.566 2.558 4.18 2.559-4.18L63.053 53zm-46.106 0l-2.559 1.566 2.559 4.18 2.558-4.18L16.947 53zm17.962 29.597C55.862 79.716 72 61.745 72 40h-6c0 18.706-13.884 34.174-31.909 36.653l.818 5.944zM40 77c-1.729 0-3.428-.118-5.091-.347l-.818 5.944a43.36 43.36 0 005.91.403v-6zm37-37c0 20.434-16.565 37-37 37v6c23.748 0 43-19.252 43-43h-6zM40 3c20.435 0 37 16.566 37 37h6C83 16.252 63.748-3 40-3v6zm-5.091.347A37.355 37.355 0 0140 3v-6c-2.003 0-3.976.137-5.909.403l.818 5.944zM72 40C72 18.255 55.862.284 34.91-2.597l-.818 5.944C52.116 5.826 66.001 21.294 66.001 40h6zm-6.388 14.566A29.802 29.802 0 0070 38.96h-6c0 4.575-1.282 8.843-3.505 12.475l5.117 3.133zM40 43.082c8.674 0 16.275 4.592 20.495 11.484l5.117-3.132C60.346 42.832 50.846 37.082 40 37.082v6zM19.505 54.566C23.725 47.674 31.326 43.082 40 43.082v-6c-10.845 0-20.345 5.75-25.612 14.352l5.117 3.133zM10 38.96c0 5.713 1.604 11.06 4.388 15.607l5.117-3.132A23.802 23.802 0 0116 38.959h-6zM40 9C23.436 9 10 22.409 10 38.959h6C16 25.73 26.741 15 40 15V9zm30 29.959C70 22.409 56.564 9 40 9v6c13.26 0 24 10.731 24 23.959h6z" fill="#E1C1B7" mask="url(#a)"/>
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M77 40c0 20.434-16.566 37-37 37S3 60.434 3 40 19.566 3 40 3s37 16.566 37 37zm3 0c0 22.091-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0s40 17.909 40 40zm-40-5a9 9 0 100-18 9 9 0 000 18zm0 3c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm-.004 4.756c-8.81 0-16.585 4.219-21.303 10.665a1.5 1.5 0 01-2.42-1.772c5.273-7.205 13.94-11.893 23.723-11.893 9.782 0 18.45 4.688 23.723 11.893a1.5 1.5 0 11-2.42 1.772c-4.72-6.446-12.494-10.665-21.303-10.665z"  fill="#44434C"/>
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={ styles.topBlockButton }
                                              onPress={() => this.goToLogin()}
                            >
                                <Text style={styles.topBlockButtonText}>

                                    {this.state.language.login}

                                </Text>
                                <View style={styles.topBlockButtonIcon} >
                                    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Circle cx={40} cy={40} r={40} fill="#EDDAD4" />
                                        <Mask id="a" fill="#fff">
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M69 40c0 20.225-15.011 36.945-34.5 39.625 1.798.247 3.634.375 5.5.375 22.092 0 40-17.909 40-40S62.092 0 40 0c-1.866 0-3.702.128-5.5.375C53.99 3.055 69 19.775 69 40zm-2-1.041c0 5.144-1.443 9.951-3.947 14.041C58.31 45.253 49.76 40.082 40 40.082c-9.76 0-18.31 5.17-23.053 12.918A26.802 26.802 0 0113 38.959C13 24.069 25.088 12 40 12s27 12.07 27 26.959z"/>
                                        </Mask>
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M69 40c0 20.225-15.011 36.945-34.5 39.625 1.798.247 3.634.375 5.5.375 22.092 0 40-17.909 40-40S62.092 0 40 0c-1.866 0-3.702.128-5.5.375C53.99 3.055 69 19.775 69 40zm-2-1.041c0 5.144-1.443 9.951-3.947 14.041C58.31 45.253 49.76 40.082 40 40.082c-9.76 0-18.31 5.17-23.053 12.918A26.802 26.802 0 0113 38.959C13 24.069 25.088 12 40 12s27 12.07 27 26.959z"  fill="#E1C1B7"                                />
                                        <Path d="M34.5 79.625l-.409-2.972v5.944l.41-2.972zm0-79.25l-.409-2.972v5.944l.41-2.972zM63.053 53l-2.558 1.566 2.558 4.18 2.559-4.18L63.053 53zm-46.106 0l-2.559 1.566 2.559 4.18 2.558-4.18L16.947 53zm17.962 29.597C55.862 79.716 72 61.745 72 40h-6c0 18.706-13.884 34.174-31.909 36.653l.818 5.944zM40 77c-1.729 0-3.428-.118-5.091-.347l-.818 5.944a43.36 43.36 0 005.91.403v-6zm37-37c0 20.434-16.565 37-37 37v6c23.748 0 43-19.252 43-43h-6zM40 3c20.435 0 37 16.566 37 37h6C83 16.252 63.748-3 40-3v6zm-5.091.347A37.355 37.355 0 0140 3v-6c-2.003 0-3.976.137-5.909.403l.818 5.944zM72 40C72 18.255 55.862.284 34.91-2.597l-.818 5.944C52.116 5.826 66.001 21.294 66.001 40h6zm-6.388 14.566A29.802 29.802 0 0070 38.96h-6c0 4.575-1.282 8.843-3.505 12.475l5.117 3.133zM40 43.082c8.674 0 16.275 4.592 20.495 11.484l5.117-3.132C60.346 42.832 50.846 37.082 40 37.082v6zM19.505 54.566C23.725 47.674 31.326 43.082 40 43.082v-6c-10.845 0-20.345 5.75-25.612 14.352l5.117 3.133zM10 38.96c0 5.713 1.604 11.06 4.388 15.607l5.117-3.132A23.802 23.802 0 0116 38.959h-6zM40 9C23.436 9 10 22.409 10 38.959h6C16 25.73 26.741 15 40 15V9zm30 29.959C70 22.409 56.564 9 40 9v6c13.26 0 24 10.731 24 23.959h6z" fill="#E1C1B7" mask="url(#a)"/>
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M77 40c0 20.434-16.566 37-37 37S3 60.434 3 40 19.566 3 40 3s37 16.566 37 37zm3 0c0 22.091-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0s40 17.909 40 40zm-40-5a9 9 0 100-18 9 9 0 000 18zm0 3c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm-.004 4.756c-8.81 0-16.585 4.219-21.303 10.665a1.5 1.5 0 01-2.42-1.772c5.273-7.205 13.94-11.893 23.723-11.893 9.782 0 18.45 4.688 23.723 11.893a1.5 1.5 0 11-2.42 1.772c-4.72-6.446-12.494-10.665-21.303-10.665z"  fill="#44434C"/>
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                        }

                        <View style={styles.centerBlock}>

                            <TouchableOpacity style={ styles.centerBlockButton }
                                  onPress={() => this.goToQrScanner()}
                            >

                                <View style={{width:'100%', alignItems:'flex-start'}}>
                                    <Text style={styles.centerBlockButtonText}>
                                        {this.state.language.scan}

                                    </Text>
                                    <Text style={styles.centerBlockButtonText}>
                                        {this.state.language.qr_code}

                                    </Text>
                                </View>

                                <View style={styles.centerBlockButtonIcon} >
                                    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path   fillRule="evenodd"   clipRule="evenodd"   d="M25.828 11.665H11.665v14.164h14.163V11.665zm42.497.001H54.161V25.83h14.164V11.666zM54.161 54.162h14.164v14.164H54.161V54.162zm-28.332 0H11.665v14.164H25.83V54.162z"   fill="#F9D7C8"  />
                                        <Path  d="M11.665 11.665v-1.5a1.5 1.5 0 00-1.5 1.5h1.5zm14.163 0h1.5a1.5 1.5 0 00-1.5-1.5v1.5zM11.665 25.829h-1.5a1.5 1.5 0 001.5 1.5v-1.5zm14.163 0v1.5a1.5 1.5 0 001.5-1.5h-1.5zm28.333-14.163v-1.5a1.5 1.5 0 00-1.5 1.5h1.5zm14.164 0h1.5a1.5 1.5 0 00-1.5-1.5v1.5zM54.161 25.83h-1.5a1.5 1.5 0 001.5 1.5v-1.5zm14.164 0v1.5a1.5 1.5 0 001.5-1.5h-1.5zm0 28.332h1.5a1.5 1.5 0 00-1.5-1.5v1.5zm-14.164 0v-1.5a1.5 1.5 0 00-1.5 1.5h1.5zm14.164 14.164v1.5a1.5 1.5 0 001.5-1.5h-1.5zm-14.164 0h-1.5a1.5 1.5 0 001.5 1.5v-1.5zM11.666 54.162v-1.5a1.5 1.5 0 00-1.5 1.5h1.5zm14.163 0h1.5a1.5 1.5 0 00-1.5-1.5v1.5zM11.665 68.326h-1.5a1.5 1.5 0 001.5 1.5v-1.5zm14.165 0v1.5a1.5 1.5 0 001.5-1.5h-1.5zM11.665 13.165h14.163v-3H11.665v3zm1.5 12.664V11.665h-3v14.164h3zm12.663-1.5H11.665v3h14.163v-3zm-1.5-12.664v14.164h3V11.665h-3zm29.833 1.501h14.164v-3H54.161v3zm1.5 12.664V11.666h-3V25.83h3zm12.664-1.5H54.161v3h14.164v-3zm-1.5-12.664V25.83h3V11.666h-3zm1.5 40.996H54.161v3h14.164v-3zm1.5 15.664V54.162h-3v14.164h3zm-15.664 1.5h14.164v-3H54.161v3zm-1.5-15.664v14.164h3V54.162h-3zm-40.995 1.5h14.163v-3H11.665v3zm1.5 12.664V54.162h-3v14.164h3zm12.663-1.5H11.665v3H25.83v-3zm-1.5-12.664v14.164h3V54.162h-3z"  fill="#F9D7C8"  />
                                        <Path  d="M35.273 68.326v-7.083h9.444V47.078m23.609-2.36H56.52v-9.444H49.44m-37.774 4.721h4.721m14.166 0h4.721V25.83h9.444V11.665"  stroke="#F9D7C8"  strokeWidth={3}  strokeLinecap="round"  strokeLinejoin="round" />
                                        <Path  d="M2.222 19.01V3.223a1 1 0 011-1h15.789M2.222 60.982V76.77a1 1 0 001 1h15.789m41.97 0h15.79a1 1 0 001-1V60.982m0-41.971V3.222a1 1 0 00-1-1H60.98"  stroke="#491C08"  strokeWidth={3}  strokeLinecap="round"  strokeLinejoin="round" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>


                            <View style={styles.bottomBlock}>

                                <TouchableOpacity
                                    style={ styles.bottomBlockButton}
                                    onPress={() => {

                                        if (this.state.isLogin) {
                                            this.goToObjectMap()

                                        } else {
                                            this.setState({
                                                show_unautorize_modal: true
                                            })
                                        }
                                    }}
                                >
                                    <Text style={styles.bottomBlockButtonText}>
                                        {this.state.language.find_interesting_places}

                                    </Text>
                                    <View style={styles.bottomBlockButtonIcon} >
                                        <Svg  width={80}  height={80}  viewBox="0 0 80 80"  fill="none"  xmlns="http://www.w3.org/2000/svg"  >
                                            <Path  d="M40.076 7v71m0 0H52.94m-12.864 0H27.213m34.474 0h2.058"   stroke="#3A2E03"   strokeWidth={3}   strokeLinecap="round"   strokeLinejoin="round" />
                                            <Path  d="M33.902 26.693H7.66L2 19.956l5.66-6.219h26.242"  stroke="#FAE69E"  strokeWidth={3}  strokeLinecap="round"  strokeLinejoin="round"   />
                                            <Path  d="M65.803 29.285H40.076v14.51h25.727l7.204-7.255-7.204-7.255z"  fill="#3A2E03"  stroke="#3A2E03"  strokeWidth={3}  strokeLinecap="round"  strokeLinejoin="round"  />
                                            <Path  d="M33.902 47.423H20.524l-6.175 6.22 6.175 6.736h13.378"   stroke="#3A2E03"   strokeWidth={3}   strokeLinecap="round"   strokeLinejoin="round"/>
                                        </Svg>
                                    </View>
                                </TouchableOpacity>


                            </View>

                        </View>

                    </View>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.show_unautorize_modal}
                        onRequestClose={() => {
                            this.closeModal()
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.closeModal()
                            }}
                            style={styles.centeredView}
                        >


                            <View style={[styles.modalView, {backgroundColor: '#FDF5D8'}]}>

                                <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Чтобы открыть карту зарегистрируйтесь или войдите.*/}
                                    {this.state.language.modal_text5}
                                </Text>

                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>
                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => {

                                            this.setState({
                                                show_unautorize_modal:false
                                            });

                                            this.goToLogin();

                                        }}
                                    >

                                        <Text style={[styles.textStyle, {color: '#8F7000'}, {fontFamily:'FiraSans_400Regular'}]}>
                                            {/*ЗАРЕГЕСТРИРОВАТЬСЯ*/}
                                            {this.state.language.sign_up}
                                        </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{marginLeft:16}}
                                        onPress={() => {
                                            this.setState({
                                                show_unautorize_modal:false
                                            })
                                            this.goToLogin()
                                        }}
                                    >
                                        <Text style={[styles.textStyle, {color: '#8F7000'}, {fontFamily:'FiraSans_400Regular'}]}>
                                            {/*ВОЙТИ*/}
                                            {this.state.language.sign_in}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </SafeAreaProvider>
            );

        } else {

            return (

                <SafeAreaView style={styles.container}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.open_set_language_popup}
                    >
                        <View
                            onPress={() => {
                                // this.setState({
                                //     open_set_language_popup:false
                                // })
                            }}
                            style={[styles.centeredView, ]}
                        >

                            <View style={[styles.modalView, {backgroundColor: '#F9F3F1', width: 280, padding: 0}]}>

                                <View style={{width:'100%', borderBottomWidth:1, borderBottomColor:'#EDDAD4', padding:20, flexDirection:'row', justifyContent:'space-between'}}>

                                    <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular', fontSize: 24}]}>
                                        {this.state.language.change_app_language2}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                open_set_language_popup:false
                                            })
                                        }}
                                    >
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z" fill="#393840" />
                                        </Svg>
                                    </TouchableOpacity>

                                </View>

                                <View style={{width: '100%', backgroundColor:'transparent', paddingLeft:24}}>

                                    <TouchableOpacity
                                        style={styles.languageItemWrapper}
                                        onPress={()=> {
                                            this.changeLanguage({rus_l: true, belarus_l: false,eng_l: false})
                                        }}
                                    >
                                        <View style={[styles.languageItemCheckBox, !this.state.rus_l ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>
                                            {this.state.rus_l &&
                                                <View style={styles.languageItemCheckBoxActive}></View>
                                            }
                                        </View>
                                        <Text  style={[styles.languageItemText, {fontFamily:'FiraSans_400Regular'}]}>Русский</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={styles.languageItemWrapper}
                                        onPress={()=> {
                                            this.changeLanguage({rus_l: false, belarus_l: true,eng_l: false})
                                        }}
                                    >
                                        <View style={[styles.languageItemCheckBox, !this.state.belarus_l ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>
                                            {this.state.belarus_l && <View style={styles.languageItemCheckBoxActive}></View>}
                                        </View>
                                        <Text  style={[styles.languageItemText, {fontFamily:'FiraSans_400Regular'}]}>Беларуская</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={styles.languageItemWrapper}
                                        onPress={()=> {
                                            this.changeLanguage({rus_l: false, belarus_l: false,eng_l: true})
                                        }}
                                    >
                                        <View style={[styles.languageItemCheckBox, !this.state.eng_l ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>
                                            {this.state.eng_l &&  <View style={styles.languageItemCheckBoxActive}></View>}
                                        </View>
                                        <Text  style={[styles.languageItemText, {fontFamily:'FiraSans_400Regular'}]}>English</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row',padding:20,borderTopWidth:1, borderTopColor:'#EDDAD4',}}>

                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => {
                                            this.saveNewLanguage();
                                        }}
                                    >

                                        <Text style={[styles.textStyle, {color: '#55545F'}, {fontFamily:'FiraSans_400Regular', fontSize: 14, fontWeight: 'bold',  textTransform: 'uppercase', }]}>
                                            {/*Сохранить*/}
                                            {this.state.language.save}
                                        </Text>

                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    </Modal>

                    <View style={styles.topBlock}>


                        {this.state.isLogin ?

                            <TouchableOpacity style={ styles.topBlockButton }
                                              onPress={() => this.goToProfile()}
                            >
                                <Text style={[styles.topBlockButtonText, {fontFamily:'Ubuntu_400Regular'}]}>
                                    {this.state.language.personal_area}
                                </Text>
                                <View style={styles.topBlockButtonIcon} >
                                    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Circle cx={40} cy={40} r={40} fill="#EDDAD4" />
                                        <Mask id="a" fill="#fff">
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M69 40c0 20.225-15.011 36.945-34.5 39.625 1.798.247 3.634.375 5.5.375 22.092 0 40-17.909 40-40S62.092 0 40 0c-1.866 0-3.702.128-5.5.375C53.99 3.055 69 19.775 69 40zm-2-1.041c0 5.144-1.443 9.951-3.947 14.041C58.31 45.253 49.76 40.082 40 40.082c-9.76 0-18.31 5.17-23.053 12.918A26.802 26.802 0 0113 38.959C13 24.069 25.088 12 40 12s27 12.07 27 26.959z"/>
                                        </Mask>
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M69 40c0 20.225-15.011 36.945-34.5 39.625 1.798.247 3.634.375 5.5.375 22.092 0 40-17.909 40-40S62.092 0 40 0c-1.866 0-3.702.128-5.5.375C53.99 3.055 69 19.775 69 40zm-2-1.041c0 5.144-1.443 9.951-3.947 14.041C58.31 45.253 49.76 40.082 40 40.082c-9.76 0-18.31 5.17-23.053 12.918A26.802 26.802 0 0113 38.959C13 24.069 25.088 12 40 12s27 12.07 27 26.959z"  fill="#E1C1B7"                                />
                                        <Path d="M34.5 79.625l-.409-2.972v5.944l.41-2.972zm0-79.25l-.409-2.972v5.944l.41-2.972zM63.053 53l-2.558 1.566 2.558 4.18 2.559-4.18L63.053 53zm-46.106 0l-2.559 1.566 2.559 4.18 2.558-4.18L16.947 53zm17.962 29.597C55.862 79.716 72 61.745 72 40h-6c0 18.706-13.884 34.174-31.909 36.653l.818 5.944zM40 77c-1.729 0-3.428-.118-5.091-.347l-.818 5.944a43.36 43.36 0 005.91.403v-6zm37-37c0 20.434-16.565 37-37 37v6c23.748 0 43-19.252 43-43h-6zM40 3c20.435 0 37 16.566 37 37h6C83 16.252 63.748-3 40-3v6zm-5.091.347A37.355 37.355 0 0140 3v-6c-2.003 0-3.976.137-5.909.403l.818 5.944zM72 40C72 18.255 55.862.284 34.91-2.597l-.818 5.944C52.116 5.826 66.001 21.294 66.001 40h6zm-6.388 14.566A29.802 29.802 0 0070 38.96h-6c0 4.575-1.282 8.843-3.505 12.475l5.117 3.133zM40 43.082c8.674 0 16.275 4.592 20.495 11.484l5.117-3.132C60.346 42.832 50.846 37.082 40 37.082v6zM19.505 54.566C23.725 47.674 31.326 43.082 40 43.082v-6c-10.845 0-20.345 5.75-25.612 14.352l5.117 3.133zM10 38.96c0 5.713 1.604 11.06 4.388 15.607l5.117-3.132A23.802 23.802 0 0116 38.959h-6zM40 9C23.436 9 10 22.409 10 38.959h6C16 25.73 26.741 15 40 15V9zm30 29.959C70 22.409 56.564 9 40 9v6c13.26 0 24 10.731 24 23.959h6z" fill="#E1C1B7" mask="url(#a)"/>
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M77 40c0 20.434-16.566 37-37 37S3 60.434 3 40 19.566 3 40 3s37 16.566 37 37zm3 0c0 22.091-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0s40 17.909 40 40zm-40-5a9 9 0 100-18 9 9 0 000 18zm0 3c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm-.004 4.756c-8.81 0-16.585 4.219-21.303 10.665a1.5 1.5 0 01-2.42-1.772c5.273-7.205 13.94-11.893 23.723-11.893 9.782 0 18.45 4.688 23.723 11.893a1.5 1.5 0 11-2.42 1.772c-4.72-6.446-12.494-10.665-21.303-10.665z"  fill="#44434C"/>
                                    </Svg>
                                </View>
                            </TouchableOpacity>

                            :

                            <TouchableOpacity style={ styles.topBlockButton }
                                  onPress={() => this.goToLogin()}
                            >
                                <Text style={[styles.topBlockButtonText, {fontFamily:'Ubuntu_400Regular'}]}>
                                    {this.state.language.login}
                                </Text>
                                <View style={styles.topBlockButtonIcon} >
                                    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Circle cx={40} cy={40} r={40} fill="#EDDAD4" />
                                        <Mask id="a" fill="#fff">
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M69 40c0 20.225-15.011 36.945-34.5 39.625 1.798.247 3.634.375 5.5.375 22.092 0 40-17.909 40-40S62.092 0 40 0c-1.866 0-3.702.128-5.5.375C53.99 3.055 69 19.775 69 40zm-2-1.041c0 5.144-1.443 9.951-3.947 14.041C58.31 45.253 49.76 40.082 40 40.082c-9.76 0-18.31 5.17-23.053 12.918A26.802 26.802 0 0113 38.959C13 24.069 25.088 12 40 12s27 12.07 27 26.959z"/>
                                        </Mask>
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M69 40c0 20.225-15.011 36.945-34.5 39.625 1.798.247 3.634.375 5.5.375 22.092 0 40-17.909 40-40S62.092 0 40 0c-1.866 0-3.702.128-5.5.375C53.99 3.055 69 19.775 69 40zm-2-1.041c0 5.144-1.443 9.951-3.947 14.041C58.31 45.253 49.76 40.082 40 40.082c-9.76 0-18.31 5.17-23.053 12.918A26.802 26.802 0 0113 38.959C13 24.069 25.088 12 40 12s27 12.07 27 26.959z"  fill="#E1C1B7"                                />
                                        <Path d="M34.5 79.625l-.409-2.972v5.944l.41-2.972zm0-79.25l-.409-2.972v5.944l.41-2.972zM63.053 53l-2.558 1.566 2.558 4.18 2.559-4.18L63.053 53zm-46.106 0l-2.559 1.566 2.559 4.18 2.558-4.18L16.947 53zm17.962 29.597C55.862 79.716 72 61.745 72 40h-6c0 18.706-13.884 34.174-31.909 36.653l.818 5.944zM40 77c-1.729 0-3.428-.118-5.091-.347l-.818 5.944a43.36 43.36 0 005.91.403v-6zm37-37c0 20.434-16.565 37-37 37v6c23.748 0 43-19.252 43-43h-6zM40 3c20.435 0 37 16.566 37 37h6C83 16.252 63.748-3 40-3v6zm-5.091.347A37.355 37.355 0 0140 3v-6c-2.003 0-3.976.137-5.909.403l.818 5.944zM72 40C72 18.255 55.862.284 34.91-2.597l-.818 5.944C52.116 5.826 66.001 21.294 66.001 40h6zm-6.388 14.566A29.802 29.802 0 0070 38.96h-6c0 4.575-1.282 8.843-3.505 12.475l5.117 3.133zM40 43.082c8.674 0 16.275 4.592 20.495 11.484l5.117-3.132C60.346 42.832 50.846 37.082 40 37.082v6zM19.505 54.566C23.725 47.674 31.326 43.082 40 43.082v-6c-10.845 0-20.345 5.75-25.612 14.352l5.117 3.133zM10 38.96c0 5.713 1.604 11.06 4.388 15.607l5.117-3.132A23.802 23.802 0 0116 38.959h-6zM40 9C23.436 9 10 22.409 10 38.959h6C16 25.73 26.741 15 40 15V9zm30 29.959C70 22.409 56.564 9 40 9v6c13.26 0 24 10.731 24 23.959h6z" fill="#E1C1B7" mask="url(#a)"/>
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M77 40c0 20.434-16.566 37-37 37S3 60.434 3 40 19.566 3 40 3s37 16.566 37 37zm3 0c0 22.091-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0s40 17.909 40 40zm-40-5a9 9 0 100-18 9 9 0 000 18zm0 3c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm-.004 4.756c-8.81 0-16.585 4.219-21.303 10.665a1.5 1.5 0 01-2.42-1.772c5.273-7.205 13.94-11.893 23.723-11.893 9.782 0 18.45 4.688 23.723 11.893a1.5 1.5 0 11-2.42 1.772c-4.72-6.446-12.494-10.665-21.303-10.665z"  fill="#44434C"/>
                                    </Svg>
                                </View>
                            </TouchableOpacity>

                        }



                        <View style={styles.centerBlock}>

                            <TouchableOpacity style={ styles.centerBlockButton }
                                              onPress={() => this.goToQrScanner()}
                            >

                                <View style={{width:'100%', alignItems:'flex-start'}}>
                                    <Text style={[styles.centerBlockButtonText, {fontFamily:'Ubuntu_400Regular'}]}>
                                        {this.state.language.scan}
                                    </Text>
                                    <Text style={[styles.centerBlockButtonText, {fontFamily:'Ubuntu_400Regular'}]}>
                                        {this.state.language.qr_code}
                                    </Text>
                                </View>

                                <View style={styles.centerBlockButtonIcon} >
                                    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path   fillRule="evenodd"   clipRule="evenodd"   d="M25.828 11.665H11.665v14.164h14.163V11.665zm42.497.001H54.161V25.83h14.164V11.666zM54.161 54.162h14.164v14.164H54.161V54.162zm-28.332 0H11.665v14.164H25.83V54.162z"   fill="#F9D7C8"  />
                                        <Path  d="M11.665 11.665v-1.5a1.5 1.5 0 00-1.5 1.5h1.5zm14.163 0h1.5a1.5 1.5 0 00-1.5-1.5v1.5zM11.665 25.829h-1.5a1.5 1.5 0 001.5 1.5v-1.5zm14.163 0v1.5a1.5 1.5 0 001.5-1.5h-1.5zm28.333-14.163v-1.5a1.5 1.5 0 00-1.5 1.5h1.5zm14.164 0h1.5a1.5 1.5 0 00-1.5-1.5v1.5zM54.161 25.83h-1.5a1.5 1.5 0 001.5 1.5v-1.5zm14.164 0v1.5a1.5 1.5 0 001.5-1.5h-1.5zm0 28.332h1.5a1.5 1.5 0 00-1.5-1.5v1.5zm-14.164 0v-1.5a1.5 1.5 0 00-1.5 1.5h1.5zm14.164 14.164v1.5a1.5 1.5 0 001.5-1.5h-1.5zm-14.164 0h-1.5a1.5 1.5 0 001.5 1.5v-1.5zM11.666 54.162v-1.5a1.5 1.5 0 00-1.5 1.5h1.5zm14.163 0h1.5a1.5 1.5 0 00-1.5-1.5v1.5zM11.665 68.326h-1.5a1.5 1.5 0 001.5 1.5v-1.5zm14.165 0v1.5a1.5 1.5 0 001.5-1.5h-1.5zM11.665 13.165h14.163v-3H11.665v3zm1.5 12.664V11.665h-3v14.164h3zm12.663-1.5H11.665v3h14.163v-3zm-1.5-12.664v14.164h3V11.665h-3zm29.833 1.501h14.164v-3H54.161v3zm1.5 12.664V11.666h-3V25.83h3zm12.664-1.5H54.161v3h14.164v-3zm-1.5-12.664V25.83h3V11.666h-3zm1.5 40.996H54.161v3h14.164v-3zm1.5 15.664V54.162h-3v14.164h3zm-15.664 1.5h14.164v-3H54.161v3zm-1.5-15.664v14.164h3V54.162h-3zm-40.995 1.5h14.163v-3H11.665v3zm1.5 12.664V54.162h-3v14.164h3zm12.663-1.5H11.665v3H25.83v-3zm-1.5-12.664v14.164h3V54.162h-3z"  fill="#F9D7C8"  />
                                        <Path  d="M35.273 68.326v-7.083h9.444V47.078m23.609-2.36H56.52v-9.444H49.44m-37.774 4.721h4.721m14.166 0h4.721V25.83h9.444V11.665"  stroke="#F9D7C8"  strokeWidth={3}  strokeLinecap="round"  strokeLinejoin="round" />
                                        <Path  d="M2.222 19.01V3.223a1 1 0 011-1h15.789M2.222 60.982V76.77a1 1 0 001 1h15.789m41.97 0h15.79a1 1 0 001-1V60.982m0-41.971V3.222a1 1 0 00-1-1H60.98"  stroke="#491C08"  strokeWidth={3}  strokeLinecap="round"  strokeLinejoin="round" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>


                            <View style={styles.bottomBlock}>

                                <TouchableOpacity
                                    style={ styles.bottomBlockButton}
                                    onPress={() => {

                                        if (this.state.isLogin) {
                                            this.goToObjectMap()

                                        } else {

                                            this.setState({
                                                show_unautorize_modal: true
                                            })
                                        }
                                    }}
                                >
                                    <Text style={[styles.bottomBlockButtonText, {fontFamily:'Ubuntu_400Regular'}]}>
                                        {this.state.language.find_interesting_places}
                                    </Text>
                                    <View style={styles.bottomBlockButtonIcon} >
                                        <Svg  width={80}  height={80}  viewBox="0 0 80 80"  fill="none"  xmlns="http://www.w3.org/2000/svg"  >
                                            <Path  d="M40.076 7v71m0 0H52.94m-12.864 0H27.213m34.474 0h2.058"   stroke="#3A2E03"   strokeWidth={3}   strokeLinecap="round"   strokeLinejoin="round" />
                                            <Path  d="M33.902 26.693H7.66L2 19.956l5.66-6.219h26.242"  stroke="#FAE69E"  strokeWidth={3}  strokeLinecap="round"  strokeLinejoin="round"   />
                                            <Path  d="M65.803 29.285H40.076v14.51h25.727l7.204-7.255-7.204-7.255z"  fill="#3A2E03"  stroke="#3A2E03"  strokeWidth={3}  strokeLinecap="round"  strokeLinejoin="round"  />
                                            <Path  d="M33.902 47.423H20.524l-6.175 6.22 6.175 6.736h13.378"   stroke="#3A2E03"   strokeWidth={3}   strokeLinecap="round"   strokeLinejoin="round"/>
                                        </Svg>
                                    </View>
                                </TouchableOpacity>


                            </View>

                        </View>

                    </View>



                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.show_unautorize_modal}
                        onRequestClose={() => {
                            this.closeModal()
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.closeModal()
                            }}
                            style={styles.centeredView}
                        >


                            <View style={[styles.modalView, {backgroundColor: '#FDF5D8'}]}>

                                <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Чтобы открыть карту зарегистрируйтесь или войдите.*/}
                                    {this.state.language.modal_text5}
                                </Text>

                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>
                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => {

                                            this.setState({
                                                show_unautorize_modal:false
                                            });

                                            this.goToLogin();

                                        }}
                                    >

                                        <Text style={[styles.textStyle, {color: '#8F7000'}, {fontFamily:'FiraSans_400Regular'}]}>
                                            {/*ЗАРЕГЕСТРИРОВАТЬСЯ*/}
                                            {this.state.language.sign_up}
                                        </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{marginLeft:16}}
                                        onPress={() => {
                                            this.setState({
                                                show_unautorize_modal:false
                                            })
                                            this.goToLogin()
                                        }}
                                    >
                                        <Text style={[styles.textStyle, {color: '#8F7000'}, {fontFamily:'FiraSans_400Regular'}]}>
                                            {/*ВОЙТИ*/}
                                            {this.state.language.sign_in}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>

                </SafeAreaView>
            );
        }


    }
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'white',
        paddingTop: Platform.OS === 'ios' ? 40 : 24
    },

    statusBar: {
        // height: STATUSBAR_HEIGHT,
        height: 40,
    },

    topBlock:{
        backgroundColor: '#E1C1B7',
        flex: 1,
        width:'100%',
        borderTopLeftRadius:56,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },

    topBlockButton:{
        flex:1,
        width: '100%',
        backgroundColor: '#E1C1B2',
        borderTopLeftRadius:56,
        paddingTop: 32,
        paddingRight:16,
        paddingLeft:70,
        alignItems: 'flex-end',

    },

    topBlockButtonText:{
        color:'#1D1D20',
        fontSize:30,
        marginBottom:20,
        width:'100%'
    },
    topBlockButtonIcon:{
        position:'absolute',
        right:16,
        bottom:16
    },

    centerBlock:{
        width: '100%',
        height:'70%',
        backgroundColor:'#FF9161',
        borderTopLeftRadius:56,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: -5,
        },
        shadowRadius: 10.41,

        elevation: 25,
    },

    centerBlockButton:{
        flex:1,
        width: '100%',
        backgroundColor: '#FF9161',
        borderTopLeftRadius:56,
        paddingTop: 32,
        paddingRight:16,
        paddingLeft:70,
        alignItems: 'flex-end',



    },

    centerBlockButtonText:{
        color:'#1D1D20',
        fontSize:30,
        width:'100%'
    },
    centerBlockButtonIcon:{
        marginTop:20,
        position:'absolute',
        right:16,
        bottom:16
    },


    bottomBlock:{
        width: '100%',
        height:'50%',
        backgroundColor:'#F3C316',
        borderTopLeftRadius:56,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: -5,
        },
        shadowRadius: 10.41,

        elevation: 25,
    },

    bottomBlockButton:{
        flex:1,
        width: '100%',
        backgroundColor: '#F3C316',
        borderTopLeftRadius:56,
        paddingTop: 32,
        paddingRight:16,
        paddingLeft:70,
        alignItems: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: -5,
        },
        shadowRadius: 10.41,

        elevation: 25,
    },

    bottomBlockButtonText:{
        color:'#1D1D20',
        fontSize:30,
        marginBottom:20,
        width:'100%'
    },
    bottomBlockButtonIcon:{
        position:'absolute',
        right:16,
        bottom:16
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        position:'relative'
    },
    modalView: {
        margin: 20,
        backgroundColor: '#FDF2ED',
        borderRadius: 18,
        padding: 20,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth:280,
        width:'100%'
    },
    textStyle: {
        color: '#B14313',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:14
    },
    languageItemWrapper:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        // marginBottom: 36,
        marginVertical: 14
    },
    languageItemCheckBox:{
        width:20,
        height:20,
        borderRadius: 50,
        // borderWidth:1,
        // borderColor: '#9F9EAE',
        marginRight: 32,
        alignItems:'center',
        justifyContent:'center'
    },
    languageItemCheckBoxActive:{
        width:12,
        height:12,
        backgroundColor: '#55545F',
        borderRadius: 50,
    },
    languageItemText:{
        color:'#1D1D20',
        fontSize:16
    },

});

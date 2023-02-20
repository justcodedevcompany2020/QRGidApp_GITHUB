import React from "react";
import {
    Dimensions,
    Image,
    Slider,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Pressable,
    Alert,
    StatusBar,
    Keyboard
} from "react-native";

// StatusBar.setHidden(true);

import TopMenu from '../components/includes/TopMenu'
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

// import Slideshow from 'react-native-image-slider-show';
import Svg, { Path, Defs, G, ClipPath, Circle, Mask, Rect } from "react-native-svg"
import {TextInput} from "react-native-paper";
import ChangeTerrain from "./includes/ChangeTerrain";
import axios from "axios";
import {Audio} from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {bel, en, ru} from "../i18n/supportedLanguages";



import * as Font from "expo-font";
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
import {FiraSans_400Regular, FiraSans_500Medium} from "@expo-google-fonts/fira-sans";



export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            openThreeDotModal : false,
            isMapReady: false,
            menuIsOpen: false,

            rus_l: false,
            belarus_l: false,
            eng_l: false,



            email: '',
            email_error: false,
            email_valid: false,


            theme: '',
            theme_error: false,
            theme_valid: false,

            message: '',
            message_error: false,
            message_valid: false,
            isOpenChangeTerrain: false,
            successModal: false,
            language: {},
            fontsLoaded: false


        }

        this.handler = this.handler.bind(this)
        this.closeChangeTerrain = this.closeChangeTerrain.bind(this)

    }

    handler() {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen
        })
    }

    closeChangeTerrain() {
        this.setState({
            isOpenChangeTerrain: false
        })
    }


    goToQrScaner = () => {
        this.props.navigation.navigate('QrScanner')

    }

    allCheckAfterLoadComponent = async () => {



        // Set language start


        await AsyncStorage.getItem('language',(err,item) => {

            let language = item ? JSON.parse(item) : {};
            let set_language = ru;

            if (language.hasOwnProperty('language')) {
                set_language = language.language == 'ru' ? ru : language.language == 'bel' ?  bel : en;
            }

            this.setState({
                language:set_language,
            })

        })

        // Set language end



    }

    closeAllModals = () => {

        this.setState({
            openThreeDotModal: false,
            menuIsOpen: false,
            isOpenChangeTerrain: false,
            successModal: false,
        })

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

        this.closeAllModals();
        this.allCheckAfterLoadComponent();
        this.loadFonts();

        this.focusListener = navigation.addListener("focus", () => {

            this.closeAllModals();
            this.allCheckAfterLoadComponent();
            this.loadFonts();

        });


    }

    componentWillUnmount(){
        if (this.focusListener) {
            this.focusListener();
        }
    }


    changeEmail = (email) => {

        this.setState({ email:email })

        if (email == '') {
            this.setState({
                email_error:false,
                email_valid:false
            })
            return false;

        }


        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,2})+$/;
        let is_error_email = reg.test(this.state.email) ? false : true;
        if (is_error_email === false) {
            this.setState({
                email_error:false,
                email_valid: true
            })
        } else {
            this.setState({
                email_valid: false
            })
        }


    }

    clearEmailInput(){
        this.setState({
            email:'',
            email_error:false,
            email_valid: false
        })
    }

    clearThemeInput(){
        this.setState({
            theme: '',
            theme_error: false,
            theme_valid: false,
        })
    }

    changeTheme(theme){

        this.setState({
            theme: theme,
            theme_error: false,
            theme_valid: theme.length > 0 ?? true,
        })
    }

    changeMessage(message){

        this.setState({
            message: message,
            message_error: false,
            message_valid: message.length > 0 ?? true,
        })
    }

    clearMessageInput(){
        this.setState({
            message: '',
            message_error: false,
            message_valid: false,
        })
    }


    sendMessage = async () => {

        let {email, theme, message, email_valid, theme_valid, message_valid} = this.state;


        if ( email_valid === false || theme_valid === false || message_valid === false ) {

            if (email_valid === false) {
                this.setState({
                    email_error: true,
                    email_valid: false
                })
            } else {
                this.setState({
                    email_error: false,
                    email_valid: true
                })
            }

            if (theme_valid === false) {
                this.setState({
                    theme_error: true,
                    theme_valid: false
                })
            } else {
                this.setState({
                    theme_error: false,
                    theme_valid: true
                })
            }

            if (message_valid === false) {
                this.setState({
                    message_error: true,
                    message_valid: false
                })
            } else {
                this.setState({
                    message_error: false,
                    message_valid: true
                })
            }

            return false;

        }

        let req = {
            email: email,
            theme: theme,
            message: message
        }

        axios.post('https://qr-gid.by/api/feedback/', req).then((response) => {


            let data = response.data;

            console.log('responseresponse',data, 'responseresponseresponse')


            this.setState({
                email: '',
                theme:'',
                message:'',
                email_error: false,
                email_valid: false,
                theme_error: false,
                theme_valid: false,
                message_error: false,
                message_valid: false,
                successModal: true

            })

        });


    }



    render() {

        if (!this.state.fontsLoaded) {
            return null;
        }

        return (

            <SafeAreaView style={[styles.container1]}>


                {/*Open Menu Modal START*/}
                    {this.state.menuIsOpen &&
                        <TopMenu
                            handler={this.handler}
                            menuIsOpen={this.state.menuIsOpen}
                            navigation={this.props.navigation}
                        />
                    }
                {/*Open Menu Modal END*/}


                {/*openThreeDotModal START*/}

                    {this.state.openThreeDotModal &&

                        <TouchableOpacity
                            onPress={() => {this.setState({openThreeDotModal: false})}}
                            style={{width:'100%', height:'100%', position: "absolute", zIndex: 665, top:0, left:0}}
                        >
                        </TouchableOpacity>

                    }

                    {this.state.openThreeDotModal &&
                        <View style={styles.dotModalWrapper}>

                            <TouchableOpacity
                                onPress={() => this.setState({isOpenChangeTerrain:true, openThreeDotModal: false})}
                                style={{padding: 14, fontSize:16, color:'#1D1D20' }}>
                                <Text style={{fontFamily: 'FiraSans_400Regular'}}>
                                    {/*Сменить местность*/}
                                    {this.state.language.change_terrain}


                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity

                                onPress={() => this.props.navigation.navigate('ObjectMap')}
                                style={{padding: 14, fontSize:16, color:'#1D1D20'}}>
                                <Text style={{fontFamily: 'FiraSans_400Regular'}}>
                                    {/*Карта мест*/}
                                    {this.state.language.location_map}


                                </Text>
                            </TouchableOpacity>

                        </View>
                    }

                {/*openThreeDotModal END*/}


                {/*Выберите местность START*/}
                    {this.state.isOpenChangeTerrain &&

                        <ChangeTerrain
                            closeChangeTerrain={this.closeChangeTerrain}
                        />

                    }
                {/*Выберите местность END*/}


                {/*TOP PANEL START*/}

                <View style={ styles.topPanel}>
                    <TouchableOpacity style={{marginRight:16,padding:10}} onPress={() => {
                        Keyboard.dismiss();
                        this.setState({menuIsOpen: true})
                    }}>
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 5.5L21.5 5.5" />
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 12L21.5 12" />
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 18.5L21.5 18.5" />
                        </Svg>
                    </TouchableOpacity>

                    <Text style={[styles.toptext, {fontFamily: 'Ubuntu_400Regular'}]}>
                        {/*Форма связи*/}
                        {this.state.language.contact_form}

                    </Text>

                    <View style={ styles.topPanelRight}>

                        <TouchableOpacity onPress={() => this.goToQrScaner()}>
                            <Svg  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                <Path fillRule="evenodd" clipRule="evenodd" d="M1.167 1.667a.5.5 0 01.5-.5h4.036a.5.5 0 000-1H1.667a1.5 1.5 0 00-1.5 1.5v4.036a.5.5 0 001 0V1.667zm17.127-1.5a.5.5 0 000 1h4.037a.5.5 0 01.5.5v4.036a.5.5 0 101 0V1.667a1.5 1.5 0 00-1.5-1.5h-4.037zM1.168 18.295a.5.5 0 10-1 0v4.036a1.5 1.5 0 001.5 1.5h4.036a.5.5 0 000-1H1.667a.5.5 0 01-.5-.5v-4.037zm22.664 0a.5.5 0 10-1 0v4.036a.5.5 0 01-.5.5h-4.037a.5.5 0 100 1h4.037a1.5 1.5 0 001.5-1.5v-4.037zM3.5 2.998a.5.5 0 00-.5.5v4.25a.5.5 0 00.5.5h4.25a.5.5 0 00.5-.5v-4.25a.5.5 0 00-.5-.5h-4.25zM4 7.25v-3.25h3.25v3.25h-3.25zm11.75-3.75a.5.5 0 01.5-.5h4.248a.5.5 0 01.5.5v4.25a.5.5 0 01-.5.5h-4.249a.5.5 0 01-.5-.5v-4.25zm1 .5v3.25h3.248v-3.25h-3.249zm-.5 11.75a.5.5 0 00-.5.5v4.249a.5.5 0 00.5.5h4.248a.5.5 0 00.5-.5v-4.25a.5.5 0 00-.5-.5h-4.249zm.5 4.249v-3.25h3.248v3.25h-3.249zm-13.75-3.75a.5.5 0 01.5-.5h4.25a.5.5 0 01.5.5v4.25a.5.5 0 01-.5.5h-4.25a.5.5 0 01-.5-.5v-4.25zm1 .5v3.25h3.25v-3.25h-3.25zM13.916 3.5a.5.5 0 10-1 0v3.75h-2.333a.5.5 0 00-.5.5v3.75h-.916a.5.5 0 000 1h1.416a.5.5 0 00.5-.5v-3.75h2.333a.5.5 0 00.5-.5V3.5zm.917 6.583a.5.5 0 000 1h1.624v2.333a.5.5 0 00.5.5h3.542a.5.5 0 100-1h-3.042v-2.333a.5.5 0 00-.5-.5h-2.124zM3.499 11.5a.5.5 0 000 1h1.417a.5.5 0 100-1H3.499zm10.416 2.624a.5.5 0 10-1 0v3.75h-2.333a.5.5 0 00-.5.5v2.125a.5.5 0 101 0v-1.625h2.333a.5.5 0 00.5-.5v-4.25z" fill="#393840"/>
                            </Svg>
                        </TouchableOpacity>


                        <View style={{marginLeft:24, position:'relative', zIndex: 1}}>

                            <TouchableOpacity  onPress={() => this.setState({ openThreeDotModal: !this.state.openThreeDotModal })}>
                                <Svg  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                    <Path fillRule="evenodd" clipRule="evenodd" d="M12 5a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 100-6 3 3 0 000 6zm0 8a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 100-6 3 3 0 000 6zm2 6a2 2 0 11-4 0 2 2 0 014 0zm1 0a3 3 0 11-6 0 3 3 0 016 0z" fill="#44434C"/>
                                </Svg>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

                {/*TOP PANEL END*/}



                <View style={styles.centerMapWrapper}>
                    <ScrollView style={styles.contentScrollView}>


                        <View style={styles.inputWrapper}>

                            {this.state.email_error &&

                                <TouchableOpacity style={styles.emptyInput}
                                    onPress={()=>this.clearEmailInput()}
                                >
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                    </Svg>
                                </TouchableOpacity>

                            }

                            {this.state.email_valid &&

                                <TouchableOpacity style={styles.emptyInput}>
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                    </Svg>
                                </TouchableOpacity>

                            }


                            <TextInput
                                value={this.state.email}
                                onChangeText={(reg_email) => this.changeEmail(reg_email)}
                                // onBlur={(reg_email) => this.onBlurRegisterEmail()}
                                style={[
                                    styles.input,
                                    this.state.email_error && {
                                        borderWidth:1, borderColor:'#A4223C'
                                    },
                                    this.state.email_valid && {
                                        borderWidth:1, borderColor:'#337363'
                                    },
                                    {fontFamily: 'FiraSans_400Regular'}
                                ]}
                                label={
                                    <Text
                                        style={[
                                            {color: this.state.email_error ? '#A4223C' :  this.state.email_valid ? '#337363' : '#55545F'  },
                                            {fontFamily: 'FiraSans_400Regular'}
                                        ]}
                                    >
                                        E-mail <Text style={{color:'red'}}>*</Text>
                                    </Text>
                                }
                                theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                underlineColor='transparent'
                                underlineColorAndroid ='transparent'
                                selectionColor='transparent'
                                activeOutlineColor='transparent'
                            />


                            {this.state.email_error ?

                                <Text style={[styles.inp_buttom_label, {color:'#A4223C', fontFamily: 'FiraSans_400Regular'}]}>
                                    {/*Введите коректный email*/}
                                    {this.state.language.choose_correct_email}

                                </Text>
                                :
                                <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                    {this.state.language.choose_email}
                                </Text>

                            }

                        </View>


                        <View style={styles.inputWrapper}>

                            {this.state.theme_error &&

                                <TouchableOpacity style={styles.emptyInput}
                                      onPress={()=>this.clearThemeInput()}
                                >
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                    </Svg>
                                </TouchableOpacity>

                            }

                            {this.state.theme_valid &&

                                <TouchableOpacity style={styles.emptyInput}>
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                    </Svg>
                                </TouchableOpacity>

                            }


                            <TextInput
                                value={this.state.theme}
                                onChangeText={(theme) => this.changeTheme(theme)}
                                style={[
                                    styles.input,
                                    this.state.theme_error && {
                                        borderWidth:1, borderColor:'#A4223C'
                                    },
                                    this.state.theme_valid && {
                                        borderWidth:1, borderColor:'#337363'
                                    },
                                    {fontFamily: 'FiraSans_400Regular'}
                                ]}
                                label={
                                    <Text
                                        style={[
                                            {color: this.state.theme_error ? '#A4223C' :  this.state.theme_valid ? '#337363' : '#55545F'  },
                                            {fontFamily: 'FiraSans_400Regular'}
                                        ]}
                                    >

                                        {/*Тема*/}

                                        {this.state.language.theme}
                                    </Text>
                                }
                                theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                underlineColor='transparent'
                                underlineColorAndroid ='transparent'
                                selectionColor='transparent'
                                activeOutlineColor='transparent'
                            />


                            {this.state.theme_error ?

                                <Text style={[styles.inp_buttom_label, {color:'#A4223C', fontFamily: 'FiraSans_400Regular'}]}>
                                    {/*Введите тему*/}
                                    {this.state.language.write_theme}

                                </Text>
                                :
                                <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                    {/*Напишите тему сообщения*/}
                                    {this.state.language.write_message_theme}

                                </Text>

                            }

                        </View>


                        <View style={styles.inputWrapper}>

                            {this.state.message_error &&

                                <TouchableOpacity style={styles.emptyInput}
                                          onPress={()=>this.clearMessageInput()}
                                >
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                    </Svg>
                                </TouchableOpacity>

                            }

                            {this.state.message_valid &&

                                <TouchableOpacity style={styles.emptyInput}>
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                    </Svg>
                                </TouchableOpacity>

                            }


                            <TextInput
                                value={this.state.message}
                                onChangeText={(theme) => this.changeMessage(theme)}
                                style={[
                                    styles.input,
                                    {height:72},
                                    this.state.message_error && {
                                        borderWidth:1, borderColor:'#A4223C'
                                    },
                                    this.state.message_valid && {
                                        borderWidth:1, borderColor:'#337363'
                                    },
                                    {fontFamily: 'FiraSans_400Regular'}
                                ]}
                                label={
                                    <Text
                                        style={[
                                            {color: this.state.message_error ? '#A4223C' :  this.state.message_valid ? '#337363' : '#55545F'  },
                                            {fontFamily: 'FiraSans_400Regular'}
                                        ]}
                                    >
                                        {/*Сообщение об ошибке*/}

                                        {this.state.language.message_about_error}

                                    </Text>
                                }
                                theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                underlineColor='transparent'
                                underlineColorAndroid ='transparent'
                                selectionColor='transparent'
                                activeOutlineColor='transparent'
                            />


                            {this.state.message_error ?

                                <Text style={[styles.inp_buttom_label, {color:'#A4223C', fontFamily: 'FiraSans_400Regular'}]}>
                                    {/*Поле обезательно!*/}
                                    {this.state.language.field_required}
                                </Text>

                                :

                                <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                    {/* Опишите ситуацию ошибочного взаимодействия */}
                                    {this.state.language.message_about_error_text}
                                </Text>

                            }

                        </View>


                    </ScrollView>


                    <View style={styles.save_button_wrapper} >
                        <TouchableOpacity style={styles.save_button} onPress={() => {this.sendMessage()}}>
                            <Text style={[styles.save_button_text, {fontFamily: 'FiraSans_400Regular'}]} >
                                {/*ОТПРАВИТЬ СООБЩЕНИЕ*/}
                                {this.state.language.send_message}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>




                {/* Send review Success modal START*/}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.successModal}
                    onRequestClose={() => {
                        this.setState({
                            successModal: false
                        })
                    }}>

                    <View style={styles.centeredView}>

                        <View style={[styles.modalView, {backgroundColor:'#FDF5D8'}]}>

                            <Text style={[styles.modalText, {fontFamily: 'FiraSans_400Regular'}]}>

                                {this.state.language.contact_form_success_message}

                            </Text>

                            <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>

                                <TouchableOpacity
                                    style={[]}
                                    onPress={() => { this.setState({
                                        successModal: false
                                    })}}>

                                    <Text style={[styles.textStyle, {color:'#8F7000', fontFamily: 'FiraSans_400Regular'}]}>
                                        {/*Закрыть*/}

                                        {this.state.language.close}

                                    </Text>

                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>

                {/*Send review Success modal END*/}




            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'white',
        position:'relative'
    },
    topPanelRight: {
        alignItems:"center",
        justifyContent:'flex-end',
        flexDirection:'row',
        flex:1
    },

    topPanel:{
        backgroundColor:'white',
        width:'100%',
        height:56,
        paddingLeft:12,
        paddingRight:12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 8.65,
        elevation: 6,

    },

    centerMapWrapper:{
        flex: 1,
        width:'100%',
        backgroundColor:'#F9F3F1'

    },
    bottomMenuWrapper:{
        backgroundColor:'white',
        width:'100%',
        height:56,
        borderTopColor: 'black',
        borderTopWidth:1,
        flexDirection:'row'
    },

    dotModalWrapper: {
        width:224,
        backgroundColor:'white',
        borderRadius:8,
        position:'absolute',
        top:50, right:15,
        zIndex: 666,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 7,
    },

    menuItem:{
        width: '100%',
        height: 48,
        paddingLeft: 25,
        flexDirection:'row',
        alignItems:'center'
    },
    menuItemSvg:{
        marginRight:21
    },
    menuItemText:{
        color:'#1D1D20',
        fontSize:16
    },
    toptext: {
        fontSize: 20,
        color:'#1D1D20',
    },
    contentScrollView:{
        width:'100%',
        paddingTop:19,
        paddingHorizontal:16
    },
    itemWrapper:{
        width:'100%',
        paddingHorizontal:16,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:28
    },
    itemWrapperLeft:{
        fontSize:16,
        color: '#54535F'
    },
    itemWrapperRight:{
        color: '#1D1D20',
        fontSize:16
    },

    languageItemWrapper:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 36
    },
    languageItemCheckBox:{
        width:20,
        height:20,
        borderRadius: 50,
        borderWidth:1,
        borderColor: '#9F9EAE',
        marginRight: 20,
        alignItems:'center',
        justifyContent:'center'
    },
    languageItemCheckBoxActive:{
        width:16,
        height:16,
        backgroundColor: '#9F9EAE',
        borderRadius: 50,
    },
    languageItemText:{
        color:'#1D1D20',
        fontSize:16
    },
    save_button:{
        width:'100%',
        backgroundColor:'#E1C1B7',
        height:34,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,

    },
    save_button_text:{
        color:'#1D1D20',
        fontSize:14,
        fontWeight:'bold'
    },
    save_button_wrapper:{
        width:'100%',
        maxWidth:328,
        backgroundColor:'#E1C1B7',
        alignSelf: 'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        padding:1,
        marginHorizontal:16,
        marginBottom:16
    },
    inputWrapper: {
        width:'100%'
    },
    emptyInput:{
        position: 'absolute',
        zIndex: 5,
        alignSelf: 'center',
        top: 12,
        right: 12,
    },
    input: {
        width:'100%',
        height: 50,
        backgroundColor: 'white',
        fontSize:14,
        color:'#55545F',
        borderRadius:8,
        paddingHorizontal:16
    },

    inp_buttom_label:{
        fontSize:12,
        color:'#54535F',
        marginBottom: 16,
        marginLeft: 16
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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

    modalText: {
        marginBottom: 22,
        textAlign: 'left',
        fontSize:16
    },

    textStyle: {
        color: '#B14313',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:14
    },
})

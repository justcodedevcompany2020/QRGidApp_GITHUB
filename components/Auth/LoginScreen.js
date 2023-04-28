import React, { Component } from 'react';
import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ImageBackground,
    Animated,
    ScrollView,
    Modal,
    TouchableHighlight,
    StatusBar,
    NativeModules,
    Platform,
    Keyboard,
    LogBox,
    TouchableWithoutFeedback
} from 'react-native';

const { StatusBarManager } = NativeModules;

LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
import MaskInput from 'react-native-mask-input';
// import CryptoJS from 'crypto-js';
import CryptoES from "crypto-es";

// react-native-text-input-mask
import {sendEncryptData} from '../helpers'

import { TextInput, HelperText } from 'react-native-paper';

import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { AuthContext } from '../AuthContext/context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path, Defs, G, ClipPath, Rect, Circle } from "react-native-svg"

import i18n from 'i18n-js';
import {bel, de, en, fr, ru} from '../../i18n/supportedLanguages';
// import DropDownPicker from "react-native-custom-dropdown";

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import CryptoJS from "crypto-js";
import * as Location from "expo-location";
// import { getRandomBytes } from 'react-native-get-random-values';

import 'react-native-get-random-values'


i18n.fallbacks = true;
i18n.translations = { en, de, fr };
// i18n.locale = 'en';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',

            login: '',
            login_error: false,
            login_valid: false,


            password: '',
            password_error: false,
            password_valid: false,



            check_textInputChange: false,
            secureTextEntry: true,
            isValidEmail: true,
            existEmail: true,
            isValidPassword: true,
            language:'ru',
            isOpenRegisterModal: false,
            // animation: new Animated.Value(100),

            reg_login: '',
            reg_login_error: false,
            reg_login_valid: false,
            reg_login_error_text: '',

            reg_fio: '',
            reg_fio_error: false,
            reg_fio_valid: false,

            reg_phone: '',
            reg_phone_masked: '',
            reg_phone_error: false,
            reg_phone_valid: false,
            reg_phone_error_text: '',

            reg_email: '',
            reg_email_error: false,
            reg_email_valid: false,
            reg_email_error_text: '',

            reg_password: '',
            reg_password_error: false,
            reg_password_valid: false,
            reg_password_error_text: '',

            reg_confirm_password: '',
            reg_confirm_password_error: false,
            reg_confirm_password_valid: false,
            reg_confirm_password_error_text: '',


            reset_pass_phone: '',
            reset_pass_phone_masked: '',
            reset_pass_phone_error: false,
            reset_pass_phone_valid: false,
            reset_pass_phone_text: '',


            reset_pass_email: '',
            reset_pass_email_error: false,
            reset_pass_email_valid: false,
            reset_pass_email_text: '',


            registerPolicy: false,
            isOpenResetPass: false,

            reset_password_success: false,

            STATUSBAR_HEIGHT: 40,

            bottom_right_svg: new Animated.Value(0),
            keyboardOpen: false,

            show_politic_modal: false,
            show_politic_text_modal: false,
            politic_text: '',
            ipAddress: null
        };

    }

    static contextType = AuthContext

    changeRegisterPassword = (reg_password) => {

        this.setState({ reg_password:reg_password });

        if (reg_password.length >= 6) {

            this.setState({
                reg_password_error: false,
                reg_password_valid: true,
            })

        } else {
            this.setState({
                reg_password_error: false,
                reg_password_valid: false,
            })
        }


    }

    onBlueRegisterPassword = () => {

        let reg_password = this.state.reg_password;

        if (reg_password.length < 6) {

            this.setState({
                reg_password_error: true,
                reg_password_valid: false,
                reg_password_error_text: this.state.language.reg_password_error_text  //'Пароль введен неверно!'
            })

        }

    }

    changeRegisterPasswordConfirm = (reg_confirm_password) => {

        this.setState({ reg_confirm_password:reg_confirm_password });

        if (reg_confirm_password.length >= 6 ) {

            this.setState({
                reg_confirm_password_error: false,
                reg_confirm_password_valid: true,
            })

        } else {
            this.setState({
                reg_confirm_password_error: false,
                reg_confirm_password_valid: false,
            })
        }

    }

    onBlueRegisterPasswordConfirm = () => {

        let reg_confirm_password = this.state.reg_confirm_password;

        if (reg_confirm_password.length < 6) {

            this.setState({
                reg_confirm_password_error: true,
                reg_confirm_password_valid: false,
                reg_confirm_password_error_text: this.state.language.reg_password_error_text //'Пароль введен неверно!'
            })

        }

    }


    sysEvents = async (sys_request_detail,request_status, callback) => {

        let { status } = await Location.requestForegroundPermissionsAsync();

        console.log(status, 'status');

        let location = null;
        if (status !== 'granted') {
            let { status } = await Location.requestForegroundPermissionsAsync();
        } else {
            location = await Location.getCurrentPositionAsync({});
        }

        let req_for_history = {
            request_detail: sys_request_detail,
            gps_user: location ?  location.coords.latitude + ',' + location.coords.longitude : '',
            ip_user:this.state.ipAddress,
            id_user: '',
            request_status: request_status
        }
        console.log(req_for_history, 'req_for_history')
        axios.post('https://qr-gid.by/api/sys_events/',req_for_history).then((response) => {

            // console.log(response, 'sys_events RESPONSE')
            callback()
        });

    }




    clearRegisterForm = async () => {

        await this.setState({
            reg_login: '',
            reg_login_error: false,
            reg_login_valid: false,
            reg_login_error_text: '',

            reg_fio: '',
            reg_fio_error: false,
            reg_fio_valid: false,

            reg_phone: '',
            reg_phone_masked: '',

            reg_phone_error: false,
            reg_phone_valid: false,
            reg_phone_error_text: '',

            reg_email: '',
            reg_email_error: false,
            reg_email_valid: false,
            reg_email_error_text: '',

            reg_password: '',
            reg_password_error: false,
            reg_password_valid: false,
            reg_password_error_text: '',

            reg_confirm_password: '',
            reg_confirm_password_error: false,
            reg_confirm_password_valid: false,
            reg_confirm_password_error_text: '',



            registerPolicy: false,
            isOpenRegisterModal: false
        })


    }


    registerHandle = () => {

        let login = this.state.reg_login
        let name  = this.state.reg_fio
        let phone  = this.state.reg_phone
        let email  = this.state.reg_email.replace(/\s/g, '')
        let pass  = this.state.reg_password
        let passConfirm  = this.state.reg_confirm_password
        let registerPolicy  = this.state.registerPolicy
        let navigate = this.props.navigation;
        let _this = this;

        const req = {
            login:login,
            name:name,
            phone:phone,
            email:email,
            pass:pass,
            passConfirm:passConfirm,
        };

        let sys_request_detail = JSON.stringify({
            url: 'https://qr-gid.by/api/auth/profile/edit.php',
            data: req
        })


        // if (!registerPolicy) {
        //     this.setState({
        //         registerPolicyError: true
        //     })
        //     return false;
        //
        // } else {
        //     this.setState({
        //         registerPolicyError: false
        //     })
        // }



        //
        // sendEncryptData('https://qr-gid.by/api/auth/login/', req, function (encrypte_response){
        //     console.log( encrypte_response, 'encrypte_response')
        // })


        sendEncryptData('https://qr-gid.by/api/auth/register/', req, async function (response, encrypte_response) {

            console.log(encrypte_response, 'encrypte_response')

            if(encrypte_response.TYPE == "OK")
            {
                let userToken = response.headers['set-cookie'];
                let userId    = encrypte_response.ID;

                await _this.clearRegisterForm();

                let foundUser = {
                    token: userToken,
                    userId:userId,
                    // language: 'ru',
                    email: login,
                    password: pass
                }

                _this.sysEvents(sys_request_detail, false, function () {
                    _this.context.signIn(foundUser, function () {
                        navigate.navigate('Profile')
                    });
                })

                return false;

            } else if (encrypte_response.TYPE == 'Error') {

                if(encrypte_response.MESSAGE.hasOwnProperty('email')) {

                    let error = '';

                    if(encrypte_response.MESSAGE.email == 'Введите почту') {
                        error = _this.state.language.reg_email_error_text1
                    } else if(encrypte_response.MESSAGE.email == 'Почта введена не верно') {
                        error = _this.state.language.reg_email_error_text2
                    }

                    this.setState({
                        reg_email_error: true,
                        reg_email_valid: false,
                        reg_email_error_text: error
                    })

                }
                if(encrypte_response.MESSAGE.hasOwnProperty('phone')) {

                    let error = '';

                    if(encrypte_response.MESSAGE.phone == 'Введите номер телефона') {
                        error = _this.state.language.reg_phone_error_text1
                    }

                    this.setState({
                        reg_phone_error: true,
                        reg_phone_valid:false,
                        reg_phone_error_text: error
                    })

                }

                if(encrypte_response.MESSAGE.hasOwnProperty('login')) {

                    this.setState({
                        reg_login_error: true,
                        reg_login_error_text: encrypte_response.MESSAGE.login
                    })

                }


                if(encrypte_response.MESSAGE.hasOwnProperty('pass')) {

                    let error = '';

                    if(encrypte_response.MESSAGE.pass == 'Введите пароль') {
                        error = _this.state.language.reg_password_error_text1
                    } else if(encrypte_response.MESSAGE.pass == 'Пароль должно быть не менее 6 символов') {
                        error = _this.state.language.reg_password_error_text2
                    }

                    this.setState({
                        reg_password_error: true,
                        reg_password_error_text: error
                    })

                }

                if(encrypte_response.MESSAGE.hasOwnProperty('passConfirm')) {

                    let error = '';

                    if(encrypte_response.MESSAGE.passConfirm == 'Пароли должны совпадать') {
                        error = _this.state.language.reg_confirm_password_error_text
                    }

                    _this.setState({
                        reg_confirm_password_error: true,
                        reg_confirm_password_error_text: error
                    })

                }

                _this.sysEvents(sys_request_detail, true, function () {

                })

            }

        })


        //
        // axios.post('https://qr-gid.by/api/auth/register/', req).then(
        //    async (response)  => {
        //
        //         console.log(response.data, 'register response')
        //
        //         if(response.data.TYPE == "OK") {
        //
        //             let userToken = response.headers['set-cookie'];
        //             let userId = response.data.ID;
        //
        //             // clear register form data
        //
        //             await this.clearRegisterForm();
        //
        //             let foundUser = {
        //                 token: userToken,
        //                 userId:userId,
        //                 // language: 'ru',
        //                 email: login,
        //                 password: pass
        //             }
        //
        //             this.sysEvents(sys_request_detail, false, function () {
        //                 this.context.signIn(foundUser, function () {
        //                     navigate.navigate('Profile')
        //                 });
        //             })
        //
        //
        //             return false;
        //
        //         } else if (response.data.TYPE == 'Error') {
        //
        //             if(response.data.MESSAGE.hasOwnProperty('email')) {
        //
        //                 let error = '';
        //
        //                 if(response.data.MESSAGE.email == 'Введите почту') {
        //                     error = this.state.language.reg_email_error_text1
        //                 } else if(response.data.MESSAGE.email == 'Почта введена не верно') {
        //                     error = this.state.language.reg_email_error_text2
        //                 }
        //
        //                 this.setState({
        //                     reg_email_error: true,
        //                     reg_email_valid: false,
        //                     reg_email_error_text: error
        //                 })
        //
        //             }
        //             if(response.data.MESSAGE.hasOwnProperty('phone')) {
        //
        //                 let error = '';
        //
        //                 if(response.data.MESSAGE.phone == 'Введите номер телефона') {
        //                     error = this.state.language.reg_phone_error_text1
        //                 }
        //
        //                 this.setState({
        //                     reg_phone_error: true,
        //                     reg_phone_valid:false,
        //                     reg_phone_error_text: error
        //                 })
        //
        //             }
        //
        //             if(response.data.MESSAGE.hasOwnProperty('login')) {
        //
        //                 this.setState({
        //                     reg_login_error: true,
        //                     reg_login_error_text: response.data.MESSAGE.login
        //                 })
        //
        //             }
        //
        //
        //             if(response.data.MESSAGE.hasOwnProperty('pass')) {
        //
        //                 let error = '';
        //
        //                 if(response.data.MESSAGE.pass == 'Введите пароль') {
        //                     error = this.state.language.reg_password_error_text1
        //                 } else if(response.data.MESSAGE.pass == 'Пароль должно быть не менее 6 символов') {
        //                     error = this.state.language.reg_password_error_text2
        //                 }
        //
        //                 this.setState({
        //                     reg_password_error: true,
        //                     reg_password_error_text: error
        //                 })
        //
        //             }
        //
        //             if(response.data.MESSAGE.hasOwnProperty('passConfirm')) {
        //
        //                 let error = '';
        //
        //                 if(response.data.MESSAGE.passConfirm == 'Пароли должны совпадать') {
        //                     error = this.state.language.reg_confirm_password_error_text
        //                 }
        //
        //
        //                 this.setState({
        //                     reg_confirm_password_error: true,
        //                     reg_confirm_password_error_text: error
        //                 })
        //
        //             }
        //
        //             this.sysEvents(sys_request_detail, true, function () {
        //
        //             })
        //
        //         }
        //         // if (response.status === 200  ) {
        //         //     let foundUser = {
        //         //         email: response.data.user.email,
        //         //         name: response.data.user.name,
        //         //         token: response.data.user.token,
        //         //         language: this.state.language
        //         //     }
        //         //
        //         //     this.context.signIn(foundUser);
        //         //
        //         // }
        //     },
        //
        //     (err) => {
        //         console.log(err.response.data, 'err')
        //     },
        //
        // );
        //



        // if (!this.checkEmail()) {
        //      this.setState({
        //          isValidEmail:false
        //      })
        // } else {
        //     this.setState({
        //         isValidEmail:true
        //     })
        //
        //     if (!this.checkPassword()) {
        //
        //         this.setState({
        //             isValidPassword: false
        //         })
        //
        //     } else {
        //
        //         this.setState({
        //             isValidPassword: true
        //         })
        //
        //         const req = {
        //             login: 'test',
        //             pass: '123test123',
        //         };
        //
        //         axios.post(' https://qr-gid.by/api/auth/login/', req).then(
        //             (response) => {
        //
        //                 console.log(response.data, 'response')
        //                 // if (response.status === 200  ) {
        //                 //     let foundUser = {
        //                 //         email: response.data.user.email,
        //                 //         name: response.data.user.name,
        //                 //         token: response.data.user.token,
        //                 //         language: this.state.language
        //                 //     }
        //                 //
        //                 //     this.context.signIn(foundUser);
        //                 //
        //                 // }
        //             },
        //
        //             (err) => {
        //                 console.log(err.response.data, 'err')
        //
        //                 // if (err.response.status === 404 && err.response.data === 'User does not exist') {
        //                 //     this.setState({
        //                 //         existEmail: false
        //                 //     })
        //                 // }
        //                 //
        //                 // if (err.response.status === 401 && err.response.data === 'Password mismatch') {
        //                 //     this.setState({
        //                 //         isValidPassword: false
        //                 //     })
        //                 // }
        //             },
        //
        //         );
        //
        //
        //     }
        // }

    }


    getPolitic = async () =>
    {
        let {language_name} =  this.state;

        let url = '';
        if (language_name == 'ru') {
            url = 'https://qr-gid.by/api/policy/';
        } else if (language_name == 'bel') {
            url = 'https://qr-gid.by/api/by/policy/';
        } else if (language_name == 'en') {
            url = 'https://qr-gid.by/api/en/policy/';
        }
        fetch(
            url,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)
            })
            .then(async (responseData) => {
                // console.log(responseData, 'responseData')
                // console.log(url, 'url')
                await this.setState({
                    politic_text: responseData
                })
            })
    }


    setLanguageFromStorage = async ()=>
    {
        await AsyncStorage.getItem('language',async (err,item) =>
        {
            let language = item ? JSON.parse(item) : {};
            if (language.hasOwnProperty('language')) {
                i18n.locale = language.language;
                await this.setState({
                    language: language.language == 'ru' ? ru : language.language == 'bel' ?  bel : en,
                    language_name: language.language == 'ru' ? 'ru' : language.language == 'bel' ?  'bel' : 'en'
                })
            } else {
                i18n.locale = 'ru';
                await this.setState({
                    language: ru
                })
            }
        })
    }


    loadFunction = async () =>
    {
        await this.setLanguageFromStorage();
        await this.getPolitic();
    }


    // decrypte () {
    //
    //     let CryptoJS = require("crypto-js");
    //     let data = {"ciphertext":"q1aXE+ZoT2bYJJZF6RQMmjyDf0yzju4e9SRuXC4M7HM=","iv":"01cab2f8813181204cd444f20e9e5598","salt":"07c6712b27fd1323b1d76733783e3c0608d14c5a7ce86966b6e84a27ca0838ea4b20f78f6f30803bf0a4e643a33c3ea4d45deb78fe6874607cfe68d7b0aa4e745af8d02b5d13f1d657e1346237dea9117f44509aa012323bdd6a7267a7c8a470cb82b175394fb3ba8fdb1c88cd6954f49a6faa8c3b785d42abc7866eb18e463b04f311d93caf0114c4158f9316278fd0fa8b1032434d598d9222b8533fecdf1383048a8e32e21962abab2654e2987ac32ad89b8f1c9d098a29f8d6b95466e5881c5d5f9d4bad6de35585432b37cd7548415a20544f2013a66fc1c87b263827f0bafe3d298c1139326fb85fdf870aa9329d5dee96e2c7a4d44a3d205522eb9f83"}
    //     let passphrase_ = 'test';
    //     var salt = CryptoJS.enc.Hex.parse(data.salt);
    //     var iv = CryptoJS.enc.Hex.parse(data.iv);
    //     var key = CryptoJS.PBKDF2(passphrase_, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999});
    //
    //     var decrypted = CryptoJS.AES.decrypt(data.ciphertext, key, { iv: iv});
    //     let decrypt =  decrypted.toString(CryptoJS.enc.Utf8);
    //
    //     console.log(decrypt, 'decrypt')
    // }

    // encrypt(string, key){

        // var CryptoJS = require("crypto-js");
        // let plaintext = 'Hello';
        // let keyMaterial = '12345';
        // let ivMaterial = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]

        // let truncHexKey = CryptoJS.SHA256(keyMaterial).toString().substr(0, 32); // hex encode and truncate
        // let truncHexIV = CryptoJS.SHA256(ivMaterial).toString().substr(0, 16); // hex encode and truncate
        // let key = CryptoJS.enc.Utf8.parse(truncHexKey);
        // let iv = CryptoJS.enc.Utf8.parse(truncHexIV);
        // let ciphertext = CryptoJS.AES.encrypt(plaintext, key, {iv: iv}); // default values: CBC, PKCS#7 padding

        // console.log('Ciphertext: ' + ciphertext.toString());
        // console.log('key: ' + key);
        // console.log('iv: ' + iv);

    // }

    //  getRandomWordArray = () => {
    //      // let CryptoJS = require("crypto-js");
    //
    //     const values = new Uint32Array(8);
    //     crypto.getRandomValues(values);
    //      // getRandomBytes(values);
    //
    //      const words = Array.from(values);
    //     return CryptoJS.lib.WordArray.create(words);
    // };

    loginHandle  = async () => {

        let login = this.state.login;
        let password = this.state.password;

        let sys_request_detail = JSON.stringify({
            url: 'https://qr-gid.by/api/auth/login/',
            data: {
                login:login,
                pass: password,
            }
        })

        const req = {
            login: login,
            pass: password,
        };

        let _this = this;

        //
        // sendEncryptData('https://qr-gid.by/api/auth/login/', req, function (encrypte_response){
        //     console.log( encrypte_response, 'encrypte_response')
        // })


        sendEncryptData('https://qr-gid.by/api/auth/login/', req, function (response, encrypte_response){
            console.log( encrypte_response, 'encrypte_response')

            if(encrypte_response.hasOwnProperty('TYPE') ) {

                if (encrypte_response.TYPE == 'ERROR') {
                    _this.setState({
                        login_error: true,
                        login_valid:false,
                        password_error: true,
                        password_valid:false,
                    })

                    _this.sysEvents(sys_request_detail, true, function () {
                        console.log('login sysEvents sended')
                    })
                }

            } else {

                Keyboard.dismiss()

                _this.setState({
                    login_error: false,
                    login_valid:false,
                    password_error: false,
                    password_valid:false,
                    login: '',
                    password: ''
                })

                let userToken = response.headers['set-cookie'];
                let userId    = encrypte_response.ID;

                let foundUser = {
                    token: userToken,
                    userId: userId,
                    // language: 'ru',
                    email: login,
                    password: password
                }

                _this.sysEvents(sys_request_detail, false, function () {
                    let navigate = _this.props.navigation;
                    _this.context.signIn(foundUser, function () {
                        navigate.navigate('Profile')
                    });
                })

            }
        })




        // axios.post('https://qr-gid.by/api/auth/login/', req).then(
        //     (response) => {
        //
        //         console.log(response.data, 'dddddd')
        //         if(response.data.hasOwnProperty('TYPE') ) {
        //
        //             if (response.data.TYPE == 'ERROR') {
        //                 _this.setState({
        //                     login_error: true,
        //                     login_valid:false,
        //                     password_error: true,
        //                     password_valid:false,
        //                 })
        //
        //                 this.sysEvents(sys_request_detail, true, function () {
        //
        //                 })
        //             }
        //
        //         } else {
        //
        //             Keyboard.dismiss()
        //
        //             _this.setState({
        //                 login_error: false,
        //                 login_valid:false,
        //                 password_error: false,
        //                 password_valid:false,
        //                 login: '',
        //                 password: ''
        //             })
        //
        //             let userToken = response.headers['set-cookie'];
        //             let userId    = response.data.ID;
        //
        //             let foundUser = {
        //                 token: userToken,
        //                 userId: userId,
        //                 // language: 'ru',
        //                 email: login,
        //                 password: password
        //             }
        //
        //             this.sysEvents(sys_request_detail, false, function () {
        //                 let navigate = _this.props.navigation;
        //                 _this.context.signIn(foundUser, function () {
        //                     navigate.navigate('Profile')
        //                 });
        //             })
        //
        //         }
        //
        //     },
        //
        //     (err) => {
        //         console.log(err.response.data, 'ERROR loginHandle')
        //     },
        //
        // );
        //


    }


    // sendEncryptData = (url, data_info, callback) =>
    // {
    //     let data = {};
    //     let arr = JSON.stringify({
    //         "url":"https://qr-gid.by/api/version/",
    //         // "url":url,
    //         "data": ''
    //     }); //массив из ссылки на апи url и данных запроса data
    //     let key = '12345'; //https://qr-gid.by/api/key.php
    //
    //     key = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(key).toString().substr(0, 32));
    //     let iv = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]).toString().substr(0, 16));
    //     let encrypted = CryptoJS.AES.encrypt(arr, key, {iv: iv});
    //
    //     data.request = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    //     data.iv = CryptoJS.enc.Hex.stringify(iv);
    //
    //     // callback('test');
    //
    //     axios.post('https://qr-gid.by/api/request_app.php', JSON.stringify(data))
    //         .then(response => {
    //
    //             console.log(response.data, 'response.data REQUEST');
    //             console.log( this.decryptData(response.data, '12345', iv), 'this.decryptData');
    //             callback(this.decryptData(response.data, '12345', iv))
    //
    //         })
    //         .catch(error => console.log(error));
    //     //
    //     // $.post("https://qr-gid.by/api/request_app.php", JSON.stringify(data), function(data){ //отправка шифрованных данных в систему
    //     //
    //     //     let decrypted = CryptoJS.AES.decrypt(data, key, {iv: iv});
    //     //     let result = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    //     //     console.log(result); //полученный результат из системы
    //     //
    //     // }, "json");
    //
    //
    //     console.log(data, 'datadatadatadatadata')
    // }

    // decryptData = (encryptedData, key, iv) =>  {
    //
    //     key = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(key).toString().substr(0, 32));
    //     iv = CryptoJS.enc.Hex.parse(iv);
    //     let cipherParams = CryptoJS.lib.CipherParams.create({
    //         ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
    //         iv: iv,
    //     });
    //     let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    //         iv: iv,
    //     });
    //     return decrypted.toString(CryptoJS.enc.Utf8);
    //
    // }


    componentDidMount() {

        // this.decrypte()
        // this.encrypt(JSON.stringify({'url':'dwqd',"data":[]}), '12345')
        // let CryptoJS = require("crypto-js");

        // this.sendEncryptData();

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("focus", () => {

            axios.get('https://api.ipify.org?format=json')
            .then(response => {
                this.setState({
                    ipAddress: response.data.ip
                })
                console.log(response.data, 'response.data')
            })
            .catch(error => console.log(error));

            this.loadFunction();

            if ( Platform.OS === 'ios') {

                StatusBarManager.getHeight((statusBarHeight)=>{
                    this.setState({
                        STATUSBAR_HEIGHT: statusBarHeight.height
                    })
                })

            } else {

                this.setState({
                    STATUSBAR_HEIGHT: StatusBarManager.HEIGHT
                });

            }

            this.getLocalEmailAndPassword();

        });

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );

    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    getLocalEmailAndPassword = async () =>
    {
        let user_email    = await AsyncStorage.getItem('userEmail');
        let user_password = await AsyncStorage.getItem('userPassword');

        await this.setState({
            login: user_email ? user_email : '',
            password: user_password ? user_password : ''
        })

        // console.log(user_email, 'user_email getLocalEmailAndPassword')
        // console.log(user_password, 'user_password getLocalEmailAndPassword')
    }

    _keyboardDidShow =(event) =>
    {
        this.setState({
            keyboardOpen:true
        })
    }

    _keyboardDidHide = (event) =>
    {
        this.setState({
            keyboardOpen:false
        })
    }

    goToDashboard = () =>
    {
        Keyboard.dismiss();
        this.setState({
            isOpenRegisterModal: false
        });
        this.props.navigation.navigate('Dashboard');
    }



    changeRegisterPhone = ( reg_phone) =>
    {
        reg_phone = reg_phone.replace('+','')
        reg_phone = '+'+reg_phone;

        this.setState({
            reg_phone_masked: '',
            reg_phone: reg_phone,
        });

        // var phonereg = /[+]375[0-9]{9}/;
        var phonereg = /[+]/;

        if(reg_phone == '')
        {
            this.setState({
                reg_phone_error:false,
                reg_phone_valid:false,
                reg_phone_error_text: ''
            })
        } else {
            if (reg_phone.match(phonereg) && reg_phone.length > 6) {
                this.setState({
                    reg_phone_error:false,
                    reg_phone_valid:true,
                    reg_phone_error_text: ''

                })
            } else {
                if (reg_phone.length > 4) {
                    this.setState({
                        reg_phone_error:true,
                        reg_phone_valid:false,
                        reg_phone_error_text: 'Не верный формат!'
                    })
                }
            }
        }

    }

    //Email functions

    changeRegisterEmail = (reg_email) => {
        reg_email = reg_email.replace(/\s/g, '');
        this.setState({
            reg_email:reg_email,
            reg_login:reg_email,
        })

        if (reg_email == '') {
            this.setState({
                reg_email_error:false,
                reg_email_valid:false
            })
            return false;

        }


        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let is_error_email = reg.test(this.state.reg_email) ? false : true;
        if (is_error_email === false) {
            this.setState({
                reg_email_error:false,
                reg_email_valid: true
            })
        } else {
            this.setState({
                reg_email_valid: false
            })
        }


    }





    changeResetPassEmail = (reset_pass_email) => {

        this.setState({ reset_pass_email:reset_pass_email })

        console.log(reset_pass_email, typeof reset_pass_email, reset_pass_email == '' )

        if (reset_pass_email == '') {
            this.setState({
                reset_pass_email_error:false,
                reset_pass_email_valid:false
            })
            return false;

        }


        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let is_error_email = reg.test(this.state.reset_pass_email) ? false : true;
        if (is_error_email === false) {
            this.setState({
                reset_pass_email_error:false,
                reset_pass_email_valid: true
            })
        } else {
            this.setState({
                reset_pass_email_valid: false
            })
        }


    }


    //
    // changeLogin = (login) => {
    //
    //     this.setState({ login:login });
    //
    // }

    onBlurLogin = () => {

        let login = this.state.login

    }


    clearRegEmailInput = () => {

        this.setState({
            reg_email: '',
            reg_login: '',
            reg_email_error:false,
            reg_email_valid: false
        })

    }

    clearRegPasswordInput = () => {

        this.setState({
            reg_password: '',
            reg_password_error: false,
            reg_password_valid: false,
        })

    }

    clearRegPasswordConfirmInput = () => {

        this.setState({
            reg_confirm_password: '',
            reg_confirm_password_error: false,
            reg_confirm_password_valid: false,
        })

    }


    //Register LOGIN input

    clearLoginInput = () => {

        this.setState({
            reg_login: '',
            reg_login_error:false,
            reg_login_valid: false

        })

    }


    //Login LOGIN input
    clearLoginloginInput = () => {

        this.setState({
            login: '',
            login_error: false,
            login_valid: false,
        })

    }

    //Login Password input
    clearLoginPasswordInput = () => {

        this.setState({
            password: '',
            password_error: false,
            password_valid: false,
        })

    }




    // Reset password EMAIL input
    clearResetPassEmailInput = () => {

        this.setState({
            reset_pass_email: '',
            reset_pass_email_error:false,
            reset_pass_email_valid: false
        })

    }


    // Reset password Phone input

    clearResetPassPhoneInput = () => {

        this.setState({
            reset_pass_phone: '',
            reset_pass_phone_masked: '',
            reset_pass_phone_error:false,
            reset_pass_phone_valid: false
        })

    }


    // Register Phone  input

    clearPhoneInput = () => {

        this.setState({
            reg_phone: '',
            reg_phone_masked: '',
            reg_phone_error: false,
            reg_phone_valid: false,

        })

    }


    onBlurRegisterLogin = () => {

        let reg_login = this.state.reg_login

        this.setState({ reg_login:reg_login })

        if (reg_login == '' || !reg_login) {
            this.setState({
                reg_login_error:false
            })
            return false;
        }

        if (reg_login.length < 1 ) {
            this.setState({
                reg_login_error:true,
            })
        }

    }



    onBlurRegisterEmail = () => {

        let reg_email = this.state.reg_email

        if (reg_email == '' || !reg_email) {
            this.setState({
                reg_email_error:false
            })
            return false;
        }

        if (reg_email.length < 6 ) {
            this.setState({
                reg_email_error:true,
            })
        }

    }

    onBlurResetPassEmail = () => {

        let reset_pass_email = this.state.reset_pass_email

        if (reset_pass_email == '' || !reset_pass_email) {
            this.setState({
                reset_pass_email_error:false
            })
            return false;
        }

        if (reset_pass_email.length < 6 ) {
            this.setState({
                reset_pass_email_error:true,
            })
        }

    }

    changeRegisterlogin = (reg_login) => {

        reg_login = reg_login.replace(/\s/g, '');
        this.setState({ reg_login:reg_login })

        if (reg_login == '') {
            this.setState({
                reg_login_error:false,
                reg_login_valid:false
            })
            return false;

        }


        if (reg_login.length >= 3 ) {
            this.setState({
                reg_login_error:false,
                reg_login_valid: true
            })
        } else {
            this.setState({
                reg_login_valid: false
            })
        }


    }


    changeResetPassPhone = (reset_pass_phone) => {

        reset_pass_phone = reset_pass_phone.split('+').join('');
        reset_pass_phone = '+'+reset_pass_phone;

        this.setState({
            reset_pass_phone:reset_pass_phone,
        })

    }

    closeResetPassSuccess = () => {

        this.setState({
            isOpenResetPass:false,
            reset_password_success:false
        })

    }

    sendResetPasswordCode = () => {

        let req = {
            EMAIL:this.state.reset_pass_email,
            PHONE: this.state.reset_pass_phone,
        }

        let sys_request_detail = JSON.stringify({
            url: 'https://qr-gid.by/api/auth/forgotPass/',
            data: {
                EMAIL:this.state.reset_pass_email,
                PHONE: this.state.reset_pass_phone,
            }
        })


        axios.post('https://qr-gid.by/api/auth/forgotPass/', req).then(
            (response) => {

                console.log(response.data, 'response.forgotPass')

                if(response.data.TYPE == "OK") {

                    this.setState({
                        isOpenResetPass:false,
                        reset_password_success:true
                    })

                     this.sysEvents(sys_request_detail, false, function () {

                     })

                    // alert('New password - '+response.data.PASS )
                }
                else if (response.data.TYPE == 'ERROR') {

                    this.sysEvents(sys_request_detail, true, function () {

                    })

                    console.log('forgotPass Error')

                    if(response.data.MESSAGE.hasOwnProperty('email')) {

                        let error = '';
                        if(response.data.MESSAGE.email == 'Введите почту') {
                            error = this.state.language.reg_email_error_text1;
                        }  else if(response.data.MESSAGE.email == 'Почта введена не верно') {
                            error = this.state.language.reg_email_error_text2;
                        } else if(response.data.MESSAGE.email == 'Должно быть заполнено только одно поле') {
                            error = this.state.language.reg_email_error_text3;
                        }

                        this.setState({
                            reset_pass_email_error: true,
                            reset_pass_email_valid: false,
                            reset_pass_email_text: error
                        })

                    }
                    if(response.data.MESSAGE.hasOwnProperty('phone')) {

                        let error = '';
                        if(response.data.MESSAGE.phone == 'Введите номер телефона') {
                            error = this.state.language.reg_phone_error_text1;
                        } else if(response.data.MESSAGE.phone == 'Такой нормер телефона не существует') {
                            error = this.state.language.reset_pass_phone_text2;
                        } else if(response.data.MESSAGE.phone == 'Должно быть заполнено только одно поле') {
                            error = this.state.language.reset_pass_phone_text3;
                        }

                        this.setState({
                            reset_pass_phone_error: true,
                            reset_pass_phone_valid:false,
                            reset_pass_phone_text: error
                        })

                    }


                }

            },

            (err) => {
                console.log(err.response.data, 'ERROR sendResetPasswordCode')


            },

        );



    }


    changeLoginPassword = (password) => {
        this.setState({
            password:password,

        })

        if (password.length > 0 && password.length < 6 ) {

            this.setState({
                password_error:false,
                password_valid:false,

            })

        }

    }

    changeLoginlogin = (login) => {
        login = login.replace(/\s/g, '');

        this.setState({
            login:login,

        })

        if (login.length > 0) {
            this.setState({
                login_error:false
            })
        }

    }


    changeFio = (reg_fio) => {

        this.setState({ reg_fio:reg_fio })

        if (reg_fio == '') {
            this.setState({
                reg_fio_valid:false
            })

        } else {
            this.setState({
                reg_fio_valid:true
            })
        }

    }



    render() {

        Animated.loop(Animated.timing( this.state.bottom_right_svg,
            {
                toValue: 2,
                duration: 2500,
                // easing: Easing.linear, // Easing is an additional import from react-native
                 useNativeDriver: false  // To make use of native driver for performance
            })).start();


        const scale1 = this.state.bottom_right_svg.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [1, 1.1, 1]
        })
        return (

            <SafeAreaProvider style={ styles.container}>

                {/*custom StatusBar*/}
                <View style={ { backgroundColor:"white", height: this.state.STATUSBAR_HEIGHT }}>
                    <StatusBar translucent backgroundColor={"white"} barStyle="dark-content" />
                </View>
                {/*custom StatusBar*/}

                <View style={styles.topPanel}>
                    <TouchableOpacity style={styles.returnBack  } onPress={() => this.goToDashboard()}>
                        <Svg width={18} height={16} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path  d="M16.75 8H1m0 0l6.3-7M1 8l6.3 7"  stroke="#000"  strokeLinecap="round"  strokeLinejoin="round"/>
                        </Svg>
                    </TouchableOpacity>


                    <Text style={styles.topPanelText}>
                        {/*Авторизация*/}
                        {this.state.language.signin}
                    </Text>

                </View>


                <LinearGradient
                    colors={['#E1C1B7', '#FFFFFF']}
                    style={styles.loginWrapperGradient}
                >

                    <View style={styles.loginWrapper}>


                        {/* LOGIN FORM LOGIN*/}

                        <View style={styles.inputWrapper}>

                            {this.state.login_error  &&

                                <TouchableOpacity style={styles.emptyInput}
                                      onPress={()=> this.clearLoginloginInput()}
                                >
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                    </Svg>
                                </TouchableOpacity>

                            }

                            {this.state.login_valid &&

                                <TouchableOpacity style={styles.emptyInput}>
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                    </Svg>
                                </TouchableOpacity>

                            }


                            <TextInput
                                value={this.state.login}
                                onChangeText={(login) => this.changeLoginlogin(login)}
                                onBlur={() => this.onBlurLogin()}
                                style={[
                                    styles.input,
                                    this.state.login_error && {
                                        borderWidth:1, borderColor:'#A4223C'
                                    },
                                    this.state.login_valid && {
                                        borderWidth:1, borderColor:'#337363'
                                    },
                                    {marginBottom:16}
                                ]}
                                label={
                                    <Text
                                        style={[
                                            {color: this.state.login_error ? '#A4223C'  : this.state.login_valid ?  '#337363' : '#55545F' },
                                            {marginBottom:50, }
                                        ]}>
                                        {/*Логин или E-mail*/}
                                        {this.state.language.login_or_email}
                                    </Text>
                                }
                                theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                underlineColor='transparent'
                                underlineColorAndroid ='transparent'
                                selectionColor='#E1C1B7'
                                activeOutlineColor='transparent'
                            />


                        </View>



                        {/* LOGIN FORM PASSWORD*/}

                        <View style={styles.inputWrapper}>

                            {this.state.password_error &&

                                <TouchableOpacity style={styles.emptyInput}
                                      onPress={()=> this.clearLoginPasswordInput()}
                                >
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                    </Svg>
                                </TouchableOpacity>

                            }

                            {this.state.password_valid &&

                                <TouchableOpacity style={styles.emptyInput}>
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                    </Svg>
                                </TouchableOpacity>

                            }

                            <TextInput
                                value={this.state.password}
                                onChangeText={(password) => this.changeLoginPassword(password)}
                                secureTextEntry={true}
                                style={[
                                    styles.input,
                                    this.state.password_error && {
                                        borderWidth:1, borderColor:'#A4223C'
                                    },
                                    this.state.password_valid && {
                                        borderWidth:1, borderColor:'#337363'
                                    },
                                    {marginBottom:5}
                                ]}
                                label={
                                    <Text style={[{color: this.state.password_error ?  '#A4223C' : this.state.password_valid ? '#337363' :  '#55545F' }]}>
                                        {/*Пароль*/}
                                        {this.state.language.password}
                                    </Text>
                                }
                                theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                underlineColor='transparent'
                                underlineColorAndroid ='transparent'
                                selectionColor='#E1C1B7'
                                activeOutlineColor='transparent'
                            />

                            {this.state.password_error &&

                                <Text style={[styles.inp_buttom_label, {color:'#A4223C'}]}>
                                   {/*Не верный логин или пароль!*/}
                                    {this.state.language.wrong_login_or_password }
                                </Text>

                            }
                        </View>

                        <View style={styles.buttonWrapper}>

                            <TouchableOpacity
                                style={styles.resetPassword}
                                onPress={()=>{this.setState({isOpenResetPass: !this.state.isOpenResetPass})}}
                            >
                                <Text style={styles.resetPasswordText}>

                                    {/*ЗАБЫЛИ ПАРОЛЬ?*/}
                                    {this.state.language.forgot_your_password}
                                </Text>
                            </TouchableOpacity>

                            <View  style={styles.loginButtonWrapper}>
                                <TouchableOpacity
                                    style={styles.loginButton}
                                    onPress={()=>this.loginHandle()}
                                >
                                    <Text style={styles.loginButtonText}>
                                        {/*ВОЙТИ*/}
                                        {this.state.language.sign_in}

                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>


                    </View>



                    {/*Reset Password*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isOpenResetPass}
                    >

                        <TouchableOpacity
                            style={styles.modalWrapper}
                            onPress={()=>{this.setState({isOpenResetPass: !this.state.isOpenResetPass})}}
                        >

                            <TouchableHighlight style={styles.modalWrapperContent}>
                                <View style={{width:'100%'}}>

                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16}}>

                                        <View style={{width:208}}>

                                            <Text style={{color:'#1D1D20', fontSize: 24, marginBottom:5}}>
                                                {/*Забыли пароль?*/}
                                                {this.state.language.forgot_your_password}?
                                            </Text>

                                            <Text style={{color:'#54535F', fontSize:14}}>
                                                {/*Введите e-mail или номер телефона, и мы вышлем вам временный пароль. Изменить его вы сможете самостоятельно в вашем профиле*/}
                                                {this.state.language.forgot_your_password2}
                                            </Text>

                                        </View>


                                        <TouchableOpacity
                                            onPress={()=>{this.setState({isOpenResetPass: false})}}
                                        >
                                            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z" fill="#393840" />
                                            </Svg>
                                        </TouchableOpacity>

                                    </View>




                                    {/*RESET PASSWORD - PHONE INPUT*/}
                                    <View style={{width:'100%'}}>


                                        {this.state.reset_pass_phone_error &&

                                            <TouchableOpacity style={styles.emptyInput}
                                                onPress={()=>this.clearResetPassPhoneInput()}
                                            >
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }

                                        {this.state.reset_pass_phone_valid &&

                                            <TouchableOpacity style={styles.emptyInput}>
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                </Svg>
                                            </TouchableOpacity>


                                        }


                                        <TextInput
                                            value={this.state.reset_pass_phone}
                                            onChangeText={(reset_pass_phone) => this.changeResetPassPhone(reset_pass_phone)}
                                            // keyboardType='numeric'

                                            style={[
                                                styles.input,
                                                {marginBottom:0},
                                                this.state.reset_pass_phone_error && {
                                                    borderWidth:1, borderColor:'#A4223C'
                                                },
                                                this.state.reset_pass_phone_valid && {
                                                    borderWidth:1, borderColor:'#337363'
                                                }
                                            ]}
                                            label={
                                                <Text
                                                    style={[
                                                        {color: this.state.reset_pass_phone_error ? '#A4223C' : this.state.reset_pass_phone_valid ? '#337363' : '#55545F'  },
                                                    ]}
                                                >
                                                    {/*Телефон*/}
                                                    {this.state.language.phone}
                                                </Text>
                                            }
                                            theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                            underlineColor='transparent'
                                            underlineColorAndroid ='transparent'
                                            selectionColor='#E1C1B7'
                                            activeOutlineColor='transparent'

                                        />




                                        {/*<MaskInput*/}
                                        {/*    style={[*/}
                                        {/*        styles.input,*/}
                                        {/*        {marginBottom:0},*/}
                                        {/*        this.state.reset_pass_phone_error && {*/}
                                        {/*            borderWidth:1, borderColor:'#A4223C'*/}
                                        {/*        },*/}
                                        {/*        this.state.reset_pass_phone_valid && {*/}
                                        {/*            borderWidth:1, borderColor:'#337363'*/}
                                        {/*        }*/}
                                        {/*    ]}*/}
                                        {/*    value={this.state.reset_pass_phone_masked}*/}
                                        {/*    onChangeText={(masked, unmasked) => {*/}

                                        {/*        this.changeResetPassPhone(masked,unmasked);*/}

                                        {/*        // you can use the unmasked value as well*/}

                                        {/*        // assuming you typed "9" all the way:*/}
                                        {/*        //console.log(masked); // (99) 99999-9999*/}
                                        {/*        //console.log(unmasked); // 99999999999*/}
                                        {/*    }}*/}
                                        {/*    mask={[ '+', /\d/, /\d/,/\d/, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/,  '-', /\d/,/\d/,'-', /\d/, /\d/, ]}*/}
                                        {/*/>*/}



                                        {this.state.reset_pass_phone_error &&

                                            <Text style={[styles.inp_buttom_label, {color:'#A4223C',marginBottom: 6,}]}>
                                                {this.state.reset_pass_phone_text}
                                            </Text>

                                        }


                                    </View>




                                    <Text style={{marginVertical:8, width:'100%', textAlign:'center'}}>
                                        {/*или*/}
                                        {this.state.language.or}
                                    </Text>


                                    {/*RESET PASSWORD - EMAIL INPUT*/}

                                    <View style={{width:'100%'}}>


                                        {this.state.reset_pass_email_error &&

                                            <TouchableOpacity style={styles.emptyInput}
                                                onPress={()=>this.clearResetPassEmailInput()}
                                            >
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }

                                        {this.state.reset_pass_email_valid &&

                                            <TouchableOpacity style={styles.emptyInput}>
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }



                                        <TextInput
                                            value={this.state.reset_pass_email}
                                            onChangeText={(reset_pass_email) => this.changeResetPassEmail(reset_pass_email)}

                                            style={[
                                                styles.input,
                                                {marginBottom: 8},
                                                this.state.reset_pass_email_error && {
                                                    borderWidth:1, borderColor:'#A4223C'
                                                },
                                                this.state.reset_pass_email_valid && {
                                                    borderWidth:1, borderColor:'#337363'
                                                }
                                            ]}
                                            label={
                                                <Text
                                                    style={[
                                                        {color: !this.state.reset_pass_email_error ? '#55545F' : '#A4223C'},
                                                        {color: this.state.reset_pass_email_valid ? '#337363' : '#55545F'},
                                                    ]
                                                    }>
                                                    E-mail
                                                </Text>
                                            }
                                            theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                            underlineColor='transparent'
                                            underlineColorAndroid ='transparent'
                                            selectionColor='#E1C1B7'
                                            activeOutlineColor='transparent'
                                            // error={this.state.reg_email_error}
                                        />



                                        {this.state.reset_pass_email_error &&

                                            <Text style={[styles.inp_buttom_label, {color:'#A4223C', marginBottom:8}]}>
                                                {this.state.reset_pass_email_text}
                                            </Text>

                                        }

                                    </View>


                                    <View style={{
                                        width:'100%',
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
                                        marginTop:16
                                    }}>
                                        <TouchableOpacity
                                            style={[styles.register_button, {height: 36,}]}
                                            onPress={()=> this.sendResetPasswordCode()}
                                        >
                                            <Text style={styles.register_button_text} >
                                                {/*ОТПРАВИТЬ*/}
                                                {this.state.language.send}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            </TouchableHighlight>

                        </TouchableOpacity>

                    </Modal>





                    {/*RESET PASSWORD SUCCESS MODAL*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.reset_password_success}
                    >

                        <TouchableOpacity
                            style={styles.modalWrapper}
                            onPress={()=>{this.setState({reset_password_success: !this.state.reset_password_success})}}
                        >

                            <TouchableHighlight style={styles.modalWrapperContent}>
                                <View style={{width:'100%'}}>

                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16}}>

                                        <View style={{flex:1}}>

                                            <Text style={{color:'#54535F', fontSize:14}}>
                                                {/*Пароль успешно отправлен. Для повторной авторизации нажмите “Войти”*/}
                                                {this.state.language.reset_password_success}
                                            </Text>
                                        </View>


                                        <TouchableOpacity
                                            onPress={()=>{this.setState({reset_password_success: false})}}
                                        >
                                            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path
                                                    d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z"
                                                    fill="#393840"
                                                />
                                            </Svg>
                                        </TouchableOpacity>

                                    </View>


                                    <TouchableOpacity
                                        style={[styles.register_button, {height: 36}]}
                                        onPress={()=> this.closeResetPassSuccess()}
                                    >

                                        <Text style={styles.register_button_text} >
                                            {/*ВОЙТИ*/}
                                            {this.state.language.sign_in}
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </TouchableHighlight>

                        </TouchableOpacity>

                    </Modal>





                    {/*REGISTER POLITIC MODAL*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.show_politic_modal}
                    >

                        { this.state.show_politic_text_modal &&

                            <TouchableOpacity
                                style={[styles.modalWrapper, {paddingHorizontal: 16, paddingVertical: 60 }]}
                                onPress={()=>{
                                    this.setState({
                                        show_politic_text_modal: false,
                                    })
                                }}
                            >

                                <TouchableHighlight
                                    style={[
                                        styles.modalWrapperContent,
                                        {  shadowColor: '#000',
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.22,
                                            shadowRadius: 2.22,
                                            elevation: 3,
                                            width: '100%',
                                            // maxWidth: 320
                                            height: '100%'
                                        }
                                    ]}
                                >
                                    <View style={{width:'100%', height:'100%', justifyContent:'space-between'}}>

                                        <View style={{ justifyContent:'space-between', alignItems:'flex-start',marginBottom:16,  flex:1, width: '100%'}}>

                                            <Text style={{color: '#393840', fontSize:20, fontWeight:'500', marginBottom:18}}>
                                                {/*Общие положения*/}
                                                {this.state.language.general_provisions}

                                            </Text>

                                            <ScrollView style={{ width:'100%', marginBottom:24, zIndex:9999999}}>
                                                <TouchableWithoutFeedback>
                                                    <Text style={{color:'#54535F', fontSize:14}}>
                                                        {this.state.politic_text}
                                                        {/*Для улучшения работы приложения используются технологии сбора технических данных посетителей. Персональные данные пользователей хранятся и обрабатываются в соответствии с Политикой в отношении обработки персональных данных*/}
                                                    </Text>
                                                </TouchableWithoutFeedback>
                                            </ScrollView>
                                        </View>

                                        <View style={{flexDirection:'row', width:'100%', alignItems:'center'}}>

                                            <TouchableOpacity
                                                style={{marginRight: 20}}
                                                onPress={()=> {
                                                    this.setState({
                                                        show_politic_text_modal: false
                                                    })
                                                }}
                                            >
                                                <Text style={styles.register_button_text} >
                                                    {/*ОТМЕНА*/}
                                                    {this.state.language.cancel}
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.register_button, {height: 36, flex:1}]}
                                                onPress={()=> {
                                                    this.setState({
                                                        show_politic_modal: false,
                                                        show_politic_text_modal: false,
                                                    })
                                                }}
                                            >

                                                <Text style={styles.register_button_text} >
                                                    {/*ПРИНЯТЬ И ПРОДОЛЖИТЬ*/}
                                                    {this.state.language.accept_and_continue}

                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </TouchableHighlight>

                            </TouchableOpacity>

                        }

                        { !this.state.show_politic_text_modal &&

                            <TouchableOpacity
                                style={styles.modalWrapper}
                                onPress={()=>{
                                    this.setState({
                                        // isOpenRegisterModal: false,
                                        // show_politic_modal: false,
                                    })
                                }}
                            >

                                <TouchableHighlight
                                    style={[
                                        styles.modalWrapperContent,
                                        {  shadowColor: '#000',
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.22,
                                            shadowRadius: 2.22,
                                            elevation: 3,
                                            width: '100%',
                                            maxWidth: 320
                                        }
                                    ]}
                                >
                                    <View style={{width:'100%'}}>

                                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16}}>

                                            <View style={{flex:1}}>

                                                <Text style={{color:'#54535F', fontSize:14, marginBottom: 24}}>
                                                    {/*Для улучшения работы приложения используются технологии сбора технических данных посетителей. Персональные данные пользователей хранятся и обрабатываются в соответствии с Политикой в отношении обработки персональных данных*/}

                                                    {this.state.language.politic_popup_text }
                                                </Text>

                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        this.setState({
                                                            show_politic_text_modal: true,
                                                        })
                                                    }}
                                                    style={{width: '100%', padding: 10, flexDirection:'row', alignItems:'center'}}
                                                >

                                                    <Svg style={{marginRight: 10}} width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <Path fillRule="evenodd" clipRule="evenodd" d="M14 2H4a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1zM4 1a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2H4zm1 3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 015 4zm.5 2a.5.5 0 000 1h7a.5.5 0 000-1h-7zM5 9a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3A.5.5 0 015 9zm5.9 3.3a.5.5 0 00-.8-.6l-1.154 1.539-.592-.593a.5.5 0 00-.708.708l1 1A.5.5 0 009.4 14.3l1.5-2z" fill="#55545F"/>
                                                    </Svg>

                                                    <Text style={{fontSize:12 , fontWeight:'bold'}}>
                                                        {/*ОЗНАКОМИТЬСЯ С ПОЛИТИКОЙ*/}
                                                        {this.state.language.read_the_policy}
                                                    </Text>


                                                </TouchableOpacity>
                                            </View>


                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({
                                                        isOpenRegisterModal: false,
                                                        show_politic_modal: false,
                                                    })
                                                }}
                                            >
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path
                                                        d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z"
                                                        fill="#393840"
                                                    />
                                                </Svg>
                                            </TouchableOpacity>

                                        </View>


                                        <TouchableOpacity
                                            style={[styles.register_button, {height: 36}]}
                                            onPress={()=> {
                                                this.setState({
                                                    show_politic_modal: false
                                                })
                                            }}
                                        >

                                            <Text style={styles.register_button_text} >
                                                {/*Принять и продолжить*/}
                                                {this.state.language.accept_and_continue}
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </TouchableHighlight>

                            </TouchableOpacity>
                        }



                    </Modal>


                    {/*REGISTER POLITIC TEXT MODAL*/}




                    {/*<Modal*/}
                    {/*    animationType="slide"*/}
                    {/*    transparent={true}*/}
                    {/*    visible={this.state.show_politic_text_modal}*/}
                    {/*>*/}

                    {/*    <TouchableOpacity*/}
                    {/*        style={styles.modalWrapper}*/}
                    {/*        onPress={()=>{*/}
                    {/*            this.setState({*/}
                    {/*                show_politic_text_modal: false,*/}
                    {/*            })*/}
                    {/*        }}*/}
                    {/*    >*/}

                    {/*        <TouchableHighlight*/}
                    {/*            style={[*/}
                    {/*                styles.modalWrapperContent,*/}
                    {/*                {  shadowColor: '#000',*/}
                    {/*                    shadowOffset: {*/}
                    {/*                        width: 0,*/}
                    {/*                        height: 1,*/}
                    {/*                    },*/}
                    {/*                    shadowOpacity: 0.22,*/}
                    {/*                    shadowRadius: 2.22,*/}
                    {/*                    elevation: 3,*/}
                    {/*                    width: '100%',*/}
                    {/*                    maxWidth: 320*/}
                    {/*                }*/}
                    {/*            ]}*/}
                    {/*        >*/}
                    {/*            <View style={{width:'100%'}}>*/}

                    {/*                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16}}>*/}

                    {/*                    <View style={{flex:1}}>*/}

                    {/*                        <Text style={{color:'#54535F', fontSize:14, marginBottom: 24}}>*/}
                    {/*                            Для улучшения работы приложения используются технологии сбора технических данных посетителей. Персональные данные пользователей хранятся и обрабатываются в соответствии с Политикой в отношении обработки персональных данных*/}
                    {/*                        </Text>*/}


                    {/*                    </View>*/}


                    {/*                    <TouchableOpacity*/}
                    {/*                        onPress={()=>{*/}
                    {/*                            this.setState({*/}
                    {/*                                show_politic_text_modal: false,*/}
                    {/*                            })*/}
                    {/*                        }}*/}
                    {/*                    >*/}
                    {/*                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*                            <Path*/}
                    {/*                                d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z"*/}
                    {/*                                fill="#393840"*/}
                    {/*                            />*/}
                    {/*                        </Svg>*/}
                    {/*                    </TouchableOpacity>*/}

                    {/*                </View>*/}


                    {/*            </View>*/}
                    {/*        </TouchableHighlight>*/}

                    {/*    </TouchableOpacity>*/}

                    {/*</Modal>*/}




                    {/*REGISTER*/}


                    <View style={[styles.registerWrapper, {height:this.state.isOpenRegisterModal ? '100%' : Platform.OS === 'ios' ? 55 : 48,}]}>

                        {/*{this.state.isOpenRegisterModal &&*/}

                        {/*    */}
                        {/*  */}

                        {/*}*/}

                        {!this.state.isOpenRegisterModal && !this.state.keyboardOpen &&

                              <View style={{position:'absolute', top: -210, alignSelf: 'center', width: 188, height: 188, borderRadius: 168, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>


                                  {/*Top left START*/}


                                      <Animated.View style={{transform: [ { scale: scale1 },], position:'absolute', right: 55, top: 0, zIndex: 88  }} >

                                          <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <Circle cx={12.2839} cy={12} r={12} fill="#FF9161" />
                                          </Svg>
                                      </Animated.View>


                                  {/*Top left END*/}



                                  {/*Top right START*/}


                                      <Animated.View style={{transform: [ { scale: scale1 },], position:'absolute', right: 30, top: 0, zIndex: 87  }} >

                                          <Svg width={41} height={40} viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <Circle cx={20.2839} cy={20} r={20} fill="#F9D7C8" />
                                          </Svg>
                                      </Animated.View>


                                  {/*Top right END*/}



                                  {/*Bottom right START*/}


                                      <Animated.View style={{transform: [ { scale: scale1 },], position:'absolute', right:0, bottom: 0, zIndex: 88  }} >


                                          <Svg width={57} height={56} viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <Circle cx={28.2839} cy={28} r={28} fill="#F9D7C8" />
                                          </Svg>

                                          <Svg
                                              style={{ position:'absolute', right:0, bottom: 0, zIndex: 88  }}
                                              width={19}
                                              height={18} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <Circle cx={9.28394} cy={9} r={9} fill="#FDF2ED" />
                                          </Svg>

                                      </Animated.View>


                                  {/*Bottom right END*/}



                                  {/*Bottom left START*/}


                                      <Animated.View style={{transform: [ { scale: scale1 },], position:'absolute', left:30, bottom: 10, zIndex: 88  }} >

                                          <Svg width={33} height={32} viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <Circle cx={16.2839} cy={16} r={16} fill="#F5BCA3" />
                                          </Svg>

                                      </Animated.View>


                                  {/*Bottom left END*/}

                                  <Svg width={169} height={168} viewBox="0 0 169 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <Rect x={0.283936} width={168} height={168} rx={84} fill="#fff" />
                                      <Path d="M27.504 57.168a4.52 4.52 0 01-1.708-.322 3.78 3.78 0 01-1.372-.98l.784-.756c.597.625 1.34.938 2.226.938.663 0 1.176-.163 1.54-.49.364-.327.546-.775.546-1.344 0-.57-.182-1.003-.546-1.302-.355-.308-.882-.462-1.582-.462h-.924l.182-1.092h.756c.56 0 1.003-.14 1.33-.42.336-.29.504-.681.504-1.176 0-.439-.135-.793-.406-1.064-.261-.28-.667-.42-1.218-.42-.765 0-1.512.299-2.24.896l-.7-.798c.896-.793 1.909-1.19 3.038-1.19.933 0 1.652.233 2.156.7.504.457.756 1.045.756 1.764 0 .588-.168 1.069-.504 1.442-.336.364-.798.611-1.386.742.635.065 1.162.303 1.582.714.42.41.63.97.63 1.68 0 .579-.15 1.092-.448 1.54-.29.439-.695.784-1.218 1.036-.523.243-1.115.364-1.778.364zm10.416-1.89c0 .299.051.523.154.672a.96.96 0 00.462.322l-.294.896c-.383-.047-.691-.154-.924-.322-.234-.168-.406-.43-.518-.784-.495.737-1.228 1.106-2.198 1.106-.728 0-1.302-.205-1.722-.616-.42-.41-.63-.947-.63-1.61 0-.784.28-1.386.84-1.806.569-.42 1.372-.63 2.408-.63h1.134v-.546c0-.523-.126-.896-.378-1.12-.252-.224-.64-.336-1.162-.336-.542 0-1.204.13-1.988.392l-.322-.938c.914-.336 1.764-.504 2.548-.504.868 0 1.516.215 1.946.644.429.42.644 1.022.644 1.806v3.374zm-3.024.924c.737 0 1.316-.383 1.736-1.148V53.36h-.966c-1.363 0-2.044.504-2.044 1.512 0 .439.107.77.322.994.214.224.532.336.952.336zm9.092-6.748c.943 0 1.633.336 2.072 1.008.439.672.658 1.62.658 2.842 0 1.157-.252 2.09-.756 2.8s-1.218 1.064-2.142 1.064c-.821 0-1.465-.28-1.932-.84v3.5l-1.288.154v-10.36h1.106l.098.994c.27-.373.597-.658.98-.854a2.512 2.512 0 011.204-.308zm-.476 6.664c1.213 0 1.82-.938 1.82-2.814 0-1.885-.555-2.828-1.666-2.828-.364 0-.695.107-.994.322-.299.215-.56.49-.784.826v3.598c.187.29.42.513.7.672.28.15.588.224.924.224zm11.007-3.024c0 .215-.009.434-.028.658h-4.704c.056.812.262 1.41.616 1.792.355.383.812.574 1.372.574.355 0 .682-.051.98-.154.3-.103.612-.266.938-.49l.56.77c-.784.616-1.642.924-2.576.924-1.026 0-1.829-.336-2.408-1.008-.569-.672-.854-1.596-.854-2.772 0-.765.122-1.442.364-2.03.252-.597.607-1.064 1.064-1.4.467-.336 1.013-.504 1.638-.504.98 0 1.732.322 2.254.966.523.644.784 1.535.784 2.674zm-1.274-.378c0-.728-.144-1.283-.434-1.666-.289-.383-.723-.574-1.302-.574-1.054 0-1.628.775-1.722 2.324h3.458v-.084zM57.9 57h-1.288v-7.378h4.606l-.168 1.064H57.9V57zm10.49 0h-1.275v-3.332c0-.56.019-1.092.056-1.596.038-.504.07-.835.098-.994L64.174 57h-1.526v-7.378h1.274v3.332c0 .495-.018 1.008-.056 1.54-.037.523-.065.859-.084 1.008l3.052-5.88h1.554V57zm5.377-7.546c.438 0 .84.065 1.204.196.364.121.714.322 1.05.602l-.616.812a2.93 2.93 0 00-.77-.406 2.246 2.246 0 00-.812-.14c-.597 0-1.064.238-1.4.714-.327.476-.49 1.18-.49 2.114 0 .933.163 1.624.49 2.072.327.439.793.658 1.4.658.29 0 .555-.042.798-.126.242-.093.513-.238.812-.434l.588.84c-.672.541-1.423.812-2.254.812-.999 0-1.788-.336-2.366-1.008-.57-.672-.854-1.6-.854-2.786 0-.784.13-1.47.392-2.058.261-.588.63-1.045 1.106-1.372.485-.327 1.06-.49 1.722-.49zm9.016.168l-.154 1.05h-2.366V57h-1.288v-6.328h-2.436v-1.05h6.244zm4.756-.168c.943 0 1.633.336 2.072 1.008.439.672.658 1.62.658 2.842 0 1.157-.252 2.09-.756 2.8s-1.218 1.064-2.142 1.064c-.822 0-1.466-.28-1.932-.84v3.5l-1.288.154v-10.36h1.106l.098.994c.27-.373.597-.658.98-.854a2.512 2.512 0 011.204-.308zm-.476 6.664c1.213 0 1.82-.938 1.82-2.814 0-1.885-.556-2.828-1.666-2.828-.364 0-.695.107-.994.322-.299.215-.56.49-.784.826v3.598c.186.29.42.513.7.672.28.15.588.224.924.224zM98.237 57h-1.274v-3.332c0-.56.019-1.092.056-1.596.038-.504.07-.835.098-.994L94.023 57h-1.526v-7.378h1.274v3.332c0 .495-.018 1.008-.056 1.54-.037.523-.065.859-.084 1.008l3.052-5.88h1.554V57zm6.078-7.546c.942 0 1.633.336 2.072 1.008.438.672.658 1.62.658 2.842 0 1.157-.252 2.09-.756 2.8s-1.218 1.064-2.142 1.064c-.822 0-1.466-.28-1.932-.84v3.5l-1.288.154v-10.36h1.106l.098.994c.27-.373.597-.658.98-.854a2.51 2.51 0 011.204-.308zm-.476 6.664c1.213 0 1.82-.938 1.82-2.814 0-1.885-.556-2.828-1.666-2.828-.364 0-.696.107-.994.322-.299.215-.56.49-.784.826v3.598a2 2 0 00.7.672c.28.15.588.224.924.224zm8.335.924c-.29.859-.696 1.535-1.218 2.03-.514.504-1.251.807-2.212.91l-.14-1.008c.485-.084.872-.205 1.162-.364.289-.159.518-.364.686-.616.177-.243.34-.574.49-.994h-.434l-2.478-7.378h1.372l1.974 6.44 1.932-6.44h1.33l-2.464 7.42zm9.711-.042h-1.274v-3.332c0-.56.019-1.092.056-1.596.038-.504.07-.835.098-.994L117.671 57h-1.526v-7.378h1.274v3.332c0 .495-.018 1.008-.056 1.54-.037.523-.065.859-.084 1.008l3.052-5.88h1.554V57zm-2.898-9.002c-.569 0-1.05-.145-1.442-.434a1.704 1.704 0 01-.658-1.204l.854-.182c.094.299.238.513.434.644.206.13.476.196.812.196.336 0 .612-.065.826-.196.215-.14.369-.355.462-.644l.854.182a1.667 1.667 0 01-.686 1.204c-.392.29-.877.434-1.456.434zm10.572 1.624l-.154 1.05h-2.366V57h-1.288v-6.328h-2.436v-1.05h6.244zm6.584 3.472c0 .215-.01.434-.028.658h-4.704c.056.812.261 1.41.616 1.792.354.383.812.574 1.372.574a3 3 0 00.98-.154c.298-.103.611-.266.938-.49l.56.77c-.784.616-1.643.924-2.576.924-1.027 0-1.83-.336-2.408-1.008-.57-.672-.854-1.596-.854-2.772 0-.765.121-1.442.364-2.03.252-.597.606-1.064 1.064-1.4.466-.336 1.012-.504 1.638-.504.98 0 1.731.322 2.254.966.522.644.784 1.535.784 2.674zm-1.274-.378c0-.728-.145-1.283-.434-1.666-.29-.383-.724-.574-1.302-.574-1.055 0-1.629.775-1.722 2.324h3.458v-.084zm6.054-3.262c.438 0 .84.065 1.204.196.364.121.714.322 1.05.602l-.616.812a2.94 2.94 0 00-.77-.406 2.25 2.25 0 00-.812-.14c-.598 0-1.064.238-1.4.714-.327.476-.49 1.18-.49 2.114 0 .933.163 1.624.49 2.072.326.439.793.658 1.4.658.289 0 .555-.042.798-.126.242-.093.513-.238.812-.434l.588.84c-.672.541-1.424.812-2.254.812-.999 0-1.788-.336-2.366-1.008-.57-.672-.854-1.6-.854-2.786 0-.784.13-1.47.392-2.058.261-.588.63-1.045 1.106-1.372.485-.327 1.059-.49 1.722-.49zm6.3 2.548c1.102 0 1.9.215 2.394.644.495.43.742 1.04.742 1.834 0 .83-.28 1.46-.84 1.89-.55.42-1.236.63-2.058.63h-2.506v-7.378h1.288v2.38h.98zm.126 3.99c.523 0 .924-.117 1.204-.35.29-.233.434-.62.434-1.162 0-.513-.135-.891-.406-1.134-.261-.243-.718-.364-1.372-.364h-.966v3.01h1.106zm5.196-.77a.95.95 0 01.7.28c.187.187.28.415.28.686 0 .29-.084.62-.252.994l-.938 2.142h-.924l.56-2.324a1.08 1.08 0 01-.294-.35 1.084 1.084 0 01-.098-.462c0-.27.093-.5.28-.686a.933.933 0 01.686-.28zm-121.863 10.4V73h-1.288v-3.08c-.27.252-.607.453-1.008.602-.392.14-.798.21-1.218.21-.7 0-1.227-.187-1.582-.56-.355-.383-.532-.924-.532-1.624v-2.926h1.288v2.772c0 .467.093.807.28 1.022.196.205.495.308.896.308a2.63 2.63 0 001.022-.224c.364-.15.649-.34.854-.574v-3.304h1.288zm7.676 0l-.154 1.05h-2.367V73H34.55v-6.328h-2.435v-1.05h6.244zm3.784-.168c1.035 0 1.838.345 2.407 1.036.58.69.868 1.629.868 2.814 0 .765-.13 1.442-.392 2.03a3.127 3.127 0 01-1.133 1.358c-.495.317-1.083.476-1.765.476-1.035 0-1.843-.345-2.422-1.036-.578-.69-.867-1.629-.867-2.814 0-.765.13-1.437.392-2.016.26-.588.639-1.04 1.134-1.358.494-.327 1.087-.49 1.778-.49zm0 1.036c-1.28 0-1.919.943-1.919 2.828 0 1.876.635 2.814 1.904 2.814 1.27 0 1.904-.943 1.904-2.828 0-1.876-.63-2.814-1.89-2.814zm8.658-.392c.84 0 1.508.303 2.002.91.504.607.756 1.433.756 2.478 0 1.167-.294 2.072-.882 2.716-.588.644-1.376.966-2.366.966-.99 0-1.782-.35-2.38-1.05-.588-.7-.882-1.76-.882-3.178 0-1.073.08-1.95.238-2.632.168-.69.453-1.255.854-1.694.41-.448.985-.798 1.722-1.05.55-.187.99-.355 1.316-.504.336-.15.677-.34 1.022-.574l.546.966c-.326.205-.667.397-1.022.574-.345.168-.76.331-1.246.49-.466.159-.835.34-1.106.546-.27.196-.49.485-.658.868-.158.373-.266.887-.322 1.54.262-.43.598-.765 1.008-1.008.41-.243.878-.364 1.4-.364zm-.49 6.034c.57 0 1.022-.191 1.358-.574.336-.392.504-1.069.504-2.03 0-.85-.14-1.46-.42-1.834-.27-.373-.667-.56-1.19-.56-.43 0-.83.117-1.204.35-.373.224-.681.57-.924 1.036v.896c0 .868.164 1.54.49 2.016.336.467.798.7 1.386.7zm7.54-4.13c1.102 0 1.9.215 2.395.644.494.43.742 1.04.742 1.834 0 .83-.28 1.46-.84 1.89-.551.42-1.237.63-2.058.63h-2.366v-7.378h1.288v2.38h.84zm4.2-2.38h1.289V73H62.05v-7.378zm-4.073 6.37c.522 0 .924-.117 1.204-.35.289-.233.434-.62.434-1.162 0-.513-.136-.891-.406-1.134-.262-.243-.719-.364-1.372-.364h-.826v3.01h.966zm14.49-6.538c.439 0 .84.065 1.204.196.364.121.714.322 1.05.602l-.616.812a2.93 2.93 0 00-.77-.406 2.247 2.247 0 00-.812-.14c-.597 0-1.064.238-1.4.714-.327.476-.49 1.18-.49 2.114 0 .933.163 1.624.49 2.072.327.439.793.658 1.4.658.29 0 .555-.042.798-.126.243-.093.513-.238.812-.434l.588.84c-.672.541-1.423.812-2.254.812-.999 0-1.787-.336-2.366-1.008-.57-.672-.854-1.6-.854-2.786 0-.784.13-1.47.392-2.058.261-.588.63-1.045 1.106-1.372.485-.327 1.06-.49 1.722-.49zm9.437.168V73h-1.288v-6.328h-2.282l-.21 2.464c-.084.999-.192 1.745-.322 2.24-.122.495-.318.877-.588 1.148-.262.261-.663.476-1.204.644l-.322-1.022c.317-.112.54-.257.672-.434.13-.177.228-.448.294-.812.065-.364.135-.999.21-1.904l.294-3.374h4.746zm5.651 7.42c-.29.859-.695 1.535-1.218 2.03-.513.504-1.25.807-2.212.91l-.14-1.008c.485-.084.873-.205 1.162-.364a1.91 1.91 0 00.686-.616c.177-.243.34-.574.49-.994h-.434l-2.478-7.378h1.372l1.974 6.44 1.932-6.44h1.33l-2.464 7.42zm12.456-7.42V73h-8.484v-7.378h1.26v6.342h2.366v-6.342h1.232v6.342h2.366v-6.342h1.26zm7.663 5.656c0 .299.051.523.154.672.103.14.257.247.462.322l-.294.896c-.383-.047-.691-.154-.924-.322-.233-.168-.406-.43-.518-.784-.495.737-1.227 1.106-2.198 1.106-.728 0-1.302-.205-1.722-.616-.42-.41-.63-.947-.63-1.61 0-.784.28-1.386.84-1.806.569-.42 1.372-.63 2.408-.63h1.134v-.546c0-.523-.126-.896-.378-1.12-.252-.224-.639-.336-1.162-.336-.541 0-1.204.13-1.988.392l-.322-.938c.915-.336 1.764-.504 2.548-.504.868 0 1.517.215 1.946.644.429.42.644 1.022.644 1.806v3.374zm-3.024.924c.737 0 1.316-.383 1.736-1.148V69.36h-.966c-1.363 0-2.044.504-2.044 1.512 0 .439.107.77.322.994.215.224.532.336.952.336zm10.415-6.58l-.154 1.05h-2.366V73h-1.288v-6.328h-2.436v-1.05h6.244zm3.635 2.38c1.102 0 1.9.215 2.394.644.495.43.742 1.04.742 1.834 0 .83-.28 1.46-.84 1.89-.55.42-1.236.63-2.058.63h-2.506v-7.378h1.288v2.38h.98zm.126 3.99c.523 0 .924-.117 1.204-.35.29-.233.434-.62.434-1.162 0-.513-.135-.891-.406-1.134-.261-.243-.718-.364-1.372-.364h-.966v3.01h1.106zM30.584 87.278c0 .299.051.523.154.672a.96.96 0 00.462.322l-.294.896c-.383-.047-.69-.154-.924-.322-.233-.168-.406-.43-.518-.784-.495.737-1.227 1.106-2.198 1.106-.728 0-1.302-.205-1.722-.616-.42-.41-.63-.947-.63-1.61 0-.784.28-1.386.84-1.806.57-.42 1.372-.63 2.408-.63h1.134v-.546c0-.523-.126-.896-.378-1.12-.252-.224-.64-.336-1.162-.336-.541 0-1.204.13-1.988.392l-.322-.938c.915-.336 1.764-.504 2.548-.504.868 0 1.517.215 1.946.644.43.42.644 1.022.644 1.806v3.374zm-3.024.924c.737 0 1.316-.383 1.736-1.148V85.36h-.966c-1.363 0-2.044.504-2.044 1.512 0 .439.107.77.322.994.215.224.532.336.952.336zm8.453.84c-.29.859-.695 1.535-1.218 2.03-.513.504-1.25.807-2.212.91l-.14-1.008c.485-.084.873-.205 1.162-.364a1.91 1.91 0 00.686-.616c.177-.243.34-.574.49-.994h-.434l-2.478-7.378h1.372l1.974 6.44 1.932-6.44h1.33l-2.464 7.42zm9.743-1.078V91.1h-1.05l-.21-2.1h-4.732l-.21 2.1h-1.05v-3.136h.518c.224-.15.402-.317.532-.504.131-.196.248-.532.35-1.008.112-.476.201-1.171.266-2.086l.196-2.744h4.62v6.342h.77zm-2.058-5.32h-2.17l-.112 1.554c-.065.868-.14 1.535-.224 2.002-.084.467-.205.826-.364 1.078-.149.252-.368.48-.658.686h3.528v-5.32zM53.416 89h-1.274v-3.332c0-.56.019-1.092.056-1.596.037-.504.07-.835.098-.994L49.202 89h-1.526v-7.378h1.274v3.332c0 .495-.019 1.008-.056 1.54-.037.523-.065.859-.084 1.008l3.052-5.88h1.554V89zm5.462-7.546c1.035 0 1.838.345 2.407 1.036.58.69.869 1.629.869 2.814 0 .765-.131 1.442-.393 2.03a3.126 3.126 0 01-1.134 1.358c-.494.317-1.082.476-1.764.476-1.035 0-1.843-.345-2.422-1.036-.578-.69-.867-1.629-.867-2.814 0-.765.13-1.437.392-2.016.26-.588.639-1.04 1.133-1.358.495-.327 1.088-.49 1.779-.49zm0 1.036c-1.28 0-1.919.943-1.919 2.828 0 1.876.635 2.814 1.904 2.814 1.27 0 1.904-.943 1.904-2.828 0-1.876-.63-2.814-1.89-2.814zM65.603 89h-1.288v-7.378h4.606l-.168 1.064h-3.15V89zm10.49 0h-1.275v-3.332c0-.56.019-1.092.056-1.596.038-.504.07-.835.098-.994L71.88 89h-1.526v-7.378h1.274v3.332c0 .495-.018 1.008-.056 1.54-.037.523-.065.859-.084 1.008l3.052-5.88h1.554V89zm8.61-1.036V91.1h-1.05l-.21-2.1h-4.731l-.21 2.1h-1.05v-3.136h.518c.224-.15.401-.317.532-.504.13-.196.247-.532.35-1.008.112-.476.2-1.171.266-2.086l.196-2.744h4.62v6.342h.77zm-2.057-5.32h-2.17l-.112 1.554c-.066.868-.14 1.535-.224 2.002-.084.467-.206.826-.364 1.078a2.28 2.28 0 01-.658.686h3.528v-5.32zm6.105 1.358c1.102 0 1.9.215 2.394.644.495.43.742 1.04.742 1.834 0 .83-.28 1.46-.84 1.89-.55.42-1.236.63-2.058.63h-2.366v-7.378h1.288v2.38h.84zm4.2-2.38h1.288V89h-1.288v-7.378zm-4.074 6.37c.523 0 .924-.117 1.204-.35.29-.233.434-.62.434-1.162 0-.513-.135-.891-.406-1.134-.26-.243-.718-.364-1.372-.364h-.826v3.01h.966zM31.354 105H30.08v-3.332c0-.56.019-1.092.056-1.596.037-.504.07-.835.098-.994L27.14 105h-1.526v-7.378h1.274v3.332c0 .495-.019 1.008-.056 1.54-.037.523-.065.859-.084 1.008l3.052-5.88h1.554V105zm9.117-7.546c.44 0 .84.065 1.205.196.363.121.713.322 1.05.602l-.617.812a2.93 2.93 0 00-.77-.406 2.246 2.246 0 00-.811-.14c-.598 0-1.064.238-1.4.714-.327.476-.49 1.181-.49 2.114 0 .933.163 1.624.49 2.072.326.439.793.658 1.4.658.289 0 .555-.042.797-.126.243-.093.514-.238.813-.434l.587.84c-.672.541-1.423.812-2.254.812-.998 0-1.787-.336-2.365-1.008-.57-.672-.855-1.601-.855-2.786 0-.784.131-1.47.393-2.058.26-.588.63-1.045 1.105-1.372.486-.327 1.06-.49 1.722-.49zm6.532 0c1.036 0 1.838.345 2.408 1.036.578.69.868 1.629.868 2.814 0 .765-.131 1.442-.392 2.03a3.127 3.127 0 01-1.134 1.358c-.495.317-1.083.476-1.764.476-1.036 0-1.844-.345-2.422-1.036-.579-.691-.868-1.629-.868-2.814 0-.765.13-1.437.392-2.016.261-.588.639-1.04 1.134-1.358.494-.327 1.087-.49 1.778-.49zm0 1.036c-1.279 0-1.918.943-1.918 2.828 0 1.876.634 2.814 1.904 2.814 1.269 0 1.904-.943 1.904-2.828 0-1.876-.63-2.814-1.89-2.814zm8.126-1.036c.44 0 .84.065 1.204.196.364.121.714.322 1.05.602l-.616.812a2.93 2.93 0 00-.77-.406 2.246 2.246 0 00-.812-.14c-.597 0-1.064.238-1.4.714-.326.476-.49 1.181-.49 2.114 0 .933.164 1.624.49 2.072.327.439.794.658 1.4.658.29 0 .556-.042.798-.126.243-.093.514-.238.812-.434l.588.84c-.672.541-1.423.812-2.254.812-.998 0-1.787-.336-2.366-1.008-.569-.672-.854-1.601-.854-2.786 0-.784.131-1.47.392-2.058.262-.588.63-1.045 1.106-1.372.486-.327 1.06-.49 1.722-.49zm9.017.168l-.154 1.05h-2.366V105h-1.288v-6.328h-2.436v-1.05h6.244zm5.777 5.656c0 .299.051.523.154.672.103.14.257.247.462.322l-.294.896c-.383-.047-.69-.154-.924-.322-.233-.168-.406-.429-.518-.784-.495.737-1.227 1.106-2.198 1.106-.728 0-1.302-.205-1.722-.616-.42-.411-.63-.947-.63-1.61 0-.784.28-1.386.84-1.806.57-.42 1.372-.63 2.408-.63h1.134v-.546c0-.523-.126-.896-.378-1.12-.252-.224-.64-.336-1.162-.336-.541 0-1.204.13-1.988.392l-.322-.938c.915-.336 1.764-.504 2.548-.504.868 0 1.517.215 1.946.644.43.42.644 1.022.644 1.806v3.374zm-3.024.924c.737 0 1.316-.383 1.736-1.148v-1.694h-.966c-1.363 0-2.044.504-2.044 1.512 0 .439.107.77.322.994.215.224.532.336.952.336zm9.596-3.206c1.25.121 1.876.7 1.876 1.736 0 .775-.285 1.349-.854 1.722-.56.364-1.311.546-2.254.546h-2.66v-7.28a12.15 12.15 0 012.422-.266c.915 0 1.638.173 2.17.518.532.345.798.84.798 1.484 0 .42-.126.761-.378 1.022s-.625.434-1.12.518zm-1.456-2.548a7.73 7.73 0 00-1.148.084v2.086h1.386c.448 0 .793-.084 1.036-.252.243-.168.364-.453.364-.854 0-.373-.135-.644-.406-.812-.27-.168-.681-.252-1.232-.252zm.224 5.544c.55 0 .98-.093 1.288-.28.308-.187.462-.523.462-1.008 0-.401-.13-.691-.392-.868-.261-.177-.705-.266-1.33-.266h-1.4v2.422h1.372zm10.545-6.37V105H84.52v-6.328h-2.282l-.21 2.464c-.084.999-.192 1.745-.322 2.24-.122.495-.318.877-.588 1.148-.262.261-.663.476-1.204.644l-.322-1.022c.317-.112.541-.257.672-.434.13-.177.228-.448.294-.812.065-.364.135-.999.21-1.904l.294-3.374h4.746zm7.751 0V105h-1.288v-2.828h-1.61L89.107 105h-1.442l1.764-3.122c-.868-.411-1.302-1.078-1.302-2.002 0-.728.261-1.283.784-1.666.523-.392 1.255-.588 2.198-.588h2.45zm-1.288 3.57v-2.576h-1.19c-.532 0-.933.103-1.204.308-.261.196-.392.513-.392.952 0 .467.121.803.364 1.008.252.205.653.308 1.204.308h1.218zm8.964-3.57l-.154 1.05h-2.366V105h-1.288v-6.328h-2.436v-1.05h6.244zm3.635 2.38c1.102 0 1.9.215 2.394.644.495.429.742 1.041.742 1.834 0 .831-.28 1.461-.84 1.89-.55.42-1.236.63-2.058.63h-2.506v-7.378h1.288v2.38h.98zm.126 3.99c.523 0 .924-.117 1.204-.35.29-.233.434-.621.434-1.162 0-.513-.135-.891-.406-1.134-.261-.243-.718-.364-1.372-.364h-.966v3.01h1.106zm11.288-6.538c.439 0 .84.065 1.204.196.364.121.714.322 1.05.602l-.616.812a2.925 2.925 0 00-.77-.406 2.243 2.243 0 00-.812-.14c-.597 0-1.064.238-1.4.714-.326.476-.49 1.181-.49 2.114 0 .933.164 1.624.49 2.072.327.439.794.658 1.4.658.29 0 .556-.042.798-.126.243-.093.514-.238.812-.434l.588.84c-.672.541-1.423.812-2.254.812-.998 0-1.787-.336-2.366-1.008-.569-.672-.854-1.601-.854-2.786 0-.784.131-1.47.392-2.058.262-.588.63-1.045 1.106-1.372.486-.327 1.06-.49 1.722-.49zm7.925 3.542c1.25.121 1.876.7 1.876 1.736 0 .775-.285 1.349-.854 1.722-.56.364-1.312.546-2.254.546h-2.66v-7.28a12.147 12.147 0 012.422-.266c.914 0 1.638.173 2.17.518.532.345.798.84.798 1.484 0 .42-.126.761-.378 1.022s-.626.434-1.12.518zm-1.456-2.548c-.392 0-.775.028-1.148.084v2.086h1.386c.448 0 .793-.084 1.036-.252.242-.168.364-.453.364-.854 0-.373-.136-.644-.406-.812-.271-.168-.682-.252-1.232-.252zm.224 5.544c.55 0 .98-.093 1.288-.28.308-.187.462-.523.462-1.008 0-.401-.131-.691-.392-.868-.262-.177-.705-.266-1.33-.266h-1.4v2.422h1.372zm7.994-6.538c1.036 0 1.839.345 2.408 1.036.579.69.868 1.629.868 2.814 0 .765-.13 1.442-.392 2.03a3.122 3.122 0 01-1.134 1.358c-.494.317-1.082.476-1.764.476-1.036 0-1.843-.345-2.422-1.036-.578-.691-.868-1.629-.868-2.814 0-.765.131-1.437.392-2.016.262-.588.64-1.04 1.134-1.358.495-.327 1.088-.49 1.778-.49zm0 1.036c-1.278 0-1.918.943-1.918 2.828 0 1.876.635 2.814 1.904 2.814 1.27 0 1.904-.943 1.904-2.828 0-1.876-.63-2.814-1.89-2.814zM142.15 105h-1.274v-3.332c0-.56.019-1.092.056-1.596.038-.504.07-.835.098-.994L137.936 105h-1.526v-7.378h1.274v3.332c0 .495-.018 1.008-.056 1.54-.037.523-.065.859-.084 1.008l3.052-5.88h1.554V105zM32.838 121h-1.26l-.336-3.486a15.03 15.03 0 01-.07-1.204c-.01-.448-.014-.929-.014-1.442l-1.68 5.32H28.26l-1.568-5.306c0 1.232-.019 2.105-.056 2.618l-.266 3.5h-1.246l.658-7.378h1.666l1.442 5.278 1.582-5.278h1.694l.672 7.378zm7.173-1.722c0 .299.052.523.154.672.103.14.257.247.462.322l-.294.896c-.382-.047-.69-.154-.923-.322-.234-.168-.406-.429-.518-.784-.495.737-1.228 1.106-2.199 1.106-.727 0-1.301-.205-1.721-.616-.42-.411-.63-.947-.63-1.61 0-.784.28-1.386.84-1.806.569-.42 1.371-.63 2.407-.63h1.135v-.546c0-.523-.127-.896-.378-1.12-.252-.224-.64-.336-1.162-.336-.542 0-1.204.131-1.988.392l-.322-.938c.914-.336 1.764-.504 2.547-.504.868 0 1.517.215 1.947.644.429.42.643 1.022.643 1.806v3.374zm-3.024.924c.738 0 1.316-.383 1.736-1.148v-1.694h-.965c-1.363 0-2.044.504-2.044 1.512 0 .439.107.77.322.994.214.224.532.336.951.336zm9.093-6.748c.942 0 1.633.336 2.072 1.008.438.672.658 1.619.658 2.842 0 1.157-.252 2.091-.756 2.8-.504.709-1.218 1.064-2.142 1.064-.822 0-1.466-.28-1.932-.84v3.5l-1.288.154v-10.36h1.106l.098.994a2.76 2.76 0 01.98-.854 2.516 2.516 0 011.204-.308zm-.476 6.664c1.213 0 1.82-.938 1.82-2.814 0-1.885-.556-2.828-1.666-2.828-.364 0-.696.107-.994.322a3.17 3.17 0 00-.784.826v3.598c.186.289.42.513.7.672.28.149.588.224.924.224zm13.92-6.496V121h-8.485v-7.378h1.26v6.342h2.366v-6.342h1.232v6.342h2.366v-6.342h1.26zm6.08-.168c.944 0 1.634.336 2.073 1.008.438.672.658 1.619.658 2.842 0 1.157-.252 2.091-.756 2.8-.504.709-1.218 1.064-2.142 1.064-.822 0-1.465-.28-1.932-.84v3.5l-1.288.154v-10.36h1.106l.098.994a2.76 2.76 0 01.98-.854 2.516 2.516 0 011.204-.308zm-.475 6.664c1.213 0 1.82-.938 1.82-2.814 0-1.885-.555-2.828-1.666-2.828-.364 0-.695.107-.994.322a3.17 3.17 0 00-.784.826v3.598c.186.289.42.513.7.672.28.149.588.224.924.224zm8.335.924c-.29.859-.696 1.535-1.218 2.03-.514.504-1.251.807-2.212.91l-.14-1.008c.485-.084.872-.205 1.162-.364.289-.159.518-.364.686-.616.177-.243.34-.574.49-.994h-.434l-2.478-7.378h1.372l1.974 6.44 1.932-6.44h1.33l-2.464 7.42zm8.955-7.42l-.154 1.05H79.9V121h-1.288v-6.328h-2.436v-1.05h6.244zm3.496 2.38c1.101 0 1.899.215 2.394.644.494.429.742 1.041.742 1.834 0 .831-.28 1.461-.84 1.89-.551.42-1.237.63-2.058.63h-2.366v-7.378h1.288v2.38h.84zm4.2-2.38h1.288V121h-1.288v-7.378zm-4.074 6.37c.522 0 .924-.117 1.204-.35.289-.233.434-.621.434-1.162 0-.513-.136-.891-.406-1.134-.262-.243-.719-.364-1.372-.364h-.826v3.01h.966z" fill="#54535F"/>
                                  </Svg>

                                  <Svg style={{ alignSelf: 'center', bottom:-40, position:'absolute'}}  width={16}  height={73}  viewBox="0 0 16 73"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                      <Path  d="M7.293 72.707a1 1 0 001.414 0l6.364-6.364a1 1 0 00-1.414-1.414L8 70.586l-5.657-5.657A1 1 0 00.93 66.343l6.364 6.364zM7 0v72h2V0H7z"  fill="#DC5318"/>
                                  </Svg>

                              </View>
                        }



                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    show_politic_modal: !this.state.isOpenRegisterModal ?  !this.state.show_politic_modal : this.state.show_politic_modal,
                                    isOpenRegisterModal: !this.state.isOpenRegisterModal,
                                });
                            }}
                            style={[{flexDirection:'row', justifyContent:'space-between',  }, Platform.OS === 'ios' ? {} : {position: 'relative', top: -5, padding: 5}]}
                        >

                            <Text style={{color:'#54535F', fontSize:20, fontWeight:'bold'}}>
                                {/*Регистрация*/}
                                {this.state.language.sign_up2}
                            </Text>

                            <Svg
                                style={this.state.isOpenRegisterModal ? {} : {
                                    transform: [
                                        { rotateZ: "180deg" }
                                    ]
                                }}
                                width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                <Path  d="M5 15l7-7 7 7"  stroke="#54535F"  strokeLinecap="round"  strokeLinejoin="round"/>
                            </Svg>

                        </TouchableOpacity>



                        <ScrollView style={styles.registerFieldsWrapperScrollView}>


                            {/*Login*/}

                            {/*<View style={styles.inputWrapper}>*/}

                            {/*    {this.state.reg_login_error &&*/}

                            {/*        <TouchableOpacity style={styles.emptyInput}*/}
                            {/*            onPress={()=>this.clearLoginInput()}*/}
                            {/*        >*/}
                            {/*            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >*/}
                            {/*                <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>*/}
                            {/*            </Svg>*/}
                            {/*        </TouchableOpacity>*/}

                            {/*    }*/}

                            {/*    {this.state.reg_login_valid &&*/}

                            {/*        <TouchableOpacity style={styles.emptyInput}>*/}
                            {/*            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >*/}
                            {/*                <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>*/}
                            {/*            </Svg>*/}
                            {/*        </TouchableOpacity>*/}

                            {/*    }*/}


                            {/*    <TextInput*/}
                            {/*        value={this.state.reg_login}*/}
                            {/*        onChangeText={(reg_login) => this.changeRegisterlogin(reg_login)}*/}
                            {/*        style={[*/}

                            {/*            styles.input,*/}
                            {/*            this.state.reg_login_error && {*/}
                            {/*                borderWidth:1, borderColor:'#A4223C'*/}
                            {/*            },*/}
                            {/*            this.state.reg_login_valid && {*/}
                            {/*                borderWidth:1, borderColor:'#337363'*/}
                            {/*            }*/}
                            {/*        ]}*/}
                            {/*        underlineColorAndroid ='transparent'*/}
                            {/*        label={*/}
                            {/*            <Text*/}
                            {/*                style={[*/}
                            {/*                    {color: !this.state.reg_login_error ? '#55545F' : '#A4223C'},*/}
                            {/*                    {color: this.state.reg_login_valid ? '#337363' : '#55545F'},*/}
                            {/*                ]*/}
                            {/*                }>*/}
                            {/*                Логин или e-mail <Text style={{color:'red'}}>*</Text>*/}
                            {/*            </Text>*/}
                            {/*        }*/}
                            {/*        error={false}*/}
                            {/*        onBlur={() => this.onBlurRegisterLogin()}*/}
                            {/*        theme={{colors: {text: '#55545F', primary: 'transparent'}}}*/}
                            {/*        underlineColor='transparent'*/}
                            {/*        selectionColor='#E1C1B7'*/}
                            {/*        activeOutlineColor='transparent'*/}

                            {/*    />*/}


                            {/*    {this.state.reg_login_error ?*/}

                            {/*        <Text style={[styles.inp_buttom_label, {color:'#A4223C', marginBottom: 6, position:'absolute', bottom:-1}]}>*/}
                            {/*            {this.state.reg_login_error_text}*/}
                            {/*        </Text>*/}

                            {/*        :*/}

                            {/*        (*/}
                            {/*            !this.state.reg_login_valid &&*/}
                            {/*            <Text style={[styles.inp_buttom_label, { marginBottom: 6, position:'absolute', bottom:-1}]}>*/}
                            {/*                Введите свой логин*/}
                            {/*            </Text>*/}
                            {/*        )*/}

                            {/*    }*/}
                            {/*</View>*/}

                            {/*FIO*/}

                            {/*<View style={styles.inputWrapper}>*/}

                            {/*    {this.state.reg_fio_valid &&*/}

                            {/*        <TouchableOpacity style={styles.emptyInput}>*/}
                            {/*            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >*/}
                            {/*                <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>*/}
                            {/*            </Svg>*/}
                            {/*        </TouchableOpacity>*/}

                            {/*    }*/}

                            {/*    <TextInput*/}
                            {/*        value={this.state.reg_fio}*/}
                            {/*        onChangeText={(reg_fio) => this.changeFio(reg_fio)}*/}
                            {/*        underlineColorAndroid ='transparent'*/}
                            {/*        label={*/}
                            {/*            <Text*/}
                            {/*                style={[*/}
                            {/*                    {color: !this.state.reg_fio_error ? '#55545F' : '#A4223C'},*/}
                            {/*                    {color: this.state.reg_fio_valid ? '#337363' : '#55545F'},*/}
                            {/*                ]*/}
                            {/*                }>*/}
                            {/*                Ф. И. О*/}
                            {/*            </Text>*/}
                            {/*        }*/}
                            {/*        error={false}*/}
                            {/*        underlineColor='transparent'*/}
                            {/*        style={[*/}

                            {/*            styles.input,*/}
                            {/*            this.state.reg_fio_valid && {*/}
                            {/*                borderWidth:1, borderColor:'#337363'*/}
                            {/*            }*/}
                            {/*        ]}*/}
                            {/*        theme={{colors: {text: '#55545F', primary: 'transparent'}}}*/}
                            {/*        selectionColor='#E1C1B7'*/}

                            {/*        activeOutlineColor='transparent'*/}
                            {/*    />*/}


                            {/*    {this.state.reg_fio_error ?*/}

                            {/*        <Text style={[styles.inp_buttom_label, {color:'#A4223C',marginBottom: 6, position:'absolute', bottom:-1}]}>*/}
                            {/*            Введите ФИО*/}
                            {/*        </Text>*/}
                            {/*        :*/}
                            {/*        (*/}
                            {/*            !this.state.reg_fio_valid &&*/}
                            {/*            <Text style={[styles.inp_buttom_label, {marginBottom: 6, position:'absolute', bottom:-1}]}>*/}
                            {/*                Введите фамилию, имя, отчество*/}
                            {/*            </Text>*/}
                            {/*        )*/}


                            {/*    }*/}

                            {/*</View>*/}


                            {/*Register Email START*/}

                            <View style={styles.inputWrapper}>

                                {this.state.reg_email_error &&

                                    <TouchableOpacity style={styles.emptyInput}
                                                      onPress={()=>this.clearRegEmailInput()}
                                    >
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                        </Svg>
                                    </TouchableOpacity>

                                }

                                {this.state.reg_email_valid &&

                                    <TouchableOpacity style={styles.emptyInput}>
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                        </Svg>
                                    </TouchableOpacity>

                                }


                                <TextInput
                                    value={this.state.reg_email}
                                    onChangeText={(reg_email) => this.changeRegisterEmail(reg_email)}
                                    // onBlur={(reg_email) => this.onBlurRegisterEmail()}
                                    style={[
                                        styles.input,
                                        this.state.reg_email_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.reg_email_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        }
                                    ]}
                                    label={
                                        <Text
                                            style={[
                                                {color: this.state.reg_email_error ? '#A4223C' :  this.state.reg_email_valid ? '#337363' : '#55545F'  },
                                            ]}
                                        >
                                            E-mail <Text style={{color:'red'}}>*</Text>
                                        </Text>
                                    }
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    underlineColor='transparent'
                                    underlineColorAndroid ='transparent'
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'
                                />


                                {this.state.reg_email_error ?

                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C', marginBottom: 6, position:'absolute', bottom:-1}]}>
                                        {this.state.reg_email_error_text}
                                    </Text>
                                    :
                                    (
                                        !this.state.reg_email_valid &&

                                        <Text style={[styles.inp_buttom_label, {marginBottom: 6, position:'absolute', bottom:-1}]}>
                                            {/*Введите адрес электронной почты*/}
                                            {this.state.language.reg_email_error}
                                        </Text>
                                    )
                                }

                            </View>

                            {/*Register Email END*/}


                            {/*Register Phone START*/}

                            <View style={styles.inputWrapper}>


                                {this.state.reg_phone_error &&

                                    <TouchableOpacity style={styles.emptyInput}
                                          onPress={()=>this.clearPhoneInput()}
                                    >
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                        </Svg>
                                    </TouchableOpacity>

                                }

                                {this.state.reg_phone_valid &&

                                    <TouchableOpacity style={styles.emptyInput}>
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                        </Svg>
                                    </TouchableOpacity>

                                }


                                <TextInput
                                    value={this.state.reg_phone}
                                    onChangeText={(reg_phone) => this.changeRegisterPhone(reg_phone)}
                                    underlineColorAndroid ='transparent'
                                    label={
                                        <Text
                                            style={[
                                                {color: this.state.reg_phone_error ? '#A4223C' : this.state.reg_phone_valid ? '#337363' : '#55545F' },
                                            ]}
                                         >
                                            {/*Телефон */}
                                            {this.state.language.phone}
                                            <Text style={{color:'red'}}> *</Text>
                                        </Text>
                                    }
                                    error={false}
                                    underlineColor='transparent'
                                    style={[
                                        styles.input,
                                        this.state.reg_phone_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.reg_phone_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        }
                                    ]}
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'

                                />

                                {/*<MaskInput*/}
                                {/*    style={[*/}
                                {/*        styles.input,*/}
                                {/*        this.state.reg_phone_error && {*/}
                                {/*            borderWidth:1, borderColor:'#A4223C'*/}
                                {/*        },*/}
                                {/*        this.state.reg_phone_valid && {*/}
                                {/*            borderWidth:1, borderColor:'#337363'*/}
                                {/*        }*/}
                                {/*    ]}*/}
                                {/*    value={this.state.reg_phone_masked}*/}
                                {/*    placeholder={'test'}*/}
                                {/*    onChangeText={(masked, unmasked) => {*/}

                                {/*        this.changeRegisterPhone(masked,unmasked);*/}

                                {/*        // you can use the unmasked value as well*/}

                                {/*        // assuming you typed "9" all the way:*/}
                                {/*        //console.log(masked); // (99) 99999-9999*/}
                                {/*        //console.log(unmasked); // 99999999999*/}
                                {/*    }}*/}
                                {/*    mask={[ '+', /\d/, /\d/,/\d/, /\d/, /\d/, /\d/, /\d/, /\d/,  /\d/,/\d/, /\d/, /\d/,  /\d/, /\d/, ]}*/}
                                {/*    // mask={[ '+', /\d/, /\d/,/\d/, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/,  '-', /\d/,/\d/,'-', /\d/, /\d/, ]}*/}
                                {/*    // mask={[ '+' ]}*/}
                                {/*/>*/}



                                {this.state.reg_phone_error ?

                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C',marginBottom: 6, position:'absolute', bottom:-1}]}>
                                        {this.state.reg_phone_error_text}
                                    </Text>
                                    :


                                    (
                                        !this.state.reg_phone_valid &&
                                        <Text style={[styles.inp_buttom_label, {marginBottom: 6, position:'absolute', bottom:-1}]}>
                                            {/*Введите телефон в формате +375 (__) ___-__-__*/}
                                            {/*Введите телефон*/}
                                            {this.state.language.reg_phone}

                                        </Text>
                                    )
                                }

                            </View>

                            {/*Register Phone END*/}


                            {/*Register Password START*/}

                            <View style={styles.inputWrapper}>

                                {this.state.reg_password_error &&

                                    <TouchableOpacity style={styles.emptyInput}
                                          onPress={()=>this.clearRegPasswordInput()}
                                    >
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                        </Svg>
                                    </TouchableOpacity>

                                }

                                {this.state.reg_password_valid &&

                                    <TouchableOpacity style={styles.emptyInput}>
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                        </Svg>
                                    </TouchableOpacity>

                                }

                                <TextInput
                                    value={this.state.reg_password}
                                    onChangeText={(reg_password) => this.changeRegisterPassword(reg_password)}
                                    onBlur={() => this.onBlueRegisterPassword()}
                                    style={[
                                        styles.input,
                                        this.state.reg_password_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.reg_password_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        }
                                    ]}
                                    underlineColorAndroid ='transparent'
                                    label={
                                        <Text
                                            style={[
                                                {color: this.state.reg_password_error ? '#A4223C' : this.state.reg_password_valid ? '#337363' : '#55545F'  },
                                            ]
                                            }>
                                            {/*Пароль */}
                                            {this.state.language.password}
                                            <Text style={{color:'red'}}> *</Text>
                                        </Text>
                                    }
                                    secureTextEntry={true}
                                    underlineColor='transparent'
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'
                                />


                                {this.state.reg_password_error ?

                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C', marginBottom: 6, position:'absolute', bottom:-1}]}>
                                        {this.state.reg_password_error_text}
                                    </Text>
                                    :

                                    (
                                        !this.state.reg_password_valid &&

                                        <Text style={[styles.inp_buttom_label, {marginBottom: 6, position:'absolute', bottom:-1}]}>
                                            {/*Введите пароль минимум из 6 символов*/}
                                            {this.state.language.reg_password_error}
                                        </Text>
                                    )


                                }

                            </View>

                            {/*Register Password END*/}

                            {/*Register Confirm Password START*/}

                            <View style={styles.inputWrapper}>


                                {this.state.reg_confirm_password_error &&

                                    <TouchableOpacity style={styles.emptyInput}
                                                      onPress={()=>this.clearRegPasswordConfirmInput()}
                                    >
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                        </Svg>
                                    </TouchableOpacity>

                                }

                                {this.state.reg_confirm_password_valid &&

                                    <TouchableOpacity style={styles.emptyInput}>
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                        </Svg>
                                    </TouchableOpacity>

                                }

                                <TextInput
                                    value={this.state.reg_confirm_password}
                                    onChangeText={(reg_confirm_password) => this.changeRegisterPasswordConfirm(reg_confirm_password)}
                                    onBlur={() => this.onBlueRegisterPasswordConfirm()}
                                    style={[
                                        styles.input,
                                        this.state.reg_confirm_password_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.reg_confirm_password_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        }
                                    ]}
                                    underlineColorAndroid ='transparent'
                                    label={
                                        <Text
                                            style={[
                                                {color: this.state.reg_confirm_password_error ? '#A4223C' : this.state.reg_confirm_password_valid ? '#337363' :  '#55545F'  },
                                            ]}
                                        >
                                            {/*Повторите пароль*/}
                                            {this.state.language.repeat_password}
                                            <Text style={{color:'red'}}> *</Text>
                                        </Text>
                                    }
                                    secureTextEntry={true}
                                    underlineColor='transparent'
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'
                                />



                                {this.state.reg_confirm_password_error ?

                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C', marginBottom: 6, position:'absolute', bottom:-1}]}>
                                        {this.state.reg_confirm_password_error_text}
                                    </Text>
                                    :
                                    (
                                        !this.state.reg_confirm_password_valid &&
                                        <Text style={[styles.inp_buttom_label, {marginBottom: 6, position:'absolute', bottom:-1}]}>
                                            {/*Введите пароль минимум из 6 символов*/}
                                            {this.state.language.reg_password_error}
                                        </Text>
                                    )

                                }


                            </View>

                            {/*Register Confirm Password END*/}


                        </ScrollView>

                        <View style={styles.registerBottom}>


                            {/*<View style={styles.registerBottomTop}>*/}

                            {/*    <TouchableOpacity onPress={()=>{this.setState({registerPolicy: !this.state.registerPolicy})}}>*/}
                            {/*        <View>*/}

                            {/*            {!this.state.registerPolicy &&*/}

                            {/*                <Svg  width={24}  height={24}  viewBox="0 0 25 24"  fill="none"  xmlns="http://www.w3.org/2000/svg">*/}
                            {/*                    <Path d="M4.5 1h16v-2h-16v2zm19 3v16h2V4h-2zm-3 19h-16v2h16v-2zm-19-3V4h-2v16h2zm3 3a3 3 0 01-3-3h-2a5 5 0 005 5v-2zm19-3a3 3 0 01-3 3v2a5 5 0 005-5h-2zm-3-19a3 3 0 013 3h2a5 5 0 00-5-5v2zm-16-2a5 5 0 00-5 5h2a3 3 0 013-3v-2z" fill="#9F9EAE"/>*/}
                            {/*                </Svg>*/}

                            {/*            }*/}

                            {/*            {this.state.registerPolicy &&*/}
                            {/*                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                            {/*                    <Path d="M0 4a4 4 0 014-4h16a4 4 0 014 4v16a4 4 0 01-4 4H4a4 4 0 01-4-4V4z" fill="#55545F"/>*/}
                            {/*                    <Path  d="M8.5 11.5l3 3 5-5"  stroke="#fff"  strokeLinecap="round"  strokeLinejoin="round" />*/}
                            {/*                </Svg>*/}

                            {/*            }*/}

                            {/*        </View>*/}
                            {/*    </TouchableOpacity>*/}

                            {/*    <Text style={[styles.registerBottomTopText, this.state.registerPolicyError ? {color:'#A4223C'} : {}]}>*/}
                            {/*        Я согласен с обработкой персональных данных*/}
                            {/*    </Text>*/}

                            {/*</View>*/}


                            <View style={{
                                width:'100%',
                                borderRadius: 10,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                                elevation: 3,
                                padding:1
                            }}>

                                <TouchableOpacity style={styles.register_button} onPress={() => this.registerHandle()}>

                                    <Text style={styles.register_button_text} >
                                        {/*Зарегистрироваться*/}
                                        {this.state.language.sign_up}
                                    </Text>

                                </TouchableOpacity>

                            </View>


                        </View>

                    </View>


                </LinearGradient>


            </SafeAreaProvider>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    loginWrapper: {
        width:'95%',
        backgroundColor: '#F9F3F1',
        minHeight:196,
        borderRadius:24,
        padding: 16
    },

    labelPswWrapper: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        maxWidth:300,
        width: '100%',
        marginBottom:15,
        borderWidth:1,
        borderColor:'white',
        borderBottomColor:'#00426947',
        paddingBottom:1
    },

    label:{
        maxWidth:300,
        width: '100%',
        color:'#00203373',
        fontSize:14,
        textAlign:'left',
        marginBottom:8
    },

    labelPsw:{
        color:'#00203373',
        fontSize:14,
        textAlign:'left',
    },

    input: {
        width:'100%',
        height: 50,
        backgroundColor: 'white',
        fontSize:14,
        color:'#55545F',
        borderRadius:8,
        paddingHorizontal:16,
        marginBottom:24
    },
    inputext: {
        maxWidth:300,
        width: '100%',
        textAlign:'left',
        fontWeight:'bold',
        lineHeight: 38.4,
        marginBottom: 30,
        fontSize: 25,
        color:'#002033'
    },
    loginButtonWrapper:{
        width: '50%',
        borderRadius:8,
        backgroundColor: '#E1C1B7',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        padding:1
    },
    loginButton: {
        fontSize: 18,
        color:'white',
        width: '100%',
        backgroundColor:'#E1C1B7',
        height: 36,
        borderRadius:8,
        justifyContent:'center',
        alignItems: 'center'
    },
    loginButtonText: {
        color: '#1D1D20',
        textAlign: 'center',
        fontSize: 14,
    },
    linearGradient: {
        borderRadius: 4,
        marginBottom: 30,
        maxWidth:300,
        width: '100%',
    },
    dontHaveAccount: {
        marginTop: 60,
        fontWeight: 'normal',
        fontSize:14,
        color:'#8B94A3'
    },
    goToRegister: {
        color:'#00395ccc'
    },
    goToRegisterText: {
        color:'#00395ccc',
        marginTop: 12,
        fontWeight: 'normal',
        fontSize:18,
    },
    socLinksWrapper:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        width: 196
    },
    socLinkImg:{
        width: 32,
        height: 32
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
    },
    returnBack: {
        marginRight:34,
        padding:10
    },
    topPanelText: {
        fontSize:20,
        fontWeight:'bold'
    },
    loginWrapperGradient: {
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'flex-start',
        paddingTop:24
    },
    inputWrapper: {
        width:'100%'
    },
    buttonWrapper:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:24
    },
    resetPassword:{
        width:'50%',
        justifyContent:'center',
        alignItems:'center'
    },
    resetPasswordText:{
        color: '#54535F'
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: "tomato",
    },
    box2: {
        width: 100,
        height: 100,
        backgroundColor: "blue",
    },
    registerWrapper:{
        width:'100%',

        position:'absolute',
        bottom:0,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 16,
        // paddingBottom: 16,
        paddingTop:10,
        backgroundColor:'#F9F3F1',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,
        elevation: 9
    },
    registerBottom:{
        height:112,
        width:'100%',
        // paddingTop:18,
        // marginBottom:16
        paddingVertical:16
    },
    registerBottomTop:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        height:24,
        alignItems:'center',
        marginBottom:20
    },
    registerBottomTopText:{
        fontSize:12,
        color:'#1D1D20',
        marginLeft:20
    },
    registerFieldsWrapperScrollView:{
        flex:1,
        width:'100%',
        marginTop:20
    },
    registerInputItem:{
        width:'100%',
        height:44,
        backgroundColor:'white',
        borderRadius:8
    },

    inp_buttom_label:{
        fontSize:12,
        color:'#54535F',
        // marginBottom: 6,
        marginLeft: 16,
        // position:'absolute',
        // bottom:-1
    },
    register_button:{
        width:'100%',
        backgroundColor:'#E1C1B7',
        height:34,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8
    },
    register_button_text:{
        color:'#1D1D20',
        fontSize:14,
        // fontWeight:'bold'
    },
    emptyInput:{
        position: 'absolute',
        zIndex: 5,
        alignSelf: 'center',
        top: 12,
        right: 12,
    },
    modalWrapper: {
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    modalWrapperContent:{
        width:280,
        backgroundColor:'#F9F3F1',
        padding:16,
        borderRadius:24
    }
});

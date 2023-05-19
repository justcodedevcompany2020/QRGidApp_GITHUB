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
    ActivityIndicator,
    Platform,
    Keyboard,
    NativeModules,


} from "react-native";
const { StatusBarManager } = NativeModules;

// StatusBar.setHidden(true);

import {sendEncryptData} from '../helpers'

import { Shadow } from 'react-native-shadow-2';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as ImagePicker from 'expo-image-picker';
import moment from "moment";

import TopMenu from '../includes/TopMenu'
import ChangeTerrain from '../includes/ChangeTerrain'
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
import {AuthContext} from "../AuthContext/context";
import {LinearGradient} from "expo-linear-gradient";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import i18n from "i18n-js";
import {bel, en, ru} from "../../i18n/supportedLanguages";
import MaskInput from "react-native-mask-input";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import * as Font from "expo-font";
import RemoveAccount from '../../assets/svg/deleteSvg';
import CloseSvg from '../../assets/svg/closeSvg';
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
import * as Location from "expo-location";

export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            IsLoadedUserInfo: false,
            openThreeDotModal : false,
            isMapReady: false,
            menuIsOpen: false,

            email: '',
            email_error: false,
            email_valid: false,


            theme: '',
            theme_error: false,
            theme_valid: false,

            message: '',
            message_error: false,
            message_valid: false,

            isOpenEditModal: false,

            sex_woman: false,
            sex_man: false,


            edit_birth: '2017-08-10',
            edit_birth_error: false,
            edit_birth_valid: false,
            edit_birth_error_text: '',

            openEditBirth: false,
            edit_birth_for_picker: new Date(),

            edit_country: '',
            edit_country_error: false,
            edit_country_valid: false,
            edit_country_error_text: '',

            edit_city: '',
            edit_city_error: false,
            edit_city_valid: false,
            edit_city_error_text: '',


            edit_login: '',
            edit_login_error: false,
            edit_login_valid: false,
            edit_login_error_text: '',

            edit_fio: '',
            edit_fio_error: false,
            edit_fio_valid: false,
            edit_fio_error_text: '',


            edit_phone: '',
            edit_phone_masked: '',
            edit_phone_error: false,
            edit_phone_valid: false,
            edit_phone_error_text: '',

            edit_email: '',
            edit_email_error: false,
            edit_email_valid: false,
            edit_email_error_text: '',


            edit_form_password: '',
            edit_form_password_error: false,
            edit_form_password_valid: false ,
            edit_form_password_error_text: '',


            edit_old_password: '',
            edit_old_password_error: false,
            edit_old_password_valid: false,
            edit_old_password_error_text: '',

            edit_new_password: '',
            edit_new_password_error: false,
            edit_new_password_valid: false,
            edit_new_password_error_text: '',

            edit_confirm_new_password: '',
            edit_confirm_new_password_error: false,
            edit_confirm_new_password_valid: false,
            edit_confirm_new_password_error_text: '',

            isOpenChangeTerrain: false,
            BIRTHDAY: null,
            AGE: null,
            CITY: null,
            COUNTRY: null,
            EMAIL: null,
            GENDER: null,
            LOGIN: null,
            NAME: null,
            PHONE: null,
            PHOTO: null,

            STATUSBAR_HEIGHT: 40,
            language: {},
            language_name: 'bel',
            fontsLoaded: false,

            imageLoaded: true,
            remove_account_modal: false,
            remove_account_last_modal: false,

            cancel_remove_account: false,
            ipAddress: null
        }

        this.handler = this.handler.bind(this)
        this.closeChangeTerrain = this.closeChangeTerrain.bind(this)

    }
    static contextType = AuthContext;

    handler() {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen
        })

    }

    closeChangeTerrain() {
        this.setState({
            isOpenChangeTerrain: false
        })
        this.props.navigation.navigate('ObjectMap')
    }

    openEditModal() {
        let {language_name} = this.state;

        axios.get('https://qr-gid.by/api/auth/country/').then(
            (response) => {


                let data = response.data;
                let contries = []

                for (const contry in data) {
                    contries.push({
                        label: language_name == 'ru' || language_name == 'bel' ? data[contry].name : data[contry].en_name,
                        value: language_name == 'ru' || language_name == 'bel' ? data[contry].name : data[contry].en_name
                    })
                }
                console.log(contries, 'contriescontries')

                this.setState({
                    contries_items: contries,
                    isOpenEditModal: true
                })

            },

            (err) => {
                console.log(err.response.data, 'err')
            },

        );



    }


    goToObjectsMap() {
        this.setState({
            openThreeDotModal: false
        })
        this.props.navigation.navigate('ObjectMap')
    }

    goToQrScaner = () => {
        this.props.navigation.navigate('QrScanner')

    }

    logout = () => {

        this.context.signOut(()=>{
            this.props.navigation.navigate('Dashboard')
        });
    }




    changeRegisterlogin = (edit_login) => {

        this.setState({ edit_login:edit_login })

        if (edit_login == '') {
            this.setState({
                edit_login_error:false,
                edit_login_valid:false
            })
            return false;

        }


        if (edit_login.length >= 3 ) {
            this.setState({
                edit_login_error:false,
                edit_login_valid: true
            })
        } else {
            this.setState({
                edit_login_valid: false
            })
        }

    }



    changeCity = (edit_city) => {

        this.setState({ edit_city:edit_city })
        if(edit_city.length == 0) {
            this.setState({
                edit_city_error: false,
                edit_city_valid: false,
            })
        }

    }


    changeCountry = (edit_country) => {

        this.setState({ edit_country:edit_country })

        if(edit_country.length == 0) {
            this.setState({
                edit_country_error: false,
                edit_country_valid: false,
            })
        } else {
            this.setState({
                edit_country_valid:true
            })
        }
    }

    clearLoginInput = () => {
        this.setState({
            edit_login: '',
            edit_login_error:false,
            edit_login_valid: false

        })
    }

    clearCountryInput = () => {
        this.setState({
            edit_country: '',
            edit_country_error:false,
            edit_country_valid: false
        })
    }



    cleaNewPasswordInput = () => {
        this.setState({
            edit_new_password: '',
            edit_new_password_error:false,
            edit_new_password_valid: false

        })
    }



    clearConfirmNewInput = () => {
        this.setState({
            edit_confirm_new_password: '',
            edit_confirm_new_password_error:false,
            edit_confirm_new_password_valid: false
        })
    }




    onBlurRegisterLogin = () => {

        let edit_login = this.state.edit_login

        this.setState({ edit_login:edit_login })

        if (edit_login == '' || !edit_login) {
            this.setState({
                edit_login_error:false
            })
            return false;
        }

        if (edit_login.length < 1 ) {
            this.setState({
                edit_login_error:true,
            })
        }

    }


    onBlurCity = () => {

        let edit_login = this.state.edit_login

    }



    onBlurCountry = () => {

        let edit_country = this.state.edit_country

        this.setState({ edit_country:edit_country })

        if (edit_country == '' || !edit_country) {
            this.setState({
                edit_country_error:false
            })
        } else {

            this.setState({
                edit_country_valid:true
            })
        }



    }



    changeFio = (edit_fio) => {

        console.log(typeof edit_fio,edit_fio, 'typeof edit_fio')

        this.setState({ edit_fio:edit_fio })

        if (edit_fio == '') {
            this.setState({
                edit_fio_valid:false
            })

        } else {
            this.setState({
                edit_fio_valid:true
            })
        }

    }


    clearPhoneInput = () => {

        this.setState({
            edit_phone: '',
            edit_phone_masked: '',
            edit_phone_error: false,
            edit_phone_valid: false,

        })

    }


    changeEditPhone = ( edit_phone_masked, edit_phone) => {

        edit_phone = '+' +edit_phone;

        this.setState({
            edit_phone:edit_phone,
            edit_phone_masked: edit_phone_masked
        })

        console.log({
            edit_phone:edit_phone,
            edit_phone_masked: edit_phone_masked
        })
        // var phonereg = /[+]375[0-9]{9}/;
        var phonereg = /[+]/;



        if (edit_phone == '') {

            this.setState({
                edit_phone_error:false,
                edit_phone_valid:false,
            })

        } else {

            if (edit_phone.match(phonereg) && edit_phone.length > 6) {
                this.setState({
                    edit_phone_error:false,
                    edit_phone_valid:true,
                })

            } else {
                this.setState({
                    edit_phone_error:true,
                    edit_phone_valid:false,
                    edit_phone_error_text: 'Не верный формат!'
                })
            }

        }

    }




    clearRegEmailInput = () => {

        this.setState({
            edit_email: '',
            edit_email_error:false,
            edit_email_valid: false
        })

    }



    changeRegisterEmail = (edit_email) => {

        this.setState({ edit_email:edit_email })

        if (edit_email == '') {
            this.setState({
                edit_email_error:false,
                edit_email_valid:false
            })
            return false;

        }


        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let is_error_email = reg.test(this.state.edit_email) ? false : true;
        if (is_error_email === false) {
            this.setState({
                edit_email_error:false,
                edit_email_valid: true
            })
        } else {
            this.setState({
                edit_email_valid: false
            })
        }


    }

    clearRegPasswordInput = () => {

        this.setState({
            edit_password: '',
            edit_password_error: false,
            edit_password_valid: false,
        })

    }
    clearOldPasswordInput = () => {

        this.setState({
            edit_old_password: '',
            edit_old_password_error: false,
            edit_old_password_valid: false,
        })

    }

    clearEditFormPasswordInput = () => {

        this.setState({
            edit_form_password: '',
            edit_form_password_error: false,
            edit_form_password_valid: false,
        })

    }

    clearRegPasswordConfirmInput = () => {

        this.setState({
            edit_confirm_password: '',
            edit_confirm_password_error: false,
            edit_confirm_password_valid: false,
        })

    }


    changeRegisterPassword = (edit_password) => {

        this.setState({ edit_password:edit_password });

        if (edit_password.length >= 6) {

            this.setState({
                edit_password_error: false,
                edit_password_valid: true,
            })

        } else {
            this.setState({
                edit_password_error: false,
                edit_password_valid: false,
            })
        }


    }

    changeNewPassword = (edit_new_password) => {

        this.setState({ edit_new_password:edit_new_password });

        if (edit_new_password.length >= 6) {

            this.setState({
                edit_new_password_error: false,
                edit_new_password_valid: true,
            })

        } else {
            this.setState({
                edit_new_password_error: false,
                edit_new_password_valid: false,
            })
        }


    }


    changeOldPasswordInput = (edit_old_password) => {

        this.setState({ edit_old_password:edit_old_password });

        if (edit_old_password.length >= 6) {

            this.setState({
                edit_old_password_error: false,
                edit_old_password_valid: true,
            })

        } else {
            this.setState({
                edit_old_password_error: false,
                edit_old_password_valid: false,

            })
        }


    }

    changeEditFormPassword = (edit_form_password) => {

        this.setState({ edit_form_password:edit_form_password });

        if (edit_form_password.length >= 6) {

            this.setState({
                edit_form_password_error: false,
                edit_form_password_valid: true,
            })

        } else {
            this.setState({
                edit_form_password_error: false,
                edit_form_password_valid: false,
            })
        }


    }

    onBlueNewPassword = () => {

        let edit_password = this.state.edit_new_password;

        if (edit_password.length < 6) {

            this.setState({
                edit_new_password_error: true,
                edit_new_password_valid: false,
                edit_new_password_error_text: "Введите коректный пароль"
            })

        }

    }


    onBlueOldPasswordInput = () => {

        let edit_password = this.state.edit_old_password;

        if (edit_password.length < 6 && edit_password != '') {

            this.setState({
                edit_old_password_error: true,
                edit_old_password_valid: false,
                edit_old_password_error_text: 'Введите коректный пароль'
            })

        } else if (edit_password == '') {
            this.setState({
                edit_old_password_error: false,
                edit_old_password_valid: false,
                edit_old_password_error_text: ''
            })
        }

    }

    onBlueEditFormPassword = () => {

        let edit_form_password = this.state.edit_form_password;

        if (edit_form_password.length < 6) {

            this.setState({
                edit_form_password_error: true,
                edit_form_password_valid: false,
            })

        }

    }

    changeRegisterPasswordConfirm = (edit_confirm_password) => {

        this.setState({ edit_confirm_password:edit_confirm_password });

        if (edit_confirm_password.length >= 6) {

            this.setState({
                edit_confirm_password_error: false,
                edit_confirm_password_valid: true,
            })

        } else {
            this.setState({
                edit_confirm_password_error: false,
                edit_confirm_password_valid: false,
            })
        }

    }

    changeConfirmNewPassword = (edit_confirm_new_password) => {

        this.setState({ edit_confirm_new_password:edit_confirm_new_password });

        if (edit_confirm_new_password.length >= 6) {

            this.setState({
                edit_confirm_new_password_error: false,
                edit_confirm_new_password_valid: true,
            })

        } else {
            this.setState({
                edit_confirm_new_password_error: false,
                edit_confirm_new_password_valid: false,
            })
        }

    }

    onBlueConfirmNewPassword = () => {

        let edit_confirm_new_password = this.state.edit_confirm_new_password;

        if (edit_confirm_new_password.length < 6) {

            this.setState({
                edit_confirm_new_password_error: true,
                edit_confirm_new_password_valid: false,
                edit_confirm_new_password_error_text:'Введите коректный пароль'
            })

        }

    }

    closeLoader = async  () => {
        await this.setState({
            IsLoadedUserInfo: true
        })
    }


    checkUserInfo = async () => {

        let userId = await AsyncStorage.getItem('userId');
        let _this = this;
        await  this.setState({
            IsLoadedUserInfo: false
        })

        sendEncryptData(`https://qr-gid.by/api/auth/profile/`, {ID:userId}, function (response, encrypte_response){

            let data = encrypte_response;

            console.log(encrypte_response, userId, 'checkUserInfo')

            if (data.hasOwnProperty('EMAIL') && data.hasOwnProperty('CITY')) {

                _this.setState({
                    edit_login_valid: data.LOGIN ? true  : false,
                    edit_fio_valid: data.NAME ? true  : false,
                    edit_phone_valid: data.PHONE ? true  : false,
                    edit_email_valid: data.EMAIL ? true  : false,
                    edit_country_valid: data.COUNTRY ? true  : false,
                    edit_city_valid: data.CITY ? true  : false,
                    edit_birth_valid: data.BIRTHDAY ? true  : false,
                })

                _this.setState({
                    AGE:data?.AGE,
                    edit_birth:data?.BIRTHDAY,
                    CITY:data?.CITY,
                    COUNTRY:data?.COUNTRY,
                    EMAIL:data?.EMAIL,
                    GENDER:data?.GENDER,
                    LOGIN:data?.LOGIN,
                    NAME:data?.NAME,
                    PHONE:data?.PHONE,
                    PHOTO:data?.PHOTO,
                    edit_login: data?.LOGIN,
                    edit_fio: data?.NAME,
                    edit_phone: data?.PHONE,
                    edit_phone_masked: data?.PHONE,
                    edit_email: data?.EMAIL,
                    edit_country: data?.COUNTRY,
                    edit_city: data?.CITY
                })

                if (data.GENDER !== null) {
                    console.log('GENDER null')

                    if (data.GENDER == 'Женщина' || data.GENDER == 'Жанчына' || data.GENDER == 'Woman' ){

                        _this.setState({
                            sex_woman: true,
                            sex_man: false,
                            GENDER: _this.state.language.woman
                        })

                    } else if(data.GENDER == 'Мужчина' || data.GENDER == 'Мужчына' || data.GENDER == 'Man' ) {
                        _this.setState({
                            sex_woman: false,
                            sex_man: true,
                            GENDER: _this.state.language.man
                        })
                    }
                }

                _this.setState({
                    IsLoadedUserInfo: true
                })
            }


        })

            // axios.post('https://qr-gid.by/api/auth/profile?ID='+userId).then(
            //     (response) => {
            //
            //         let data = response.data;
            //
            //         console.log(response.data, userId, 'checkUserInfo')
            //
            //         if (data.hasOwnProperty('EMAIL') && data.hasOwnProperty('CITY')) {
            //
            //             console.log(response.data, 'response')
            //
            //             this.setState({
            //                 edit_login_valid: data.LOGIN ? true  : false,
            //                 edit_fio_valid: data.NAME ? true  : false,
            //                 edit_phone_valid: data.PHONE ? true  : false,
            //                 edit_email_valid: data.EMAIL ? true  : false,
            //                 edit_country_valid: data.COUNTRY ? true  : false,
            //                 edit_city_valid: data.CITY ? true  : false,
            //                 edit_birth_valid: data.BIRTHDAY ? true  : false,
            //             })
            //
            //             this.setState({
            //                 AGE:data.AGE,
            //                 edit_birth:data.BIRTHDAY,
            //                 CITY:data.CITY,
            //                 COUNTRY:data.COUNTRY,
            //                 EMAIL:data.EMAIL,
            //                 GENDER:data.GENDER,
            //                 LOGIN:data.LOGIN,
            //                 NAME:data.NAME,
            //                 PHONE:data.PHONE,
            //                 PHOTO:data.PHOTO,
            //                 edit_login: data.LOGIN,
            //                 edit_fio: data.NAME,
            //                 edit_phone: data.PHONE,
            //                 edit_phone_masked: data.PHONE,
            //                 edit_email: data.EMAIL,
            //                 edit_country: data.COUNTRY,
            //                 edit_city: data.CITY
            //             })
            //
            //             if (data.GENDER !== null) {
            //                 console.log('GENDER null')
            //                 if (data.GENDER == 'Женщина' || data.GENDER == 'Жанчына' || data.GENDER == 'Woman' ){
            //
            //                     this.setState({
            //                         sex_woman: true,
            //                         sex_man: false,
            //                         GENDER: this.state.language.woman
            //                     })
            //
            //
            //                 } else if(data.GENDER == 'Мужчина' || data.GENDER == 'Мужчына' || data.GENDER == 'Man' ) {
            //                     this.setState({
            //                         sex_woman: false,
            //                         sex_man: true,
            //                         GENDER: this.state.language.man
            //                     })
            //                 }
            //             }
            //
            //
            //
            //             this.setState({
            //                 IsLoadedUserInfo: true
            //             })
            //         }
            //
            //     },
            //
            //     (err) => {
            //         console.log(err.response.data, 'err')
            //     },
            //
            // );

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
        let user_id = await AsyncStorage.getItem('userId');

        let req_for_history = {
            request_detail: sys_request_detail,
            gps_user: location ?  location.coords.latitude + ',' + location.coords.longitude : '',
            ip_user:this.state.ipAddress,
            id_user: user_id,
            request_status: request_status
        }
        console.log(req_for_history, 'req_for_history')
        axios.post('https://qr-gid.by/api/sys_events/',req_for_history).then((response) => {

            // console.log(response, 'sys_events RESPONSE')
            callback()
        });

    }


    saveEditInfo = async () => {

        let userId = await AsyncStorage.getItem('userId');
        let find = '-';
        let re = new RegExp(find, 'g');
        let BIRTHDAY = this.state.edit_birth  != '' ? this.state.edit_birth.replace(re,'.') : null
        let _this = this;

        let req = {
            ID: userId,
            LOGIN: this.state.edit_login,
            NAME: this.state.edit_fio,
            EMAIL: this.state.edit_email,
            PHONE: this.state.edit_phone,
            PASS: this.state.edit_form_password,
            COUNTRY: this.state.edit_country,
            CITY: this.state.edit_city,
            BIRTHDAY: BIRTHDAY
        };

        if (this.state.sex_woman === false && this.state.sex_man === false) {
            req.GENDER = null
        } else {

            if (this.state.sex_woman) {
                req.GENDER = 'Женщина';
                // req.GENDER = this.state.language.woman;

            }
            if (this.state.sex_man) {
                req.GENDER = 'Мужчина';
                // req.GENDER = this.state.language.man;
            }
        }

        if (this.state.edit_country) {
            req.COUNTRY = this.state.edit_country;
        }

        if (this.state.edit_city) {
            req.CITY = this.state.edit_city;
        }

        let sys_request_detail = JSON.stringify({
            url: 'https://qr-gid.by/api/auth/profile/edit.php',
            data: req
        })



        sendEncryptData('https://qr-gid.by/api/auth/profile/edit.php', req, async function (response, encrypte_response) {

            let data = encrypte_response;
            console.log(data, 'encrypte_response')

            if (data.TYPE == 'ERROR') {

                if (data.MESSAGE.hasOwnProperty('pass'))
                {
                    _this.setState({
                        edit_form_password_error: true,
                        edit_form_password_valid: false,
                        edit_form_password_error_text: data.MESSAGE.pass
                    })
                }

                if (data.MESSAGE.hasOwnProperty('email'))
                {
                    _this.setState({
                        edit_email_error: true,
                        edit_email_valid: false,
                        edit_email_error_text: data.MESSAGE.email
                    })
                }

                if (data.MESSAGE.hasOwnProperty('phone'))
                {
                    _this.setState({
                        edit_phone_error: true,
                        edit_phone_valid: false
                    })
                }

                if (data.MESSAGE.hasOwnProperty('login'))
                {
                    _this.setState({
                        edit_login_error: true,
                        edit_login_valid: false,
                        edit_login_error_text: data.MESSAGE.login
                    })
                }

                if (data.MESSAGE.hasOwnProperty('phone'))
                {
                    _this.setState({
                        edit_phone_error: true,
                        edit_phone_valid: false,
                        edit_phone_error_text: data.MESSAGE.phone
                    })
                }

                _this.sysEvents(sys_request_detail, true, function () {

                })

            } else if(data.TYPE == 'OK') {

                _this.checkUserInfo();
                _this.setState({
                    isOpenEditModal:false,
                    edit_form_password: '',
                    edit_form_password_valid: false,
                    edit_form_password_error: false
                })
                _this.sysEvents(sys_request_detail, false, function () {

                })
            }


        });

        console.log(req, 'reqreqreq')

        // axios.post('https://qr-gid.by/api/auth/profile/edit.php', req).then(
        //     (response) => {
        //
        //         let data = response.data;
        //         console.log(data, 'edit data ekac')
        //
        //         if (data.TYPE == 'ERROR') {
        //
        //             if (data.MESSAGE.hasOwnProperty('pass')) {
        //                 this.setState({
        //                     edit_form_password_error: true,
        //                     edit_form_password_valid: false,
        //                     edit_form_password_error_text: data.MESSAGE.pass
        //                 })
        //             }
        //
        //             if (data.MESSAGE.hasOwnProperty('email')) {
        //
        //                 this.setState({
        //                     edit_email_error: true,
        //                     edit_email_valid: false,
        //                     edit_email_error_text: data.MESSAGE.email
        //                 })
        //
        //             }
        //
        //             if (data.MESSAGE.hasOwnProperty('phone')) {
        //
        //                 this.setState({
        //                     edit_phone_error: true,
        //                     edit_phone_valid: false
        //                 })
        //
        //             }
        //
        //             if (data.MESSAGE.hasOwnProperty('login')) {
        //
        //                 this.setState({
        //                     edit_login_error: true,
        //                     edit_login_valid: false,
        //                     edit_login_error_text: data.MESSAGE.login
        //                 })
        //
        //             }
        //
        //             if (data.MESSAGE.hasOwnProperty('phone')) {
        //
        //                 this.setState({
        //                     edit_phone_error: true,
        //                     edit_phone_valid: false,
        //                     edit_phone_error_text: data.MESSAGE.phone
        //                 })
        //
        //             }
        //
        //             this.sysEvents(sys_request_detail, true, function () {
        //
        //             })
        //
        //         } else if(data.TYPE == 'OK') {
        //
        //             this.checkUserInfo();
        //
        //             this.setState({
        //                 isOpenEditModal:false,
        //                 edit_form_password: '',
        //                 edit_form_password_valid: false,
        //                 edit_form_password_error: false
        //             })
        //
        //             this.sysEvents(sys_request_detail, false, function () {
        //
        //             })
        //         }
        //
        //     },
        //
        //     (err) => {
        //         console.log(err.response.data, 'err');
        //     },
        //
        // );

    }

    changePasswordApi = async () => {

            let userId = await AsyncStorage.getItem('userId');
            const req = {
                ID: userId,
                OLD: this.state.edit_old_password,
                PASS: this.state.edit_new_password,
                CONFIRM: this.state.edit_confirm_new_password,
            };


            let sys_request_detail = JSON.stringify({
                url: 'https://qr-gid.by/api/auth/changePass/',
                data: req
            })

            axios.post('https://qr-gid.by/api/auth/changePass/', req).then(
                (response) => {

                    let data = response.data;


                    if (data.TYPE == 'ERROR') {



                        if (data.MESSAGE.hasOwnProperty('passOld')) {
                            this.setState({
                                edit_old_password_error: true,
                                edit_old_password_valid: false,
                                edit_old_password_error_text: data.MESSAGE.passOld
                            })
                        }

                        if (data.MESSAGE.hasOwnProperty('pass')) {
                            this.setState({
                                edit_new_password_error: true,
                                edit_new_password_valid: false,
                                edit_new_password_error_text: data.MESSAGE.pass
                            })
                        }

                        if (data.MESSAGE.hasOwnProperty('passConfirm')) {
                            this.setState({
                                edit_confirm_new_password_error: true,
                                edit_confirm_new_password_valid: false,
                                edit_confirm_new_password_error_text: data.MESSAGE.passConfirm
                            })
                        }


                        this.sysEvents(sys_request_detail, true, function () {

                        })

                    }

                    else if (data.TYPE == 'OK') {

                        this.setState({
                            isOpenEditModal:false,
                            edit_old_password: '',
                            edit_old_password_valid: false,
                            edit_new_password: '',
                            edit_new_password_valid: false,
                            edit_confirm_new_password: '',
                            edit_confirm_new_password_valid: false
                        })

                        this.sysEvents(sys_request_detail, false, function () {

                        })
                    }
                    console.log(data, 'data')
                },

                (err) => {
                    console.log(err.response.data, 'err')
                },

            );

    }



    selectImage = async () => {

        this.setState({
            imageLoaded: false
        })

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        let userId = await AsyncStorage.getItem('userId');
        console.log(userId, 'userId')
        // return false

        if (!result.cancelled) {

            this.setState({
                image_url:result.uri
            })

            let res = result.uri.split('.');
            let type = res[res.length - 1];

            let photo = {
                uri: result.uri,
                type: 'image/jpeg',
                name: userId+'.'+type,
            };




            let form = new FormData();
            form.append("PHOTO", photo);

            console.log(type, 'type');

            if (type == 'jpg' ||  type == 'png' ||  type == 'jpeg') {

                console.log(form, 'formformformform');

                fetch(
                    'https://qr-gid.by/api/auth/profile/edit_photo.php',
                    {
                        body: form,
                        method: "POST",
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                ).then((response) => response.json())
                    .catch((error) => {
                        console.log("ERROR " , error)

                    })
                    .then((responseData) => {

                        console.log(responseData, 'responseDataresponseData')

                        if (responseData.STATUS === true) {
                            this.checkUserInfo();
                        }

                        this.setState({
                            imageLoaded: true
                        })
                        //
                        // if (responseData.errors.length == 0) {
                        //     console.log("Succes ", responseData)
                        //
                        //     this.setState({
                        //         user_image: responseData.image
                        //     })
                        //
                        // } else {
                        //     console.log("Error1 ", responseData)
                        //     console.log(responseData.message)
                        //     alert(responseData.message)
                        // }


                    })
            } else {

                this.setState({
                    imageLoaded: true
                })

                alert('Please use correct image format ')
            }

        } else {
            this.setState({
                imageLoaded: true
            })
        }
    };


    setLanguageFromStorage = async ()=> {

        await AsyncStorage.getItem('language',(err,item) => {

            let language = item ? JSON.parse(item) : {};


            if (language.hasOwnProperty('language')) {

                // i18n.locale = language.language;
                let language_name = 'ru';
                    language_name = language.language == 'ru' ? 'ru' : language.language == 'bel' ?  'bel' : 'en';

                this.setState({
                    language: language.language == 'ru' ? ru : language.language == 'bel' ?  bel : en,
                    language_name: language_name
                })


            } else {

                // i18n.locale = 'bel';

                this.setState({
                    language: ru
                })
            }


        })

    }



    closeAllModals = () => {
        this.setState({
            openThreeDotModal: false,
            isOpenEditModal: false,
            isOpenChangeTerrain: false,
            menuIsOpen: false
        })
    }



    changeEditBirthInput = (event, selectedDate) => {

        let edit_birth = selectedDate;

        // 2017-08-10

        edit_birth = moment(edit_birth).format('DD-MM-YYYY');


        this.setState({
            openEditBirth: false,
            edit_birth: edit_birth,
            edit_birth_for_picker: selectedDate,
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
        this.setLanguageFromStorage();
        this.closeAllModals();
        this.checkUserInfo();
        this.loadFonts();

        this.focusListener = navigation.addListener("focus", () => {

            axios.get('https://api.ipify.org?format=json')
                .then(response => {
                    this.setState({
                        ipAddress: response.data.ip
                    })
                    console.log(response.data, 'response.data')
                })
                .catch(error => console.log(error));

            this.setLanguageFromStorage();
            this.closeAllModals();
            this.checkUserInfo();

            this.loadFonts();

            if ( Platform.OS === 'ios') {

                StatusBarManager.getHeight((statusBarHeight)=>{
                    this.setState({
                        STATUSBAR_HEIGHT: statusBarHeight.height
                    })
                })
            } else {
                this.setState({
                    STATUSBAR_HEIGHT: StatusBarManager.HEIGHT
                })
            }

        });
    }

    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();
        }

    }



    closeRemoveAccountModal  = async () => {
        this.setState({
            remove_account_modal: false
        })
    }

    openRemoveAccountLastModal  = async () => {

        await this.setState({
            remove_account_modal: false,
            remove_account_last_modal: true
        })


        setTimeout(async () => {


            if(!this.state.cancel_remove_account)
            {
                // Remove
                console.log('REMOVE USER')

                let id_user = await AsyncStorage.getItem('userId');

                console.log(id_user, 'id_user')
                let req = {
                    id: id_user,
                }
                axios.post('https://qr-gid.by/api/auth/del/', req).then((response) => {

                    console.log('responseresponse',typeof response.data, response.data,  'responseresponseresponse')
                    if(response.data === true)
                    {
                        this.logout();
                    }


                });


            } else {
                console.log('CANCEL REMOVE')

            }


            await this.setState({
                remove_account_modal: false,
                remove_account_last_modal: false,
                cancel_remove_account: false
            })
        }, 5000)
    }



    checkUserAuthStatusInBackEnd = async () =>
    {
        fetch(
            'https://qr-gid.by/api/auth/status/',
            {
                method: "GET",
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        ).then((response) => response.json())
            .catch((error) => {
                console.log("ERROR " , error)
            })
            .then((response) =>
            {
                console.log(response, 'responseresponse')
                return false;
                if (response.success === true)
                {
                    this.setState({
                        remove_account_modal: true
                    });
                } else {
                    this.context.signOut(()=>{
                        this.props.navigation.navigate('Login')
                    });
                }

            })

    }


    render() {

        if (!this.state.fontsLoaded) {
            return null;
        }


        if (!this.state.imageLoaded) {
            return (
                <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
                    <ActivityIndicator size="large" color="#E1C1B7"/>
                </View>
            )
        }

        const data = [
            { label: 'Item 1', value: '1' },
            { label: 'Item 2', value: '2' },
            { label: 'Item 3', value: '3' },
            { label: 'Item 4', value: '4' },
            { label: 'Item 5', value: '5' },
            { label: 'Item 6', value: '6' },
            { label: 'Item 7', value: '7' },
            { label: 'Item 8', value: '8' },
        ];

        return (

            <SafeAreaView style={[styles.container1]}>


                {/*custom StatusBar*/}
                {/*    <View style={ { backgroundColor:"white", height: this.state.STATUSBAR_HEIGHT }}>*/}
                {/*        <StatusBar translucent backgroundColor={"white"} barStyle="dark-content" />*/}
                {/*    </View>*/}
                {/*custom StatusBar*/}


                {/*Edit modal start*/}

                    {this.state.isOpenEditModal &&
                        <View style={[{ width:'100%',height: '100%', position:'absolute', bottom:0, left:0, zIndex:5005, elevation:15},]}>

                            <TouchableOpacity onPress={() => {this.setState({isOpenEditModal:false})}} style={{ width:'100%', height:56 , elevation:16, zIndex:5005, }}></TouchableOpacity>

                            <View style={[styles.editModalWrapper, {flex:1}]}>

                                <ScrollView nestedScrollEnabled={true} style={{flex:1, paddingHorizontal:16}}>

                                    { Platform.OS === 'ios' &&

                                        <TouchableOpacity
                                            onPress={() => {this.setState({isOpenEditModal:false})}}
                                            style={{ position:'absolute', top:0, right: 0, zIndex: 555555}}
                                        >

                                            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path
                                                    d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z"
                                                    fill="#1D1D20"
                                                />
                                            </Svg>

                                        </TouchableOpacity>

                                    }



                                    {/*Change Photo*/}

                                    <View style={{flexDirection:'row', alignItems:'center', width:'100%',  marginBottom:30}}>

                                        <Image style={{width:80, height:80,marginRight:16, borderRadius:12,}}
                                               source={
                                                   this.state.PHOTO ? {uri:this.state.PHOTO } :  require('../../assets/no_foto_customer.png')
                                               }
                                        />

                                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => this.selectImage()} >
                                            <Svg style={{marginRight:9}} width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path fillRule="evenodd" clipRule="evenodd" d="M.5 3A2.5 2.5 0 013 .5h12A2.5 2.5 0 0117.5 3v9a.5.5 0 01-1 0V3A1.5 1.5 0 0015 1.5H3A1.5 1.5 0 001.5 3v9a.5.5 0 01-1 0V3zM8 7a1 1 0 11-2 0 1 1 0 012 0zm-5.514 6.709a1 1 0 00-.486.857V17a1 1 0 001 1h12a1 1 0 001-1v-2.586a1 1 0 00-.293-.707l-3.536-3.536a1 1 0 00-1.376-.036L6.5 14l-1.462-1.097a1 1 0 00-1.115-.057l-1.438.863z" fill="#55545F"/>
                                            </Svg>
                                            <Text style={{fontFamily: 'FiraSans_500Medium', color: '#55545F', fontSize: 14}}>

                                                {this.state.language.change_photo}


                                            </Text>
                                        </TouchableOpacity>


                                        {/*<TouchableOpacity style={{position: 'absolute', zIndex:200, bottom:5, right:5, padding:5, backgroundColor:'white', borderRadius: 50}}  onPress={() => this.selectImage()} >*/}
                                        {/*    <Svg width={25} height={25} fill='black'  xmlns="http://www.w3.org/2000/svg"  x="0px"  y="0px"  viewBox="0 0 487 487"  xmlSpace="preserve"  enableBackground="new 0 0 487 487">*/}
                                        {/*        <Path d="M308.1 277.95c0 35.7-28.9 64.6-64.6 64.6s-64.6-28.9-64.6-64.6 28.9-64.6 64.6-64.6 64.6 28.9 64.6 64.6zm132.2-161.9c25.8 0 46.7 20.9 46.7 46.7v226.2c0 27.5-22.3 49.8-49.8 49.8H49.8c-27.5 0-49.8-22.3-49.8-49.8v-226.2c0-25.8 20.9-46.7 46.7-46.7h93.4l4.4-18.6c6.7-28.8 32.4-49.2 62-49.2h74.1c29.6 0 55.3 20.4 62 49.2l4.3 18.6h93.4zm-342.9 67.4c0-12.9-10.5-23.4-23.4-23.4-13 0-23.5 10.5-23.5 23.4s10.5 23.4 23.4 23.4c13 .1 23.5-10.4 23.5-23.4zm261.3 94.5c0-63.6-51.6-115.2-115.2-115.2s-115.2 51.6-115.2 115.2 51.6 115.2 115.2 115.2 115.2-51.6 115.2-115.2z" />*/}
                                        {/*    </Svg>*/}
                                        {/*</TouchableOpacity>*/}

                                    </View>


                                    {/* Change Sex  START */}

                                        <View style={{flexDirection:'row'}}>

                                            <TouchableOpacity style={styles.languageItemWrapper}
                                                  onPress={()=> this.setState({
                                                      sex_woman: true,
                                                      sex_man: false,
                                                  })}
                                            >

                                                <View style={[styles.languageItemCheckBox, !this.state.sex_woman ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>
                                                    {this.state.sex_woman &&
                                                        <View style={styles.languageItemCheckBoxActive}></View>
                                                    }
                                                </View>

                                                <Text style={[styles.languageItemText, {fontFamily: 'FiraSans_400Regular'}]}>

                                                    {/*Женщина*/}
                                                    {this.state.language.woman}

                                                </Text>

                                            </TouchableOpacity>


                                            <TouchableOpacity style={styles.languageItemWrapper}
                                                  onPress={()=> this.setState({
                                                      sex_woman: false,
                                                      sex_man: true,
                                                  })}
                                            >

                                                <View style={[styles.languageItemCheckBox, !this.state.sex_man ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>
                                                    {this.state.sex_man &&
                                                        <View style={styles.languageItemCheckBoxActive}></View>
                                                    }
                                                </View>

                                                <Text  style={[styles.languageItemText,{fontFamily: 'FiraSans_400Regular'}]}>
                                                    {/*Мужчина*/}
                                                    {this.state.language.man}
                                                </Text>
                                            </TouchableOpacity>

                                        </View>

                                    {/* Change Sex  END */}



                                    {/* Birth input  START */}

                                         <View style={styles.inputWrapper}>

                                            <View style={[styles.emptyInput, {top:13, zIndex:98}]}>

                                                { this.state.openEditBirth &&


                                                    <DateTimePicker
                                                        testID="dateTimePicker"
                                                        value={this.state.edit_birth_for_picker}
                                                        mode={'date'}
                                                        is24Hour={true}
                                                        onChange={(event, selectedDate) => {this.changeEditBirthInput(event, selectedDate)}}
                                                    />


                                                }

                                                {/*<DatePicker*/}
                                                {/*    style={{width:30, height:30}}*/}
                                                {/*    mode="date" //The enum of date, datetime and time*/}
                                                {/*    // placeholder="select date"*/}
                                                {/*    format="DD-MM-YYYY"*/}
                                                {/*    minDate="01-01-1940"*/}
                                                {/*    maxDate="30-12-20r22"*/}
                                                {/*    confirmBtnText="Confirm"*/}
                                                {/*    cancelBtnText="Cancel"*/}
                                                {/*    customStyles={{*/}
                                                {/*        dateIcon: {*/}
                                                {/*            // display: 'none',*/}
                                                {/*            position: 'absolute',*/}
                                                {/*            // right: 0,*/}
                                                {/*            // top: 4,*/}
                                                {/*            // marginLeft: 0,*/}
                                                {/*            zIndex:56,*/}

                                                {/*        },*/}
                                                {/*        dateInput: {*/}
                                                {/*            // flex:1,*/}
                                                {/*            // backgroundColor:'white',*/}
                                                {/*            display:'none',*/}
                                                {/*            // textAlign:'left'*/}
                                                {/*            position: 'absolute',*/}

                                                {/*            width:0,*/}
                                                {/*            height:0*/}
                                                {/*        },*/}
                                                {/*        datePicker: {*/}
                                                {/*            backgroundColor: "#E1C1B7",*/}

                                                {/*        },*/}

                                                {/*    }}*/}
                                                {/*    onDateChange={(date) => {*/}
                                                {/*        this.setState({*/}
                                                {/*            edit_birth: date*/}
                                                {/*        })*/}
                                                {/*        console.log(date)*/}
                                                {/*    }}*/}
                                                {/*    iconComponent={*/}
                                                {/*        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                                {/*            <Path d="M2 7.5V19a4 4 0 004 4h12a4 4 0 004-4V7.5m-20 0v0A3.5 3.5 0 015.5 4h1M2 7.5h20m0 0v0A3.5 3.5 0 0018.5 4h-1m-11 0V.5m0 3.5h11m0 0V.5" stroke="#9F9EAE" strokeLinecap="round"/>*/}
                                                {/*        </Svg>*/}
                                                {/*    }*/}
                                                {/*/>*/}


                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({
                                                            openEditBirth: true
                                                        })
                                                    }}
                                                >
                                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <Path d="M2 7.5V19a4 4 0 004 4h12a4 4 0 004-4V7.5m-20 0v0A3.5 3.5 0 015.5 4h1M2 7.5h20m0 0v0A3.5 3.5 0 0018.5 4h-1m-11 0V.5m0 3.5h11m0 0V.5" stroke="#9F9EAE" strokeLinecap="round"/>
                                                    </Svg>
                                                </TouchableOpacity>
                                                {/*openEditBirth*/}


                                            </View>



                                            <TextInput
                                                value={this.state.edit_birth}
                                                // onChangeText={(edit_country) => this.changeCountry(edit_country)}
                                                editable={false}
                                                style={[

                                                    styles.input,
                                                    this.state.edit_birth_error && {
                                                        borderWidth:1, borderColor:'#A4223C'
                                                    },
                                                    this.state.edit_birth_valid && {
                                                        borderWidth:1, borderColor:'#337363'
                                                    }
                                                ]}
                                                underlineColorAndroid ='transparent'
                                                label={
                                                    <Text
                                                        style={[
                                                            {color: this.state.edit_birth_error ? '#A4223C' : this.state.edit_birth_valid ? '#337363' : '#55545F' },
                                                            {fontFamily: 'FiraSans_400Regular'}
                                                        ]
                                                        }>
                                                        {/*Дата рождения*/}

                                                        {this.state.language.date_of_birth}

                                                    </Text>
                                                }
                                                error={false}
                                                // onBlur={() => this.onBlurCountry()}
                                                theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                                underlineColor='transparent'
                                                selectionColor='transparent'
                                                activeOutlineColor='transparent'

                                            />


                                            <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                                {/*Выберите дату вашего рождения*/}
                                                {this.state.language.choose_date_of_birth}

                                            </Text>


                                        </View>

                                    {/* Birth input END */}





                                    {/* Country input  START */}

                                        <View style={styles.inputWrapper}>

                                        {this.state.edit_country_error &&

                                            <TouchableOpacity style={styles.emptyInput}
                                                  onPress={()=>this.clearCountryInput()}
                                            >
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }

                                        {this.state.edit_country_valid &&

                                            <TouchableOpacity style={styles.emptyInput}>
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }


                                            <Dropdown
                                                style={styles.dropdown}
                                                data={this.state.contries_items}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                iconStyle={{opacity:0}}
                                                placeholder={this.state.language.country}
                                                maxHeight={150}
                                                labelField="label"
                                                valueField="value"
                                                value={this.state.edit_country}

                                                containerStyle={{position: 'absolute', top: -88, borderBottomLeftRadius: 8, borderBottomRightRadius:8, overflow:'hidden', borderRadius: 8,}}
                                                onChange={edit_country => {
                                                    // this.changeRegion(item)
                                                    this.changeCountry(edit_country.value)
                                                }}
                                            />



                                        {/*<TextInput*/}
                                        {/*    value={this.state.edit_country}*/}
                                        {/*    onChangeText={(edit_country) => this.changeCountry(edit_country)}*/}
                                        {/*    style={[*/}

                                        {/*        styles.input,*/}
                                        {/*        this.state.edit_country_error && {*/}
                                        {/*            borderWidth:1, borderColor:'#A4223C'*/}
                                        {/*        },*/}
                                        {/*        this.state.edit_country_valid && {*/}
                                        {/*            borderWidth:1, borderColor:'#337363'*/}
                                        {/*        }*/}
                                        {/*    ]}*/}
                                        {/*    underlineColorAndroid ='transparent'*/}
                                        {/*    label={*/}
                                        {/*        <Text*/}
                                        {/*            style={[*/}
                                        {/*                {color: this.state.edit_country_error ? '#A4223C' : this.state.edit_country_valid ? '#337363' : '#55545F' },*/}

                                        {/*            ]*/}
                                        {/*            }>*/}
                                        {/*            /!*Страна*!/*/}

                                        {/*            {this.state.language.country}*/}

                                        {/*        </Text>*/}
                                        {/*    }*/}
                                        {/*    error={false}*/}
                                        {/*    onBlur={() => this.onBlurCountry()}*/}
                                        {/*    theme={{colors: {text: '#55545F', primary: 'transparent'}}}*/}
                                        {/*    underlineColor='transparent'*/}
                                        {/*    selectionColor='transparent'*/}
                                        {/*    activeOutlineColor='transparent'*/}

                                        {/*/>*/}



                                        {/*{this.state.edit_country_error ?*/}

                                        {/*    <Text style={[styles.inp_buttom_label, {color:'#A4223C'}]}>*/}
                                        {/*        {this.state.edit_country_error_text}*/}
                                        {/*    </Text>*/}
                                        {/*    :*/}
                                        {/*    (*/}

                                        {/*        !this.state.edit_country_valid &&*/}

                                        {/*        <Text style={styles.inp_buttom_label}>*/}
                                        {/*             /!*Выберите страну проживания*!/*/}
                                        {/*            {this.state.language.choose_country}*/}

                                        {/*        </Text>*/}
                                        {/*    )*/}


                                        {/*}*/}


                                        <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                             {/*Выберите страну проживания*/}
                                            {this.state.language.choose_country}

                                        </Text>

                                        </View>

                                    {/* Country input END */}


                                    {/* City input START */}

                                        <View style={styles.inputWrapper}>

                                        {this.state.edit_city_error &&

                                            <TouchableOpacity style={styles.emptyInput}
                                                  // onPress={()=>this.clearLoginInput()}
                                            >
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }

                                        {this.state.edit_city_valid &&

                                            <TouchableOpacity style={styles.emptyInput}>
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }

                                        <TextInput
                                            value={this.state.edit_city}
                                            onChangeText={(edit_city) => this.changeCity(edit_city)}
                                            style={[

                                                styles.input,
                                                this.state.edit_city_error && {
                                                    borderWidth:1, borderColor:'#A4223C'
                                                },
                                                this.state.edit_city_valid && {
                                                    borderWidth:1, borderColor:'#337363'
                                                }
                                            ]}
                                            underlineColorAndroid ='transparent'
                                            label={
                                                <Text
                                                    style={[
                                                        {color: this.state.edit_city_error ? '#A4223C' : this.state.edit_city_valid ? '#337363' : '#55545F' },
                                                        {fontFamily: 'FiraSans_400Regular'}
                                                    ]
                                                    }>
                                                    {/*Город*/}
                                                    {this.state.language.city}

                                                </Text>
                                            }
                                            error={false}
                                            onBlur={() => this.onBlurCity()}
                                            theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                            underlineColor='transparent'
                                            selectionColor='transparent'
                                            activeOutlineColor='transparent'

                                        />



                                        {this.state.edit_city_error ?

                                            <Text style={[styles.inp_buttom_label, {color:'#A4223C'}, {fontFamily: 'FiraSans_400Regular'}]}>
                                                {this.state.edit_city_error_text}
                                            </Text>
                                            :

                                            (

                                                !this.state.edit_city_valid &&

                                                <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                                    {/*Выберите город проживания*/}

                                                    {this.state.language.choose_city}

                                                </Text>
                                            )


                                        }

                                        </View>

                                    {/*   City input  END*/}



                                    {/*   Login input  START*/}

                                        <View style={styles.inputWrapper}>

                                        {this.state.edit_login_error &&

                                            <TouchableOpacity style={styles.emptyInput}
                                                  onPress={()=>this.clearLoginInput()}
                                            >
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }

                                        {this.state.edit_login_valid &&

                                            <TouchableOpacity style={styles.emptyInput}>
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }


                                        <TextInput
                                            value={this.state.edit_login}
                                            onChangeText={(edit_login) => this.changeRegisterlogin(edit_login)}
                                            style={[

                                                styles.input,
                                                this.state.edit_login_error && {
                                                    borderWidth:1, borderColor:'#A4223C'
                                                },
                                                this.state.edit_login_valid && {
                                                    borderWidth:1, borderColor:'#337363'
                                                }
                                            ]}
                                            underlineColorAndroid ='transparent'
                                            label={
                                                <Text
                                                    style={[
                                                        {color: !this.state.edit_login_error ? '#55545F' : '#A4223C'},
                                                        {color: this.state.edit_login_valid ? '#337363' : '#55545F'},
                                                        {fontFamily: 'FiraSans_400Regular'}
                                                    ]
                                                    }>
                                                    {/*Логин*/}
                                                    {this.state.language.login2} <Text style={{color:'red'}}>*</Text>
                                                </Text>
                                            }
                                            error={false}
                                            onBlur={() => this.onBlurRegisterLogin()}
                                            theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                            underlineColor='transparent'
                                            selectionColor='transparent'
                                            activeOutlineColor='transparent'

                                        />

                                        {this.state.edit_login_error ?

                                            <Text style={[styles.inp_buttom_label, {color:'#A4223C'}, {fontFamily: 'FiraSans_400Regular'}]}>
                                                {this.state.edit_login_error_text}
                                            </Text>
                                            :

                                            (

                                                !this.state.edit_login_valid &&

                                                <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                                    {/*Введите свой логин*/}

                                                    {this.state.language.write_login2}
                                                </Text>
                                            )


                                        }

                                    </View>

                                    {/*   Login input  END*/}


                                    {/*  ФИО input  */}

                                    <View style={styles.inputWrapper}>

                                        {this.state.edit_fio_valid &&

                                            <TouchableOpacity style={styles.emptyInput}>
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }

                                        <TextInput
                                            value={this.state.edit_fio}
                                            onChangeText={(edit_fio) => this.changeFio(edit_fio)}
                                            underlineColorAndroid ='transparent'
                                            label={
                                                <Text
                                                    style={[
                                                        {color: this.state.edit_fio_error ? '#A4223C' : this.state.edit_fio_valid ? '#337363' : '#55545F' },
                                                        {fontFamily: 'FiraSans_400Regular'}
                                                    ]
                                                    }>

                                                    {this.state.language.full_name}

                                                </Text>
                                            }
                                            error={false}
                                            underlineColor='transparent'
                                            style={[

                                                styles.input,
                                                this.state.edit_fio_valid && {
                                                    borderWidth:1, borderColor:'#337363'
                                                }
                                            ]}
                                            theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                            selectionColor='transparent'
                                            activeOutlineColor='transparent'
                                        />



                                        {this.state.edit_fio_error ?

                                            <Text style={[styles.inp_buttom_label, {color:'#A4223C'}, {fontFamily: 'FiraSans_400Regular'}]}>
                                                {this.state.edit_fio_error_text}
                                            </Text>
                                            :

                                            (
                                                !this.state.edit_fio_valid &&

                                                <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                                    {/*Введите фамилию, имя, отчество*/}

                                                    {this.state.language.write_fio}

                                                </Text>
                                            )


                                        }



                                    </View>




                                    {/*  Phone Input */}

                                    <View style={styles.inputWrapper}>


                                        {this.state.edit_phone_error &&

                                            <TouchableOpacity style={styles.emptyInput}
                                                              onPress={()=>this.clearPhoneInput()}
                                            >
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }

                                        {this.state.edit_phone_valid &&

                                            <TouchableOpacity style={styles.emptyInput}>
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }

                                        <MaskInput
                                            style={[
                                                styles.input,
                                                this.state.edit_phone_error && {
                                                    borderWidth:1, borderColor:'#A4223C'
                                                },
                                                this.state.edit_phone_valid && {
                                                    borderWidth:1, borderColor:'#337363'
                                                }
                                            ]}
                                            value={this.state.edit_phone_masked}
                                            onChangeText={(masked, unmasked) => {
                                                this.changeEditPhone(masked,unmasked);
                                            }}
                                            mask={[ '+', /\d/, /\d/,/\d/, /\d/, /\d/, /\d/, /\d/, /\d/,  /\d/,/\d/, /\d/, /\d/,  /\d/, /\d/, ]}
                                            // mask={[ '+', /\d/, /\d/,/\d/, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/,  '-', /\d/,/\d/,'-', /\d/, /\d/, ]}
                                        />


                                        {/*<TextInput*/}
                                        {/*    value={this.state.edit_phone}*/}
                                        {/*    onChangeText={(edit_phone) => this.changeEditPhone(edit_phone)}*/}
                                        {/*    underlineColorAndroid ='transparent'*/}
                                        {/*    label={*/}
                                        {/*        <Text*/}
                                        {/*            style={[*/}
                                        {/*                {color: this.state.edit_phone_error ? '#A4223C' : this.state.edit_phone_valid ? '#337363' : '#55545F' },*/}
                                        {/*            ]}*/}
                                        {/*        >*/}
                                        {/*            /!*Телефон*!/*/}

                                        {/*            {this.state.language.phone}<Text style={{color:'red'}}>*</Text>*/}

                                        {/*        </Text>*/}
                                        {/*    }*/}
                                        {/*    error={false}*/}
                                        {/*    underlineColor='transparent'*/}
                                        {/*    style={[*/}
                                        {/*        styles.input,*/}
                                        {/*        this.state.edit_phone_error && {*/}
                                        {/*            borderWidth:1, borderColor:'#A4223C'*/}
                                        {/*        },*/}
                                        {/*        this.state.edit_phone_valid && {*/}
                                        {/*            borderWidth:1, borderColor:'#337363'*/}
                                        {/*        }*/}
                                        {/*    ]}*/}
                                        {/*    theme={{colors: {text: '#55545F', primary: 'transparent'}}}*/}
                                        {/*    selectionColor='transparent'*/}
                                        {/*    activeOutlineColor='transparent'*/}
                                        {/*/>*/}



                                        {this.state.edit_phone_error ?

                                            <Text style={[styles.inp_buttom_label, {color:'#A4223C'}, {fontFamily: 'FiraSans_400Regular'}]}>
                                                {this.state.edit_phone_error_text}
                                            </Text>
                                            :
                                            (
                                                !this.state.edit_phone_valid &&
                                                <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                                    {/*Введите телефон в формате */}
                                                    {this.state.language.choose_phone} +375 (__) ___-__-__
                                                </Text>
                                            )


                                        }



                                    </View>


                                    {/*  Email  Input*/}

                                    <View style={styles.inputWrapper}>

                                        {this.state.edit_email_error &&

                                            <TouchableOpacity style={styles.emptyInput}
                                                  onPress={()=>this.clearRegEmailInput()}
                                            >
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }

                                        {this.state.edit_email_valid &&

                                            <TouchableOpacity style={styles.emptyInput}>
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                </Svg>
                                            </TouchableOpacity>

                                        }


                                        <TextInput
                                            value={this.state.edit_email}
                                            onChangeText={(edit_email) => this.changeRegisterEmail(edit_email)}
                                            // onBlur={(edit_email) => this.onBlurRegisterEmail()}
                                            style={[
                                                styles.input,
                                                this.state.edit_email_error && {
                                                    borderWidth:1, borderColor:'#A4223C'
                                                },
                                                this.state.edit_email_valid && {
                                                    borderWidth:1, borderColor:'#337363'
                                                }
                                            ]}
                                            label={
                                                <Text
                                                    style={[
                                                        {color: this.state.edit_email_error ? '#A4223C' :  this.state.edit_email_valid ? '#337363' : '#55545F'  },
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



                                        {this.state.edit_email_error ?

                                            <Text style={[styles.inp_buttom_label, {color:'#A4223C'}, {fontFamily: 'FiraSans_400Regular'}]}>
                                                {this.state.edit_email_error_text}
                                            </Text>
                                            :

                                            (
                                                !this.state.edit_email_valid &&

                                                <Text style={[styles.inp_buttom_label,{fontFamily: 'FiraSans_400Regular'}]}>
                                                    {/*Введите адрес электронной почты*/}
                                                    {this.state.language.choose_email}
                                                </Text>
                                            )


                                        }

                                    </View>



                                    {/*EDIT FORM Password*/}

                                        <View style={styles.inputWrapper}>

                                            {this.state.edit_form_password_error &&

                                            <TouchableOpacity style={styles.emptyInput}
                                                      onPress={()=>this.clearEditFormPasswordInput()}
                                            >
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                </Svg>
                                            </TouchableOpacity>

                                            }

                                            {this.state.edit_form_password_valid &&

                                            <TouchableOpacity style={styles.emptyInput}>
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                </Svg>
                                            </TouchableOpacity>

                                            }

                                            <TextInput
                                                value={this.state.edit_form_password}
                                                onChangeText={(edit_form_password) => this.changeEditFormPassword(edit_form_password)}
                                                onBlur={() => this.onBlueEditFormPassword()}
                                                style={[
                                                    styles.input,
                                                    this.state.edit_form_password_error && {
                                                        borderWidth:1, borderColor:'#A4223C'
                                                    },
                                                    this.state.edit_form_password_valid && {
                                                        borderWidth:1, borderColor:'#337363'
                                                    }
                                                ]}
                                                underlineColorAndroid ='transparent'
                                                label={
                                                    <Text
                                                        style={[
                                                            {color: this.state.edit_form_password_error ? '#A4223C' : this.state.edit_form_password_valid ? '#337363' : '#55545F'  },
                                                            {fontFamily: 'FiraSans_400Regular'}
                                                        ]
                                                        }>
                                                        {/*Пароль*/}
                                                        {this.state.language.password} <Text style={{color:'red'}}>*</Text>
                                                    </Text>
                                                }
                                                secureTextEntry={true}
                                                underlineColor='transparent'
                                                theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                                selectionColor='transparent'
                                                activeOutlineColor='transparent'
                                            />


                                            {/*{this.state.edit_form_password_error ?*/}

                                            {/*    <Text style={[styles.inp_buttom_label, {color:'#A4223C'}]}>*/}
                                            {/*        {this.state.edit_form_password_error_text}*/}
                                            {/*    </Text>*/}
                                            {/*    :*/}
                                            {/*    <Text style={styles.inp_buttom_label}>*/}
                                            {/*        Введите текущий пароль*/}
                                            {/*    </Text>*/}

                                            {/*}*/}



                                            {this.state.edit_form_password_error ?

                                                <Text style={[styles.inp_buttom_label, {color:'#A4223C'}, {fontFamily: 'FiraSans_400Regular'}]}>
                                                    {this.state.edit_form_password_error_text}
                                                </Text>
                                                :

                                                (
                                                    !this.state.edit_form_password_valid &&

                                                    <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                                        {/*Введите пароль*/}
                                                        {this.state.language.write_password}
                                                    </Text>
                                                )


                                            }


                                        </View>


                                        <View style={styles.save_button_wrapper}>
                                            <TouchableOpacity
                                                style={[styles.save_button]}
                                                onPress={() => this.saveEditInfo() }
                                            >
                                                <Text style={[styles.save_button_text, {fontFamily: 'FiraSans_400Regular'}]} >
                                                    {this.state.language.save}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>





                                    {/*White Line*/}

                                    <View style={{width:'100%', height:1, backgroundColor:'white', marginTop: 16}}></View>



                                    {/*Change ONLY PASSWORD*/}

                                    <View style={{width:'100%', paddingTop:16}}>

                                        <Text style={[{color:'#1D1D20', fontSize:14, fontWeight:'bold', marginBottom:16}, {fontFamily: 'FiraSans_400Regular'}]}>
                                            {/*Сменить пароль*/}
                                            {this.state.language.change_password}

                                        </Text>


                                        {/* Old password  START*/}

                                            <View style={styles.inputWrapper}>

                                            {this.state.edit_old_password_error &&

                                                <TouchableOpacity style={styles.emptyInput}
                                                                  onPress={()=>this.clearOldPasswordInput()}
                                                >
                                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                        <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                    </Svg>
                                                </TouchableOpacity>

                                            }

                                            {this.state.edit_old_password_valid &&

                                                <TouchableOpacity style={styles.emptyInput}>
                                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                    </Svg>
                                                </TouchableOpacity>

                                            }

                                            <TextInput
                                                value={this.state.edit_old_password}
                                                onChangeText={(edit_old_password) => this.changeOldPasswordInput(edit_old_password)}
                                                onBlur={() => this.onBlueOldPasswordInput()}
                                                style={[
                                                    styles.input,
                                                    this.state.edit_old_password_error && {
                                                        borderWidth:1, borderColor:'#A4223C'
                                                    },
                                                    this.state.edit_old_password_valid && {
                                                        borderWidth:1, borderColor:'#337363'
                                                    }
                                                ]}
                                                underlineColorAndroid ='transparent'
                                                label={
                                                    <Text
                                                        style={[
                                                            {color: this.state.edit_old_password_error ? '#A4223C' : this.state.edit_old_password_valid ? '#337363' : '#55545F'  },
                                                            {fontFamily: 'FiraSans_400Regular'}
                                                        ]
                                                        }>
                                                        {/*Текущий пароль*/}
                                                        {this.state.language.current_password} <Text style={{color:'red'}}>*</Text>
                                                    </Text>
                                                }
                                                secureTextEntry={true}
                                                underlineColor='transparent'
                                                theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                                selectionColor='transparent'
                                                activeOutlineColor='transparent'
                                            />



                                            {this.state.edit_old_password_error ?

                                                <Text style={[styles.inp_buttom_label, {color:'#A4223C'},{fontFamily: 'FiraSans_400Regular'}]}>
                                                    {this.state.edit_old_password_error_text}
                                                </Text>
                                                :
                                                (
                                                    !this.state.edit_old_password_valid &&

                                                    <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                                        {/*Введите текущий пароль*/}
                                                        {this.state.language.write_current_password}
                                                    </Text>
                                                )

                                            }


                                        </View>

                                        {/* Old password  END*/}


                                        {/*New password START*/}

                                            <View style={styles.inputWrapper}>

                                                {this.state.edit_new_password_error &&

                                                    <TouchableOpacity style={styles.emptyInput}
                                                          onPress={()=>this.cleaNewPasswordInput()}
                                                    >
                                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                            <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                        </Svg>
                                                    </TouchableOpacity>

                                                }

                                                {this.state.edit_new_password_valid &&

                                                    <TouchableOpacity style={styles.emptyInput}>
                                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                            <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                        </Svg>
                                                    </TouchableOpacity>

                                                }

                                                <TextInput
                                                    value={this.state.edit_new_password}
                                                    onChangeText={(edit_new_password) => this.changeNewPassword(edit_new_password)}
                                                    onBlur={() => this.onBlueNewPassword()}
                                                    style={[
                                                        styles.input,
                                                        this.state.edit_new_password_error && {
                                                            borderWidth:1, borderColor:'#A4223C'
                                                        },
                                                        this.state.edit_new_password_valid && {
                                                            borderWidth:1, borderColor:'#337363'
                                                        }
                                                    ]}
                                                    underlineColorAndroid ='transparent'
                                                    label={
                                                        <Text
                                                            style={[
                                                                {color: this.state.edit_new_password_error ? '#A4223C' : this.state.edit_new_password_valid ? '#337363' : '#55545F'  },
                                                                {fontFamily: 'FiraSans_400Regular'}
                                                            ]}
                                                        >
                                                            {/*Новый пароль*/}
                                                            {this.state.language.new_password} <Text style={{color:'red'}}>*</Text>
                                                        </Text>
                                                    }
                                                    secureTextEntry={true}
                                                    underlineColor='transparent'
                                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                                    selectionColor='transparent'
                                                    activeOutlineColor='transparent'
                                                />


                                                {this.state.edit_new_password_error ?

                                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C'},{fontFamily: 'FiraSans_400Regular'}]}>
                                                        {this.state.edit_new_password_error_text}
                                                    </Text>
                                                    :

                                                    (!this.state.edit_new_password_valid &&

                                                        <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                                            {/*Введите новый пароль*/}
                                                            {this.state.language.write_new_password}
                                                        </Text>
                                                    )

                                                }


                                            </View>

                                        {/*New password END*/}




                                        {/*Confirm New Password START*/}

                                            <View style={styles.inputWrapper}>


                                                {this.state.edit_confirm_new_password_error &&

                                                    <TouchableOpacity style={styles.emptyInput}
                                                          onPress={()=>this.clearConfirmNewInput()}
                                                    >
                                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                            <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                                        </Svg>
                                                    </TouchableOpacity>

                                                }

                                                {this.state.edit_confirm_new_password_valid &&

                                                    <TouchableOpacity style={styles.emptyInput}>
                                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                            <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                                        </Svg>
                                                    </TouchableOpacity>

                                                }

                                                <TextInput
                                                    value={this.state.edit_confirm_new_password}
                                                    onChangeText={(edit_confirm_new_password) => this.changeConfirmNewPassword(edit_confirm_new_password)}
                                                    onBlur={() => this.onBlueConfirmNewPassword()}
                                                    style={[
                                                        styles.input,
                                                        this.state.edit_confirm_new_password_error && {
                                                            borderWidth:1, borderColor:'#A4223C'
                                                        },
                                                        this.state.edit_confirm_new_password_valid && {
                                                            borderWidth:1, borderColor:'#337363'
                                                        }
                                                    ]}
                                                    underlineColorAndroid ='transparent'
                                                    label={
                                                        <Text
                                                            style={[
                                                                {color: this.state.edit_confirm_new_password_error ? '#A4223C' : this.state.edit_confirm_new_password_valid ? '#337363' :  '#55545F'  },
                                                                {fontFamily: 'FiraSans_400Regular'}
                                                            ]}
                                                        >
                                                            {/*Повторите новый пароль*/}
                                                            {this.state.language.repeat_new_password} <Text style={{color:'red'}}>*</Text>
                                                        </Text>
                                                    }
                                                    secureTextEntry={true}
                                                    underlineColor='transparent'
                                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                                    selectionColor='transparent'
                                                    activeOutlineColor='transparent'
                                                />



                                                {this.state.edit_confirm_new_password_error ?

                                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C'}, {fontFamily: 'FiraSans_400Regular'}]}>
                                                        {this.state.edit_confirm_new_password_error_text}
                                                    </Text>
                                                    :

                                                    (
                                                        !this.state.edit_confirm_new_password_valid &&

                                                        <Text style={[styles.inp_buttom_label, {fontFamily: 'FiraSans_400Regular'}]}>
                                                            {/*Введите новый пароль еще раз*/}
                                                            {this.state.language.write_repeat_new_password}
                                                        </Text>
                                                    )

                                                }


                                            </View>

                                        {/*Confirm New Password END*/}



                                        <View style={styles.save_button_wrapper}>
                                            <TouchableOpacity
                                                style={styles.save_button}
                                                onPress={() => this.changePasswordApi() }
                                            >
                                                <Text style={[styles.save_button_text, {fontFamily: 'FiraSans_400Regular'}]} >
                                                    {/*Изменить*/}
                                                    {this.state.language.change}

                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </ScrollView>




                            </View>

                        </View>
                    }

                {/*Edit modal end*/}


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

                        <TouchableOpacity onPress={() => {this.setState({openThreeDotModal: false})}}
                              style={{width:'100%', height:'100%', position: "absolute", zIndex: 665, top:0, left:0}}>
                        </TouchableOpacity>

                    }

                    {this.state.openThreeDotModal &&

                        <View style={styles.dotModalWrapper}>

                            <TouchableOpacity
                                onPress={() => this.setState({isOpenChangeTerrain:true, openThreeDotModal: false})}
                                style={{padding: 14, fontSize:16, color:'#1D1D20' }}>
                                <Text style={{fontFamily: 'FiraSans_400Regular'}}>
                                    {this.state.language.change_terrain}
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.goToObjectsMap()}
                                style={{padding: 14, fontSize:16, color:'#1D1D20'}}>
                                <Text style={{fontFamily: 'FiraSans_400Regular'}}>
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

                <View style={ styles.topPanel }>

                    <TouchableOpacity style={{marginRight:16,padding:10}} onPress={() => this.setState({menuIsOpen:true})}>
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 5.5L21.5 5.5" />
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 12L21.5 12" />
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 18.5L21.5 18.5" />
                        </Svg>
                    </TouchableOpacity>

                    <Text style={[styles.toptext, {fontFamily: 'Ubuntu_500Medium'}]}>
                        {this.state.language.personal_area}
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


                    {this.state.IsLoadedUserInfo === false &&
                        <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
                            <ActivityIndicator size="large" color="#E1C1B7"/>
                        </View>
                    }

                    <ScrollView nestedScrollEnabled={true} style={styles.contentScrollView}>


                            <View style={styles.userInfoWrapper}>

                                <Image style={styles.tinyLogo}
                                   source={
                                       this.state.PHOTO ? {uri:this.state.PHOTO } :  require('../../assets/no_foto_customer.png')
                                   }
                                />



                                {this.state.edit_fio != '' &&

                                    <Text style={{color:'#1D1D20', fontSize:24, marginBottom:5, fontFamily: 'Ubuntu_400Regular'}}>
                                        {this.state.edit_fio}
                                    </Text>

                                }


                                <View style={{flexDirection:'row', justifyContent:'flex-start', marginBottom:16}}>


                                    {this.state.GENDER &&

                                        <Text style={{fontSize:14, paddingRight: 8, color:'#54535F', fontFamily: 'FiraSans_400Regular'}}>
                                            {this.state.GENDER}
                                        </Text>

                                    }

                                    { this.state.AGE &&

                                        <Text style={{fontSize:14,  paddingHorizontal:8, color:'#54535F', borderLeftWidth:1, borderLeftColor:'#F9F3F1', fontFamily: 'FiraSans_400Regular'}}>
                                            {this.state.AGE} {this.state.language.years}
                                        </Text>

                                    }

                                    {this.state.COUNTRY &&

                                        <Text style={{fontSize:14,  color:'#54535F', paddingHorizontal:8 , borderLeftWidth:1, borderLeftColor:'#F9F3F1', fontFamily: 'FiraSans_400Regular'}}>
                                            {this.state.COUNTRY}
                                        </Text>

                                    }

                                    {this.state.CITY &&

                                        <Text style={{fontSize:14,paddingHorizontal:8 , borderLeftWidth:1, borderLeftColor:'#F9F3F1', color:'#54535F', fontFamily: 'FiraSans_400Regular'}}>
                                            {this.state.CITY}
                                        </Text>

                                    }


                                </View>


                                <View style={styles.info2Wrapper}>

                                    <View style={styles.info2ItemWrapper}>
                                        <View style={styles.info2ItemLeft}>
                                            <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"  >
                                                <Path  fillRule="evenodd"  clipRule="evenodd"  d="M12 6.323a3 3 0 11-6 0 3 3 0 016 0zm1 0a4 4 0 11-8 0 4 4 0 018 0zM1.9 16.126c1.57-2.089 4.16-3.46 7.1-3.46 2.941 0 5.532 1.371 7.102 3.46a.5.5 0 10.8-.601c-1.76-2.34-4.647-3.86-7.901-3.86-3.254 0-6.141 1.52-7.9 3.86a.5.5 0 10.799.6z"  fill="#9F9EAE"/>
                                            </Svg>
                                        </View>

                                        <Text style={[styles.info2ItemRight, {fontFamily: 'FiraSans_400Regular'}]}>
                                            {this.state.LOGIN}
                                        </Text>
                                    </View>

                                    <View style={styles.info2ItemWrapper}>
                                        <View style={styles.info2ItemLeft}>
                                            <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path  fillRule="evenodd"  clipRule="evenodd"  d="M14 1H4v16h10V1zM4 0a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V1a1 1 0 00-1-1H4zm5 15a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zM6 2a.5.5 0 000 1h1a.5.5 0 000-1H6zm3 0a.5.5 0 000 1h3a.5.5 0 000-1H9z"  fill="#9F9EAE" />
                                            </Svg>
                                        </View>

                                        <Text style={[styles.info2ItemRight, {fontFamily: 'FiraSans_400Regular'}]}>
                                            {this.state.PHONE}
                                        </Text>
                                    </View>

                                    <View style={[styles.info2ItemWrapper, {marginBottom:24}]}>
                                        <View style={styles.info2ItemLeft}>
                                            <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path  d="M13.364 9c0-2.182-2.182-4.364-4.364-4.364S4.636 6.091 4.636 9c0 2.91 2.91 4.364 4.364 4.364 2.703 0 4.364-2.182 4.364-4.364zm0 0c0 1.454 0 4.364 1.454 4.364C16.273 13.364 17 12.636 17 9s-2.91-8-8-8-8 3.636-8 8c0 3.5 2.182 8 8 8"  stroke="#9F9EAE"  strokeLinecap="round"  strokeLinejoin="round" />
                                            </Svg>
                                        </View>

                                        <Text style={[styles.info2ItemRight, {fontFamily: 'FiraSans_400Regular'}]}>
                                            {this.state.EMAIL}
                                        </Text>
                                    </View>

                                    <View style={styles.editProfileButtonWrapper}>
                                        <TouchableOpacity style={styles.editProfileButton} onPress={() => this.openEditModal()}>
                                            <Text style={{fontFamily: 'FiraSans_400Regular', fontSize: 14}}>
                                                {this.state.language.edit_profile}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>

                    </ScrollView>


                    <View style={styles.logout_button_wrapper} >

                        {/*<Shadow style={styles.logout_button}>*/}
                            <TouchableOpacity
                                style={styles.logout_button}
                                onPress={() => this.logout()}
                            >
                                <Svg width={19} height={18} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path fillRule="evenodd" clipRule="evenodd" d="M1.75 9a7.75 7.75 0 1113.386 5.32.5.5 0 00.728.686 8.75 8.75 0 10-12.727 0 .5.5 0 00.727-.687A7.722 7.722 0 011.75 9zM10 11.25a.5.5 0 00-1 0v4.793l-1.396-1.397a.5.5 0 00-.708.708l2.25 2.25a.5.5 0 00.708 0l2.25-2.25a.5.5 0 00-.708-.708L10 16.043V11.25zm-.5-1.875a.375.375 0 100-.75.375.375 0 000 .75z" fill="#55545F"/>
                                </Svg>

                                <Text style={styles.logout_button_text} >

                                    {this.state.language.logout}

                                </Text>

                            </TouchableOpacity>

                        {/*</Shadow>*/}


                        <TouchableOpacity
                            style={[styles.remove_account_button ]}
                            onPress={() => {

                                this.checkUserAuthStatusInBackEnd()

                            }}
                        >
                            <RemoveAccount/>
                            <Text style={styles.remove_account_button_text} >
                                {this.state.language.remove_profile}
                            </Text>

                        </TouchableOpacity>


                    </View>

                </View>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.remove_account_modal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={{width:'100%', flexDirection:'row'}}>

                                <Text style={styles.modalText}>
                                    {/*Вы уверены, что хотите удалить профиль?*/}
                                    {this.state.language.are_you_sure_you_want_to_delete_the_profile}
                                </Text>
                               <TouchableOpacity
                                   style={{}}
                                   onPress={() => {
                                       this.closeRemoveAccountModal()
                                   }}
                               >
                                   <CloseSvg/>
                               </TouchableOpacity>

                            </View>

                            <Text style={{marginTop: 18, color: '#393840', fontSize:14}}>
                                Вы потеряете все сохраненные места и историю отзывов.
                            </Text>

                            <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center',  marginTop:30}}>
                                <TouchableOpacity
                                    style={{width:'100%'}}
                                    onPress={() => {
                                        this.closeRemoveAccountModal()
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#55545F',
                                            fontSize: 14,
                                            fontWeight: '500',
                                            marginBottom: 33,
                                            textAlign: 'right'
                                        }}
                                    >НЕТ, ВЕРНУТЬСЯ В КАБИНЕТ</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{width:'100%'}}
                                    onPress={() => {
                                        this.openRemoveAccountLastModal()
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#A4223C',
                                            fontSize: 14,
                                            fontWeight: '500',
                                            textAlign:'right'
                                        }}
                                    >ДА, УДАЛИТЬ ПРОФИЛЬ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.remove_account_last_modal}
                >
                    <View style={{width:'100%',  height:'100%',  justifyContent:'flex-end', padding: 16, }}>


                        <View style={{width: '100%', maxWidth: 328, alignSelf:'center', height: 48, backgroundColor:'#393840',borderRadius: 8, paddingHorizontal:16, justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>

                            <Text
                                style={{
                                    color:'white',
                                    fontSize: 14,
                                    fontWeight: '400',
                                    textAlign:'left'
                                }}
                            >
                                Профиль удалён
                            </Text>

                            <TouchableOpacity
                                // style={{width:'100%'}}
                                onPress={() => {
                                    this.setState({
                                        remove_account_last_modal: false,
                                        cancel_remove_account:true
                                    })
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#E1C1B7',
                                        fontSize: 14,
                                        fontWeight: '500',
                                        textAlign:'right'
                                    }}
                                >ВОССТАНОВИТЬ</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>


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
        paddingHorizontal:16,
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
        width:'50%',
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 36
    },
    languageItemCheckBox:{
        width:20,
        height:20,
        borderRadius: 50,
        // borderWidth:1,
        // borderColor: '#55545F',
        marginRight: 20,
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
    save_button:{
        width:'100%',
        backgroundColor:'#E1C1B7',
        height:38,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        // marginHorizontal:16,

        overflow: 'hidden',
    },

    save_button_wrapper: {
        width:'100%',
        borderRadius: 10,
        backgroundColor: '#E1C1B7',
        marginBottom:26,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingBottom:1,
        paddingRight: 1
    },
    save_button_text:{
        color:'#1D1D20',
        fontSize:14,
        // fontWeight:'bold',
    },
    logout_button:{
        width:'100%',
        maxWidth:328,
        // backgroundColor:'#E1C1B7',
        height:38,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginHorizontal:16,
        marginBottom:26,
        borderWidth:1,
        borderColor:'#9F9EAE',
        flexDirection:'row'
    },
    remove_account_button: {
        width:'100%',
        maxWidth:328,
        // backgroundColor:'#E1C1B7',
        height:38,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginHorizontal:16,
        marginBottom:26,
        flexDirection:'row'
    },

    logout_button_text:{
        color:'#54535F',
        fontSize:14,
        marginLeft: 8
    },

    remove_account_button_text:{
        color:'#A4223C',
        fontSize:14,
        marginLeft: 11,
        fontWeight: '500'
    },
    logout_button_wrapper:{
        width:'100%',
        alignItems:'center',
    },

    inputWrapper: {
        width:'100%',
        marginBottom:8
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
    userInfoWrapper:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:18,
        marginTop:56,
        paddingHorizontal:16,
        paddingTop: 50,

    },
    tinyLogo:{
        width:80,
        height:80,
        borderRadius:12,
        position:'absolute',
        top:-40,
        left:16
    },


    info2Wrapper:{
        width:'100%'
    },
    info2ItemWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:16
    },
    info2ItemLeft:{
        marginRight:8
    },
    info2ItemRight:{
        color:'#1D1D20',
        fontSize:16
    },
    editProfileButtonWrapper:{
        width:'100%',
        borderRadius: 10,
        backgroundColor: '#E1C1B7',
        marginBottom:16,
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
    editProfileButton:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        height:38,
        borderRadius:8,
        // borderColor:"#9F9EAE",
        // borderWidth:1,
        backgroundColor:'#E1C1B7'
    },

    editModalWrapper:{
        // width:'100%',
        //
        // position:'absolute',
        // bottom:0,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding:16,
        paddingHorizontal:0,
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
    placeholderStyle: {
        fontSize: 14,
    },

    selectedTextStyle: {
        fontSize: 14,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    dropdown: {
        height: 48,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 16,
        color:'white',
        backgroundColor:'white',
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
    mapsModal:{
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        flex: 1,
        fontSize:20,
        color: '#1D1D20',
        fontWeight:'500'
    }
    //
    // mainView: {
    //     backgroundColor:'#E1C1B7',
    //     height:34,
    //     alignItems:'center',
    //     justifyContent:'center',
    //     borderRadius:8,
    //     // marginHorizontal:16,
    //     marginBottom:16
    // },
    //
    // text: {
    //     marginBottom: 25,
    //     fontSize: 18,
    //     textAlign: "center",
    //     color: "black"
    // },
    //
    // box:{
    //     borderRadius: 10,
    //     elevation: 20,
    //     borderColor: 'red',
    //     backgroundColor: "white",
    // }
})

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
    Platform,
    ActivityIndicator,
    Share
} from "react-native";

// StatusBar.setHidden(true);

import * as Linking from 'expo-linking';
import { AuthContext } from '../AuthContext/context';

import i18n from "i18n-js";
import { ru, bel, en} from "../../i18n/supportedLanguages";
//
// i18n.fallbacks = false;
// i18n.translations = {  ru, bel, en};

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

import Svg, { Path, Defs, G, ClipPath, Circle, Mask, Rect } from "react-native-svg"
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
// import AppLoading from 'expo-app-loading';
import {FiraSans_400Regular,} from '@expo-google-fonts/fira-sans';


export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            openThreeDotModal : false,
            isMapReady: false,
            menuIsOpen: this.props.menuIsOpen,
            isLogin:false,
            language: {},
            language_name: 'bel',
            isLoading: false,

            fontsLoaded: false
        }
    }

    static contextType = AuthContext;

    onSharePress = async () => {

        let message = '';

        switch (this.state.language_name) {
            case "en":
                message ='QR guide - travel app.\nTraveling together!\nhttps://qr-gid.by/en/\nThe world is too big and beautiful to waste time in one place. Good luck!';
                break;
            case "ru":
                message ='QR-гид – приложение о путешествиях.\nПутешествуем вместе!\nhttps://qr-gid.by/\nМир слишком огромен и прекрасен, чтобы тратить время в одном месте. В добрый путь!';
                break;
            case "bel":
                message ='QR-гід – прыкладанне аб падарожжах.\nВандруем разам!\nhttps://qr-gid.by/be/\nСвет занадта вялікі і выдатны, каб марнаваць час у адным месцы. У добры шлях!';
                break;
        }


        Share.share({
            message: message,
        })
    };

    closeModal = () => {
        this.props.handler()
    }
    goToAbout = () => {
        this.closeModal();
        this.props.navigation.navigate('About')
    }

    goToChangeLanguage = () => {
        this.closeModal();
        this.props.navigation.navigate('ChangeLanguage')
    }

    goToContactForm = () => {
        this.closeModal();
        this.props.navigation.navigate('ContactForm')
    }

    goToProfile = () => {
        this.closeModal();
        this.props.navigation.navigate('Profile')
    }

    goToMyPlaces = () => {
        this.closeModal();
        this.props.navigation.navigate('MyPlaces')
    }

    logout = () => {
        this.context.signOut();
        this.props.navigation.navigate('Dashboard')
    }


    allCheckAfterLoadComponent = async () => {

        // Check login START

            let userToken = await AsyncStorage.getItem('userToken');
            await this.setState({
                isLogin: userToken ? true : false
            })

        // Check login END


        //  Set language START

            await AsyncStorage.getItem('language',(err,item) => {

                let language = item ? JSON.parse(item) : {};
                let set_language = ru;
                let language_name = 'ru';

                if (language.hasOwnProperty('language')) {
                    set_language = language.language == 'ru' ? ru : language.language == 'bel' ?  bel : language.language == 'en' ? en : bel;
                    language_name = language.language == 'ru' ? 'ru' : language.language == 'bel' ?  'bel' : language.language == 'en' ? 'en' : 'bel';
                }

                console.log({
                    language:set_language,
                }, 'language2')

                this.setState({
                    language:set_language,
                    language_name: language_name
                })


                setTimeout(() => {
                    this.setState({
                        isLoaded: true,
                    })
                }, 500)

            })

        //  Set language END


    }



    // setLanguageFromStorage = async ()=> {
    //
    //     // ru, bel, en
    //
    //     await AsyncStorage.getItem('language',(err,item) => {
    //
    //         let language = item ? JSON.parse(item) : {};
    //         let set_language = bel;
    //
    //         if (language.hasOwnProperty('language')) {
    //             set_language = language.language == 'ru' ? ru : language.language == 'bel' ?  bel : en;
    //         }
    //
    //         this.setState({
    //             language:set_language,
    //         })
    //
    //     })
    //
    // }


    async loadFonts() {
        await Font.loadAsync({
            FiraSans_400Regular,
        });
        await this.setState({ fontsLoaded: true });

    }

    componentDidMount() {

        this.setState({
            isLoaded: false
        })


        this.allCheckAfterLoadComponent();
        this.loadFonts()

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("focus", () => {

            this.setState({
                isLoaded: false
            })
            this.allCheckAfterLoadComponent();

            this.loadFonts()

        });
    }




    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();
        }
        // this.focusListener();

    }

    render() {


        // if (this.state.fontsLoaded) {
        //     return (
        //         <View style={styles.container}>
        //             <Text style={{ fontSize: 21 }}>Default Font</Text>
        //             <Text style={{ fontFamily: 'FiraSans_400Regular', fontSize: 21 }}>Default Font</Text>
        //         </View>
        //     );
        // } else {
        //     return null;
        // }

        //
        // if(this.state.isLoaded === false) {
        //
        //     return (
        //
        //         <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
        //             <ActivityIndicator size="large" color="#E1C1B7"/>
        //         </View>
        //     )
        //
        // }



        if (!this.state.fontsLoaded) {
            return null
        }



        return   (



            Platform.OS === 'ios' ?

                <View style={{position:'absolute', bottom:0, left:0, zIndex:55, width:'100%', height: Dimensions.get('window').height, flexDirection:'row', elevation: 6}}>
                    <SafeAreaView style={{width:304,  height: '100%', backgroundColor:'white', paddingTop: 0, borderRightColor: '#EDDAD4', borderRightWidth: 1}}>

                        {this.state.isLoaded === false ?

                            <View style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white'
                            }}>
                                <ActivityIndicator size="large" color="#E1C1B7"/>
                            </View>

                            :

                            <View style={{width:'100%', height:'100%'}}>

                                {this.state.isLogin &&

                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => this.goToProfile()}
                                >
                                    <Svg style={styles.menuItemSvg} width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg" >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M12 1.833C6.385 1.833 1.833 6.385 1.833 12c0 2.121.65 4.09 1.76 5.718a.5.5 0 01-.827.564A11.117 11.117 0 01.833 12C.833 5.833 5.833.833 12 .833s11.167 5 11.167 11.167c0 2.328-.714 4.492-1.934 6.282a.5.5 0 11-.826-.564A10.117 10.117 0 0022.167 12c0-5.615-4.552-10.167-10.167-10.167zM4.57 20.331a.513.513 0 00.053.052A11.127 11.127 0 0012 23.167c2.832 0 5.418-1.055 7.386-2.792a.5.5 0 00-.01-.758A11.126 11.126 0 0012 16.833a11.126 11.126 0 00-7.387 2.792.5.5 0 00-.044.706zM12 22.167c-2.368 0-4.546-.81-6.275-2.167A10.121 10.121 0 0112 17.833c2.368 0 4.546.81 6.274 2.167A10.12 10.12 0 0112 22.167zm3-11.5a3 3 0 11-6 0 3 3 0 016 0zm1 0a4 4 0 11-8 0 4 4 0 018 0z" fill="#9F9EAE"/>
                                    </Svg>

                                    <Text style={[styles.menuItemText]}>
                                        {this.state.language.personal_area}

                                    </Text>
                                </TouchableOpacity>


                                }



                                {this.state.isLogin &&

                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={() => this.goToMyPlaces()}
                                    >
                                        <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M2.758 23.732c.399.179.818.268 1.231.268.71 0 1.407-.259 1.969-.758l4.976-4.422a1.603 1.603 0 012.132 0l4.976 4.422c.89.79 2.116.978 3.2.49A2.946 2.946 0 0023 21.015V2.978A2.982 2.982 0 0020.02 0H3.98A2.982 2.982 0 001 2.978v18.037c0 1.189.674 2.231 1.758 2.717zM2.375 2.978c0-.884.72-1.603 1.605-1.603h16.045c.885 0 1.604.719 1.604 1.603v18.037c0 .65-.353 1.196-.946 1.464a1.57 1.57 0 01-1.724-.264l-4.976-4.421a2.971 2.971 0 00-1.98-.752c-.709 0-1.415.25-1.981.752l-4.976 4.421c-.486.431-1.13.532-1.724.264a1.564 1.564 0 01-.947-1.464V2.978z"fill="#9F9EAE"/>
                                        </Svg>

                                        <Text style={styles.menuItemText}>
                                            {this.state.language.my_places}
                                        </Text>
                                    </TouchableOpacity>

                                }


                                {/*{this.state.isLogin &&*/}

                                {/*    <TouchableOpacity style={[styles.menuItem, {borderBottomColor:'#F9F3F1', borderBottomWidth:1}]}>*/}
                                {/*        <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                {/*            <Path fillRule="evenodd" clipRule="evenodd" d="M19.898 5.276c.26-.46.345-.767.345-.92a2.028 2.028 0 00-2.035-2.023c-1.127 0-2.034.91-2.034 2.023 0 .153.084.46.344.92.245.434.585.899.946 1.338.258.314.517.605.744.848.227-.243.486-.534.744-.848.36-.44.7-.904.946-1.338zm-1.69 3.613s3.035-2.864 3.035-4.533a3.028 3.028 0 00-3.035-3.023 3.028 3.028 0 00-3.034 3.023c0 1.669 3.034 4.533 3.034 4.533zm-7.07 6.044c0 .57-.273 1.37-.818 2.333-.53.937-1.25 1.917-1.99 2.818a38.432 38.432 0 01-2.26 2.51 38.432 38.432 0 01-2.262-2.51c-.74-.901-1.46-1.88-1.99-2.818C1.275 16.302 1 15.504 1 14.933 1 12.151 3.266 9.89 6.07 9.89c2.803 0 5.069 2.262 5.069 5.044zm1 0C12.139 18.272 6.07 24 6.07 24S0 18.272 0 14.933C0 11.595 2.717 8.89 6.07 8.89c3.351 0 6.069 2.706 6.069 6.044zM6.07 16.444c.838 0 1.517-.676 1.517-1.51 0-.835-.679-1.512-1.517-1.512-.838 0-1.517.677-1.517 1.511 0 .835.68 1.511 1.517 1.511zm11.77-5.73a.5.5 0 10-.78-.627l-.758.944a.5.5 0 00.78.627l.758-.945zm-2.276 2.833a.5.5 0 00-.78-.627l-.758.945a.5.5 0 00.78.626l.758-.944zm-.104 2.476a.5.5 0 00-.706.709l.826.822a.5.5 0 00.706-.708l-.826-.823zm2.153 2.145a.5.5 0 00-.705.709l.948.944a.5.5 0 10.706-.709l-.949-.944zm2.466 2.456a.5.5 0 00-.706.708l.759.756a.5.5 0 10.706-.709l-.76-.755zm-10.974 2.12a.5.5 0 000 1h.758a.5.5 0 100-1h-.758zm3.034 0a.5.5 0 100 1h.759a.5.5 0 100-1h-.759zm3.035 0a.5.5 0 000 1h.759a.5.5 0 100-1h-.759zm3.035 0a.5.5 0 000 1h.758a.5.5 0 100-1h-.758zm3.034 0a.5.5 0 100 1h.759a.5.5 0 100-1h-.759z" fill="#9F9EAE"/>*/}
                                {/*        </Svg>*/}

                                {/*        <Text style={styles.menuItemText}>Мои маршруты</Text>*/}

                                {/*    </TouchableOpacity>*/}

                                {/*}*/}



                                <TouchableOpacity
                                    style={[styles.menuItem, {marginTop:8}]}
                                    onPress={() => this.goToAbout()}
                                >
                                    <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M19 1H5v22h14V1zM5 0a1 1 0 00-1 1v22a1 1 0 001 1h14a1 1 0 001-1V1a1 1 0 00-1-1H5zm7 20.333A1.667 1.667 0 1012 17a1.667 1.667 0 000 3.333zm0 1A2.667 2.667 0 1012 16a2.667 2.667 0 000 5.333zm-4-18.5a.5.5 0 000 1h1.333a.5.5 0 100-1H8zm4 0a.5.5 0 000 1h4a.5.5 0 000-1h-4z" fill="#9F9EAE"/>
                                    </Svg>

                                    <Text style={styles.menuItemText}>
                                        {this.state.language.about_the_application}

                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => this.goToChangeLanguage()}
                                >
                                    <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Circle cx={12} cy={12} r={11} stroke="#9F9EAE" />
                                        <Path  d="M2.5 17.88a15.43 15.43 0 019-2.88c3.58 0 6.876 1.213 9.5 3.252M2.5 6.12a15.43 15.43 0 009 2.88c3.723 0 7.14-1.312 9.811-3.5"  stroke="#9F9EAE"/>
                                        <Path d="M16 12c0 2.945-.85 5.618-1.822 7.554-.486.968-.997 1.739-1.436 2.26-.22.261-.412.448-.566.566-.175.134-.225.12-.176.12v1c.3 0 .577-.168.784-.326.23-.176.475-.421.723-.716.5-.593 1.05-1.433 1.565-2.455C16.099 17.957 17 15.13 17 12h-1zm-4 10.5c.05 0-.002.014-.177-.12a3.851 3.851 0 01-.566-.566c-.438-.521-.95-1.293-1.435-2.26C8.849 17.618 8 14.944 8 12H7c0 3.13.9 5.957 1.928 8.003.514 1.022 1.066 1.862 1.564 2.455.249.295.494.54.723.716.208.159.486.326.785.326v-1zM8 12c0-2.945.85-5.618 1.822-7.554.486-.968.997-1.739 1.435-2.26.22-.261.413-.448.566-.565.175-.135.226-.121.177-.121v-1c-.3 0-.577.167-.784.326-.23.176-.475.421-.723.716-.5.593-1.051 1.433-1.565 2.455C7.901 6.043 7 8.87 7 12h1zm4-10.5c-.05 0 .001-.014.177.12.153.118.345.305.566.567.438.52.949 1.291 1.435 2.26C15.15 6.381 16 9.054 16 12h1c0-3.13-.9-5.957-1.928-8.003-.514-1.022-1.066-1.862-1.565-2.455a4.817 4.817 0 00-.723-.716C12.577.667 12.3.5 12 .5v1z" fill="#9F9EAE"/>
                                    </Svg>
                                    <Text style={styles.menuItemText}>{this.state.language.application_language}</Text>
                                </TouchableOpacity>


                                <TouchableOpacity style={styles.menuItem} onPress={this.onSharePress}>
                                    <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M.511 2.011a1.5 1.5 0 011.5-1.5h16.41a1.5 1.5 0 011.5 1.5v8.205a.5.5 0 01-1 0V2.01a.5.5 0 00-.5-.5H2.01a.5.5 0 00-.5.5v13.341a.5.5 0 00.5.5h3.091a.5.5 0 110 1h-3.09a1.5 1.5 0 01-1.5-1.5V2.012zm17.244 3.277a.5.5 0 01-.054.705l-3.783 3.242a5.5 5.5 0 01-7.31-.134L3.23 5.98a.5.5 0 01.678-.735l3.38 3.12a4.5 4.5 0 005.98.11l3.783-3.242a.5.5 0 01.705.054zm-7.539 8.496a1.545 1.545 0 100 3.091 1.545 1.545 0 000-3.09zM7.671 15.33a2.545 2.545 0 114.664 1.411l1.583 1.584c.404-.27.89-.427 1.412-.427.522 0 1.007.157 1.411.427l1.584-1.584a2.545 2.545 0 11.707.707l-1.584 1.584a2.545 2.545 0 11-4.237 0l-1.584-1.584A2.545 2.545 0 017.67 15.33zm7.659 3.568a1.546 1.546 0 100 3.09 1.546 1.546 0 000-3.09zm3.568-3.568a1.545 1.545 0 113.09 0 1.545 1.545 0 01-3.09 0z" fill="#9F9EAE"/>
                                    </Svg>
                                    <Text style={styles.menuItemText}>
                                        {this.state.language.share_the_application}
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={[styles.menuItem, {marginBottom: 8}]}
                                    onPress={() => this.goToContactForm()}
                                >
                                    <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M11.563 2.816a.5.5 0 01.874 0l8.3 14.941a.5.5 0 01-.437.743H3.7a.5.5 0 01-.438-.743l8.3-14.94zm1.748-.485a1.5 1.5 0 00-2.622 0l-8.3 14.94a1.5 1.5 0 001.31 2.229H20.3a1.5 1.5 0 001.312-2.229l-8.3-14.94zM11.5 8.5a.5.5 0 111 0v5a.5.5 0 01-1 0v-5zm1 7a.5.5 0 11-1 0 .5.5 0 011 0z" fill="#9F9EAE"/>
                                    </Svg>
                                    <Text style={styles.menuItemText}>
                                        {this.state.language.report_an_error}
                                    </Text>
                                </TouchableOpacity>

                                {this.state.isLogin &&

                                    <TouchableOpacity
                                        style={[styles.menuItem,{ borderTopColor:'#F9F3F1', borderTopWidth:1, marginTop:8}]}
                                        onPress={() => {this.logout()} }
                                    >
                                        <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12c0 2.79-1.088 5.326-2.864 7.207a.5.5 0 00.728.686A11.462 11.462 0 0023.5 12C23.5 5.649 18.351.5 12 .5S.5 5.649.5 12c0 3.056 1.192 5.834 3.136 7.893a.5.5 0 10.728-.686A10.462 10.462 0 011.5 12zm11 3a.5.5 0 00-1 0v6.793l-2.146-2.147a.5.5 0 00-.708.708l3 3a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L12.5 21.793V15zm-.5-2.5a.5.5 0 100-1 .5.5 0 000 1z" fill="#9F9EAE"/>
                                        </Svg>


                                        <Text style={styles.menuItemText}>
                                            {this.state.language.logout}
                                        </Text>

                                    </TouchableOpacity>

                                }


                            </View>

                        }

                    </SafeAreaView>

                    <TouchableOpacity style={{flex:1, height: '100%' }}
                        // onPress={() => {this.setState({menuIsOpen: false})}}
                          onPress={() => {this.closeModal()}}
                    >


                    </TouchableOpacity>

                </View>

                :

                <View style={{paddingTop: 5,position:'absolute', bottom:0, left:0, zIndex:55, width:'100%', height:'100%', flexDirection:'row', elevation: 6}}>

                    <View style={{width:315,  height: '100%', backgroundColor:'white', borderRightColor: '#EDDAD4', borderRightWidth: 1}}>

                        {this.state.isLoaded === false ?

                            <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
                                <ActivityIndicator size="large" color="#E1C1B7"/>
                            </View>

                            :

                            <View style={{width:'100%', height:'100%'}}>

                                {this.state.isLogin &&

                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={() => this.goToProfile()}
                                    >
                                        <Svg style={styles.menuItemSvg} width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg" >
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M12 1.833C6.385 1.833 1.833 6.385 1.833 12c0 2.121.65 4.09 1.76 5.718a.5.5 0 01-.827.564A11.117 11.117 0 01.833 12C.833 5.833 5.833.833 12 .833s11.167 5 11.167 11.167c0 2.328-.714 4.492-1.934 6.282a.5.5 0 11-.826-.564A10.117 10.117 0 0022.167 12c0-5.615-4.552-10.167-10.167-10.167zM4.57 20.331a.513.513 0 00.053.052A11.127 11.127 0 0012 23.167c2.832 0 5.418-1.055 7.386-2.792a.5.5 0 00-.01-.758A11.126 11.126 0 0012 16.833a11.126 11.126 0 00-7.387 2.792.5.5 0 00-.044.706zM12 22.167c-2.368 0-4.546-.81-6.275-2.167A10.121 10.121 0 0112 17.833c2.368 0 4.546.81 6.274 2.167A10.12 10.12 0 0112 22.167zm3-11.5a3 3 0 11-6 0 3 3 0 016 0zm1 0a4 4 0 11-8 0 4 4 0 018 0z" fill="#9F9EAE"/>
                                        </Svg>

                                        {this.state.fontsLoaded &&
                                            <Text style={[styles.menuItemText, {fontFamily: 'FiraSans_400Regular',}]}>
                                                {this.state.language.personal_area}
                                            </Text>
                                        }

                                        {/*<Text style={[styles.menuItemText, ]}>*/}
                                        {/*    {this.state.language.personal_area}*/}
                                        {/*</Text>*/}

                                    </TouchableOpacity>


                                }



                                {this.state.isLogin &&

                                    <TouchableOpacity
                                        style={[styles.menuItem, {borderBottomWidth: 1, borderBottomColor: '#F9F3F1', paddingBottom:15}]}
                                        onPress={() => this.goToMyPlaces()}
                                    >
                                        <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M2.758 23.732c.399.179.818.268 1.231.268.71 0 1.407-.259 1.969-.758l4.976-4.422a1.603 1.603 0 012.132 0l4.976 4.422c.89.79 2.116.978 3.2.49A2.946 2.946 0 0023 21.015V2.978A2.982 2.982 0 0020.02 0H3.98A2.982 2.982 0 001 2.978v18.037c0 1.189.674 2.231 1.758 2.717zM2.375 2.978c0-.884.72-1.603 1.605-1.603h16.045c.885 0 1.604.719 1.604 1.603v18.037c0 .65-.353 1.196-.946 1.464a1.57 1.57 0 01-1.724-.264l-4.976-4.421a2.971 2.971 0 00-1.98-.752c-.709 0-1.415.25-1.981.752l-4.976 4.421c-.486.431-1.13.532-1.724.264a1.564 1.564 0 01-.947-1.464V2.978z"fill="#9F9EAE"/>
                                        </Svg>

                                        <Text style={styles.menuItemText}>
                                            {this.state.language.my_places}
                                        </Text>
                                    </TouchableOpacity>

                                }


                                {/*{this.state.isLogin &&*/}

                                {/*    <TouchableOpacity style={[styles.menuItem, {borderBottomColor:'#F9F3F1', borderBottomWidth:1}]}>*/}
                                {/*        <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                {/*            <Path fillRule="evenodd" clipRule="evenodd" d="M19.898 5.276c.26-.46.345-.767.345-.92a2.028 2.028 0 00-2.035-2.023c-1.127 0-2.034.91-2.034 2.023 0 .153.084.46.344.92.245.434.585.899.946 1.338.258.314.517.605.744.848.227-.243.486-.534.744-.848.36-.44.7-.904.946-1.338zm-1.69 3.613s3.035-2.864 3.035-4.533a3.028 3.028 0 00-3.035-3.023 3.028 3.028 0 00-3.034 3.023c0 1.669 3.034 4.533 3.034 4.533zm-7.07 6.044c0 .57-.273 1.37-.818 2.333-.53.937-1.25 1.917-1.99 2.818a38.432 38.432 0 01-2.26 2.51 38.432 38.432 0 01-2.262-2.51c-.74-.901-1.46-1.88-1.99-2.818C1.275 16.302 1 15.504 1 14.933 1 12.151 3.266 9.89 6.07 9.89c2.803 0 5.069 2.262 5.069 5.044zm1 0C12.139 18.272 6.07 24 6.07 24S0 18.272 0 14.933C0 11.595 2.717 8.89 6.07 8.89c3.351 0 6.069 2.706 6.069 6.044zM6.07 16.444c.838 0 1.517-.676 1.517-1.51 0-.835-.679-1.512-1.517-1.512-.838 0-1.517.677-1.517 1.511 0 .835.68 1.511 1.517 1.511zm11.77-5.73a.5.5 0 10-.78-.627l-.758.944a.5.5 0 00.78.627l.758-.945zm-2.276 2.833a.5.5 0 00-.78-.627l-.758.945a.5.5 0 00.78.626l.758-.944zm-.104 2.476a.5.5 0 00-.706.709l.826.822a.5.5 0 00.706-.708l-.826-.823zm2.153 2.145a.5.5 0 00-.705.709l.948.944a.5.5 0 10.706-.709l-.949-.944zm2.466 2.456a.5.5 0 00-.706.708l.759.756a.5.5 0 10.706-.709l-.76-.755zm-10.974 2.12a.5.5 0 000 1h.758a.5.5 0 100-1h-.758zm3.034 0a.5.5 0 100 1h.759a.5.5 0 100-1h-.759zm3.035 0a.5.5 0 000 1h.759a.5.5 0 100-1h-.759zm3.035 0a.5.5 0 000 1h.758a.5.5 0 100-1h-.758zm3.034 0a.5.5 0 100 1h.759a.5.5 0 100-1h-.759z" fill="#9F9EAE"/>*/}
                                {/*        </Svg>*/}

                                {/*        <Text style={styles.menuItemText}>Мои маршруты</Text>*/}

                                {/*    </TouchableOpacity>*/}

                                {/*}*/}



                                <TouchableOpacity
                                    style={[styles.menuItem, {marginTop:10}]}
                                    onPress={() => this.goToAbout()}
                                >
                                    <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M19 1H5v22h14V1zM5 0a1 1 0 00-1 1v22a1 1 0 001 1h14a1 1 0 001-1V1a1 1 0 00-1-1H5zm7 20.333A1.667 1.667 0 1012 17a1.667 1.667 0 000 3.333zm0 1A2.667 2.667 0 1012 16a2.667 2.667 0 000 5.333zm-4-18.5a.5.5 0 000 1h1.333a.5.5 0 100-1H8zm4 0a.5.5 0 000 1h4a.5.5 0 000-1h-4z" fill="#9F9EAE"/>
                                    </Svg>

                                    <Text style={styles.menuItemText}>
                                        {this.state.language.about_the_application}

                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => this.goToChangeLanguage()}
                                >
                                    <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Circle cx={12} cy={12} r={11} stroke="#9F9EAE" />
                                        <Path  d="M2.5 17.88a15.43 15.43 0 019-2.88c3.58 0 6.876 1.213 9.5 3.252M2.5 6.12a15.43 15.43 0 009 2.88c3.723 0 7.14-1.312 9.811-3.5"  stroke="#9F9EAE"/>
                                        <Path d="M16 12c0 2.945-.85 5.618-1.822 7.554-.486.968-.997 1.739-1.436 2.26-.22.261-.412.448-.566.566-.175.134-.225.12-.176.12v1c.3 0 .577-.168.784-.326.23-.176.475-.421.723-.716.5-.593 1.05-1.433 1.565-2.455C16.099 17.957 17 15.13 17 12h-1zm-4 10.5c.05 0-.002.014-.177-.12a3.851 3.851 0 01-.566-.566c-.438-.521-.95-1.293-1.435-2.26C8.849 17.618 8 14.944 8 12H7c0 3.13.9 5.957 1.928 8.003.514 1.022 1.066 1.862 1.564 2.455.249.295.494.54.723.716.208.159.486.326.785.326v-1zM8 12c0-2.945.85-5.618 1.822-7.554.486-.968.997-1.739 1.435-2.26.22-.261.413-.448.566-.565.175-.135.226-.121.177-.121v-1c-.3 0-.577.167-.784.326-.23.176-.475.421-.723.716-.5.593-1.051 1.433-1.565 2.455C7.901 6.043 7 8.87 7 12h1zm4-10.5c-.05 0 .001-.014.177.12.153.118.345.305.566.567.438.52.949 1.291 1.435 2.26C15.15 6.381 16 9.054 16 12h1c0-3.13-.9-5.957-1.928-8.003-.514-1.022-1.066-1.862-1.565-2.455a4.817 4.817 0 00-.723-.716C12.577.667 12.3.5 12 .5v1z" fill="#9F9EAE"/>
                                    </Svg>
                                    <Text style={styles.menuItemText}>
                                        {this.state.language.application_language}

                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity style={styles.menuItem} onPress={this.onSharePress}>
                                    <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M.511 2.011a1.5 1.5 0 011.5-1.5h16.41a1.5 1.5 0 011.5 1.5v8.205a.5.5 0 01-1 0V2.01a.5.5 0 00-.5-.5H2.01a.5.5 0 00-.5.5v13.341a.5.5 0 00.5.5h3.091a.5.5 0 110 1h-3.09a1.5 1.5 0 01-1.5-1.5V2.012zm17.244 3.277a.5.5 0 01-.054.705l-3.783 3.242a5.5 5.5 0 01-7.31-.134L3.23 5.98a.5.5 0 01.678-.735l3.38 3.12a4.5 4.5 0 005.98.11l3.783-3.242a.5.5 0 01.705.054zm-7.539 8.496a1.545 1.545 0 100 3.091 1.545 1.545 0 000-3.09zM7.671 15.33a2.545 2.545 0 114.664 1.411l1.583 1.584c.404-.27.89-.427 1.412-.427.522 0 1.007.157 1.411.427l1.584-1.584a2.545 2.545 0 11.707.707l-1.584 1.584a2.545 2.545 0 11-4.237 0l-1.584-1.584A2.545 2.545 0 017.67 15.33zm7.659 3.568a1.546 1.546 0 100 3.09 1.546 1.546 0 000-3.09zm3.568-3.568a1.545 1.545 0 113.09 0 1.545 1.545 0 01-3.09 0z" fill="#9F9EAE"/>
                                    </Svg>
                                    <Text style={styles.menuItemText}>
                                        {this.state.language.share_the_application}
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={[styles.menuItem]}
                                    onPress={() => this.goToContactForm()}
                                >
                                    <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M11.563 2.816a.5.5 0 01.874 0l8.3 14.941a.5.5 0 01-.437.743H3.7a.5.5 0 01-.438-.743l8.3-14.94zm1.748-.485a1.5 1.5 0 00-2.622 0l-8.3 14.94a1.5 1.5 0 001.31 2.229H20.3a1.5 1.5 0 001.312-2.229l-8.3-14.94zM11.5 8.5a.5.5 0 111 0v5a.5.5 0 01-1 0v-5zm1 7a.5.5 0 11-1 0 .5.5 0 011 0z" fill="#9F9EAE"/>
                                    </Svg>
                                    <Text style={styles.menuItemText}>
                                        {this.state.language.report_an_error}

                                    </Text>
                                </TouchableOpacity>



                                {this.state.isLogin &&

                                <TouchableOpacity
                                    style={[styles.menuItem,{marginTop:8, height:68, borderTopColor:'#F9F3F1', borderTopWidth:1}]}
                                    onPress={() => {this.logout()} }
                                >
                                    <Svg style={styles.menuItemSvg} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12c0 2.79-1.088 5.326-2.864 7.207a.5.5 0 00.728.686A11.462 11.462 0 0023.5 12C23.5 5.649 18.351.5 12 .5S.5 5.649.5 12c0 3.056 1.192 5.834 3.136 7.893a.5.5 0 10.728-.686A10.462 10.462 0 011.5 12zm11 3a.5.5 0 00-1 0v6.793l-2.146-2.147a.5.5 0 00-.708.708l3 3a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L12.5 21.793V15zm-.5-2.5a.5.5 0 100-1 .5.5 0 000 1z" fill="#9F9EAE"/>
                                    </Svg>


                                    <Text style={styles.menuItemText}>
                                        {this.state.language.logout}

                                    </Text>

                                </TouchableOpacity>

                                }


                            </View>

                        }



                    </View>

                    <TouchableOpacity style={{flex:1, height: '100%' }}
                        // onPress={() => {this.setState({menuIsOpen: false})}}
                          onPress={() => {this.closeModal()}}
                    >


                    </TouchableOpacity>

                </View>



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
        flex: 1,width:'100%'
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
        fontSize:16,
        fontFamily: 'FiraSans_400Regular'
    },
    toptext: {
        fontSize: 20,
        color:'#1D1D20',
    }
})

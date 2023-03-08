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
import ChangeTerrain from "./includes/ChangeTerrain";

import i18n from "i18n-js";
import { ru, bel, en} from "../i18n/supportedLanguages";
import AsyncStorage from "@react-native-async-storage/async-storage";
//
// i18n.fallbacks = false;
// i18n.translations = {  ru, bel, en};
// i18n.locale = 'bel';


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
            isOpenChangeTerrain: false,
            isLoading: false,

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

    goToObjectMap = () => {
        this.props.navigation.navigate('ObjectMap')
    }
    closeChangeTerrain  = async () => {
        console.log('changed')
        await this.setState({
            isOpenChangeTerrain: false
        })
        this.goToObjectMap()
    }


    setLanguageFromStorage = async ()=> {

       await AsyncStorage.getItem('language',(err,item) => {

            let language = item ? JSON.parse(item) : {};

            if (language.hasOwnProperty('language')) {

                i18n.locale = language.language;

                this.setState({
                    rus_l: language.language == 'ru' ? true : false,
                    belarus_l: language.language == 'bel' ? true : false,
                    eng_l: language.language == 'en' ? true : false,
                    isLoading: true,
                    language: language.language == 'ru' ? ru : language.language == 'bel' ?  bel : en
                })


            } else {

                // i18n.locale = 'bruel';
                this.setState({
                    isLoading: true,
                    language: ru
                })
            }


        })

    }

    closeAllModals = () => {

        this.setState({
            openThreeDotModal: false,
            menuIsOpen: false,
            isOpenChangeTerrain: false
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

    componentDidMount = async () => {

        const { navigation } = this.props;

        this.closeAllModals();
        await this.setLanguageFromStorage();
        await this.loadFonts();

        this.focusListener = navigation.addListener("focus", ()  =>  {

             this.closeAllModals();
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
        // this.focusListener();

    }

    goToObjectsMap() {
        this.props.navigation.navigate('ObjectMap')
    }

    goToQrScaner = () => {
        this.props.navigation.navigate('QrScanner')

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
            isOpenChangeTerrain: true
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

                  <View style={ styles.topPanel}>
                    <TouchableOpacity style={{marginRight:16,padding:10}} onPress={() => this.setState({menuIsOpen:true})}>
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 5.5L21.5 5.5" />
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 12L21.5 12" />
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 18.5L21.5 18.5" />
                        </Svg>
                    </TouchableOpacity>

                    <Text style={[styles.toptext, {fontFamily: 'Ubuntu_400Regular'}]}>
                        {/*Язык*/}
                        {this.state.language.language_page_title}

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

                        <Text style={{color: '#54535F', fontSize:24,marginBottom:36, fontFamily:'Ubuntu_400Regular'}}>
                            {this.state.language.change_app_language}
                        </Text>


                            <TouchableOpacity style={styles.languageItemWrapper}
                                onPress={()=> {
                                    this.changeLanguage({rus_l: true, belarus_l: false,eng_l: false})
                                }}
                            >
                                <View style={[styles.languageItemCheckBox, !this.state.rus_l ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>

                                    {this.state.rus_l &&

                                        <View style={styles.languageItemCheckBoxActive}>

                                        </View>

                                    }

                                </View>

                                <Text  style={[styles.languageItemText, {fontFamily:'FiraSans_400Regular'}]}>
                                    Русский
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.languageItemWrapper}
                                onPress={()=> {
                                    this.changeLanguage({rus_l: false, belarus_l: true,eng_l: false})
                                }}
                            >
                                <View style={[styles.languageItemCheckBox, !this.state.belarus_l ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>

                                    {this.state.belarus_l &&

                                        <View style={styles.languageItemCheckBoxActive}>

                                        </View>

                                    }

                                </View>

                                <Text  style={[styles.languageItemText, {fontFamily:'FiraSans_400Regular'}]}>
                                    Беларуская
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.languageItemWrapper}
                                onPress={()=> {
                                    this.changeLanguage({rus_l: false, belarus_l: false,eng_l: true})

                                }}
                            >
                                <View style={[styles.languageItemCheckBox, !this.state.eng_l ? {borderWidth: 1, borderColor: '#9F9EAE'} :  {borderWidth: 1, borderColor: '#55545F'}]}>

                                    {this.state.eng_l &&

                                        <View style={styles.languageItemCheckBoxActive}>

                                        </View>

                                    }

                                </View>

                                <Text  style={[styles.languageItemText, {fontFamily:'FiraSans_400Regular'}]}>
                                    English
                                </Text>
                            </TouchableOpacity>

                    </ScrollView>


                    <View style={styles.save_button_wrapper} >
                        <TouchableOpacity style={styles.save_button} onPress={() =>  {this.saveNewLanguage()} }>
                            <Text style={[styles.save_button_text, {fontFamily:'FiraSans_400Regular'}]} >
                                {this.state.language.save}
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>



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
        // borderWidth:1,
        // borderColor: '#9F9EAE',
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
        maxWidth:328,
        backgroundColor:'#E1C1B7',
        height:34,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginHorizontal:16,
        marginBottom:16
    },
    save_button_text:{
        color:'#1D1D20',
        fontSize:14,
        fontWeight:'bold'
    },
    save_button_wrapper:{
        width:'100%',
        alignItems:'center'
    }
})

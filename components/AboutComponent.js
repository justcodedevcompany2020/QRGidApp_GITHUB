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
    Platform
} from "react-native";

// StatusBar.setHidden(true);

import TopMenu from '../components/includes/TopMenu';
import ChangeTerrain from '../components/includes/ChangeTerrain';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

// import Slideshow from 'react-native-image-slider-show';
import Svg, { Path, Defs, G, ClipPath, Circle, Mask, Rect } from "react-native-svg"


import i18n from "i18n-js";
import { ru, bel, en} from "../i18n/supportedLanguages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
            loaded:false,
            openThreeDotModal : false,
            isMapReady: false,
            menuIsOpen: false,
            isOpenChangeTerrain: false,
            language: {},
            language_name: '',
            appInfo: {},
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
    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    goToQrScaner = () => {
        this.props.navigation.navigate('QrScanner')
    }

    goToObjectsMap() {
        this.props.navigation.navigate('ObjectMap')
    }

    allCheckAfterLoadComponent = async () => {



        // Set language start


        await AsyncStorage.getItem('language',(err,item) => {

            let language = item ? JSON.parse(item) : {};
            let set_language = ru;
            let language_name = 'ru';

            if (language.hasOwnProperty('language')) {
                set_language = language.language == 'ru' ? ru : language.language == 'bel' ?  bel : en;
                language_name = language.language == 'ru' ? 'ru' : language.language == 'bel' ?  'bel' : 'en';

            }

            this.setState({
                language:set_language,
                language_name: language_name
            })

        })


        this.getData()
        // Set language end



    }


    getData = async () => {

        let url = 'https://qr-gid.by/api/by/version/';

        switch (this.state.language_name) {
            case "bel":
                url = 'https://qr-gid.by/api/by/version/';
                break;
            case "ru":
                url = 'https://qr-gid.by/api/version/';
                break;
            case "en":
                url = 'https://qr-gid.by/api/en/version/';
                break;
        }

        let req = {

        }

        axios.post(url).then((response) => {

            this.setState({
                // isOpenChangeTerrain: false,
                appInfo: response.data,
                loaded: true
            })

        });


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

    componentDidMount() {


        const { navigation } = this.props;

        this.closeAllModals();
        this.allCheckAfterLoadComponent();
        this.loadFonts();

        // this.checkObjectInFavourites();


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



    render() {

        if (!this.state.fontsLoaded) {
            return null;
        }

        if (this.state.loaded) {
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
                                {this.state.language.change_terrain}

                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.goToObjectsMap()}
                            style={{padding: 14, fontSize:16, color:'#1D1D20'}}
                        >
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

                        <Text style={[styles.toptext, {fontFamily:'Ubuntu_400Regular'}]}>
                            {this.state.language.about_the_application_title}
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

                            <Text style={{color: '#54535F', fontSize:16,  fontWeight: 'normal', marginBottom:10, paddingHorizontal:16, fontFamily:'Ubuntu_400Regular'}}>
                                {this.state.language.about_the_application_desc_title}
                            </Text>

                            <Text style={{fontSize:16,color: '#1D1D20', paddingBottom:21, borderBottomWidth:1, borderBottomColor:'white', paddingHorizontal:16, fontFamily:'FiraSans_400Regular'}}>

                                {Platform.OS === 'ios' ? this.state.appInfo.ios.description : this.state.appInfo.android.description }


                            </Text>




                            <Text style={{fontSize:16,color: '#1D1D20', paddingTop:21, marginBottom:24, paddingHorizontal:16, fontFamily:'Ubuntu_400Regular'}}>
                                {this.state.language.about_the_application_title}

                            </Text>



                            <View style={styles.itemWrapper}>

                                <Text style={[styles.itemWrapperLeft, {fontFamily:'FiraSans_400Regular'}]}>
                                    {this.state.language.about_the_application_version}
                                </Text>
                                <Text style={[styles.itemWrapperRight, {fontFamily:'FiraSans_400Regular'}]}>
                                    {Platform.OS === 'ios' ? this.state.appInfo.ios.version : this.state.appInfo.android.version }
                                </Text>

                            </View>


                            <View style={styles.itemWrapper}>

                                <Text style={[styles.itemWrapperLeft, {fontFamily:'FiraSans_400Regular'}]}>
                                    {this.state.language.about_the_application_last_update}
                                </Text>
                                <Text style={[styles.itemWrapperRight, {fontFamily:'FiraSans_400Regular'}]}>
                                    {Platform.OS === 'ios' ? this.state.appInfo.ios.latest_update : this.state.appInfo.android.latest_update }
                                </Text>

                            </View>

                            <View style={styles.itemWrapper}>

                                <Text style={[styles.itemWrapperLeft, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Кол-во скачиваний*/}
                                    {this.state.language.download_count}
                                </Text>
                                <Text style={[styles.itemWrapperRight, {fontFamily:'FiraSans_400Regular'}]}>
                                    {Platform.OS === 'ios' ? this.state.appInfo.ios.number_downloads : this.state.appInfo.android.number_downloads }
                                </Text>

                            </View>


                            <View style={styles.itemWrapper}>

                                <Text style={[styles.itemWrapperLeft, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Размер файла*/}

                                    {this.state.language.file_size}


                                </Text>
                                <Text style={[styles.itemWrapperRight, {fontFamily:'FiraSans_400Regular'}]}>
                                    {Platform.OS === 'ios' ? this.state.appInfo.ios.file_size : this.state.appInfo.android.file_size }
                                </Text>

                            </View>

                            <View style={styles.itemWrapper}>

                                <Text style={[styles.itemWrapperLeft, {fontFamily:'FiraSans_400Regular'}]}>
                                    {Platform.OS === 'ios' ? 'ОС IOS' : 'ОС Android' }
                                </Text>

                                <Text style={[styles.itemWrapperRight, {fontFamily:'FiraSans_400Regular'}]}>
                                    {Platform.OS === 'ios' ? this.state.appInfo.ios.version_os : this.state.appInfo.android.version_os }
                                    {/*{this.state.language.and_more}*/}
                                </Text>

                            </View>

                            <View style={styles.itemWrapper}>

                                 <Text style={[styles.itemWrapperLeft, {fontFamily:'FiraSans_400Regular'}]}>

                                    {/*Дата выпуска*/}
                                    {this.state.language.release_date}

                                 </Text>

                                <Text style={[styles.itemWrapperRight, {fontFamily:'FiraSans_400Regular'}]}>
                                    {Platform.OS === 'ios' ? this.state.appInfo.ios.release_date : this.state.appInfo.android.release_date }
                                </Text>

                            </View>

                        </ScrollView>
                    </View>


                </SafeAreaView>

            )
        } else {
            return (
                <View></View>
            )
        }


    }
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'#F9F3F1',
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
        backgroundColor:'#F9F3F1',
        marginBottom: 16
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
        paddingTop:19
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
        color: '#54535F',
        marginRight: 8
    },
    itemWrapperRight:{
        color: '#1D1D20',
        fontSize:16
    }
})

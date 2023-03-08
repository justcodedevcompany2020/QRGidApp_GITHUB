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
    StatusBar, Platform,
} from "react-native";

// StatusBar.setHidden(true);


import Svg, { Path, Defs, G, ClipPath, Circle, Mask, Rect } from "react-native-svg"
import {AuthContext} from "../AuthContext/context";
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


import i18n from "i18n-js";
import { ru, bel, en} from "../../i18n/supportedLanguages";



export default class App extends React.Component {


    constructor(props) {

        super(props);

        this.state = {
            isOpenWhyWrapper: false,
            oblasts_and_regions : [],
            oblast: [],
            region: [],
            selected_oblast: '',
            selected_region: '',
            language: {},
            language_name: 'bel'
        }

    }
    static contextType = AuthContext;

    closeChangeTerrain = () => {
        this.setState({
            isOpenWhyWrapper:false
        })
        this.props.closeChangeTerrain()
    }


     getRegions = async () => {

        // AsyncStorage.clear();
        // let userId = await AsyncStorage.getItem('userId');
        // await  this.setState({
        //     IsLoadedUserInfo: false
        // })

         //
         // https://qr-gid.by/api/region/mobile_app/
         // https://qr-gid.by/api/en/region/mobile_app/
         // https://qr-gid.by/api/by/region/mobile_app/
         //


         let url = 'https://qr-gid.by/api/by/region/mobile_app/';

         switch (this.state.language_name) {
             case "bel":
                 url = 'https://qr-gid.by/api/by/region/mobile_app/';
                 break;
             case "ru":
                 url = 'https://qr-gid.by/api/region/mobile_app/';
                 break;
             case "en":
                 url = 'https://qr-gid.by/api/en/region/mobile_app/';
                 break;
         }

        axios.get(url).then(
            (response) => {

                let response_data = response.data;

                 this.setState({
                    oblasts_and_regions: response_data
                 })



                // Set OBLAST START

                    let oblast = [];
                    for ( let response_item in response_data ) {
                        oblast.push( {
                            'label': response_item,
                            'value': response_item,
                        })
                    }

                    this.setState({
                        oblast: oblast,
                    })

                // Set OBLAST END

                // console.log(oblast, 'oblast')

                AsyncStorage.getItem('selected_oblast_and_region',(err,item) => {

                    let selected_oblast_and_region = item ? JSON.parse(item) : {};

                    if(selected_oblast_and_region.hasOwnProperty('selected_oblast')) {

                        let selected_oblast = selected_oblast_and_region.selected_oblast;
                        let selected_region = selected_oblast_and_region.selected_region;

                        this.setState({
                            selected_oblast: selected_oblast,
                            selected_region: selected_region
                        })


                        // SET region START

                            let region = [];
                            for ( let response_item in response_data ) {


                                if (response_item == selected_oblast) {

                                    let region_arr = response_data[response_item];

                                    for (const regionDataKey in region_arr) {

                                        region.push( {
                                            'label': region_arr[regionDataKey].NAME,
                                            'value': region_arr[regionDataKey].ID,
                                            'GPS' : region_arr[regionDataKey].GPS
                                        })

                                        if (selected_region == region_arr[regionDataKey].ID) {

                                            this.setState({
                                                region_gps:  region_arr[regionDataKey].GPS
                                            })
                                        }
                                    }

                                    this.setState({
                                        region: region,
                                    })

                                    break;
                                }
                            }


                        // SET region END


                    }


                })

            },

            (err) => {
                console.log(err.response.data, 'err')
            },

        );
    }

     changeTerrain = async () => {


        let {selected_oblast, selected_region, region_gps} = this.state

        let selected_oblast_and_region = {
            selected_oblast: selected_oblast,
            selected_region: selected_region,
            region_gps: region_gps,
        }

        await AsyncStorage.setItem('selected_oblast_and_region', JSON.stringify(selected_oblast_and_region) )
        this.closeChangeTerrain()

    }

     setLanguageFromStorage = async ()=> {

        await AsyncStorage.getItem('language',async (err,item) => {

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

            this.getRegions();

        })

    }




    changeOblast = async (item) => {

        let response_data = this.state.oblasts_and_regions;

        await this.setState({
            selected_oblast: item.value
        })

        // SET region START

        let region = [];
        for ( let response_item in response_data ) {


            if (response_item == item.value) {

                let region_arr = response_data[response_item];
                for (const regionDataKey in region_arr) {
                    region.push( {
                        'label': region_arr[regionDataKey].NAME,
                        'value': region_arr[regionDataKey].ID,
                        'GPS' : region_arr[regionDataKey].GPS
                    })
                }

                this.setState({
                    region: region,
                })

                break;
            }
        }


        // SET region END


    }

    changeRegion = async (item) => {

        await this.setState({
            selected_region: item.value,
            region_gps: item.GPS
        })


    }

     componentDidMount() {

         this.setLanguageFromStorage();


    }


    render() {



        return (

                <TouchableOpacity onPress={() => this.closeChangeTerrain()}  style={{width:'100%', height:'100%', position:'absolute', top:0, left:0,zIndex:15, justifyContent:'center', alignItems:'center'}}>

                    <TouchableHighlight style={{width: '100%', maxWidth: 290, height:340, backgroundColor:'#B1E6FB',  borderRadius:24}}>
                        <View style={{width: '100%', height:'100%',  borderRadius:24, padding:14, justifyContent:'flex-start'}}>

                            <View style={{width:'100%', alignItems:'flex-end', marginBottom:8}}>

                                <TouchableOpacity onPress={() => this.closeChangeTerrain()}>
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path
                                            d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z"
                                            fill="#076388"
                                        />
                                    </Svg>
                                </TouchableOpacity>

                            </View>

                            <Text style={{color:'#1D1D20', fontSize:24,  paddingBottom: 15}}>

                                {this.state.language.select_area}

                            </Text>




                             {/*ОБЛАСТЬ*/}
                            <Dropdown
                                style={styles.dropdown}
                                data={this.state.oblast}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                placeholder={this.state.language.oblast}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                value={this.state.selected_oblast}
                                // dropdownPosition='top'
                                containerStyle={{position: 'absolute', top: 0, borderBottomLeftRadius: 8, borderBottomRightRadius:15, overflow:'hidden',borderRadius: 8,}}
                                onChange={item => {
                                   this.changeOblast(item)
                                }}
                            />


                             {/*Регион*/}
                            <Dropdown
                                style={styles.dropdown}
                                data={this.state.region}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                placeholder={this.state.language.region}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                value={this.state.selected_region}

                                containerStyle={{position: 'absolute', top: 0, borderBottomLeftRadius: 8, borderBottomRightRadius:8, overflow:'hidden', borderRadius: 8,}}
                                onChange={item => {
                                     this.changeRegion(item)
                                }}
                            />



                            {this.state.selected_oblast != '' && this.state.selected_region != ''  &&



                                <TouchableOpacity
                                    style={{width:'100%', height:34, backgroundColor:'#2EC5FF', borderRadius:8, justifyContent:'center',  alignItems:'center', marginBottom:17} }
                                    onPress={() => {
                                        this.changeTerrain()
                                    }}
                                >
                                    <Text style={{color:'#032B3A', fontSize:14, fontWeight:'bold'}}>

                                        {this.state.language.select_btn}

                                    </Text>
                                </TouchableOpacity>


                            }




                            {(this.state.selected_oblast == '' || this.state.selected_region == '')  &&



                                <TouchableOpacity
                                    style={{width:'100%', height:34, backgroundColor:'#2EC5FF', borderRadius:8, justifyContent:'center',  alignItems:'center', marginBottom:17, opacity: 0.7} }
                                >
                                    <Text style={{color:'#032B3A', fontSize:14, fontWeight:'bold'}}>
                                        {this.state.language.select_btn}
                                    </Text>
                                </TouchableOpacity>


                            }



                            <View style={{width:'100%', justifyContent:'center', flexDirection:'row', marginBottom:27}}>
                                <TouchableOpacity style={{ flexDirection:'row', alignItems:'center'}} onPress={() => {this.setState({isOpenWhyWrapper:true})}}>

                                    <Svg style={{marginRight:8}}  width={18}  height={18}  viewBox="0 0 18 18"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M9 18A9 9 0 109 0a9 9 0 000 18zm.5-12.375a.5.5 0 00-1 0v.563a.5.5 0 001 0v-.563zm0 2.813a.5.5 0 00-1 0v3.937a.5.5 0 001 0V8.437z" fill="#076388"/>
                                    </Svg>

                                    <Text>
                                        {this.state.language.why}
                                    </Text>

                                </TouchableOpacity>

                                {this.state.isOpenWhyWrapper &&


                                    <View style={styles.whyWrapper}>

                                        <Text style={{paddingRight: 15}}>
                                            {this.state.language.why_desc}
                                        </Text>




                                        <View style={{flex:1, position:'absolute', top:12, right:12, justifyContent:'space-between'}}>
                                            <TouchableOpacity onPress={() =>this.setState({isOpenWhyWrapper:false})} >
                                                <Svg  width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z" fill="#54535F"/>
                                                </Svg>
                                            </TouchableOpacity>


                                        </View>



                                    </View>

                                }


                            </View>


                        </View>
                    </TouchableHighlight>

                </TouchableOpacity>








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
        borderWidth:1,
        borderColor: '#55545F',
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
        height:34,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        // marginHorizontal:16,
        marginBottom:16
    },
    save_button_text:{
        color:'#1D1D20',
        fontSize:14,
        fontWeight:'bold'
    },
    logout_button:{
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
    logout_button_text:{
        color:'#1D1D20',
        fontSize:14,
        fontWeight:'bold'
    },
    logout_button_wrapper:{
        width:'100%',
        alignItems:'center'
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
    editProfileButton:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        height:36,
        borderRadius:8,
        borderColor:"#9F9EAE",
        borderWidth:1,
        marginBottom:16
    },

    editModalWrapper:{
        // width:'100%',
        //
        // position:'absolute',
        // bottom:0,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding:16,
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
        fontSize: 16,
    },

    selectedTextStyle: {
        fontSize: 15,
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
        paddingHorizontal: 8,
        color:'white',
        backgroundColor:'white',
        marginBottom:16
    },
    whyWrapper:{
        width:'100%',
        padding: 13,
        position:'absolute',
        top:-10,
        left:0,
        backgroundColor:'#F9F3F1',
        borderRadius:8,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,
        elevation: 9,
        flexDirection:'row'
    },


})

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
    StatusBar, BackHandler, ActivityIndicator,
} from "react-native";

// StatusBar.setHidden(true);

const windowHeight = Dimensions.get('window').height;

import * as Location from 'expo-location';

// import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
// let Marker = MapView.Marker


import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";


import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

import Svg, { Path, Defs, G, ClipPath, Circle, Mask, Rect } from "react-native-svg"
import TopMenu from "../includes/TopMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../AuthContext/context";
import ChangeTerrain from "../includes/ChangeTerrain";
import {TextInput} from "react-native-paper";
import axios from "axios";
import {LinearGradient} from "expo-linear-gradient";



import InfrRestoran from '../../assets/Icons/infrastruktura/infr_restoran'
import InfrGuestComplex from '../../assets/Icons/infrastruktura/infr_guest_complex'
import InfrAgrousadby from '../../assets/Icons/infrastruktura/infr_agrousadby'
import InfrSportObj from '../../assets/Icons/infrastruktura/infr_sport_obj'
import InfrSanatoriy from '../../assets/Icons/infrastruktura/infr_sanatoriy'
import InfrKempigi from '../../assets/Icons/infrastruktura/infr_kempigi'
import InfrOhota from '../../assets/Icons/infrastruktura/infr_ohota'
import InfrBazaOtdyxa from '../../assets/Icons/infrastruktura/infr_baza_otdyxa'
import InfrTourComplex from '../../assets/Icons/infrastruktura/infr_tour_complex'

import DostArhitectura from '../../assets/Icons/dostoprimechatelnosti/dost_arhitectura'
import DostReligia from '../../assets/Icons/dostoprimechatelnosti/dost_religia'
import DostMuseum from '../../assets/Icons/dostoprimechatelnosti/dost_museum'


import ObrazovanieSvg from '../../assets/svg/ObrazovanieSvg'
import ZrelishnieUchrezhdeniyaSvg from '../../assets/svg/ZrelishnieUchrezhdeniyaSvg'
import ZrelishnieUchrezhdeniyaForFilterSvg from '../../assets/svg/ZrelishnieUchrezhdeniyaForFilterSvg'


// Categories icon


import Agrousadby from "../../assets/Icons/categories/agrousadby_32";
import Arheologiya from "../../assets/Icons/categories/arheologiya_32";
import BazyOtdyha from "../../assets/Icons/categories/bazy_otdyha_32";
import LyjnySport from "../../assets/Icons/categories/lyjny_sport_32";
import Gostinicy from "../../assets/Icons/categories/gostinicy";
import Turkompleksy from "../../assets/Icons/categories/turkompleksy_32";
import Dvorcy from "../../assets/Icons/categories/dvorcy_32";
import Zakazniki from "../../assets/Icons/categories/zakazniki_32";
import ZonaOtdyxa from "../../assets/Icons/categories/zony_otdyha_32";
import Infocenter from "../../assets/Icons/categories/infocentr";
import Cafe from "../../assets/Icons/categories/cafe_32";
import Camping from "../../assets/Icons/categories/camping_32";
import Memorialy from "../../assets/Icons/categories/memorialy_32";
import Musei from "../../assets/Icons/categories/musei_32";
import Obshepit from "../../assets/Icons/categories/obschepit_32";
import OhotnichiDomik from "../../assets/Icons/categories/ohotnichi_domik_32";
import Pamyatniki from "../../assets/Icons/categories/pamyatniki";
import Servis from "../../assets/Icons/categories/servis_32";
import RekiIVodoyomy from "../../assets/Icons/categories/reki-i-vodoyomy_32";
import Religiya from "../../assets/Icons/categories/religiya_32";
import Restorany from "../../assets/Icons/categories/restorany_32";
import Sanatori from "../../assets/Icons/categories/sanatorii_32";
import Sport from "../../assets/Icons/categories/sport_32";
import Tourism from "../../assets/Icons/categories/tourism_32";
import Usadby from "../../assets/Icons/categories/usadby_32";
import Hostely from "../../assets/Icons/categories/hostely_32";
import Parki from "../../assets/Icons/categories/parki_32";
import Dosug from "../../assets/Icons/categories/dosug_32";

import {bel, en, ru} from "../../i18n/supportedLanguages";
import * as Linking from "expo-linking";
// import {SliderBox} from "react-native-image-slider-box";

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
import {Platform} from "react-native-web";

export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            openThreeDotModal : false,
            isMapReady: false,
            menuIsOpen: false,
            isLogin: false,
            isOpenChangeTerrain: false,
            isOpenSearchPanel: false,

            search_value: '',
            search_value_error: false,
            search_value_valid: false,

            search_active: false,

            object_items: [],

            isOpenPressedObjectOnMap: false,
            pressedObjectData: {},

            isOpenMyPlacesModal: false,
            my_places: [],

            search_history_data: [],
            language: {},
            language_name: 'bel',
            region_gps: [],

            search_categories_data: [],
            search_categories_data2: [],

            objects_for_user_location_not_found_modal: false,

            fontsLoaded: false,
        }
        this.focusListener = {}
        this.handler = this.handler.bind(this)
        this.closeChangeTerrain = this.closeChangeTerrain.bind(this)

    }

    static contextType = AuthContext

    handler() {

        this.setState({
            menuIsOpen: !this.state.menuIsOpen
        })

    }

    closeChangeTerrain = async () => {


        await AsyncStorage.getItem('selected_oblast_and_region',(err,item) => {

            let selected_oblast_and_region = item ? JSON.parse(item) : {};

            if(selected_oblast_and_region.hasOwnProperty('selected_oblast')) {

                this.setState({
                    isOpenChangeTerrain: false
                })

            } else {

                this.setState({
                    isOpenChangeTerrain: true
                })


            }


            // Reload map

            this.setState({
                isMapReady: false
            })

            this.checkChangeTerrain();


        })

    }

    onMapLayout = () => {

        this.setState({ isMapReady: true });

    }

    goToQrScaner = () => {

        this.props.navigation.navigate('QrScanner')

    }


    getSearchHistory = async () => {
        let id_user = await AsyncStorage.getItem('userId');

        let req = {
            id_user:id_user,
            count_page: 1000
        }

        let url = 'https://qr-gid.by/api/by/search/history/';

        switch (this.state.language_name) {
            case "bel":
                url = 'https://qr-gid.by/api/by/search/history/';
                break;
            case "ru":
                url = 'https://qr-gid.by/api/search/history/';
                break;
            case "en":
                url = 'https://qr-gid.by/api/en/search/history/';
                break;
        }



        await axios.post(url, req).then((response) => {

            let data = response.data.items;
            let new_data = [];

            for (const history_item in data) {
                new_data.push(data[history_item])
            }
            this.setState({
                search_history_data: new_data
            })

        });

    }

    getSearchCategories = async () => {


        await AsyncStorage.getItem('selected_oblast_and_region',(err,item) => {

            let selected_oblast_and_region = item ? JSON.parse(item) : {};

            if(selected_oblast_and_region.hasOwnProperty('selected_oblast')) {

                let url = 'https://qr-gid.by/api/search/category/';

                switch (this.state.language_name) {
                    case "bel":
                        url = 'https://qr-gid.by/api/by/search/category/';
                        break;
                    case "ru":
                        url = 'https://qr-gid.by/api/search/category/';
                        break;
                    case "en":
                        url = 'https://qr-gid.by/api/en/search/category/';
                        break;
                }

                let req = {
                    region_id:selected_oblast_and_region.selected_region
                }

                //Добавить region_id

                axios.post(url, req).then((response) => {

                    let data = response.data;
                    let new_data = [];

                    for (let cat_item in data) {
                        data[cat_item].icon_id = cat_item
                        new_data.push(data[cat_item])
                    }

                    let new_data_2 = new_data.splice(new_data.length/2 );

                    this.setState({
                        search_categories_data: new_data,
                        search_categories_data2: new_data_2
                    })

                });

            }



        })


    }


    openSearchPanel = async () => {

        await this.getSearchHistory();
        await this.getSearchCategories();

        await this.setState({
            isOpenSearchPanel: true
        })

    }

    openMyPlacesModal = async () => {

        await this.getMyFavourites()

        this.setState({
            isOpenMyPlacesModal: true
        })
    }

    changeSearchValue = (search_value) => {

        this.setState({
            search_value: search_value
        })

    }

    showSearchObjectOnMap = async ( cat_id = 0) => {



        let search_value = this.state.search_value
        let id_user = await AsyncStorage.getItem('userId');

        await AsyncStorage.getItem('selected_oblast_and_region',(err,item) => {

            let selected_oblast_and_region = item ? JSON.parse(item) : {};

            this.setState({
                isMapReady: false
            })

            if(selected_oblast_and_region.hasOwnProperty('selected_oblast')) {

                let req = {
                    count_page: 200,
                    id_user: id_user,
                    region_id: selected_oblast_and_region.selected_region
                };

                if (search_value != '') {
                    req.name = search_value;
                }


                if (cat_id != 0) {
                    req.category = cat_id;
                }


                axios.post('https://qr-gid.by/api/search/name/', req).then((response) => {

                    let data = response.data.items;
                    let gps, new_gps, new_data, state_data;
                    let region_gps = []
                    let new_region_gps = []
                    state_data = [];

                    for (const data_item in data) {

                        let new_data   = data[data_item];

                        for (const new_data_item in new_data) {

                            if (!new_data[new_data_item].GPS) {
                                continue;
                            }

                            gps = new_data[new_data_item].GPS;
                            gps = gps.replace(/\s/g, '');
                            new_gps = gps.split(',');

                            new_data[new_data_item].latitude = new_gps[0]
                            new_data[new_data_item].longitude = new_gps[1]

                            if (new_gps[0] != '' && new_gps[1] != '' ) {
                                state_data.push(new_data[new_data_item]);
                            }

                        }

                        region_gps = selected_oblast_and_region.region_gps;
                        region_gps = region_gps.replace(/\s/g, '');
                        new_region_gps = region_gps.split(',');

                    }

                    this.setState({
                        object_items: state_data,
                        region_gps: new_region_gps,
                        isOpenChangeTerrain: false,
                        isMapReady: true,
                        isOpenSearchPanel: false,
                        search_active: true
                    })

                });



            } else {
                this.setState({
                    isOpenChangeTerrain: true
                })

            }
        })


    }

    onBlurSearchInput = () => {

    }

    checkLogin = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
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



    checkChangeTerrain = async () => {

        await this.setState({
            isMapReady: false
        })

        await AsyncStorage.getItem('selected_oblast_and_region',(err,item) => {

            let selected_oblast_and_region = item ? JSON.parse(item) : {};

            if(selected_oblast_and_region.hasOwnProperty('selected_oblast'))
            {

                console.log('selected_oblast KAAAAAAAA')
                let url = 'https://qr-gid.by/api/search/region/';

                switch (this.state.language_name) {
                    case "bel":
                        url = 'https://qr-gid.by/api/by/search/region/' ;
                        break;
                    case "ru":
                        url = 'https://qr-gid.by/api/search/region/';
                        break;
                    case "en":
                        url = 'https://qr-gid.by/api/en/search/region/';
                        break;
                }

                fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        region_id: selected_oblast_and_region.selected_region ,
                        // region_id: 1907 ,
                        count_page: 100,
                        num_page: 1
                    }),
                    headers: {
                        "Content-type": "application/json;",
                    }
                })
                    .then(response => response.json())
                    .then(response => {

                        let data = response.items;

                        console.log('selected_oblast KAAAAAAAA', data)

                        //
                            let gps, new_gps, new_data, state_data, region_gps, new_region_gps;

                            state_data = [];

                            for (const data_item in data) {

                                 new_data   = data[data_item];

                                for (const new_data_item in new_data) {

                                    if (!new_data[new_data_item].GPS) {
                                        continue;
                                    }

                                     gps = new_data[new_data_item].GPS;
                                     gps = gps.replace(/\s/g, '');

                                     new_gps = gps.split(',');

                                    new_data[new_data_item].latitude = new_gps[0]
                                    new_data[new_data_item].longitude = new_gps[1]

                                    if (new_gps[0] != '' && new_gps[1] != '' ) {
                                        state_data.push(new_data[new_data_item]);
                                    }
                                }
                                 //
                                 // region_gps = selected_oblast_and_region.region_gps;
                                 // region_gps = region_gps.replace(/\s/g, '');
                                 // new_region_gps = region_gps.split(',');

                            }


                            region_gps = selected_oblast_and_region.region_gps;
                            region_gps = region_gps.replace(/\s/g, '');
                            new_region_gps = region_gps.split(',');

                            this.setState({
                                object_items: state_data,
                                region_gps: new_region_gps,
                                isOpenChangeTerrain: false,
                                isMapReady: true
                            })


                    })
                    .catch(error => console.log(error) )


            } else {

                console.log('selected_oblast CHKAAAAAAAA')


                this.setState({
                    isOpenChangeTerrain: true
                })

            }
        })
    }

    openSingleObject = (id) => {

        let url = 'https://qr-gid.by/api/en/detail/';

        switch (this.state.language_name) {
            case "bel":
                url = 'https://qr-gid.by/api/by/detail/';
                break;
            case "ru":
                url = 'https://qr-gid.by/api/detail/';
                break;
            case "en":
                url = 'https://qr-gid.by/api/en/detail/';
                break;
        }

        axios.post(url, {ID:id, no_redirect:true}).then((response) => {

            this.setState({
                isOpenSearchPanel: false
            })
            this.props.navigation.navigate('Object', {
                params: response.data,
            })
        });

    }

    addObjectToFavourites = async () => {

        let object  = this.state.pressedObjectData;

        let id_obj  = object.ID
        let id_user = await AsyncStorage.getItem('userId');

        let req = {
            id_obj:id_obj,
            id_user: id_user
        }

        axios.post('https://qr-gid.by/api/favorite/add/', req).then((response) => {

            object.isFavourites = true;

            this.setState({
                pressedObjectData: object
            })

        });

    }

    removeObjectFromFavouritesInMyPlacesModal = async (item) => {

        let id_obj = item.id_obj
        let id_user = await AsyncStorage.getItem('userId');

        let req = {
            id_obj:id_obj,
            id_user: id_user
        }
        axios.post('https://qr-gid.by/api/favorite/delete/', req).then((response) => {
            this.getMyFavourites();
        });

    }

    removeObjectFromFavourites = async () => {

        let object = this.state.pressedObjectData;

        let id_obj = object.ID
        let id_user = await AsyncStorage.getItem('userId');

        let req = {
            id_obj:id_obj,
            id_user: id_user
        }

        axios.post('https://qr-gid.by/api/favorite/delete/', req).then((response) => {

            object.isFavourites = false;

            this.setState({
                pressedObjectData: object
            })

        });

    }

    checkObjectInFavourites = async (marker) => {

        // https://qr-gid.by/api/favorite/list/


        let {isLogin} = this.state;

        // let object = this.state.pressedObjectData;

        if (isLogin) {
            let id_obj = marker.ID
            let id_user = await AsyncStorage.getItem('userId');

            let req = {
                id_obj:id_obj,
                id_user: id_user
            }
            console.log(req, 'reqreqreq')

            let url = 'https://qr-gid.by/api/by/favorite/list/';

            switch (this.state.language_name) {
                case "bel":
                    url = 'https://qr-gid.by/api/by/favorite/list/';
                    break;
                case "ru":
                    url = 'https://qr-gid.by/api/favorite/list/';
                    break;
                case "en":
                    url = 'https://qr-gid.by/api/en/favorite/list/';
                    break;
            }

            axios.post(url, req).then((response) => {

                marker.isFavourites = response.data.hasOwnProperty('success') && response.data.success === true ? true : false;

                let TYPE_OBJ_NAME = Object.values(marker.TYPE_OBJ);
                marker.TYPE_OBJ_NAME = TYPE_OBJ_NAME.length > 0 ? TYPE_OBJ_NAME[0] : '';

                this.setState({
                    isOpenPressedObjectOnMap: true,
                    pressedObjectData: marker
                })

            });


        } else {

            marker.isFavourites = false;

            let TYPE_OBJ_NAME = Object.values(marker.TYPE_OBJ);
            marker.TYPE_OBJ_NAME = TYPE_OBJ_NAME.length > 0 ? TYPE_OBJ_NAME[0] : '';

            this.setState({
                isOpenPressedObjectOnMap: true,
                pressedObjectData: marker
            })
        }







    }

    getMyFavourites = async () => {

        let url = 'https://qr-gid.by/api/by/favorite/list/';

        switch (this.state.language_name) {
            case "bel":
                url = 'https://qr-gid.by/api/by/favorite/list/';
                break;
            case "ru":
                url = 'https://qr-gid.by/api/favorite/list/';
                break;
            case "en":
                url = 'https://qr-gid.by/api/en/favorite/list/';
                break;
        }

        let id_user = await AsyncStorage.getItem('userId');

        let req = {
            id_user: id_user,
            count_page: 1000
        }

        axios.post(url, req).then((response) => {

            let data = response.data.items;
            let state_data = [];

            for (const data_item in data) {

                let new_data   = data[data_item];
                state_data.push(new_data);
            }

            this.setState({
                my_places: state_data
            })

        });

    }


    setLanguageFromStorage = async ()=> {

        // ru, bel, en

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

    }


    closeAllModals = () => {

        this.setState({
            openThreeDotModal: false,
            isOpenChangeTerrain: false,
            isOpenSearchPanel: false,
            isOpenPressedObjectOnMap: false,
            isOpenMyPlacesModal: false,
            menuIsOpen: false
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


    callAllFunctions = async () =>
    {
        this.closeAllModals();
        this.setLanguageFromStorage();
        this.checkLogin();
        this.loadFonts();

        if (this.state.search_active === false) {
            this.checkChangeTerrain();
        }
    }

    componentDidMount() {
        // AsyncStorage.clear()
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("focus", () => {
            this.callAllFunctions();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();
            console.log('Bum END')
        }
    }




    getObjectsByUserLocation = async () => {

        await this.setState({
            map_loader_after_used_user_location: true
        })

        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        let url = 'https://qr-gid.by/api/by/search/location/';

        switch (this.state.language_name) {
            case "bel":
                url = 'https://qr-gid.by/api/by/search/location/';
                break;
            case "ru":
                url = 'https://qr-gid.by/api/search/location/';
                break;
            case "en":
                url = 'https://qr-gid.by/api/en/search/location/';
                break;
        }

        let req = {
            gps:location.coords.latitude + ', ' + location.coords.longitude ,
            // gps:'53.614792, 28.155187' ,
            num_page: 1,
            count_page: 1000
        }

        axios.post(url, req).then( async (response) => {

            await this.setState({
                region_gps: [location.coords.latitude, location.coords.longitude],
                // region_gps: [53.614792, 28.155187],
                objects_for_user_location_not_found_modal: response.data.count == 0 ? true: false
            })

            let data = response.data.items;
            let state_data = [];

            for (const data_item in data) {

                let new_data   = data[data_item];

                for (const new_data_item in new_data) {

                    let gps = new_data[new_data_item].GPS;
                        gps = gps.trim();

                    let new_gps = gps.split(',');

                    new_data[new_data_item].latitude = new_gps[0]
                    new_data[new_data_item].longitude = new_gps[1]

                    state_data.push(new_data[new_data_item]);

                }
            }

            await this.setState({
                // isOpenChangeTerrain: false,
                object_items: state_data,
                map_loader_after_used_user_location: false
            })

            // await this.setState({
            //     // isOpenChangeTerrain: false,
            //     isMapReady: true,
            // })

        });


    }



    removeObjectsByUserLocation = async () => {

        await this.setState({
            objects_for_user_location_not_found_modal: false
        })

        await this.checkChangeTerrain();
    }


    getMarkerIcon = (marker) => {

        // IBLOCK_ID = 17 = Инфраструктура
        // IBLOCK_ID = 18 = Достопримечательности

        let { IBLOCK_ID, TYPE_OBJ } = marker;

        console.log(marker, '---------marker-------')
        let new_type_obj = '';
        let type_object_key = '';

        for (const type_object in TYPE_OBJ) {
            new_type_obj = TYPE_OBJ[type_object];
            type_object_key = type_object;
        }

        TYPE_OBJ = new_type_obj

        let returnIcon= <View></View>

        if (IBLOCK_ID == 17) {

            switch (type_object_key) {
                case '16': //"Ресторан":
                    returnIcon =  <InfrRestoran/>
                    break;
                case '26': //"Гостиничные комплексы":
                    returnIcon =  <InfrGuestComplex/>
                    break;
                case '1': //"Гостиницы":
                    returnIcon =  <InfrGuestComplex/>
                    break;
                case '15': //"Кафе":
                    returnIcon =  <InfrRestoran/>
                    break;
                case '2': //"Агроусадьбы":
                    returnIcon =  <InfrAgrousadby/>
                    break;
                case '3': //"Спортивные объекты":
                    returnIcon =  <InfrSportObj/>
                    break;
                case '4': //"Санатории и оздоровительные комплексы":
                    returnIcon =  <InfrSanatoriy/>
                    break;
                case '11': //"Кемпинги":
                    returnIcon =  <InfrKempigi/>
                    break;
                case '22': //"Охотничьи домики":
                    returnIcon =  <InfrOhota/>
                    break;
                case '5': //"Базы отдыха":
                    returnIcon =  <InfrBazaOtdyxa/>
                    break;
                case '30': //"Зрелищные учреждения":
                    returnIcon =  <ZrelishnieUchrezhdeniyaSvg/>
                    break;
                case '31': //"Образование":
                    returnIcon =  <ObrazovanieSvg/>
                    break;
            }

        }

        if (IBLOCK_ID == 18) {

            switch (type_object_key) {
                case '21': //"Памятники архитектуры и истории":
                    returnIcon =  <DostArhitectura/>
                    break;
                case '8': //"Религиозные объекты":
                    returnIcon =  <DostReligia/>
                    break;
                case '9': //"Музеи":
                    returnIcon =  <DostMuseum/>
                    break;
                case '24': //"Турыстычныя комплексы":
                    returnIcon =  <InfrTourComplex/>
                    break;
            }

        }


        return (
            returnIcon
        )
    }


    printCategoryIcon = (cat) => {

        // Agrousadby, Arheologiya, BazyOtdyha, LyjnySport, Gostinicy, Turkompleksy, Dvorcy, Zakazniki, ZonaOtdyxa, Infocenter, Cafe, Camping, Memorialy, Musei, Obshepit, OhotnichiDomik, Pamyatniki, Servis, RekiIVodoyomy, Religiya, Restorany, Sanatori, Sport, Tourism, Usadby, Hostely, Parki, Dosug,

        let returnIcon= <View></View>;

        switch (cat.icon_id) {
            case '2':
                returnIcon =  <Agrousadby/>
                break;
            case '19':
                returnIcon =  <Arheologiya/>
                break;
            case '5':
                returnIcon =  <BazyOtdyha/>
                break;
            case '18':
                returnIcon =  <LyjnySport/>
                break;
            case '1':
                returnIcon =  <Gostinicy/>
                break;
            case '26':
                returnIcon =  <Turkompleksy/>
                break;
            case '7':
                returnIcon =  <Dvorcy/>
                break;
            case '10':
                returnIcon =  <Zakazniki/>
                break;
            case '17':
                returnIcon =  <ZonaOtdyxa/>
                break;
            case '27':
                returnIcon =  <Infocenter/>
                break;
            case '20':
                returnIcon =  <Infocenter/>
                break;
            case '15':
                returnIcon =  <Cafe/>
                break;
            case '11':
                returnIcon =  <Camping/>
                break;
            case '13':
                returnIcon =  <Memorialy/>
                break;
            case '9':
                returnIcon =  <Musei/>
                break;
            case '23':
                returnIcon =  <Obshepit/>
                break;
            case '22':
                returnIcon =  <OhotnichiDomik/>
                break;
            case '21':
                returnIcon =  <Pamyatniki/>
                break;
            case '14':
                returnIcon =  <Servis/>
                break;
            case '12':
                returnIcon =  <RekiIVodoyomy/>
                break;
            case '8':
                returnIcon =  <Religiya/>
                break;
            case '16':
                returnIcon =  <Restorany/>
                break;
            case '4':
                returnIcon =  <Sanatori/>
                break;
            case '3':
                returnIcon =  <Sport/>
                break;
            case '24':
                returnIcon =  <Turkompleksy/>
                break;
            case '28':
                returnIcon =  <Tourism/>
                break;
            case '6':
                returnIcon =  <Usadby/>
                break;
            case '25':
                returnIcon =  <Hostely/>
                break;
            case '29':
                returnIcon =  <Parki/>
                break;
            case '30':
                returnIcon =  <Dosug/>
                break;
            case '31':
                returnIcon =  <ZrelishnieUchrezhdeniyaForFilterSvg/>
                break;
        }



        return (
            returnIcon
        );
    }





    openGps = (pressed_object) => {
        let latitude = pressed_object.latitude;
        let longitude = pressed_object.longitude;

        let scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        let url = scheme + `${latitude},${longitude}`;
        Linking.openURL(url);
    }


    render() {


        if (!this.state.fontsLoaded) {
            return null;
        }
        return (

            <SafeAreaView style={[styles.container1]}>


                {/*OBJECTS FOR USER LOCATION MODAL START*/}


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.objects_for_user_location_not_found_modal}
                        onRequestClose={() => {
                            // this.removeObjectsByUserLocation()
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.centeredView]}
                            onPress={() => {
                                this.removeObjectsByUserLocation()
                            }}
                        >

                            <TouchableHighlight>
                                <View style={[styles.modalView, {backgroundColor: '#ECF9FE'}]}>

                                    <Text style={styles.modalText}>
                                        {/*В вашей локации объектов не обнаружено*/}
                                        {this.state.language.no_objects_were_found_in_your_location}
                                    </Text>

                                    <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>

                                        <TouchableOpacity
                                            style={{marginLeft:16}}
                                            onPress={() => {
                                                this.removeObjectsByUserLocation()
                                            }}
                                        >
                                            <Text style={[styles.textStyle, {color: '#076388'}]}>
                                                {/*Вернуться к объектам*/}
                                                {this.state.language.back_to_objects}

                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </TouchableHighlight>
                        </TouchableOpacity>
                    </Modal>

                {/*OBJECTS FOR USER LOCATION MODAL END*/}



                {/*Open Menu Modal START*/}

                    {this.state.menuIsOpen &&
                        <TopMenu
                            handler={this.handler}
                            menuIsOpen={this.state.menuIsOpen}
                            navigation={this.props.navigation}
                            // isLogin={this.state.isLogin}
                        />
                    }

                {/*Open Menu Modal END*/}


                {/*openThreeDotModal START*/}

                    {this.state.openThreeDotModal &&

                        <TouchableOpacity onPress={() => {this.setState({openThreeDotModal: false})}}
                            style={{width:'100%', height:'100%', position: "absolute", zIndex: 665, top:0, left:0}}
                        >
                        </TouchableOpacity>

                    }

                    {this.state.openThreeDotModal &&


                        <View style={styles.dotModalWrapper}>

                            <TouchableOpacity
                                onPress={() => this.setState({isOpenChangeTerrain:true, openThreeDotModal: false})}
                                style={{padding: 14, }}>
                                <Text style={{fontFamily: 'FiraSans_400Regular', fontSize:16, color:'#1D1D20' }}>
                                    {/*Сменить местность*/}
                                    {this.state.language.change_terrain}

                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ObjectMap')}
                                style={{padding: 14, }}>
                                <Text style={{fontFamily: 'FiraSans_400Regular', fontSize:16, color:'#1D1D20'}}>
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



                {/* Окно поиска isOpenSearchPanel START */}


                    {this.state.isOpenSearchPanel &&


                        <View style={styles.searchPanelWrapper}>

                            {/*close search panel*/}
                            <TouchableOpacity
                                style={styles.searchPanelTop}
                                onPress={()=>{this.setState({isOpenSearchPanel:false})}}
                            >

                            </TouchableOpacity>


                            <View style={[styles.searchPanelContent,]}>

                                <View style={{alignSelf:'center', width: 16, height: 2, backgroundColor:'#E1C1B7', position:'absolute', top: 8, borderRadius: 2}}>

                                </View>

                                <Text style={{fontSize:12,color:'#54535F', marginBottom:11, fontFamily:'FiraSans_400Regular'}}>
                                    {/*Поиск мест*/}
                                    {this.state.language.search_places}
                                </Text>

                                {/* Search input START*/}
                                    <View syule={[{width: '100%'},]}>

                                        <TextInput
                                            value={this.state.search_value}
                                            onChangeText={(search_value) => this.changeSearchValue(search_value)}
                                            style={[

                                                styles.searchInput,
                                                this.state.search_value_error && {
                                                    borderBottomWidth:1, borderBottomColor:'#A4223C'
                                                },
                                                this.state.search_value_valid && {
                                                    borderBottomWidth:1, borderBottomColor:'#337363'
                                                }
                                            ]}
                                            underlineColorAndroid ='transparent'
                                            label={
                                                <Text
                                                    style={[
                                                        {color: !this.state.search_value_error ? '#55545F' : '#A4223C'},
                                                        {color: this.state.search_value_valid ? '#337363' : '#55545F'},
                                                        {fontFamily:'FiraSans_400Regular'}
                                                    ]}
                                                >
                                                    {/*Введите запрос*/}
                                                    {this.state.language.enter_request}

                                                </Text>
                                            }
                                            error={false}
                                            onBlur={() => this.onBlurSearchInput()}
                                            theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                            underlineColor='transparent'
                                            selectionColor='#E1C1B7'
                                            activeOutlineColor='transparent'

                                        />



                                        <TouchableOpacity
                                            onPress={() => this.showSearchObjectOnMap()}
                                            style={{position:'absolute', bottom:13, right:12}}
                                        >
                                            <Svg  width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path  d="M9.406 1c-2.154 0-4.308.82-5.947 2.46-3.279 3.278-3.279 8.617 0 11.896a8.38 8.38 0 005.958 2.46c2.17 0 4.32-.82 5.958-2.46 3.256-3.279 3.256-8.618-.022-11.897A8.383 8.383 0 009.406 1zm-.011 1.307c1.816 0 3.632.687 5.006 2.083 2.768 2.769 2.768 7.267.022 10.036a7.098 7.098 0 01-10.034 0A7.102 7.102 0 019.395 2.307zm0 1.33A5.628 5.628 0 005.34 5.342a5.755 5.755 0 00-1.683 3.855c-.022.377.266.665.642.687h.023a.677.677 0 00.664-.642 4.495 4.495 0 011.284-2.97 4.392 4.392 0 013.124-1.306.653.653 0 00.664-.665.653.653 0 00-.664-.664zm-3.832 8.352a.665.665 0 100 1.33.665.665 0 000-1.33zm10.712 3.656a.615.615 0 00-.457.2.642.642 0 000 .93l.554.553c-.133.266-.2.554-.2.864 0 .532.2 1.042.576 1.418l2.836 2.792c.398.399.907.598 1.417.598s1.019-.2 1.418-.576a1.993 1.993 0 000-2.814l-2.835-2.836a1.993 1.993 0 00-1.418-.576c-.31 0-.598.067-.864.2l-.554-.554a.67.67 0 00-.473-.2zm1.891 1.86c.177 0 .354.067.465.2l2.813 2.814a.642.642 0 010 .93.642.642 0 01-.93 0L17.7 18.658a.687.687 0 01-.2-.488c0-.177.067-.354.2-.465a.637.637 0 01.465-.2z"  fill="#44434C"/>
                                            </Svg>
                                        </TouchableOpacity>

                                    </View>
                                {/* Search input END*/}


                                <ScrollView >

                                    {/*Center content CATEGORIES START */}

                                        <ScrollView style={{width:'100%'}} horizontal={true}>


                                            <View>

                                                <View style={{flex:1, width: '100%', backgroundColor:'white', paddingTop: 14, flexDirection:'row',  }}>

                                                    {this.state.search_categories_data.length > 0 && this.state.search_categories_data.map((item, index) => {

                                                        return (

                                                            <View key={index} style={{ width: 124, flexDirection:'row', justifyContent:'space-between', marginBottom: 16, paddingRight: 16}}>

                                                                <TouchableOpacity
                                                                    style={styles.category_item_wrapper}
                                                                    onPress={() => this.showSearchObjectOnMap(item.id)}
                                                                >

                                                                   <View style={{width: 56, height: 56, backgroundColor:'white', borderRadius: 100, justifyContent:'center', alignItems:'center'}}>
                                                                       {this.printCategoryIcon(item)}
                                                                   </View>

                                                                    <Text style={[styles.category_item_wrapper_text, {fontFamily:'FiraSans_400Regular'}]}>
                                                                        {/*АРХЕОЛОГИЯ*/}
                                                                        {item.name}
                                                                    </Text>

                                                                </TouchableOpacity>


                                                            </View>
                                                        )

                                                    })}
                                                </View>

                                                <View style={{flex:1, width: '100%', backgroundColor:'white', paddingTop: 14, flexDirection:'row',  }}>

                                                    {this.state.search_categories_data2.length > 0 && this.state.search_categories_data2.map((item, index) => {

                                                        return (

                                                            <View key={index} style={{width: 124, flexDirection:'row', justifyContent:'space-between', marginBottom: 16}}>

                                                                <TouchableOpacity
                                                                    style={styles.category_item_wrapper}
                                                                    onPress={ () => this.showSearchObjectOnMap(item.id) }
                                                                >

                                                                    <View style={{width: 56, height: 56, backgroundColor:'white', borderRadius: 100, justifyContent:'center', alignItems:'center'}}>
                                                                        {this.printCategoryIcon(item)}
                                                                    </View>

                                                                    <Text style={[styles.category_item_wrapper_text, {fontFamily:'FiraSans_400Regular'}]}>
                                                                        {/*АРХЕОЛОГИЯ*/}
                                                                        {item.name}
                                                                    </Text>

                                                                </TouchableOpacity>


                                                            </View>
                                                        )

                                                    })}
                                                </View>

                                            </View>


                                        </ScrollView>

                                    {/*Center content CATEGORIES END */}


                                    {/* History block */}

                                    {this.state.isLogin &&

                                        <View style={{ width: '100%', backgroundColor:'white',  borderTopColor: '#F9F3F1', borderTopWidth: 1    }}>

                                            <Text style={{color: '#54535F', fontSize: 12, paddingVertical: 8, fontFamily:'FiraSans_400Regular'}}>
                                                {/*История*/}
                                                {this.state.language.history}
                                            </Text>

                                            {this.state.search_history_data.length > 0 ?

                                                <View style={{flex: 1, width: '100%', }}>

                                                    { this.state.search_history_data.map((item, index)=> {

                                                        return (
                                                            <TouchableOpacity
                                                                onPress={() => {this.openSingleObject(item.id_obj)}}
                                                                key={index} style={{paddingVertical: 9, }}
                                                            >
                                                                <Text style={{fontFamily:'FiraSans_400Regular', fontSize: 14}}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    })}
                                                </View>

                                                :

                                                <View style={{flex: 1, width: '100%', justifyContent:'center', alignItems:'center'}} >
                                                    <Text style={{fontFamily:'FiraSans_400Regular'}}>История пуста!</Text>
                                                </View>
                                            }


                                        </View>

                                    }

                                </ScrollView>



                            </View>
                        </View>


                    }

                {/* Окно поиска isOpenSearchPanel END */}




                {/* Окно Мои места isOpenMyPlacesModal START */}


                    {this.state.isOpenMyPlacesModal &&


                        <View style={styles.searchPanelWrapper}>
                            {/*close search panel*/}
                            <TouchableOpacity
                                style={styles.searchPanelTop}
                                onPress={()=>{this.setState({isOpenMyPlacesModal:false})}}
                            >

                            </TouchableOpacity>

                            <View style={styles.searchPanelContent}>

                                <View style={{alignSelf:'center', width: 16, height: 2, backgroundColor:'#E1C1B7', position:'absolute', top: 8, borderRadius: 2}}>

                                </View>


                                <Text style={{fontSize:12,color:'#54535F', marginBottom:11, fontFamily:'FiraSans_400Regular'}}>
                                    {/*Мои места*/}
                                    {this.state.language.my_places}

                                </Text>


                                {this.state.my_places.length > 0 ?


                                    <ScrollView style={styles.contentScrollView}>


                                        {this.state.my_places.map((item, index) => {

                                            return (

                                                <View key={index} style={styles.myPlacesItemWrapper}>

                                                    <View style={styles.myPlacesItemTopWrapper}>

                                                        <View style={styles.myPlacesItemLeft}>

                                                            <Text style={{fontFamily: 'Ubuntu_400Regular', fontSize: 16}}>{item.name}</Text>
                                                            <Text style={{fontFamily: 'Ubuntu_400Regular', fontSize: 12, color :'#54535F'}}>
                                                                {  Object.values(item.type_obj)[0]}
                                                            </Text>

                                                        </View>



                                                        <View style={styles.myPlacesItemRight}>

                                                            <TouchableOpacity
                                                                style={styles.myPlacesItemRightWishButton}
                                                                onPress={() => {this.removeObjectFromFavouritesInMyPlacesModal(item)}}
                                                            >
                                                                <Svg  width={25}  height={24}  viewBox="0 0 25 24"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                                                    <Path d="M3.038 23.732c.399.179.818.268 1.231.268.71 0 1.407-.259 1.969-.758l4.976-4.422a1.603 1.603 0 012.132 0l4.976 4.422c.89.79 2.116.978 3.2.49a2.946 2.946 0 001.758-2.717V2.978A2.982 2.982 0 0020.3 0H4.26a2.982 2.982 0 00-2.98 2.978v18.037c0 1.189.674 2.231 1.758 2.717z" fill="#F3C316"/>
                                                                    <Path d="M3.038 23.732c.399.179.818.268 1.231.268.71 0 1.407-.259 1.969-.758l4.976-4.422a1.603 1.603 0 012.132 0l4.976 4.422c.89.79 2.116.978 3.2.49a2.946 2.946 0 001.758-2.717V2.978A2.982 2.982 0 0020.3 0H4.26a2.982 2.982 0 00-2.98 2.978v18.037c0 1.189.674 2.231 1.758 2.717zM2.655 2.978c0-.884.72-1.603 1.605-1.603h16.045c.885 0 1.604.719 1.604 1.603v18.037c0 .65-.353 1.196-.946 1.464a1.57 1.57 0 01-1.724-.264l-4.976-4.421a2.971 2.971 0 00-1.98-.752c-.709 0-1.415.25-1.981.752l-4.976 4.421c-.486.431-1.13.532-1.724.264a1.564 1.564 0 01-.947-1.464V2.978z"  fill="#C29A0A"/>
                                                                </Svg>
                                                            </TouchableOpacity>


                                                            {/*<Image style={styles.myPlacesItemRightImage} source={{uri: item.picture}} />*/}
                                                        </View>

                                                    </View>

                                                    <View style={styles.myPlacesItemBottomWrapper}>
                                                        <TouchableOpacity
                                                            style={styles.openObject}
                                                            // onPress={() => this.goToQrScaner()}
                                                            onPress={() => {this.openSingleObject(item.id_obj)}}

                                                        >
                                                            <Text style={{color:'#8F7000', fontFamily: 'FiraSans_400Regular'}}>
                                                                {/*ОПИСАНИЕ*/}
                                                                {this.state.language.about_the_application_desc_title}

                                                            </Text>
                                                        </TouchableOpacity>


                                                    </View>

                                                </View>

                                            )
                                        })}


                                    </ScrollView>

                                    :

                                    <View style={{width:'100%', flex:1, justifyContent:'center', alignItems:'center' }}>


                                        <View style={{width:'100%', marginBottom:16,  justifyContent:'center', alignItems:'center'}}>
                                            <Svg  width={80}  height={80}  viewBox="0 0 80 80"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                                <Path fillRule="evenodd" clipRule="evenodd" d="M77 45L63.282 20.135A8 8 0 0056.277 16H22.869a8 8 0 00-7.106 4.325L3 45v20a8 8 0 008 8h58a8 8 0 008-8V45zm-55.433 3H6v17a5 5 0 005 5h58a5 5 0 005-5V48H56.433c-1.998 5.176-9.046 9-17.433 9s-15.435-3.824-17.433-9z" fill="#F3C316"/>
                                            </Svg>

                                            <Text style={{color: '#54535F', fontSize:16}}>
                                                {/*У вас пока нет любимых мест*/}
                                                {this.state.language.dont_have_places}

                                            </Text>
                                        </View>


                                    </View>
                                }





                            </View>
                        </View>


                    }

                {/* Окно Мои места isOpenMyPlacesModal END */}




                {/* Окно краткой информации о нажатом обьекте на карте START */}


                    {this.state.isOpenPressedObjectOnMap &&


                        <View style={styles.pressedObjectWrapper}>

                            {/*close search panel*/}

                            <TouchableOpacity
                                style={styles.pressedObjectTop}
                                onPress={()=>{this.setState({isOpenPressedObjectOnMap:false})}}
                            >

                            </TouchableOpacity>

                            <View style={styles.pressedObjectContent}>


                                <View style={{alignSelf:'center', width: 16, height: 2, backgroundColor:'#E1C1B7', position:'absolute', top: 8, borderRadius: 2}}>

                                </View>

                                <View style={styles.pressedObjectContentTop}>

                                    <View style={styles.pressedObjectContentTopLEft}>
                                        <Text style={{fontSize: 14, color: '#1D1D20', fontFamily: 'Ubuntu_400Regular'}}>
                                            {this.state.pressedObjectData.NAME}
                                        </Text>

                                        <Text style={{fontSize: 12, color: '#54535F', fontFamily: 'FiraSans_400Regular'}}>
                                            {this.state.pressedObjectData.TYPE_OBJ_NAME}
                                        </Text>
                                    </View>


                                    <View style={styles.pressedObjectContentTopRight}>
                                        { this.state.pressedObjectData.PICTURE != '' &&
                                            <Image style={{width: '100%', height: '100%', borderRadius: 8,}} source={{uri: this.state.pressedObjectData.PICTURE}}/>
                                        }
                                    </View>

                                </View>


                                <View style={styles.pressedObjectContentBottom}>



                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <TouchableOpacity
                                            style={{ height: 36, alignItems:'center',marginRight: 24}}
                                            onPress={() => {this.openSingleObject(this.state.pressedObjectData.ID)}}
                                        >
                                            <Text style={{color: '#8F7000', fontSize: 14, width: '100%', fontFamily: 'FiraSans_400Regular'}}>
                                                {/*ОПИСАНИЕ*/}
                                                {this.state.language.about_the_application_desc_title}
                                            </Text>

                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ height: 36, alignItems:'center',}}
                                            onPress={() => {
                                                // this.openSingleObject(this.state.pressedObjectData.ID)
                                                    this.openGps(this.state.pressedObjectData);
                                            }}
                                        >
                                            <Text style={{color: '#076388', fontSize: 14, width: '100%', fontFamily: 'FiraSans_400Regular'}}>
                                                {/*Проложить маршрут*/}
                                                {this.state.language.get_directions}

                                            </Text>

                                        </TouchableOpacity>
                                    </View>



                                    {this.state.pressedObjectData.isFavourites === false && this.state.isLogin &&

                                        <TouchableOpacity
                                            onPress={() => {this.addObjectToFavourites()}}
                                        >
                                            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M2.758 23.732c.399.179.818.268 1.231.268.71 0 1.407-.259 1.969-.758l4.976-4.422a1.603 1.603 0 012.132 0l4.976 4.422c.89.79 2.116.978 3.2.49A2.946 2.946 0 0023 21.015V2.978A2.982 2.982 0 0020.02 0H3.98A2.982 2.982 0 001 2.978v18.037c0 1.189.674 2.231 1.758 2.717zM2.375 2.978c0-.884.72-1.603 1.605-1.603h16.045c.885 0 1.604.719 1.604 1.603v18.037c0 .65-.353 1.196-.946 1.464a1.57 1.57 0 01-1.724-.264l-4.976-4.421a2.971 2.971 0 00-1.98-.752c-.709 0-1.415.25-1.981.752l-4.976 4.421c-.486.431-1.13.532-1.724.264a1.564 1.564 0 01-.947-1.464V2.978z" fill="#9F9EAE"/>
                                            </Svg>
                                        </TouchableOpacity>

                                    }



                                    {this.state.pressedObjectData.isFavourites === true &&

                                        <TouchableOpacity
                                            onPress={() => {this.removeObjectFromFavourites()}}
                                        >
                                            <Svg   width={24}   height={24}   viewBox="0 0 24 24"   fill="none"   xmlns="http://www.w3.org/2000/svg">
                                                <Path
                                                    d="M2.758 23.732c.399.179.818.268 1.231.268.71 0 1.407-.259 1.969-.758l4.976-4.422a1.603 1.603 0 012.132 0l4.976 4.422c.89.79 2.116.978 3.2.49A2.946 2.946 0 0023 21.015V2.978A2.982 2.982 0 0020.02 0H3.98A2.982 2.982 0 001 2.978v18.037c0 1.189.674 2.231 1.758 2.717z"
                                                    fill="#F3C316"
                                                />
                                                <Path
                                                    d="M2.758 23.732c.399.179.818.268 1.231.268.71 0 1.407-.259 1.969-.758l4.976-4.422a1.603 1.603 0 012.132 0l4.976 4.422c.89.79 2.116.978 3.2.49A2.946 2.946 0 0023 21.015V2.978A2.982 2.982 0 0020.02 0H3.98A2.982 2.982 0 001 2.978v18.037c0 1.189.674 2.231 1.758 2.717zM2.375 2.978c0-.884.72-1.603 1.605-1.603h16.045c.885 0 1.604.719 1.604 1.603v18.037c0 .65-.353 1.196-.946 1.464a1.57 1.57 0 01-1.724-.264l-4.976-4.421a2.971 2.971 0 00-1.98-.752c-.709 0-1.415.25-1.981.752l-4.976 4.421c-.486.431-1.13.532-1.724.264a1.564 1.564 0 01-.947-1.464V2.978z"
                                                    fill="#C29A0A"
                                                />
                                            </Svg>
                                        </TouchableOpacity>

                                    }





                                </View>


                            </View>
                        </View>


                    }

                {/* Окно краткой информации о нажатом обьекте на карте END */}





                {/*TOP*/}

                <View style={ styles.topPanel}>

                    <TouchableOpacity style={{marginRight:16,padding:10}} onPress={() => this.setState({menuIsOpen:true})}>
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 5.5L21.5 5.5" />
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 12L21.5 12" />
                            <Path stroke="#393840" strokeLinecap="round" d="M2.5 18.5L21.5 18.5" />
                        </Svg>
                    </TouchableOpacity>


                    {/*search_active*/}

                    {this.state.search_active === false ?

                        <View
                            style={{flex:1, alignItems: 'center', justifyContent: 'flex-start', flexDirection:'row',}}
                        >

                            <Text style={[styles.toptext, {fontFamily: 'Ubuntu_500Medium'}]}>
                                {/*Места*/}
                                {this.state.language.places}

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

                        :

                        <View style={{flex:1, alignItems: 'center', justifyContent: 'space-between', flexDirection:'row',}}>

                            <Text style={{fontFamily: 'Ubuntu_500Medium', fontSize: 20}}>
                                {this.state.language.search_result}
                            </Text>

                            <TouchableOpacity
                                onPress={async ()  => {
                                    await this.setState({
                                        search_active: false,
                                        isMapReady:false
                                    })

                                    await this.checkChangeTerrain()
                                }}
                            >
                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <G clipPath="url(#clip0_2690_3796)"><Path d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z" fill="#54535F"/></G>
                                    <Defs><ClipPath id="clip0_2690_3796"><Path fill="#fff" d="M0 0H24V24H0z" /></ClipPath></Defs>
                                </Svg>
                            </TouchableOpacity>
                        </View>

                    }

                </View>



                <View style={styles.centerMapWrapper}>

                    {this.state.map_loader_after_used_user_location &&

                        <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center', backgroundColor: 'white', position:'absolute', bottom:0, left:0, zIndex: 65}}>
                            <ActivityIndicator size="large" color="#E1C1B7"/>
                        </View>

                    }

                    {this.state.isMapReady &&

                        <MapView
                            onPress={e => console.log(e.nativeEvent)}
                            style={{ flex: 1,width:'100%', height:'100%'}}
                            // provider='google'
                            mapType='standard'
                            showsScale
                            loadingIndicatorColor="#E1C1B7"
                            clusterColor="#FFFFFF"
                            clusterTextColor="black"

                            showsCompass
                            showsPointsOfInterest
                            showsBuildings
                            zoomControlEnabled={true}
                            initialRegion={{
                                latitude: this.state.region_gps && this.state.region_gps.length > 0 ? parseFloat(this.state.region_gps[0]) : 53.906187,
                                longitude: this.state.region_gps && this.state.region_gps.length > 0 ? parseFloat(this.state.region_gps[1]) : 27.416621,

                                // latitude: 53.901459,
                                // longitude: 27.562087,
                                latitudeDelta: 0.80,
                                longitudeDelta: 0.15
                            }}
                            // onMapReady={this.onMapLayout}



                            onMapLoaded={this.onMapLayout}
                            // provider={PROVIDER_GOOGLE}
                            loadingEnabled={true}
                            // scrollEnabled={false}
                            >


                        { this.state.isMapReady && this.state.object_items.map((marker, index) => (

                            <Marker
                                pinColor={ 'red' }
                                onPress={() => {
                                    this.checkObjectInFavourites(marker)
                                }}
                                key={index}
                                // title={marker.NAME}
                                coordinate={{
                                    latitude: parseFloat(marker.latitude) ,
                                    longitude: parseFloat(marker.longitude),

                                    // latitude: 53.901459,
                                    // longitude: 27.562087,
                                }}
                                // style={{
                                //     backgroundColor:'white'
                                // }}
                            >

                                {this.getMarkerIcon(marker)}
                            </Marker>

                        ))}


                        </MapView>
                    }

                </View>


                <View style={styles.bottomMenuWrapper}>

                    <TouchableOpacity
                        style={{width: 80, height: 56, justifyContent:'center', alignItems: 'center', position:'relative', zIndex:5}}
                        onPress={() => {this.openSearchPanel()}}
                    >

                        <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path  d="M9.69 1c-2.154 0-4.308.82-5.947 2.46-3.278 3.278-3.278 8.617 0 11.896a8.38 8.38 0 005.958 2.46c2.17 0 4.32-.82 5.958-2.46 3.256-3.279 3.256-8.618-.022-11.897A8.383 8.383 0 009.69 1zm-.011 1.307c1.816 0 3.632.687 5.006 2.083 2.768 2.769 2.768 7.267.022 10.036a7.098 7.098 0 01-10.034 0A7.102 7.102 0 019.679 2.307zm0 1.33a5.628 5.628 0 00-4.054 1.705 5.755 5.755 0 00-1.683 3.855c-.022.377.266.665.643.687h.022a.677.677 0 00.664-.642 4.495 4.495 0 011.284-2.97A4.392 4.392 0 019.68 4.967a.653.653 0 00.664-.665.653.653 0 00-.664-.664zm-3.832 8.352a.665.665 0 100 1.33.665.665 0 000-1.33zm10.712 3.656a.615.615 0 00-.457.2.642.642 0 000 .93l.554.553c-.133.266-.2.554-.2.864 0 .532.2 1.042.576 1.418l2.836 2.792c.398.399.908.598 1.417.598.51 0 1.019-.2 1.418-.576a1.992 1.992 0 000-2.814l-2.835-2.836a1.993 1.993 0 00-1.418-.576c-.31 0-.598.067-.864.2l-.554-.554a.67.67 0 00-.473-.2zm1.891 1.86c.177 0 .354.067.465.2l2.813 2.814a.642.642 0 010 .93.642.642 0 01-.93 0l-2.813-2.791a.687.687 0 01-.2-.488c0-.177.067-.354.2-.465a.638.638 0 01.465-.2z"  fill="#9F9EAE"/>
                        </Svg>

                        <Text style={{color:'#393840', fontSize: 10, fontFamily: 'FiraSans_400Regular'}}>
                            {/*ПОИСК*/}
                            {this.state.language.search}
                        </Text>

                    </TouchableOpacity>


                    {this.state.isLogin &&

                        <TouchableOpacity
                            style={{width: 80, height: 56, justifyContent:'center', alignItems: 'center', position:'relative', zIndex:5}}
                            onPress={() => {this.openMyPlacesModal()}}
                        >

                            <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path  d="M3.042 23.732c.399.179.818.268 1.23.268.711 0 1.408-.259 1.97-.758l4.976-4.422a1.603 1.603 0 012.132 0l4.976 4.422c.89.79 2.116.978 3.2.49a2.946 2.946 0 001.758-2.717V2.978A2.982 2.982 0 0020.304 0H4.264a2.982 2.982 0 00-2.98 2.978v18.037c0 1.189.674 2.231 1.758 2.717zM2.659 2.978c0-.884.72-1.603 1.605-1.603h16.045c.884 0 1.604.719 1.604 1.603v18.037c0 .65-.353 1.196-.946 1.464a1.57 1.57 0 01-1.724-.264l-4.976-4.421a2.971 2.971 0 00-1.98-.752c-.709 0-1.415.25-1.981.752L5.33 22.215c-.486.431-1.13.532-1.724.264a1.564 1.564 0 01-.947-1.464V2.978z"  fill="#9F9EAE" />
                            </Svg>

                            <Text style={{color:'#393840', fontSize: 10, fontFamily: 'FiraSans_400Regular'}}>
                                {/*МОИ МЕСТА*/}
                                {this.state.language.my_places2}
                            </Text>

                        </TouchableOpacity>

                    }


                    {/*<TouchableOpacity>*/}
                    {/*    <Svg width={81} height={56} viewBox="0 0 81 56" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M31.884 10.045a1.045 1.045 0 11-2.089 0 1.045 1.045 0 012.09 0zm1 0c0 .958-.659 1.762-1.548 1.984.002.02.004.04.004.06v5.112l-.003.048a2.557 2.557 0 11-.995 0 .516.516 0 01-.002-.048v-5.112c0-.02 0-.04.003-.06a2.045 2.045 0 112.541-1.984zm-.489 9.711a1.556 1.556 0 11-3.111 0 1.556 1.556 0 013.111 0zm-1.055 5.112a.5.5 0 00-1 0v3.067a.5.5 0 101 0v-3.067zm0 5.623a.5.5 0 00-1 0v1.022a.5.5 0 101 0v-1.022zM43.284 11c-1.816 0-3.16.378-4.07.923-.798.479-1.316 1.127-1.413 1.787-.512.52-1.116 1.28-1.605 2.468-.53 1.29-.912 3.06-.912 5.546a.5.5 0 001 0c0-2.383.367-4.02.837-5.166a6.68 6.68 0 011.01-1.722c.038.045.076.087.117.126.259.252.628.446 1.036.446.37 0 .705-.134.995-.284.189-.097.397-.223.599-.345.096-.059.192-.116.283-.17.598-.349 1.255-.662 2.123-.662.868 0 1.525.313 2.123.662.091.054.187.111.283.17.202.122.41.248.6.345.29.15.625.284.994.284.408 0 .777-.194 1.036-.446a1.66 1.66 0 00.126-.137c.132.194.27.441.407.74.288.627.545 1.404.76 2.21.432 1.623.67 3.28.67 3.949a.5.5 0 001 0c0-.792-.26-2.543-.703-4.206-.223-.837-.497-1.673-.818-2.37-.267-.58-.595-1.13-1.001-1.479-.112-.646-.626-1.277-1.408-1.746-.909-.545-2.254-.923-4.07-.923zm-4.5 2.934c0-.239.208-.712.944-1.153.716-.43 1.871-.781 3.556-.781 1.684 0 2.84.352 3.555.78.737.442.945.915.945 1.154 0 .076-.044.198-.161.311a.522.522 0 01-.34.163c-.13 0-.294-.048-.536-.173-.16-.082-.316-.177-.497-.287a23.78 23.78 0 00-.339-.202c-.652-.381-1.495-.799-2.627-.799-1.132 0-1.975.418-2.627.799-.125.073-.236.14-.339.202-.18.11-.337.205-.497.287-.242.125-.406.173-.537.173a.522.522 0 01-.339-.163c-.117-.113-.161-.235-.161-.31zM38.284 30c-.76 0-1.456-.368-1.984-.974h-.016c-1.105 0-2-1.308-2-2.92 0-1.614.895-2.922 2-2.922h.015c.53-.606 1.224-.974 1.985-.974 1.657 0 3 1.744 3 3.895S39.94 30 38.284 30zm0-.974c-1.105 0-2-1.308-2-2.92 0-1.614.895-2.922 2-2.922s2 1.308 2 2.921c0 1.613-.895 2.921-2 2.921zm10.973-.414c-.314.255-.66.388-.973.388-.878 0-2-1.038-2-2.895s1.122-2.895 2-2.895c.314 0 .659.133.973.388-.583.51-.973 1.443-.973 2.507 0 1.065.39 1.997.973 2.507zm1.011.414c-.529.606-1.223.974-1.984.974-1.657 0-3-1.744-3-3.895 0-2.15 1.343-3.895 3-3.895.76 0 1.456.368 1.984.974h.016c1.105 0 2 1.308 2 2.921 0 1.613-.895 2.921-2 2.921h-.016z"  fill="#9F9EAE"/>*/}
                    {/*        <Path  d="M23.454 44l-.52-1.73h-2.61l-.52 1.73h-.96l2.21-6.89h1.2l2.2 6.89h-1zm-2.9-2.5h2.15l-1.07-3.6-1.08 3.6zm8.152-1.14c.474.08.857.247 1.15.5.294.253.44.647.44 1.18 0 1.307-.91 1.96-2.73 1.96h-1.9v-6.89h1.63c.874 0 1.54.143 2 .43.467.287.7.723.7 1.31 0 .4-.126.733-.38 1a1.66 1.66 0 01-.91.51zm-2.09-2.5v2.17h1.04c.4 0 .727-.097.98-.29.26-.193.39-.467.39-.82 0-.4-.136-.677-.41-.83-.266-.153-.673-.23-1.22-.23h-.78zm.95 5.38c.56 0 .987-.083 1.28-.25.3-.167.45-.483.45-.95 0-.453-.143-.78-.43-.98-.286-.2-.66-.3-1.12-.3h-1.13v2.48h.95zm8.209-6.13l-.1.81h-1.91V44h-.95v-6.08h-1.96v-.81h4.92zm3.355-.12c.58 0 1.086.14 1.52.42.44.273.78.677 1.02 1.21.246.533.37 1.18.37 1.94 0 .747-.124 1.387-.37 1.92-.24.533-.58.94-1.02 1.22-.434.28-.94.42-1.52.42-.58 0-1.09-.137-1.53-.41-.434-.273-.774-.677-1.02-1.21-.24-.533-.36-1.177-.36-1.93 0-.74.12-1.38.36-1.92.246-.54.59-.95 1.03-1.23.44-.287.946-.43 1.52-.43zm0 .78c-.6 0-1.067.227-1.4.68-.334.453-.5 1.16-.5 2.12 0 .953.166 1.653.5 2.1.34.447.806.67 1.4.67 1.266 0 1.9-.927 1.9-2.78 0-1.86-.634-2.79-1.9-2.79zm8.593-.66l-.14.82h-2.89V44h-.95v-6.89h3.98zM53.801 44h-.95v-3.36c0-.78.044-1.603.13-2.47L50.191 44h-1.22v-6.89h.95v3.36c0 .933-.043 1.767-.13 2.5l2.82-5.86h1.19V44zm6.817-.78v2.28h-.75l-.15-1.5h-3.97l-.15 1.5h-.75v-2.28h.47c.18-.173.316-.393.41-.66.1-.267.183-.62.25-1.06.073-.447.183-1.243.33-2.39l.25-2h3.5v6.11h.56zm-1.51-5.33h-1.72l-.14 1.26a49.573 49.573 0 01-.3 2.25c-.074.473-.174.85-.3 1.13-.12.28-.297.51-.53.69h2.99v-5.33z"  fill="#393840"/>*/}
                    {/*    </Svg>*/}
                    {/*</TouchableOpacity>*/}

                    {/*{Platform.OS === 'ios' &&*/}
                    {/*    <TouchableOpacity*/}
                    {/*        style={styles.fab_style_ios}*/}
                    {/*        onPress={() => {this.getObjectsByUserLocation()}}*/}
                    {/*    >*/}

                    {/*        <Svg xmlns="http://www.w3.org/2000/svg" width={88} height={88} viewBox="0 0 88 88" fill="none">*/}
                    {/*            <G filter="url(#filter0_dd_2458_3805)"><Rect x={16} y={12} width={56} height={56} rx={28} fill="#E1C1B7" /><Path fillRule="evenodd" clipRule="evenodd" d="M44 28.5a.5.5 0 000 1c.653 0 1.29.06 1.91.173a.5.5 0 10.18-.983A11.56 11.56 0 0044 28.5zm7.318 2.629a.5.5 0 00-.636.77A10.478 10.478 0 0154.5 40c0 2.86-1.144 5.454-3 7.349V45.5a.5.5 0 00-1 0v2.986a.5.5 0 00.5.5h3a.5.5 0 000-1h-1.725A11.463 11.463 0 0055.5 40c0-3.571-1.629-6.763-4.182-8.871zM34 31.014a.5.5 0 000 1h1.725A11.463 11.463 0 0032.5 40c0 6.351 5.149 11.5 11.5 11.5a.5.5 0 000-1c-5.799 0-10.5-4.701-10.5-10.5 0-2.86 1.144-5.454 3-7.349V34.5a.5.5 0 001 0v-2.986a.5.5 0 00-.5-.5h-3zM48 38.5c0 3-2.5 7-4 7s-4-4-4-7a4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z" fill="#1D1D20"/></G>*/}
                    {/*            <Defs></Defs>*/}
                    {/*        </Svg>*/}

                    {/*        /!*<Image style={{width: '100%', height: '100%'}} source={require('../../assets/fab.png')}/>*!/*/}
                    {/*    </TouchableOpacity>*/}

                    {/*}*/}


                    <View style={{
                        position:'absolute',
                        left: 0,
                        right: 0,
                        bottom: '5%',
                        justifyContent:'center',
                        alignItems:'center',
                        zIndex:1
                    }}>

                        <TouchableOpacity
                            style={styles.fab_style_ios}
                            onPress={() => {this.getObjectsByUserLocation()}}
                        >

                            <Svg xmlns="http://www.w3.org/2000/svg" width={88} height={88} viewBox="0 0 88 88" fill="none">
                                <G filter="url(#filter0_dd_2458_3805)"><Rect x={16} y={12} width={56} height={56} rx={28} fill="#E1C1B7" /><Path fillRule="evenodd" clipRule="evenodd" d="M44 28.5a.5.5 0 000 1c.653 0 1.29.06 1.91.173a.5.5 0 10.18-.983A11.56 11.56 0 0044 28.5zm7.318 2.629a.5.5 0 00-.636.77A10.478 10.478 0 0154.5 40c0 2.86-1.144 5.454-3 7.349V45.5a.5.5 0 00-1 0v2.986a.5.5 0 00.5.5h3a.5.5 0 000-1h-1.725A11.463 11.463 0 0055.5 40c0-3.571-1.629-6.763-4.182-8.871zM34 31.014a.5.5 0 000 1h1.725A11.463 11.463 0 0032.5 40c0 6.351 5.149 11.5 11.5 11.5a.5.5 0 000-1c-5.799 0-10.5-4.701-10.5-10.5 0-2.86 1.144-5.454 3-7.349V34.5a.5.5 0 001 0v-2.986a.5.5 0 00-.5-.5h-3zM48 38.5c0 3-2.5 7-4 7s-4-4-4-7a4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z" fill="#1D1D20"/></G>
                                <Defs></Defs>
                            </Svg>

                        </TouchableOpacity>

                    </View>

                </View>



                {/*fab_style_android*/}
                {/*fab_style_ios*/}

                {/*{Platform.OS !== 'ios' &&*/}

                {/*    <TouchableOpacity*/}
                {/*        style={styles.fab_style_android}*/}
                {/*        onPress={() => {this.getObjectsByUserLocation()}}*/}
                {/*    >*/}
                {/*        <Svg xmlns="http://www.w3.org/2000/svg" width={88} height={88} viewBox="0 0 88 88" fill="none">*/}
                {/*            <G filter="url(#filter0_dd_2458_3805)"><Rect x={16} y={12} width={56} height={56} rx={28} fill="#E1C1B7" /><Path fillRule="evenodd" clipRule="evenodd" d="M44 28.5a.5.5 0 000 1c.653 0 1.29.06 1.91.173a.5.5 0 10.18-.983A11.56 11.56 0 0044 28.5zm7.318 2.629a.5.5 0 00-.636.77A10.478 10.478 0 0154.5 40c0 2.86-1.144 5.454-3 7.349V45.5a.5.5 0 00-1 0v2.986a.5.5 0 00.5.5h3a.5.5 0 000-1h-1.725A11.463 11.463 0 0055.5 40c0-3.571-1.629-6.763-4.182-8.871zM34 31.014a.5.5 0 000 1h1.725A11.463 11.463 0 0032.5 40c0 6.351 5.149 11.5 11.5 11.5a.5.5 0 000-1c-5.799 0-10.5-4.701-10.5-10.5 0-2.86 1.144-5.454 3-7.349V34.5a.5.5 0 001 0v-2.986a.5.5 0 00-.5-.5h-3zM48 38.5c0 3-2.5 7-4 7s-4-4-4-7a4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z" fill="#1D1D20"/></G>*/}
                {/*            <Defs></Defs>*/}
                {/*        </Svg>*/}

                {/*        /!*<Image style={{width: '100%', height: '100%'}} source={require('../../assets/fab.png')}/>*!/*/}
                {/*    </TouchableOpacity>*/}

                {/*}*/}


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
        borderBottomColor: '#00000040',
        borderBottomWidth: 1,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.27,
        // shadowRadius: 8.65,

        // elevation: 6,

    },

    centerMapWrapper:{
        flex: 1,width:'100%'
    },
    bottomMenuWrapper:{
        backgroundColor:'#F9F3F1',
        width:'100%',
        height:56,
        borderTopColor: '#00000040',
        borderTopWidth:1,
        flexDirection:'row',
        position:'relative',

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

    searchPanelWrapper:{
        width:'100%',
        height:'100%',
        position:'absolute',
        bottom: 0,
        left:0,
        elevation:15,
        zIndex:5005,

    },

    searchPanelTop:{
        width:'100%',
        height:55,
        elevation:16,
        zIndex:5005,
    },

    searchPanelContent:{
        backgroundColor:'white',
        flex:1,
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        padding:16,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,
        elevation: 9
    },
    searchInput: {
        width:'100%',
        height: 48,
        backgroundColor: 'white',
        fontSize:14,
        color:'#55545F',
        paddingHorizontal:16,
        borderBottomWidth:1,
        borderBottomColor:'#44434C',
        paddingRight: 44

    },



    pressedObjectWrapper: {
        width:'100%',
        height: windowHeight,
        position:'absolute',
        bottom: 0,
        left:0,
        elevation:15,
        zIndex:5005,
    },
    pressedObjectTop: {
        width:'100%',
        flex:1,
        elevation:16,
        zIndex:5005,
    },
    pressedObjectContent: {
        backgroundColor:'white',
        // height: 131,
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        padding:16,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,
        elevation: 9
    },


    pressedObjectContentTop: {
        width: '100%',
        flexDirection:'row'
    },

    pressedObjectContentTopLEft: {
        flex:1
    },

    pressedObjectContentTopRight: {

        width: 40,
        height: 40,
        borderRadius: 8,
    },


    pressedObjectContentBottom: {
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop: 10,
        paddingBottom: 0,
    },


    myPlacesItemWrapper:{
        width:'100%',
        padding:16,
        paddingBottom:8,
        backgroundColor:'white',
        borderRadius:18,
        borderColor:'#FAE69E',
        borderWidth:1,
        marginBottom:11,
    },
    myPlacesItemTopWrapper:{
        width:'100%',
        flexDirection:'row'
    },

    myPlacesItemLeft:{
        flex:1,
    },

    myPlacesItemRight:{
        width:80,
        height:80,
        justifyContent:'flex-start',
        alignItems:'flex-end'
    },

    myPlacesItemRightImage:{
        width:'100%',
        height:'100%'
    },
    myPlacesItemBottomWrapper:{
        width:'100%',
        flexDirection:'row'
    },

    category_item_wrapper: {
        width: 98,
        height: 124,
        borderRadius: 98,
        backgroundColor: '#FAE69E',
        paddingTop: 16,
        justifyContent: 'flex-start',
        alignItems:'center'

    },
    category_item_svg: {
        marginBottom: 16
    },
    category_item_wrapper_text: {
        fontSize: 10,
        color: '#1D1D20',
        textAlign: 'center',
        marginTop: 10
    },

    fab_style_android:{
        width: 88,
        height: 88,
        position:'absolute',
        // right: 0,
        bottom:10,
        zIndex: 66,
        alignSelf:'center'
    },

    fab_style_ios:{
        width: 88,
        height: 88,
        // position:'absolute',
        // right: 0,
        // bottom:0,
        // zIndex: 86666,
        // alignSelf:'center',
        // flexDirection:'row'
    },
    fab_svg_style: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
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
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
})

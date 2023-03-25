import React from "react";
import {
    Dimensions,
    Image,
    // Slider,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Pressable,
    Alert,
    StatusBar, ActivityIndicator, BackHandler,
} from "react-native";
import Slider from '@react-native-community/slider';

// StatusBar.setHidden(true);

import * as Linking from 'expo-linking';
// import { SliderBox } from "react-native-image-slider-box";
// import StarRating from 'react-native-star-rating';

// import Carousel, { Pagination } from 'react-native-snap-carousel' // 3.6.0
const SCREEN_WIDTH = Dimensions.get('window').width

import RenderHtml  from 'react-native-render-html';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

let Marker = MapView.Marker
import { WebView } from 'react-native-webview';

const Screen = (props) => (
    <View style={{ flex : 1, backgroundColor:"#369" }}>
        <Text>{ props.text }</Text>
    </View>
);
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

// import Slideshow from 'react-native-image-slider-show';
import Svg, { Path, Defs, G, ClipPath, Circle, Mask,Rect } from "react-native-svg"

import { Asset } from "expo-asset";
import { Audio, Video } from "expo-av";
import ChangeTerrain from "../includes/ChangeTerrain";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import DatePicker from "react-native-datepicker";

import DateTimePicker from '@react-native-community/datetimepicker';


import {TextInput} from "react-native-paper";
import {bel, en, ru} from "../../i18n/supportedLanguages";
// import MaskInput from "react-native-mask-input";
import moment from "moment";

class Icon {
    constructor(module, width, height) {
        this.module = module;
        this.width = width;
        this.height = height;
        Asset.fromModule(this.module).downloadAsync();
    }
}

const ICON_THROUGH_EARPIECE = "speaker-phone";
const ICON_THROUGH_SPEAKER = "speaker";

const ICON_PLAY_BUTTON = new Icon(
    require("../../assets/images/play_button.png"),
    34,
    51
);
const ICON_PAUSE_BUTTON = new Icon(
    require("../../assets/images/pause_button.png"),
    34,
    51
);
const ICON_STOP_BUTTON = new Icon(
    require("../../assets/images/stop_button.png"),
    22,
    22
);
const ICON_FORWARD_BUTTON = new Icon(
    require("../../assets/images/forward_button.png"),
    33,
    25
);
const ICON_BACK_BUTTON = new Icon(
    require("../../assets/images/back_button.png"),
    33,
    25
);

const ICON_LOOP_ALL_BUTTON = new Icon(
    require("../../assets/images/loop_all_button.png"),
    77,
    35
);
const ICON_LOOP_ONE_BUTTON = new Icon(
    require("../../assets/images/loop_one_button.png"),
    77,
    35
);

const ICON_MUTED_BUTTON = new Icon(
    require("../../assets/images/muted_button.png"),
    67,
    58
);
const ICON_UNMUTED_BUTTON = new Icon(
    require("../../assets/images/unmuted_button.png"),
    67,
    58
);

const thumbImage = require('../../assets/images/unmuted_button.png');


const ICON_TRACK_1 = new Icon(require("../../assets/images/track_1.png"), 166, 5);
const ICON_THUMB_1 = new Icon(require("../../assets/images/thumb_1.png"), 18, 19);
const ICON_THUMB_2 = new Icon(require("../../assets/images/thumb_2.png"), 15, 19);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

// console.log(DEVICE_HEIGHT);

const BACKGROUND_COLOR = "#FFF8ED";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const RATE_SCALE = 2.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;



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
import * as Font from "expo-font";
import StarSvg from "../../assets/svg/StarSvg";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.index = 0;
        this.isSeeking = false;
        this.state = {
            language_name: 'ru',
            showVideo: false,
            playbackInstanceName: LOADING_STRING,
            loopingType: LOOPING_TYPE_ONE,
            muted: false,
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            fontLoaded: true,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            videoWidth: DEVICE_WIDTH,
            videoHeight: VIDEO_CONTAINER_HEIGHT,
            poster: false,
            useNativeControls: true,
            fullscreen: false,
            throughEarpiece: false,

            description_tab:true,
            audio_tab:false,
            contacts_tab:false,
            language: {},
            modal: false,
            not_auth_user_modal:false,


            fifteen:true,
            thirty:false,
            sixty:false,

            isMapReady: false,
            // region: {
            //     latitude: parseFloat(this.props.object_data.data.PROPERTIES.GPS.VALUE[0]),
            //     longitude: parseFloat(this.props.object_data.data.PROPERTIES.GPS.VALUE[1]),
            //     latitudeDelta: 0.02,
            //     longitudeDelta: 0.02
            // },
            bigMap:false,

            object_data: this.props.object_data,

            MONDAY: true,
            TUESDAY: true,
            WEDNESDAY: true,
            THURSDAY: true,
            FRIDAY: true,
            SATURDAY: true,
            SUNDAY: true,

            not_autorise_gps_modal: false,

            openThreeDotModal: false,
            more_description_button: true,
            galleryModal: false,

            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree", // Network image
            ],
            activeTab : 0,
            current_image: this.props.object_data.data.PROPERTIES.hasOwnProperty('MORE_PHOTO') && this.props.object_data.data.PROPERTIES.MORE_PHOTO.VALUE.length > 0 ? 1 : 0,
            // current_image: 1,
            current_slide_index_for_slider: 0,
            singer_name: '',
            isOpenChangeTerrain: false,




            guest_count_room: null,
            guest_count_room_error: false,
            guest_count_room_valid: false,


            guest_count_table: '0',
            guest_count_table_error: false,
            guest_count_table_valid: false,


            edit_fio: '',
            edit_fio_error: false,
            edit_fio_valid: false,
            edit_fio_error_text: '',

            edit_fio_room: '',
            edit_fio_room_error: false,
            edit_fio_room_valid: false,
            edit_fio_room_error_text: '',


            edit_phone: '',
            edit_phone_error: false,
            edit_phone_valid: false,
            edit_phone_error_text: '',

            edit_phone_room: '',
            edit_phone_room_error: false,
            edit_phone_room_valid: false,
            edit_phone_room_error_text: '',

            edit_email_room: '',
            edit_email_room_error: false,
            edit_email_room_valid: false,
            edit_email_room_error_text: '',

            edit_email_table: '',
            edit_email_table_error: false,
            edit_email_table_valid: false,
            edit_email_table_error_text: '',


            isLogin:false,

            book_a_room_modal: false,
            reserve_a_table_modal: false,

            visit_details: '',
            visit_details_error: false,
            visit_details_valid: false,
            visit_details_error_text: '',

            visit_details_wishes: '',
            visit_details_wishes_error: false,
            visit_details_wishes_valid: false,

            menu_data: [],

            reviews_tab: false,
            reviews_data: [],
            review_value: '',

            starCount: 0,
            Max_Rating: 5,//To set the max number of Stars
            send_review_modal:false,
            isFavourites: false,

            // reserve table date
            openVisitDates: false,
            visit_dates_for_picker: new Date(),
            visit_dates: '',
            visit_dates_error:false,
            visit_dates_valid:false,


            openVisitDatesTo: false,
            visit_dates_to_for_picker: new Date(),
            visit_dates_to: '',
            visit_dates_to_error: '',
            visit_dates_to_valid: '',


            openVisitDatesFrom: false,
            visit_dates_from: '',
            visit_dates_from_for_picker: new Date(),
            visit_dates_from_error:false,
            visit_dates_from_valid:false,



            showSuccessAddReviewModal: false,
            sendReviewErrorModal: false,

            bookRoomSuccessModal: false,
            bookTableSuccessModal: false,


            isLoaded: false,


            review_count_page: 4,

            tabs_count_array: [],


            show_unautorize_modal: false,
            show_unautorize_reserv_table_or_room: false,
            show_unautorize_menu_modal: false,
            show_unautorize_dont_open_map_modal: false,

            address: '',
            fontsLoaded: false,
            //Default_Rating: 0,//To set the default Star Selected
            prev15_active: true,
            next15_active: true,
            obj_vote: 0,
            user_vote: 0

        };
        this.shouldPlayAtEndOfSeek = false;
        this.playbackInstance = null;

        //Filled Star. You can also give the path from local
        this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
        //Empty Star. You can also give the path from local
        this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

        this.closeChangeTerrain = this.closeChangeTerrain.bind(this)

    }

    UpdateRating(rating) {
        // console.log(rating, 'rating')
        this.setState({
            starCount: rating
        });

        this.sendStarHandler(rating)

        //Keeping the Rating Selected in state
    }

    closeChangeTerrain() {
        this.setState({
            isOpenChangeTerrain: false
        })
        this.props.navigation.navigate('ObjectMap')
    }

    onStarRatingPress(rating) {
        // console.log(rating, 'rating')
        this.setState({
            starCount: rating
        });
    }


    _onBackPress = async  () => {

        if (this.state.isPlaying) {
            this.playbackInstance.pauseAsync();
        }

        await this.setState({
            description_tab:true,
            audio_tab:false,
            contacts_tab:false,
            reserve_a_table:false,
            book_a_room: false,
            restorane_menu: false,
            reviews_tab: false,
            openThreeDotModal: false,


            guest_count_room: null,
            guest_count_room_error: false,
            guest_count_room_valid: false,


            guest_count_table: '0',
            guest_count_table_error: false,
            guest_count_table_valid: false,


            edit_fio: '',
            edit_fio_error: false,
            edit_fio_valid: false,
            edit_fio_error_text: '',

            edit_fio_room: '',
            edit_fio_room_error: false,
            edit_fio_room_valid: false,
            edit_fio_room_error_text: '',


            edit_phone: '',
            edit_phone_error: false,
            edit_phone_valid: false,
            edit_phone_error_text: '',

            edit_phone_room: '',
            edit_phone_room_error: false,
            edit_phone_room_valid: false,
            edit_phone_room_error_text: '',

            edit_email_room: '',
            edit_email_room_error: false,
            edit_email_room_valid: false,
            edit_email_room_error_text: '',


            visit_details: '',
            visit_details_error: false,
            visit_details_valid: false,
            visit_details_error_text: '',

            visit_details_wishes: '',
            visit_details_wishes_error: false,
            visit_details_wishes_valid: false,


            openVisitDates: false,
            visit_dates_for_picker: new Date(1598051730000),
            visit_dates: '',
            visit_dates_error:false,
            visit_dates_valid:false,


            openVisitDatesTo: false,
            visit_dates_to_for_picker: new Date(1598051730000),
            visit_dates_to: '',
            visit_dates_to_error: '',
            visit_dates_to_valid: '',


            openVisitDatesFrom: false,
            visit_dates_from: '',
            visit_dates_from_for_picker: new Date(1598051730000),
            visit_dates_from_error:false,
            visit_dates_from_valid:false,

            address: '',
            fontsLoaded: false

        })

        // this.props.navigation.navigate('Dashboard')
        // this.props.navigation.goBack()

        // return true
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

        // BackHandler.addEventListener('hardwareBackPress', this._onBackPress);

        this.allCheckAfterLoadComponent();
        this.loadFonts();

        // this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE = 'https://dl6.ru-music.cc/mp3/60235.mp3';

        // this.checkObjectInFavourites();
        // console.log(this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE, 'this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE')
        // console.log(this.props.object_data.data.PROPERTIES.GPS.VALUE[0], 'this.props.object_data.data.PROPERTIES.GPS.VALUE[0]')


        // console.log(this.props.object_data.data.PROPERTIES, 'this.props.object_data.data.PROPERTIES')

        this.focusListener = navigation.addListener("focus", () => {

            // this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE = 'https://dl6.ru-music.cc/mp3/60235.mp3'

            // console.log(this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE, 'this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE')
            // console.log(this.props.object_data.data.PROPERTIES.GPS.VALUE[0], 'this.props.object_data.data.PROPERTIES.GPS.VALUE[0]')


            this.allCheckAfterLoadComponent();
            this.loadFonts();

            // this.checkObjectInFavourites();

            // console.log(Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, 'Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX')
            // console.log(Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX, 'Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX')

            Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: false,
                // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: false,
                // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid: false
            });


            this.setWorkingDays();

        });


    }

    componentWillUnmount(){
        if (this.focusListener) {
            this.focusListener();
            console.log('Bum END')
        }
        // BackHandler.removeEventListener('hardwareBackPress', this._onBackPress)
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE !== this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE) {
            // console.log(prevProps.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE)
            // console.log(this.props.object_data.data.PROPERTIES.AUDIOGUIDE.NAME)

            console.log('error tut budet')
            // this._loadNewPlaybackInstance(false);
        }
    }






    previewImage = () => {
        let images = '';

        if(this.props.object_data.data.PREVIEW_PICTURE){
            images = this.props.object_data.data.PREVIEW_PICTURE
        } else {
            images = '';
        }


        return images

    }

    openThreeDotModal = () => {
        this.setState({
            openThreeDotModal: true
        })
    }


    sliderImages = () => {
        let images = []

        if(this.props.object_data.data.PROPERTIES.hasOwnProperty('MORE_PHOTO') && this.props.object_data.data.PROPERTIES.MORE_PHOTO.VALUE){

            if (this.props.object_data.data.PROPERTIES.MORE_PHOTO.VALUE.length > 0)

                var more_photo = this.props.object_data.data.PROPERTIES.MORE_PHOTO.VALUE;

                for (let i = 0; i < more_photo.length; i++) {

                    // images.push({
                    //     url: more_photo[i]
                    // })

                    images.push(more_photo[i])

                }

        }

        // console.log(images, 'images')


        return images

    }

    setAddress = async () =>{

        let address = '';

        // if (this.props.object_data.data.PROPERTIES.POSTCODE.VALUE) {
        //     if (this.props.object_data.data.PROPERTIES.POSTCODE.VALUE != '') {
        //         address += this.state.object_data.data.PROPERTIES.POSTCODE.VALUE+ ', ';
        //     }
        // }
        // if (this.props.object_data.data.PROPERTIES.CITY.VALUE) {
        //     if (this.props.object_data.data.PROPERTIES.CITY.VALUE != '') {
        //         address += this.state.object_data.data.PROPERTIES.CITY.VALUE;
        //     }
        // }
        //
        // if (this.props.object_data.data.PROPERTIES.ADDRESS.VALUE) {
        //     if (this.props.object_data.data.PROPERTIES.ADDRESS.VALUE != '') {
        //         address += ' ,'+this.state.object_data.data.PROPERTIES.ADDRESS.VALUE;
        //     }
        // }


        if (this.props.object_data.data.PROPERTIES.ADDRESS.VALUE) {
            if (this.props.object_data.data.PROPERTIES.ADDRESS.VALUE != '') {
                address = this.props.object_data.data.PROPERTIES.ADDRESS.VALUE;
            }
        }

        await this.setState({
            address: address
        })
        // return address;

    }

    goToDashboard = () => {
        this.props.navigation.navigate('Dashboard')
    }

    async _loadNewPlaybackInstance(playing) {

        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            // this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }

        const source = { uri: this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE };

        const initialStatus = {
            shouldPlay: playing,
            rate: this.state.rate,
            shouldCorrectPitch: this.state.shouldCorrectPitch,
            volume: this.state.volume,
            isMuted: this.state.muted,
            isLooping: this.state.loopingType === LOOPING_TYPE_ONE
            // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
            // androidImplementation: 'MediaPlayer',
        };


        const { sound, status } = await Audio.Sound.createAsync(
            source,
            initialStatus,
            this._onPlaybackStatusUpdate
        );
        this.playbackInstance = sound;

        this._updateScreenForLoading(false);
    }

    _mountVideo = component => {

        if (this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE) {

            this._video = component;
            this._loadNewPlaybackInstance(false);
        }


    };

    _updateScreenForLoading(isLoading) {

        if (isLoading) {
            this.setState({
                showVideo: false,
                isPlaying: false,
                playbackInstanceName: LOADING_STRING,
                playbackInstanceDuration: null,
                playbackInstancePosition: null,
                isLoading: true
            });
        } else {
            this.setState({
                playbackInstanceName: this.props.object_data.data.PROPERTIES.AUDIOGUIDE.NAME,
                showVideo: false,
                isLoading: false
            });
        }
    }

    _onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            this.setState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                rate: status.rate,
                muted: status.isMuted,
                volume: status.volume,
                loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
                shouldCorrectPitch: status.shouldCorrectPitch
            });
            if (status.didJustFinish && !status.isLooping) {
                this._advanceIndex(true);
                this._updatePlaybackInstanceForIndex(true);
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    _onLoadStart = () => {
        console.log(`ON LOAD START`);
    };

    _onLoad = status => {
        console.log(`ON LOAD : ${JSON.stringify(status)}`);
    };

    _onError = error => {
        console.log(`ON ERROR : ${error}`);
    };

    _onReadyForDisplay = event => {
        const widestHeight =
            (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
        if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
            this.setState({
                videoWidth:
                    (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
                    event.naturalSize.height,
                videoHeight: VIDEO_CONTAINER_HEIGHT
            });
        } else {
            this.setState({
                videoWidth: DEVICE_WIDTH,
                videoHeight:
                    (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width
            });
        }
    };

    _onFullscreenUpdate = event => {
        console.log(
            `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
        );
    };

    _advanceIndex(forward) {

        this.index =
            (this.index + (forward ? 1 : 0)) % 1;
    }

    async _updatePlaybackInstanceForIndex(playing) {
        this._updateScreenForLoading(true);

        this.setState({
            videoWidth: DEVICE_WIDTH,
            videoHeight: VIDEO_CONTAINER_HEIGHT
        });

        this._loadNewPlaybackInstance(playing);
    }

    _onPlayPausePressed = () => {

        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync();
            } else {
                this.playbackInstance.playAsync();
            }
        }
    };



    _onPauseAfterTimer = () => {

        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync();
            }
        }
    };

    startPlayerTurnOffTimer = async () => {

        let {fifteen, thirty, sixty} = this.state;

        if (fifteen === true || thirty === true || sixty === true) {

            let time = 5000;

            if (fifteen === true) {
                time = (15 * 60) * 1000
            } else if(thirty === true) {
                time = (30 * 60) * 1000
            } else if(sixty === true) {
                time = (60 * 60) * 1000
            }

            console.log(time, 'startPlayerTurnOffTimer');

            clearTimeout(this.playerTurnOffTimer);

            this.setState({
                modal:false
            })

            this.playerTurnOffTimer = setTimeout(() => {

                this._onPauseAfterTimer();

            }, fifteen);

        }

    };


    _trySetRate = async (rate, shouldCorrectPitch) => {
        if (this.playbackInstance != null) {
            try {
                await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
            } catch (error) {
                // Rate changing could not be performed, possibly because the client's Android API is too old.
            }
        }
    };


    _onRateSliderSlidingComplete = async value => {
        this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
    };


    openModal = () => {
        this.setState({
            modal:true
        })
    }

    closeModal = () => {
        this.setState({
            modal:false
        })
    }


    closeAudioGidModal = () => {
        this.setState({
            not_auth_user_modal:false
        })
    }



    changeRate = async => {

        let rate = 1;

        if (this.state.rate == 1.0) {
            rate = 1.25
        } else if (this.state.rate == 1.25) {
            rate = 1.5

        } else if (this.state.rate == 1.5) {
            rate = 2

        } else if (this.state.rate == 2) {
            rate = 1
        }


        this._trySetRate(rate, this.state.shouldCorrectPitch);
    };



    printRate = () => {
        if (this.state.rate == 1.0) {
            return (
                <Text style={{color:'#491C08', fontSize:16}}>1 x</Text>
            )
        } else if (this.state.rate == 1.25) {
            return (
                <Text style={{color:'#491C08', fontSize:16}}>1,25 x</Text>
            )
        } else if (this.state.rate == 1.5) {
            return (
                <Text style={{color:'#491C08', fontSize:16}}>1,5 x</Text>
            )
        } else if (this.state.rate == 2) {
            return (
                <Text style={{color:'#491C08', fontSize:16}}>2 x</Text>
            )
        }
    };


    printPhones = () => {


        let phones_res = [];
        if (this.state.object_data.data.PROPERTIES.PHONE.VALUE[0] && this.state.object_data.data.PROPERTIES.PHONE.VALUE.length > 0) {

            let phones = this.state.object_data.data.PROPERTIES.PHONE.VALUE;
            for (let i = 0; i < phones.length ; i++) {
                phones_res.push(phones[i])
            }

        } else {
            phones_res.push('Не указан')
        }


        return phones_res;
    }

    printFax = () => {


        let fax = 'Не указан';

        console.log(this.state.object_data.data.PROPERTIES.FAX.VALUE, 'this.state.object_data.data.PROPERTIES.FAX.VALUE')

        if (this.state.object_data.data.PROPERTIES.FAX.VALUE ) {

            fax = this.state.object_data.data.PROPERTIES.FAX.VALUE;

        }

        return fax;
    }

    printEmails = () => {
        let emails_res = [];
        if (this.state.object_data.data.PROPERTIES.MAIL.VALUE[0] && this.state.object_data.data.PROPERTIES.MAIL.VALUE.length > 0) {

            let emails = this.state.object_data.data.PROPERTIES.MAIL.VALUE;
            for (let i = 0; i < emails.length ; i++) {
                emails_res.push(emails[i])
            }

        } else {
            emails_res.push('Не указан')
        }


        return emails_res;
    }

    printTIME = () => {
        let time_res = [];

        if (this.state.object_data.data.PROPERTIES.TIME.VALUE[0].VALUE != '' && this.state.object_data.data.PROPERTIES.TIME.VALUE.length > 0) {

            let time = this.state.object_data.data.PROPERTIES.TIME.VALUE;
            for (let i = 0; i < time.length ; i++) {
                time_res.push(time[i])
            }
        } else {
            time_res.push({
                NAME:'указан',
                VALUE:'Не'
            })
        }

        return time_res;
    }

    setWorkingDays = () => {

        let working_days = this.state.object_data.data.PROPERTIES.WORKING_DAYS;

        // if (working_days.VALUE && typeof working_days.VALUE.MONDAY !== 'undefined' ) {
        if (working_days.VALUE &&  working_days.VALUE.hasOwnProperty('MONDAY') ) {

            this.setState({
                MONDAY: working_days.VALUE.MONDAY,
                TUESDAY: working_days.VALUE.TUESDAY,
                WEDNESDAY: working_days.VALUE.WEDNESDAY,
                THURSDAY: working_days.VALUE.THURSDAY,
                FRIDAY: working_days.VALUE.FRIDAY,
                SATURDAY: working_days.VALUE.SATURDAY,
                SUNDAY: working_days.VALUE.SUNDAY
            })

        }

    }


    _onSeekSliderValueChange = value => {

        if (this.playbackInstance != null && !this.isSeeking) {

            this.isSeeking = false;
            const seekPosition = value * this.state.playbackInstanceDuration;

            // if (this.shouldPlayAtEndOfSeek) {
            //     this.playbackInstance.playFromPositionAsync(seekPosition);
            // } else {
            //     this.playbackInstance.setPositionAsync(seekPosition);
            // }

        }
    };

    _onSeekSliderSlidingComplete = async value => {


        if (this.playbackInstance != null) {

            this.isSeeking = false;
            const seekPosition = value * this.state.playbackInstanceDuration;

            if (this.shouldPlayAtEndOfSeek) {
                // this.playbackInstance.playFromPositionAsync(seekPosition);
            } else {
                this.playbackInstance.setPositionAsync(seekPosition);
            }
        }
    };

    _getSeekSliderPosition() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return (
                this.state.playbackInstancePosition /
                this.state.playbackInstanceDuration
            );
        }
        return 0;
    }

    next15 = async () =>{

        await this.setState({
            next15_active: false
        })
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {

            const seekPosition = this.state.playbackInstancePosition + 15000;

            if (this.shouldPlayAtEndOfSeek) {
                this.playbackInstance.playFromPositionAsync(seekPosition);
            } else {
                this.playbackInstance.setPositionAsync(seekPosition);
            }

        }

        setTimeout( async () => {
            await this.setState({
                next15_active: true
            })
        }, 1000)

        // return 0;
    }

    goToObjectsMap() {
        if (this.state.isPlaying) {
            this.playbackInstance.pauseAsync();
        }
        this.props.navigation.navigate('ObjectMap')
    }

    prev15 = async () =>{

        await this.setState({
            prev15_active: false
        })
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {

            const seekPosition =this.state.playbackInstancePosition-15000;

            if (this.shouldPlayAtEndOfSeek) {
                this.playbackInstance.playFromPositionAsync(seekPosition);
            } else {
                this.playbackInstance.setPositionAsync(seekPosition);
            }

        }

        setTimeout( async () => {
            await this.setState({
                prev15_active: true
            })
        }, 1000)


        // return 0;
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return "0" + string;
            }
            return string;
        };
        return padWithZero(minutes) + ":" + padWithZero(seconds);
    }

    _getTimestamp() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return {'current' :this._getMMSSFromMillis(this.state.playbackInstancePosition), 'full': this._getMMSSFromMillis(this.state.playbackInstanceDuration)}

        }
        return "";
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    goToLogin = () => {
        this.props.navigation.navigate('Login')
    }


    openGps = () => {

        let latitude = this.state.latitude;
        let longitude = this.state.longitude;

        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        var url = scheme + `${latitude},${longitude}`;
        console.log(url)
        Linking.openURL(url);

    }


    printButtons = () => {


        return (
            <View style={{width:'100%', height:48, flexDirection:'row', justifyContent:'space-between',  backgroundColor:'#F9F3F1'}}>

                <TouchableOpacity
                    onPress={() =>  this.setState({description_tab:true, audio_tab:false, contacts_tab:false, reserve_a_table: false, book_a_room: false, restorane_menu:false, reviews_tab: false})}
                    style={[styles.actionItem, this.state.description_tab ? styles.activeActionsItem : {}]}
                >
                    <Text style={[styles.actionItemText,  this.state.description_tab ? styles.activeActionsItemText : {}, {fontFamily:'Ubuntu_400Regular'}]}>
                        {/*ОПИСАНИЕ*/}
                        {this.state.language.about_object_text}

                    </Text>
                </TouchableOpacity>

                {this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE &&

                    <TouchableOpacity
                        onPress={() =>  this.setState({description_tab:false, audio_tab:true, contacts_tab:false, reserve_a_table: false, book_a_room: false, restorane_menu:false, reviews_tab: false})}
                        style={[styles.actionItem, this.state.audio_tab ? styles.activeActionsItem : {}]}
                    >
                        <Text style={[styles.actionItemText, this.state.audio_tab ? styles.activeActionsItemText : {}, {fontFamily:'Ubuntu_400Regular'}]}>

                            {/*АУДИОГИД*/}

                            {this.state.language.audiogid}

                        </Text>
                    </TouchableOpacity>

                }


                <TouchableOpacity
                    onPress={() =>  this.setState({description_tab:false, audio_tab:false, contacts_tab:true, reserve_a_table: false, book_a_room: false, restorane_menu:false, reviews_tab: false})}
                    style={[styles.actionItem, this.state.contacts_tab ? styles.activeActionsItem : {}]}
                >
                    <Text style={[styles.actionItemText, this.state.contacts_tab ? styles.activeActionsItemText : {}, {fontFamily:'Ubuntu_400Regular'}]}>
                        {/*КОНТАКТЫ*/}
                        {this.state.language.contacts}

                    </Text>
                </TouchableOpacity>


                {this.props.object_data.data.PROPERTIES.BOOKING_ROOM.VALUE == '1'  &&


                    <TouchableOpacity
                        onPress={() => {

                            if(this.state.isLogin === true) {
                                this.setState({
                                    description_tab:false,
                                    audio_tab:false,
                                    contacts_tab:false,
                                    reserve_a_table:false,
                                    book_a_room: true,
                                    restorane_menu:false,
                                    reviews_tab: false
                                })
                            } else {

                                this.setState({
                                    show_unautorize_reserv_table_or_room: true
                                })

                            }

                        }}
                        style={[styles.actionItem, this.state.book_a_room ? styles.activeActionsItem : {}]}
                    >
                        <Text style={[styles.actionItemText, this.state.book_a_room ? styles.activeActionsItemText : {}, {fontFamily:'Ubuntu_400Regular'}]}>

                            {/*БРОНИРОВАНИЕ НОМЕРА*/}

                            {this.state.language.room_booking}

                        </Text>
                    </TouchableOpacity>

                }



                {this.props.object_data.data.PROPERTIES.BOOKING_TABLE.VALUE == '1' &&

                    <TouchableOpacity
                        onPress={() => {
                            if(this.state.isLogin === true) {

                                this.setState({description_tab:false, audio_tab:false, contacts_tab:false, reserve_a_table:true, book_a_room: false, restorane_menu: false, reviews_tab: false})

                            } else {

                                this.setState({
                                    show_unautorize_reserv_table_or_room: true
                                })

                            }


                        }}
                        style={[styles.actionItem, this.state.reserve_a_table ? styles.activeActionsItem : {}]}
                    >
                        <Text style={[styles.actionItemText, this.state.reserve_a_table ? styles.activeActionsItemText : {}, {fontFamily:'Ubuntu_400Regular'}]}>
                            {/*БРОНИРОВАНИЕ СТОЛА*/}
                            {this.state.language.table_reservation}
                        </Text>
                    </TouchableOpacity>

                }



                {this.checkMenu() &&

                    <TouchableOpacity
                        onPress={() => {
                            if(this.state.isLogin === true) {
                                this.openMenuTab();
                            } else {
                                this.setState({
                                    show_unautorize_menu_modal: true
                                })
                            }


                        }}
                        style={[styles.actionItem, this.state.restorane_menu ? styles.activeActionsItem : {}]}
                    >
                        <Text style={[styles.actionItemText, this.state.restorane_menu ? styles.activeActionsItemText : {}, {fontFamily:'Ubuntu_400Regular'}]}>
                            {/*МЕНЮ*/}
                            {this.state.language.menu}

                        </Text>
                    </TouchableOpacity>

                }



                <TouchableOpacity
                    onPress={() =>{

                        this.openReviewTab()

                    }}
                    style={[styles.actionItem, this.state.reviews_tab ? styles.activeActionsItem : {}]}
                >
                    <Text style={[styles.actionItemText, this.state.reviews_tab ? styles.activeActionsItemText : {}, {fontFamily:'Ubuntu_400Regular'}]}>
                        {/*ОТЗЫВЫ*/}
                        {this.state.language.review}

                    </Text>
                </TouchableOpacity>



            </View>
        )
    }


    openMenuTab = async () => {

        console.log(this.props.object_data.data, 'this.props.object_data.data')

        let menus = this.props.object_data.data.PROPERTIES.MENU;
        let new_menu = [];

        if(menus.length !== 0) {

            console.log(menus)


            for (let menu in menus) {

                let menu_item_arr = [];


                for (let menu_item in menus[menu]) {
                    menu_item_arr.push(menus[menu][menu_item])
                }

                let item = {
                    menu_item_name: menu,
                    menu_item_arr: menu_item_arr,
                    isOpen: false
                }

                new_menu.push(item)

            }

        }

        console.log(new_menu, 'new_menu')

        this.setState({
            menu_data: new_menu,
            description_tab:false,
            audio_tab:false,
            contacts_tab:false,
            reserve_a_table:false,
            book_a_room: false,
            restorane_menu: true,
            reviews_tab: false
        })


    }


    openReviewTab = async () => {

        let id_user = await AsyncStorage.getItem('userId');
        let id_obj = this.props.object_data.data.ID

        let req = {
            id_obj: id_obj,
            id_user:id_user,
            num_page: 1,
            count_page: this.state.review_count_page
        }

        axios.post('https://qr-gid.by/api/reviews/list/', req).then((response) => {

            let data = response.data;
            let reviews_data = [];

            console.log('responseresponse',data, 'responseresponseresponse')

            if(data.length !== 0) {

                for (const review_item in data.items) {
                    reviews_data.push(data.items[review_item])
                }
            }


            this.setState({
                reviews_data: reviews_data,
                description_tab:false,
                audio_tab:false,
                contacts_tab:false,
                reserve_a_table:false,
                book_a_room: false,
                restorane_menu: false,
                reviews_tab: true,
                obj_vote:  data.hasOwnProperty('obj_vote')   &&  data.obj_vote > 0 ?  data.obj_vote : 0,
                user_vote:  data.hasOwnProperty('user_vote') &&  data.user_vote > 0 ?  data.user_vote : 0,
            })
        });
    }

    minusGuestCountRoom = () => {
        let {guest_count_room} = this.state;
        guest_count_room = guest_count_room ? parseInt(guest_count_room) : 0;
        let new_guest_count_room = guest_count_room > 0 ? guest_count_room - 1 : 0

        console.log(new_guest_count_room, 'new_guest_count_room')

        this.setState({
            guest_count_room: new_guest_count_room.toString(),
        })
    }

    plusGuestCountRoom = () => {
        let {guest_count_room} = this.state;
        guest_count_room = guest_count_room ? parseInt(guest_count_room) : 0;

        let new_guest_count_room = guest_count_room + 1


        let guest_count_room_error = new_guest_count_room === 0 ? true : false;

        this.setState({
            guest_count_room: new_guest_count_room.toString(),
            guest_count_room_error:guest_count_room_error,
            guest_count_room_valid:false
        })


    }



    minusGuestCountTable = () => {
        let {guest_count_table} = this.state;
        guest_count_table = guest_count_table ? parseInt(guest_count_table) : 0;
        let new_guest_count_table = guest_count_table > 0 ? guest_count_table - 1 : 0

        console.log(new_guest_count_table, 'new_guest_count_table')

        this.setState({
            guest_count_table: new_guest_count_table.toString()
        })
    }

    plusGuestCountTable = () => {
        let {guest_count_table} = this.state;
        guest_count_table = guest_count_table ? parseInt(guest_count_table) : 0;

        let new_guest_count_table   = guest_count_table + 1
        let guest_count_table_error = new_guest_count_table === 0 ? true : false;

        this.setState({
            guest_count_table: new_guest_count_table.toString(),
            guest_count_table_error:guest_count_table_error,
            guest_count_table_valid:false
        })
    }


    closeUnautorizeModal = () => {
        this.setState({
            show_unautorize_modal:false
        })
    }


    bookNowROOMHandler = async () => {

        let {isLogin,edit_email_room, edit_phone_room, edit_fio_room, visit_details, guest_count_room, visit_dates_from, visit_dates_to,   edit_email_room_valid,  edit_phone_room_valid  } = this.state;

        if(!isLogin) {

            this.setState({
                book_a_room_modal: true
            })

        } else {


            if (visit_dates_from === '' || visit_dates_to === '' || guest_count_room === 0 || visit_details === '' || edit_fio_room === '' ||  edit_email_room_valid === false || edit_phone_room_valid === false) {


                if (visit_dates_from === '') {
                    this.setState({
                        visit_dates_from_error: true,
                        visit_dates_from_valid: false
                    })
                } else {
                    this.setState({
                        visit_dates_from_error: false,
                        visit_dates_from_valid: true
                    })
                }

                if (visit_dates_to === '' ) {
                    this.setState({
                        visit_dates_to_error: true,
                        visit_dates_to_valid: false
                    })
                } else {
                    this.setState({
                        visit_dates_to_error: false,
                        visit_dates_to_valid: true
                    })
                }



                if (guest_count_room === 0 ) {
                    this.setState({
                        guest_count_room_error: true,
                        guest_count_room_valid: false
                    })
                } else {
                    this.setState({
                        guest_count_room_error: false,
                        guest_count_room_valid: false
                    })
                }



                if (visit_details === '' ) {
                    this.setState({
                        visit_details_error: true,
                        visit_details_valid: false,
                        visit_details_error_text:this.state.language.required_field
                    })
                } else {
                    this.setState({
                        visit_details_error: false,
                        visit_details_valid: false,
                        visit_details_error_text: ''
                    })
                }




                if (edit_fio_room === '' ) {
                    this.setState({
                        edit_fio_room_error: true,
                        edit_fio_room_valid: false,
                        edit_fio_room_error_text: this.state.language.required_field //'Поле обязательно для заполнения!'
                    })
                } else {
                    this.setState({
                        edit_fio_room_error: false,
                        edit_fio_room_valid: true,
                        edit_fio_room_error_text: ''
                    })
                }


                if (edit_phone_room_valid === false) {
                    this.setState({
                        edit_phone_room_error: true,
                        edit_phone_room_valid: false,
                        edit_phone_room_error_text: this.state.language.required_field //'Поле обязательно для заполнения!'
                    })
                } else {
                    this.setState({
                        edit_phone_room_error: false,
                        edit_phone_room_valid: true,
                        edit_phone_room_error_text: ''
                    })
                }


                if (edit_email_room_valid === false) {

                    this.setState({
                        edit_email_room_error: true,
                        edit_email_room_valid: false,
                        edit_email_room_error_text: this.state.language.required_field //'Поле обязательно для заполнения!'
                    })
                } else {
                    this.setState({
                        edit_email_room_error: false,
                        edit_email_room_valid: true,
                        edit_email_room_error_text: ''
                    })
                }


                return false;

            }



            visit_dates_from = visit_dates_from.split('-');
            visit_dates_from = visit_dates_from.join('.')

            visit_dates_to = visit_dates_to.split('-');
            visit_dates_to = visit_dates_to.join('.')


            let id_obj = this.props.object_data.data.ID
            let id_user = await AsyncStorage.getItem('userId');

            let req = {
                id_obj:id_obj,
                date: visit_dates_from + ' - ' + visit_dates_to,
                // date: '01.12.2020 - 06.12.2020',
                id_user: id_user,
                guest_count: guest_count_room,
                details: visit_details,
                fio: edit_fio_room,
                phone:edit_phone_room,
                email: edit_email_room

            }

            console.log(req, 'reqreqreqreq')

            axios.post('https://qr-gid.by/api/booking/room/add/', req).then((response) => {

                console.log(response.data, 'bookNowROOMHandler')


                if (response.data.success) {
                    this.setState({
                        bookRoomSuccessModal: true,

                        edit_email_room: '',
                        edit_phone_room: '',
                        edit_phone_room_masked: '',
                        edit_fio_room: '',
                        visit_details: '',
                        guest_count_room: '0',
                        visit_dates_from: '',
                        visit_dates_to: '',

                        visit_dates_from_error: false,
                        visit_dates_from_valid: false,
                        visit_dates_to_error: false,
                        visit_dates_to_valid: false,
                        guest_count_room_error: false,
                        guest_count_room_valid: false,
                        visit_details_error: false,
                        visit_details_valid: false,
                        visit_details_error_text: '',
                        edit_fio_room_error: false,
                        edit_fio_room_valid: false,
                        edit_fio_room_error_text: '',
                        edit_phone_room_error: false,
                        edit_phone_room_valid: false,
                        edit_phone_room_error_text: '',
                        edit_email_room_error: false,
                        edit_email_room_valid: false,
                        edit_email_room_error_text: ''

                    })
                }


            });

        }

    }

    bookNowTableHandler = async () => {

        let {isLogin, edit_phone, edit_fio, visit_details_wishes, guest_count_table, visit_dates, edit_email_table} = this.state;

        if(!isLogin) {

            this.setState({
                reserve_a_table_modal: true
            })

        } else {


            if (visit_dates === '' || guest_count_table === 0 || visit_details_wishes === '' ||  edit_fio === '' ||  edit_phone === '' || this.state.edit_phone_valid === false) {

                if(visit_dates === '') {

                    this.setState({
                        visit_dates_error: true,
                        visit_dates_valid: false
                    })

                } else {

                    this.setState({
                        visit_dates_error: false,
                        visit_dates_valid: true
                    })

                }

                if(guest_count_table === 0 || guest_count_table === '0') {

                    this.setState({
                        guest_count_table_error : true,
                        guest_count_table_valid: false
                    })

                } else {

                    this.setState({
                        guest_count_table_error: false,
                        guest_count_table_valid: false
                    })

                }

                if(visit_details_wishes === '') {

                    this.setState({
                        visit_details_wishes_error : true,
                        visit_details_wishes_valid: false
                    })

                } else {

                    this.setState({
                        visit_details_wishes_error: false,
                        visit_details_wishes_valid: false
                    })

                }



                if(edit_fio === '') {

                    this.setState({
                        edit_fio_error : true,
                        edit_fio_valid: false
                    })

                } else {

                    this.setState({
                        edit_fio_error: false,
                        edit_fio_valid: true
                    })

                }


                if(this.state.edit_phone_valid === false) {

                    this.setState({
                        edit_phone_error: true,
                        edit_phone_valid : false,
                        edit_phone_error_text: 'Не верный формат!'

                    })

                } else {

                    this.setState({
                        edit_phone_error: false,
                        edit_phone_valid: true,
                        edit_phone_error_text: ''

                    })

                }



                return false;
            }


            let id_obj = this.props.object_data.data.ID
            let id_user = await AsyncStorage.getItem('userId');

            visit_dates = visit_dates.split('-');
            visit_dates = visit_dates.join('.')

            let req = {
                id_obj:id_obj,
                date: visit_dates,
                id_user: id_user,
                guest_count: guest_count_table,
                details: visit_details_wishes,
                fio: edit_fio,
                phone:edit_phone,
                email: edit_email_table
            }

            console.log(req, 'bookNowTableHandler')


            axios.post('https://qr-gid.by/api/booking/table/add/', req).then((response) => {

                console.log(response.data, 'bookNowROOMHandler')


                if (response.data.success) {
                    this.setState({

                        bookTableSuccessModal: true,
                        edit_phone: '',
                        edit_fio: '',
                        visit_details_wishes: '',
                        guest_count_table: '0',
                        visit_dates: '',

                        edit_phone_valid: false,
                        edit_phone_error: false,
                        edit_fio_error: false,
                        edit_fio_valid: false,

                        visit_details_wishes_error: false,
                        visit_details_wishes_valid: false,

                        guest_count_table_error: false,
                        guest_count_table_valid: false,

                        visit_dates_error: false,
                        visit_dates_valid: false,

                        edit_email_table: '',
                        edit_email_table_error: false,
                        edit_email_table_valid: false,
                        edit_email_table_error_text: '',

                    })
                }


            });


        }

    }

    sendReviewHandler  = async () =>
    {
        let {isLogin, review_value,language} = this.state;

        if(!isLogin)
        {
            this.setState({
                send_review_modal: true
            })
        } else {
            console.log(review_value, 'starCount');
            if (review_value === '')
            {
                this.setState({
                    sendReviewErrorModal: true,
                    sendReviewErrorModalText: language.review_required
                })
                return false;
            } else {
                this.setState({
                    sendReviewErrorModal: false,
                    sendReviewErrorModalText: ''
                })
            }

            let id_obj  = this.props.object_data.data.ID
            let id_user = await AsyncStorage.getItem('userId');

            let req = {
                id_obj:id_obj,
                id_user: id_user,
                type: 'review',
                review: review_value
            }

            console.log(req, 'sendReviewHandler');

            axios.post('https://qr-gid.by/api/reviews/add/', req).then((response) =>
            {

                console.log(response.data, 'sendReviewHandler');
                console.log(response.data.success, 'response.data.success');

                if(response.data.success)
                {
                    this.setState({
                        review_value: '',
                        starCount: 0,
                        showSuccessAddReviewModal: true
                    })
                    this.getReviews();
                }

            });
        }
    }
    sendStarHandler  = async (starCount) =>
    {
        let {isLogin,language} = this.state;

        if(!isLogin)
        {
            this.setState({
                send_review_modal: true
            })
        } else {
            console.log(starCount, 'starCount');

            if (starCount === 0)
            {
                this.setState({
                    sendReviewErrorModal: true,
                    sendReviewErrorModalText: language.rate_required
                })
                return false;
            } else {
                this.setState({
                    sendReviewErrorModal: false,
                    sendReviewErrorModalText: ''
                })
            }

            let id_obj  = this.props.object_data.data.ID
            let id_user = await AsyncStorage.getItem('userId');

            let req = {
                id_obj:id_obj,
                id_user: id_user,
                type: 'rating',
                stars: starCount
            }

            console.log(req, 'sendStarHandler');

            setTimeout( ()=>{
                axios.post('https://qr-gid.by/api/reviews/add/', req).then((response) =>
                {
                    console.log(response.data, 'sendStarHandler')
                    if(response.data.success)
                    {
                        this.setState({
                            review_value: '',
                            starCount: 0,
                            // showSuccessAddReviewModal: true
                            sendReviewErrorModal: true,
                            sendReviewErrorModalText: language.rate_form_success_message
                        })
                        this.getReviews();
                    }

                });
            }, 1000)


        }
    }




    clearRegEmailInput = () => {

        this.setState({
            edit_email_room: '',
            edit_email_room_error:false,
            edit_email_room_valid: false
        })

    }



    clearEditEmailTableInput = () => {

        this.setState({
            edit_email_table: '',
            edit_email_table_error:false,
            edit_email_table_valid: false
        })

    }



    changeRegisterEmail = (edit_email_room) => {

        this.setState({ edit_email_room:edit_email_room })

        if (edit_email_room == '') {
            this.setState({
                edit_email_room_error:false,
                edit_email_room_valid:false
            })
            return false;
        }


        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,2})+$/;
        let is_error_email = reg.test(this.state.edit_email_room) ? false : true;
        if (is_error_email === false) {
            this.setState({
                edit_email_room_error:false,
                edit_email_room_valid: true
            })
        } else {
            this.setState({
                edit_email_room_valid: false
            })
        }


    }


    changeRoomEmail = (edit_email_table) => {

        this.setState({ edit_email_table:edit_email_table })

        if (edit_email_table == '') {
            this.setState({
                edit_email_table_error:false,
                edit_email_table_valid:false
            })
            return false;
        }


        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,2})+$/;
        let is_error_email = reg.test(this.state.edit_email_table) ? false : true;
        if (is_error_email === false) {
            this.setState({
                edit_email_table_error:false,
                edit_email_table_valid: true
            })
        } else {
            this.setState({
                edit_email_table_valid: false
            })
        }


    }


    clearPhoneInput = () => {

        this.setState({
            edit_phone: '',
            edit_phone_error: false,
            edit_phone_valid: false,

        })

    }


    clearPhoneRoomInput = () => {

        this.setState({
            edit_phone_room: '',
            edit_phone_room_masked: '',
            edit_phone_room_error: false,
            edit_phone_room_valid: false,
        })
    }

    // changeRegisterPhone = async (edit_phone) => {
    changeReserveTablePhone = async (edit_phone) => {

        edit_phone = edit_phone.split('+').join('')
        edit_phone = '+' + edit_phone;

        await this.setState({
            edit_phone:edit_phone
        })

        if(edit_phone == '') {
            this.setState({
                edit_phone_error:false,
                edit_phone_valid:false,
                edit_phone_error_text: ''
            })
        } else {

            if (edit_phone.length  > 4) {

                this.setState({
                    edit_phone_error:false,
                    edit_phone_valid:true,
                    edit_phone_error_text: ''
                })
                console.log('correct Phone')

            }

            // else {
            //
            //     this.setState({
            //         edit_phone_error:true,
            //         edit_phone_valid:false,
            //         edit_phone_error_text: 'Не верный номер!'
            //     })
            // }
        }



    }


    changeRegisterPhoneRoom = async ( edit_phone_room) => {

        edit_phone_room = edit_phone_room.split('+').join('')

        console.log(edit_phone_room, 'edit_phone_room_new');

        edit_phone_room = '+' + edit_phone_room;

        await this.setState({
            edit_phone_room:edit_phone_room
        })



        if(edit_phone_room == '') {
            this.setState({
                edit_phone_room_error:false,
                edit_phone_room_valid:false,
                edit_phone_room_error_text: ''

            })
        } else {
            if (edit_phone_room.length > 4) {

                this.setState({
                    edit_phone_room_error:false,
                    edit_phone_room_valid:true,
                    edit_phone_room_error_text: ''
                })

                console.log('correct Phone')

            }

            // else {
            //     this.setState({
            //         edit_phone_room_error:true,
            //         edit_phone_room_valid:false,
            //         edit_phone_room_error_text: 'Не верный номер!'
            //     })
            // }
        }



    }

    changeFio = (edit_fio) => {

        this.setState({ edit_fio:edit_fio })

        if (edit_fio == '') {
            this.setState({
                edit_fio_valid:false,
                edit_fio_error: false
            })

        } else {
            this.setState({
                edit_fio_valid:true,
                edit_fio_error: false

            })
        }

    }

    changeFioRoom = (edit_fio_room) => {

        this.setState({ edit_fio_room:edit_fio_room })

        if (edit_fio_room == '') {
            this.setState({
                edit_fio_room_valid:false
            })

        } else {
            this.setState({
                edit_fio_room_valid:true,
                edit_fio_room_error: false
            })
        }

    }


    checkMenu = () => {

        let menu = this.props.object_data.data.PROPERTIES.MENU;
        // let menu = [];
        let exist = false;

        if(menu.length === 0) {
            exist = false
        } else {
            exist = true
        }

        return exist;

    }


    toggleMenu = (menu) => {

        let {menu_data} = this.state;
        let menu_name = menu.menu_item_name;


        for (let i = 0; i < menu_data.length; i++) {


            if(menu_data[i].menu_item_name == menu_name) {

                if(menu_data[i].isOpen === true) {
                    menu_data[i].isOpen = false;
                } else {
                    menu_data[i].isOpen = true;
                }
            }

        }

        this.setState({
            menu_data: menu_data
        })

    }

    showMoreReviews = async () => {

        await this.setState({
            review_count_page: this.state.review_count_page + 4
        })

        await this.getReviews();

    }

    getReviews = async () => {

        let id_user = await AsyncStorage.getItem('userId');
        let id_obj = this.props.object_data.data.ID

        let req = {
            id_obj: id_obj,
            id_user:id_user,
            num_page: 1,
            count_page: this.state.review_count_page
        }

        axios.post('https://qr-gid.by/api/reviews/list/', req).then((response) => {

            let data = response.data;
            let reviews_data = [];

            if(data.length !== 0)
            {
                for (const review_item in data.items) {
                    reviews_data.push(data.items[review_item])
                }
            }
            console.log('reviews_data',data, 'reviews_data')

            this.setState({
                reviews_data: reviews_data,
                description_tab:false,
                audio_tab:false,
                contacts_tab:false,
                reserve_a_table:false,
                book_a_room: false,
                restorane_menu: false,
                reviews_tab: true,
                obj_vote:  data.hasOwnProperty('obj_vote')   &&  data.obj_vote > 0 ?  data.obj_vote : 0,
                user_vote:  data.hasOwnProperty('user_vote') &&  data.user_vote > 0 ?  data.user_vote : 0

            })

        });

    }


    allCheckAfterLoadComponent = async () => {

        console.log(this.props.object_data)

        await this.setState({
            isLoaded: false,
            description_tab:true,
            audio_tab:false,
            contacts_tab:false,
            reserve_a_table:false,
            book_a_room: false,
            restorane_menu: false,
            reviews_tab: false,
            openThreeDotModal: false,


            guest_count_room: null,
            guest_count_room_error: false,
            guest_count_room_valid: false,


            guest_count_table: '0',
            guest_count_table_error: false,
            guest_count_table_valid: false,


            edit_fio: '',
            edit_fio_error: false,
            edit_fio_valid: false,
            edit_fio_error_text: '',

            edit_fio_room: '',
            edit_fio_room_error: false,
            edit_fio_room_valid: false,
            edit_fio_room_error_text: '',


            edit_phone: '',
            edit_phone_error: false,
            edit_phone_valid: false,
            edit_phone_error_text: '',

            edit_phone_room: '',
            edit_phone_room_error: false,
            edit_phone_room_valid: false,
            edit_phone_room_error_text: '',

            edit_email_room: '',
            edit_email_room_error: false,
            edit_email_room_valid: false,
            edit_email_room_error_text: '',


            visit_details: '',
            visit_details_error: false,
            visit_details_valid: false,
            visit_details_error_text: '',

            visit_details_wishes: '',
            visit_details_wishes_error: false,
            visit_details_wishes_valid: false,


            openVisitDates: false,
            visit_dates_for_picker: new Date(),
            visit_dates: '',
            visit_dates_error:false,
            visit_dates_valid:false,


            openVisitDatesTo: false,
            visit_dates_to_for_picker: new Date(),
            visit_dates_to: '',
            visit_dates_to_error: '',
            visit_dates_to_valid: '',


            openVisitDatesFrom: false,
            visit_dates_from: '',
            visit_dates_from_for_picker: new Date(),
            visit_dates_from_error:false,
            visit_dates_from_valid:false,

            address: '',
            fontsLoaded: false,
            current_image: this.props.object_data.data.PROPERTIES.hasOwnProperty('MORE_PHOTO') && this.props.object_data.data.PROPERTIES.MORE_PHOTO.VALUE.length > 0 ? 1 : 0,
            galleryModal: false
        })

        let latitude = parseFloat(this.props.object_data.data.PROPERTIES.GPS.VALUE[0]);
        let longitude = parseFloat(this.props.object_data.data.PROPERTIES.GPS.VALUE[1]);

        // Check login start

            let userToken = await AsyncStorage.getItem('userToken');

        // Check login end



         // Set language start

            await AsyncStorage.getItem('language',(err,item) => {

                let language = item ? JSON.parse(item) : {};
                let set_language = ru;
                let language_name = 'ru';

                if (language.hasOwnProperty('language')) {
                    set_language = language.language == 'ru' ? ru : language.language == 'bel' ?  bel : en;
                    language_name = language.language;
                }


                this.setState({
                    language:set_language,
                    language_name: language_name
                })

            })


         // Set language end




        let tabs_count_array = ['description_tab', 'contacts_tab', 'reviews_tab'];

        if (this.props.object_data.data.PROPERTIES.AUDIOGUIDE.VALUE) {
            tabs_count_array.push('audio_tab');
        }

        if (this.props.object_data.data.PROPERTIES.BOOKING_ROOM.VALUE == '1') {
            tabs_count_array.push('book_a_room');
        }

        if ( this.props.object_data.data.PROPERTIES.BOOKING_TABLE.VALUE == '1') {
            tabs_count_array.push('reserve_a_table');
        }

        if ( this.checkMenu()) {
            tabs_count_array.push('restorane_menu');
        }


        this.setAddress();

        if(userToken) {

            // Check favorite or not start

                let id_obj  = this.props.object_data.data.ID
                let id_user = await AsyncStorage.getItem('userId');
                let req     = {id_obj:id_obj,id_user: id_user}

                await axios.post('https://qr-gid.by/api/favorite/list/', req).then((response) => {

                    this.setState({
                        isFavourites: response.data.hasOwnProperty('success') && response.data.success === true ? true : false,
                        isLoaded: true,
                        isLogin: true,
                        latitude: latitude,
                        longitude: longitude,
                        tabs_count_array: tabs_count_array
                    })

                });

            // Check favorite or not end

        } else {

            this.setState({
                isFavourites: false,
                isLoaded: true,
                isLogin:  false,
                latitude: latitude,
                longitude: longitude,
                tabs_count_array: tabs_count_array
            })

            console.log(latitude,'latitude' )
            console.log(longitude,'longitude' )

        }








    }



    addObjectToFavourites = async () => {

        console.log(this.props.object_data, 'this.props.object_data')

        let id_obj = this.props.object_data.data.ID
        let id_user = await AsyncStorage.getItem('userId');

        let req = {
            id_obj:id_obj,
            id_user: id_user
        }

        console.log(req, 'req')
        axios.post('https://qr-gid.by/api/favorite/add/', req).then((response) => {

            console.log(response, 'response')

            this.setState({
                isFavourites: true
            })

        });

    }

    removeObjectFromFavourites = async () => {

        let id_obj = this.props.object_data.data.ID
        let id_user = await AsyncStorage.getItem('userId');

        let req = {
            id_obj:id_obj,
            id_user: id_user
        }

        console.log(req, 'req')

        axios.post('https://qr-gid.by/api/favorite/delete/', req).then((response) => {

            this.setState({
                isFavourites:false
            })

        });

    }


    printNotChangedStars = (stars) => {
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars

        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={{
                            width: 18,
                            height: 18,
                            resizeMode: 'cover',
                        }}
                        source={
                            i <= stars
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }

        return React_Native_Rating_Bar

    }




    changeVisitDatesFrom = (event, selectedDate) => {

        let visit_dates_from = selectedDate;

        // 2017-08-10

        visit_dates_from = moment(visit_dates_from).format('DD-MM-YYYY');

        console.log(visit_dates_from, 'visit_dates_from')

        // return false;

        this.setState({
            openVisitDatesFrom: false,
            visit_dates_from: visit_dates_from,
            visit_dates_from_for_picker: selectedDate,

            visit_dates_from_error:false,
            visit_dates_from_valid:true,


        })

    }

    changeVisitDatesTo = (event, selectedDate) => {

        let visit_dates_to = selectedDate;

        // 2017-08-10

        visit_dates_to = moment(visit_dates_to).format('DD-MM-YYYY');

        console.log(visit_dates_to, 'visit_dates_to')

        // return false;

        this.setState({
            openVisitDatesTo: false,
            visit_dates_to: visit_dates_to,
            visit_dates_to_for_picker: selectedDate,

            visit_dates_to_error:false,
            visit_dates_to_valid:true,
        })

    }

    changeVisitDates = (event, selectedDate) => {

        let visit_dates = selectedDate;

        // 2017-08-10

        visit_dates = moment(visit_dates).format('DD-MM-YYYY');

        console.log(visit_dates, 'visit_dates')

        // return false;

        this.setState({
            openVisitDates: false,
            visit_dates: visit_dates,
            visit_dates_for_picker: selectedDate,

            visit_dates_error:false,
            visit_dates_valid:true,
        })

    }


    escapeHtml(htmlStr) {
        htmlStr = htmlStr.replace(/&lt;/g , "<");
        htmlStr = htmlStr.replace(/&gt;/g , ">");
        htmlStr = htmlStr.replace(/&quot;/g , "\"");
        htmlStr = htmlStr.replace(/&#39;/g , "\'");
        htmlStr = htmlStr.replace(/&amp;/g , "&");
        return htmlStr;
    }



     declination(number) {
        let names = ['отзыв', 'отзыва', 'отзывов'];
        if(this.state.language_name == 'ru') {
            names = ['отзыв', 'отзыва', 'отзывов'];
        } else if(this.state.language_name == 'bel') {
            names = ['водгук', 'водгуку', 'водгукаў'];
        } else if(this.state.language_name == 'en') {
            names = ['review', 'review', 'review'];
        }

        // return number+" "+names[(number%100>4 && number%100)]


         let n = Math.abs(number);
         n %= 100;
         if (n >= 5 && n <= 20) {
             return names[2];
         }
         n %= 10;
         if (n === 1) {
             return names[0];
         }
         if (n >= 2 && n <= 4) {
             return names[1];
         }
         return names[2];
    }


    prevSlide = () =>
    {
        let active_slider_index = this.state.current_slide_index_for_slider;
        let slider_images = this.sliderImages();
        let new_active_slider_index;

        if (active_slider_index == 0)
        {
            new_active_slider_index = slider_images.length -1
        } else {
            new_active_slider_index = active_slider_index - 1;
        }

        this.setState({
            current_slide_index_for_slider: new_active_slider_index
        })
    }

    nextSlide = () =>
    {
        let active_slider_index = this.state.current_slide_index_for_slider;
        let slider_images = this.sliderImages();
        let new_active_slider_index;
        if (active_slider_index > slider_images.length -1 )
        {
            new_active_slider_index = 0
        } else {
            new_active_slider_index = active_slider_index + 1;
        }

        this.setState({
            current_slide_index_for_slider: new_active_slider_index
        })
    }


    printRateText = () => {

        let {obj_vote, language} = this.state;
        let result_text = '';

        if(obj_vote > 0 && obj_vote <= 1.4) {
            result_text = language.badly;
        } else if(obj_vote >= 1.5 && obj_vote <= 2.4) {
            result_text = language.below_the_average;
        } else if(obj_vote >= 2.5 && obj_vote <= 3.4) {
            result_text = language.medium;
        } else if(obj_vote >= 3.5 && obj_vote <= 4.5) {
            result_text = language.above_average;
        } else if(obj_vote >= 4.6 && obj_vote <= 5) {
            result_text = language.fine;
        }

        return result_text;
    }


    render() {

        const windowWidth = Dimensions.get('window').width

        if (!this.state.fontsLoaded) {
            return null;
        }

        if(this.state.isLoaded === false) {

            return (

                <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
                    <ActivityIndicator size="large" color="#E1C1B7"/>
                </View>
            )

        }

        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.starCount
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }




        {/*Gallery modal START*/}

        if(this.state.galleryModal) {

            return (
                <SafeAreaView style={{flex:1, width: '100%', backgroundColor:'black', justifyContent:'center', }}>

                    <View style={{width:'100%', height: 56,  flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>

                        <Text style={{color:'white', width:'100%', textAlign:'center'}}>{this.state.current_slide_index_for_slider + 1} из {this.sliderImages().length}</Text>

                        <TouchableOpacity
                            style={{width:24, height: 24, marginRight:16, position:'absolute', right:16}}
                            onPress={()=> this.setState({galleryModal:false}) }
                        >
                            <Svg width={24} height={24} viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z" fill="#fff"/>
                            </Svg>

                        </TouchableOpacity>

                    </View>


                    <View style={{width: '100%', height: 300}}>

                        <TouchableOpacity
                            style={{width: 50, height:50, position:'absolute', top:120, left:10, zIndex:9999}}
                            onPress={() => {
                                this.prevSlide()
                            }}
                        >
                            <Svg fill="#fff" width={50} height={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className="icon">
                                <Path d="M768 903.232L717.568 960 256 512 717.568 64 768 120.768 364.928 512z" />
                            </Svg>
                        </TouchableOpacity>

                        <Image style={{width: "100%", height: '100%', resizeMode:'contain'}} source={{uri: this.sliderImages()[this.state.current_slide_index_for_slider]}}/>

                        <TouchableOpacity
                            style={{width: 50, height:50, position:'absolute', top:120, right: 10, zIndex:9999}}
                            onPress={() => {
                                this.nextSlide()
                            }}
                        >
                            <Svg fill="#fff" width={50} height={50} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1024 1024" className="icon">
                                <Path d="M256 120.768L306.432 64 768 512 306.432 960 256 903.232 659.072 512z" />
                            </Svg>
                        </TouchableOpacity>
                    </View>

                    {/*<SliderBox*/}
                    {/*    dotStyle={{width:0, height:0, borderRadius:60, opacity: 0}}*/}
                    {/*    inactiveDotColor="#EDDAD4"*/}
                    {/*    dotColor="#9F9EAE"*/}
                    {/*    sliderBoxHeight={235}*/}
                    {/*    images={this.sliderImages()}*/}
                    {/*    onCurrentImagePressed={index => console.log(`image ${index} pressed`)}*/}
                    {/*    currentImageEmitter={index => this.setState({current_image: index+1})}*/}
                    {/*/>*/}


                    {/*<Slideshow dataSource={this.sliderImages()}/>*/}
                </SafeAreaView>
            )
        }

        {/*Gallery modal END*/}

        return (

            <SafeAreaView style={[styles.container1]}>


                {/*openThreeDotModal START*/}

                    {this.state.openThreeDotModal &&

                        <TouchableOpacity onPress={() => {
                            this.setState({openThreeDotModal: false})
                        }} style={{width:'100%', height:'100%', position: "absolute", zIndex: 665, top:0, left:0}}>
                        </TouchableOpacity>

                    }

                    {this.state.openThreeDotModal &&


                        <View style={{width:224, backgroundColor:'white', borderRadius:8,  position:'absolute', top:50, right:15, zIndex: 666,shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.27,
                            shadowRadius: 4.65,

                            elevation: 6, }}>

                            <TouchableOpacity
                                onPress={() => this.setState({isOpenChangeTerrain:true, openThreeDotModal: false})}
                                style={{padding: 14, fontSize:16, color:'#1D1D20' }}>
                                <Text style={{fontFamily: 'FiraSans_400Regular', fontSize:16, color:'#1D1D20'}}>
                                    {/*Сменить местность*/}
                                    {this.state.language.change_terrain}
                               </Text>


                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.isLogin) {
                                        this.goToObjectsMap()
                                    } else {
                                        this.setState({
                                            show_unautorize_dont_open_map_modal: true,
                                            openThreeDotModal: false
                                        })
                                    }
                                }}
                                style={{padding: 14, fontSize:16, color:'#1D1D20'}}>
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



                <View style={ styles.topPanel}>

                    <TouchableOpacity
                        style={{marginRight:16,padding:10}}
                        // onPress={() => this.goToDashboard()}
                        onPress={() => {
                            if (this.state.isLogin) {

                                this.goToObjectsMap()

                            } else {

                                this.props.navigation.navigate('Dashboard')

                            }

                        }}
                    >
                        <Svg width={18} height={16} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path  d="M16.75 8H1m0 0l6.3-7M1 8l6.3 7"  stroke="#000"  strokeLinecap="round"  strokeLinejoin="round"/>
                        </Svg>
                    </TouchableOpacity>

                    <View style={ styles.topPanelRight}>


                        {this.state.isFavourites === false && this.state.isLogin &&

                            <TouchableOpacity
                                onPress={() => {this.addObjectToFavourites()}}
                            >
                                <Svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M2.758 23.732c.399.179.818.268 1.231.268.71 0 1.407-.259 1.969-.758l4.976-4.422a1.603 1.603 0 012.132 0l4.976 4.422c.89.79 2.116.978 3.2.49A2.946 2.946 0 0023 21.015V2.978A2.982 2.982 0 0020.02 0H3.98A2.982 2.982 0 001 2.978v18.037c0 1.189.674 2.231 1.758 2.717zM2.375 2.978c0-.884.72-1.603 1.605-1.603h16.045c.885 0 1.604.719 1.604 1.603v18.037c0 .65-.353 1.196-.946 1.464a1.57 1.57 0 01-1.724-.264l-4.976-4.421a2.971 2.971 0 00-1.98-.752c-.709 0-1.415.25-1.981.752l-4.976 4.421c-.486.431-1.13.532-1.724.264a1.564 1.564 0 01-.947-1.464V2.978z"
                                        fill="#9F9EAE"
                                    />
                                </Svg>
                            </TouchableOpacity>

                        }



                        {this.state.isFavourites === true &&

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



                        <View style={{marginLeft:24, position:'relative', zIndex: 1}}>

                            <TouchableOpacity  onPress={() => this.setState({ openThreeDotModal: !this.state.openThreeDotModal })}>
                                <Svg  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                    <Path fillRule="evenodd" clipRule="evenodd" d="M12 5a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 100-6 3 3 0 000 6zm0 8a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 100-6 3 3 0 000 6zm2 6a2 2 0 11-4 0 2 2 0 014 0zm1 0a3 3 0 11-6 0 3 3 0 016 0z" fill="#44434C"/>
                                </Svg>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>


                {/*DESCRIPTION TAB START*/}

                    {this.state.description_tab && this.props.object_data.data.PROPERTIES.URL.VALUE   &&

                        <TouchableOpacity  style={[styles.more_description_button]} onPress={()=> Linking.openURL(this.props.object_data.data.PROPERTIES.URL.VALUE)}>

                            <Svg  width={21} height={21} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M1.333 6v15.667a1 1 0 001 1h19.334a1 1 0 001-1V6M1.333 6V2.333a1 1 0 011-1h19.334a1 1 0 011 1V6M1.333 6h21.334M8 10v4.667m0 4.666v-4.666m0 0h11.334m-16-11.334H4m2.667 0h.667" stroke="#3A2E03" strokeLinecap="round" strokeLinejoin="round"/>
                            </Svg>

                            {this.state.more_description_button &&
                                <Text style={{flex:1, color:'#44434C', fontSize:16,marginLeft:12, fontFamily:'FiraSans_400Regular'}}>

                                    {/*Подробное описание*/}

                                    {this.state.language.more_details}

                                </Text>
                            }

                        </TouchableOpacity>

                    }

                {/*DESCRIPTION TAB END*/}



                {/*Gallery modal START*/}


                    {/*<Modal*/}
                    {/*    animationType="slide"*/}
                    {/*    transparent={true}*/}
                    {/*    visible={this.state.galleryModal}*/}
                    {/*    onRequestClose={() => {*/}
                    {/*        // this.closeAudioGidModal()*/}
                    {/*    }}>*/}
                    {/*    <View style={{width:'100%', height:'100%', backgroundColor:'black', justifyContent:'center'}}>*/}

                    {/*       <View style={{width:'100%', height: 56, position:'absolute', top:16, left:0, flexDirection:'row', justifyContent:'flex-end', alignItems:'center', backgroundColor:'red'}}>*/}

                    {/*           <Text style={{color:'white', width:'100%', textAlign:'center'}}>{this.state.current_image} из {this.sliderImages().length}</Text>*/}

                    {/*           <TouchableOpacity*/}
                    {/*               style={{width:24, height: 24, marginRight:16, position:'absolute', right:16}}*/}
                    {/*               onPress={()=> this.setState({galleryModal:false}) }*/}
                    {/*           >*/}
                    {/*               <Svg width={24} height={24} viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*                   <Path d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z" fill="#fff"/>*/}
                    {/*               </Svg>*/}

                    {/*           </TouchableOpacity>*/}

                    {/*       </View>*/}

                    {/*        <SliderBox*/}
                    {/*            dotStyle={{width:0, height:0, borderRadius:60, opacity: 0}}*/}
                    {/*            inactiveDotColor="#EDDAD4"*/}
                    {/*            dotColor="#9F9EAE"*/}
                    {/*            sliderBoxHeight={235}*/}
                    {/*            images={this.sliderImages()}*/}
                    {/*            onCurrentImagePressed={index => console.log(`image ${index} pressed`)}*/}
                    {/*            currentImageEmitter={index => this.setState({current_image: index+1})}*/}
                    {/*        />*/}


                    {/*        /!*<Slideshow dataSource={this.sliderImages()}/>*!/*/}
                    {/*    </View>*/}
                    {/*</Modal>*/}



                {/*Gallery modal END*/}


                {/* Unautorize modal START */}


                    {this.state.show_unautorize_modal &&

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.show_unautorize_modal}
                            onRequestClose={() => {
                                this.closeUnautorizeModal()
                            }}
                        >
                            <TouchableOpacity
                                style={[styles.centeredView]}
                                onPress={() => {
                                    this.closeUnautorizeModal()
                                }}
                            >

                                <TouchableHighlight>
                                    <View style={[styles.modalView, {backgroundColor: '#ECF9FE'}]}>

                                        <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Чтобы составить маршрут зарегистрируйтесь или войдите.*/}
                                            {this.state.language.modal_text3}
                                        </Text>

                                        <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>
                                            <TouchableOpacity
                                                style={[]}
                                                onPress={() => {

                                                    this.setState({
                                                        show_unautorize_modal:false,
                                                        bigMap: false
                                                    })
                                                    this.goToLogin()
                                                }}>
                                                <Text style={[styles.textStyle, {color: '#076388', fontFamily:'FiraSans_400Regular'}]}>
                                                    {/*ЗАРЕГЕСТРИРОВАТЬСЯ*/}
                                                    {this.state.language.sign_up}

                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={{marginLeft:16}}
                                                onPress={() => {
                                                    this.setState({
                                                        show_unautorize_modal:false,
                                                        bigMap: false
                                                    })
                                                    this.goToLogin()
                                                }}
                                            >
                                                <Text style={[styles.textStyle, {color: '#076388', fontFamily:'FiraSans_400Regular'}]}>
                                                    {/*ВОЙТИ*/}
                                                    {this.state.language.sign_in}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </TouchableHighlight>
                            </TouchableOpacity>
                        </Modal>

                    }


                {/* Unautorize modal END */}



                {/* Unautorize DONT OPEN MAP modal START */}


                    {this.state.show_unautorize_dont_open_map_modal &&

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.show_unautorize_dont_open_map_modal}
                            onRequestClose={() => {
                                this.setState({
                                    show_unautorize_dont_open_map_modal: false
                                })
                            }}
                        >
                            <TouchableOpacity
                                style={[styles.centeredView]}
                                onPress={() => {

                                    this.setState({
                                        show_unautorize_dont_open_map_modal: false
                                    })
                                }}
                            >

                                <TouchableHighlight>
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
                                                        show_unautorize_dont_open_map_modal:false,
                                                    })
                                                    this.goToLogin()
                                                }}>
                                                <Text style={[styles.textStyle, {color: '#8F7000'}, {fontFamily:'FiraSans_400Regular'}]}>
                                                    {/*ЗАРЕГЕСТРИРОВАТЬСЯ*/}
                                                    {this.state.language.sign_up}

                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={{marginLeft:16}}
                                                onPress={() => {
                                                    this.setState({
                                                        show_unautorize_dont_open_map_modal:false,
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

                                </TouchableHighlight>
                            </TouchableOpacity>
                        </Modal>

                    }


                {/* Unautorize DONT OPEN MAP modal END */}



                {/* Unautorize Reserv table or room modal START */}


                    {this.state.show_unautorize_reserv_table_or_room &&

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.show_unautorize_reserv_table_or_room}
                        onRequestClose={() => {
                            this.setState({
                                show_unautorize_reserv_table_or_room: false
                            })
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.centeredView]}
                            onPress={() => {
                                this.setState({
                                    show_unautorize_reserv_table_or_room: false
                                })
                            }}
                        >

                            <TouchableHighlight>
                                <View style={[styles.modalView, {backgroundColor: '#FDF5D8'}]}>

                                    <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                        {/*Чтобы забронировать место зарегистрируйтесь или войдите.*/}
                                        {this.state.language.modal_text1}
                                    </Text>

                                    <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>
                                        <TouchableOpacity
                                            style={[]}
                                            onPress={() => {

                                                this.setState({
                                                    show_unautorize_reserv_table_or_room: false
                                                })
                                                this.goToLogin()
                                            }}>
                                            <Text style={[styles.textStyle, {color: '#8F7000'}, {fontFamily:'FiraSans_400Regular'}]}>
                                                {/*ЗАРЕГЕСТРИРОВАТЬСЯ*/}
                                                {this.state.language.sign_up}
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{marginLeft:16}}
                                            onPress={() => {
                                                this.setState({
                                                    show_unautorize_reserv_table_or_room: false
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

                            </TouchableHighlight>
                        </TouchableOpacity>
                    </Modal>

                    }


                {/* Unautorize Reserv table or room modal END */}

                <ScrollView style={{ flex:1, width:'100%', backgroundColor:'#F9F3F1'}}
                    onScroll={event => {

                        if (event.nativeEvent.contentOffset.y > 10) {
                            this.setState({
                                more_description_button: false
                            })
                        } else {
                            this.setState({
                                more_description_button: true
                            })
                        }
                    }}
                >

                    <View style={styles.objectTitle}>

                        <View style={styles.objectTitle2}>
                            <Text style={[styles.objectTitleText, {fontFamily:'Ubuntu_500Medium'}]}>
                                {this.props.object_data.data.NAME ? this.props.object_data.data.NAME : ''}
                            </Text>
                        </View>

                        <View style={{backgroundColor:'#00000047', width:'100%', height:2, position:'absolute', bottom:-1, zIndex: 222}}>

                        </View>

                    </View>


                   <View style={{width:'100%', height:194, position:'relative'}}>

                       {this.props.object_data.data.PREVIEW_PICTURE &&
                            <Image style={{width:'100%', height:'100%'}} source={{uri:this.previewImage()}} />
                       }


                       {this.sliderImages().length > 0 &&

                           <TouchableOpacity
                               onPress={()=> this.setState({galleryModal:true}) }
                               style={styles.galleryModal}
                           >
                               <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <Path fillRule="evenodd" clipRule="evenodd" d="M15.828 8.172a.5.5 0 00.707 0L23 1.708V6.25a.5.5 0 101 0V.5a.5.5 0 00-.5-.5h-5.75a.5.5 0 100 1h4.543l-6.465 6.465a.5.5 0 000 .707zm-8.363 7.656a.5.5 0 11.707.707L1.708 23H6.25a.5.5 0 010 1H.5a.5.5 0 01-.5-.5v-5.75a.5.5 0 111 0v4.542l6.465-6.464zm9.07 0a.5.5 0 00-.707.707L22.293 23H17.75a.5.5 0 100 1h5.75a.5.5 0 00.5-.5v-5.75a.5.5 0 10-1 0v4.542l-6.465-6.464zm-9.07-7.656a.5.5 0 10.707-.707L1.708 1H6.25a.5.5 0 000-1H.5a.5.5 0 00-.5.5v5.75a.5.5 0 001 0V1.707l6.465 6.464z" fill="#fff"/>
                               </Svg>

                           </TouchableOpacity>

                       }


                   </View>


                    {/*{(this.props.object_data.data.PROPERTIES.BOOKING_ROOM.VALUE == '1' || this.props.object_data.data.PROPERTIES.BOOKING_TABLE.VALUE == '1' || this.checkMenu()) ?*/}

                    {/*    <ScrollView horizontal={true}  style={{width:'100%', height:48, }}>*/}

                    {/*        {this.printButtons()}*/}

                    {/*    </ScrollView>*/}

                    {/*    :*/}

                    {/*    <View  style={{width:'100%', height:48, }}>*/}

                    {/*        {this.printButtons()}*/}

                    {/*    </View>*/}

                    {/*}*/}



                    {this.state.tabs_count_array.length === 3 ?


                        <View   style={{width:'100%', height:48}}>

                            {this.printButtons()}

                        </View>


                        :


                        <ScrollView horizontal={true}  style={{width:'100%', height:48, }}>

                            {this.printButtons()}

                        </ScrollView>

                    }







                    {/*DESCRIPTION TAB START*/}

                    <View style={[{width:'100%', paddingHorizontal: 16, paddingTop:16, paddingBottom: 80, backgroundColor:'#F9F3F1'}, !this.state.description_tab ? {display:'none'} : {}]}>

                        <RenderHtml
                            style={{width: '100%'}}
                            contentWidth={windowWidth}
                            source={
                                {html: this.escapeHtml(this.props.object_data.data.DETAIL_TEXT ? this.props.object_data.data.DETAIL_TEXT : '')}
                            }
                        />
                        <Text style={{width:'100%', color:'#44434C', fontSize:16, fontFamily:'FiraSans_400Regular'}}>

                            {/*{this.props.object_data.data.PREVIEW_TEXT ? this.props.object_data.data.PREVIEW_TEXT : ''}*/}
                            {/*{this.props.object_data.data.DETAIL_TEXT ? this.props.object_data.data.DETAIL_TEXT : ''}*/}

                        </Text>
                    </View>

                    {/*DESCRIPTION TAB END*/}


                    {/* AUDIOGID TAB START*/}

                        <View style={[{width:'100%', paddingHorizontal: 16, minHeight:250, paddingTop:16, backgroundColor:'#F9F3F1'}, !this.state.audio_tab ? {display:'none'} : {}]}>
                        <View style={this.state.audio_tab === false ? {display:'none'} : {}}>

                                <Video
                                    ref={this._mountVideo}
                                    style={[ styles.video,{opacity:  0.0,} ]}
                                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                                    onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                                    onLoadStart={this._onLoadStart}
                                    onLoad={this._onLoad}
                                    onError={this._onError}
                                    onFullscreenUpdate={this._onFullscreenUpdate}
                                    onReadyForDisplay={this._onReadyForDisplay}
                                    useNativeControls={this.state.useNativeControls}
                                />

                        </View>


                        <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center', marginBottom:25}}>

                            <Svg style={{marginRight:10}} width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path  fillRule="evenodd"  clipRule="evenodd"  d="M11.687 1.03c-.725 0-1.397.24-1.94.646l3.899 3.948c.75-.853 1.063-1.581 1.192-2.179-.39-1.397-1.656-2.415-3.151-2.415zM7.83 8.802l-3.88 3.93-.748-.757 3.653-4.16.975.987zM9.987 7.71l-.915.927L7.19 6.73l-.192-.194.915-.927L9.987 7.71zm2.959-1.372c-.736.681-1.31 1.006-1.764 1.16L8.431 4.711a3.337 3.337 0 01.614-2.323l3.9 3.949zM8.806.724l.232.235a4.225 4.225 0 012.649-.93c2.367 0 4.275 1.942 4.275 4.323a4.336 4.336 0 01-.923 2.682l.239.242a.5.5 0 11-.712.703l-.23-.234a4.225 4.225 0 01-2.968.917l-1.483 1.5a.5.5 0 01-.711 0L9 9.988l-4.531 4.02a.5.5 0 01-.688-.022l-1.617-1.638a.5.5 0 01-.02-.682L6.15 7.102l-.212-.215a.5.5 0 010-.703L7.424 4.68a4.335 4.335 0 01.91-3.01l-.239-.243a.5.5 0 01.712-.703zm.372 10.37a.5.5 0 01.707.004l.54.546a.5.5 0 01.144.351v5.46a.5.5 0 11-1 0V12.2l-.395-.4a.5.5 0 01.004-.707z"  fill="#FF9161"/>
                            </Svg>


                            {this.props.object_data.data.PROPERTIES.AUDIOGUIDE.NAME &&

                                <Text style={{color: '#54535F', fontSize:14, fontFamily: 'FiraSans_400Regular' }}>{this.props.object_data.data.PROPERTIES.AUDIOGUIDE.NAME}</Text>

                            }

                            {!this.props.object_data.data.PROPERTIES.AUDIOGUIDE.NAME &&

                                <Text style={{color: '#54535F', fontSize:14, fontFamily: 'FiraSans_400Regular' }}>Не известно</Text>

                            }
                        </View>


                        {/*MUSIC LINE START*/}

                        <View  style={[styles.playbackContainer,{opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0 }, this.state.audio_tab === false ? {display:'none'} : {} ]}>
                            <Slider
                                style={[styles.playbackSlider,this.state.audio_tab === false ? {opacity:0} : {}]}
                                // trackImage={ICON_TRACK_1.module}
                                // thumbImage={ICON_TRACK_1.module}

                                value={this._getSeekSliderPosition()}
                                // onValueChange={this._onSeekSliderValueChange}
                                onSlidingComplete={this._onSeekSliderSlidingComplete}
                                disabled={this.state.isLoading}
                                minimumTrackTintColor="#DC5318"
                                maximumTrackTintColor="#F5BCA3"
                                thumbTintColor="#DC5318"

                            />
                            {/*MUSIC TIME*/}

                            <View style={styles.timestampRow}>

                                <Text style={[ styles.text,styles.timestamp]}>
                                    {this._getTimestamp().current}
                                </Text>

                                <Text style={[ styles.text,styles.timestamp]}>
                                    {this._getTimestamp().full}
                                </Text>

                            </View>
                        </View>

                        {/*MUSIC LINE END*/}



                        {/*PLAY START*/}

                        <View style={[{width:'100%', marginTop:44, justifyContent:'center', flexDirection:'row', alignItems:'center', },{ opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0},this.state.audio_tab === false ? {display:'none'} : {} ]} >


                            <TouchableOpacity onPress={() => {

                                if(this.state.prev15_active)
                                {
                                    this.prev15()
                                }
                            }}>
                                <Svg  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                    <Path fillRule="evenodd" clipRule="evenodd" d="M22.93 11.982c0 6.046-4.901 10.948-10.948 10.948-6.046 0-10.948-4.902-10.948-10.948a.5.5 0 10-1 0c0 6.599 5.35 11.948 11.948 11.948 6.599 0 11.948-5.35 11.948-11.948C23.93 5.383 18.58.034 11.982.034A11.914 11.914 0 003.324 3.75V1.679a.5.5 0 00-1 0v3.434a.5.5 0 00.5.5h3.434a.5.5 0 000-1H3.886a10.917 10.917 0 018.096-3.579c6.047 0 10.948 4.902 10.948 10.948zM.458 8.817a.5.5 0 00.962.273l.118-.401a.5.5 0 00-.956-.291c-.044.138-.085.278-.124.419zM10.25 16V7.972h-.972L6.794 9.508l.48.78 1.872-1.14V16h1.104zm3.272-7.164h3.132l.156-.864h-4.344v4.044h.864c.2-.096.388-.164.564-.204.176-.048.368-.072.576-.072.448 0 .804.132 1.068.396s.396.688.396 1.272c0 .584-.148 1.036-.444 1.356-.288.32-.688.48-1.2.48-.344 0-.652-.06-.924-.18a2.846 2.846 0 01-.792-.576l-.648.636c.328.336.684.592 1.068.768.384.168.82.252 1.308.252.552 0 1.036-.112 1.452-.336.424-.232.752-.552.984-.96.232-.416.348-.888.348-1.416 0-.792-.208-1.412-.624-1.86-.416-.456-.968-.684-1.656-.684a2.79 2.79 0 00-1.284.312V8.836z" fill="#491C08"/>
                                </Svg>
                            </TouchableOpacity>

                            <TouchableOpacity
                                underlayColor={BACKGROUND_COLOR}
                                style={[styles.wrapper, {marginLeft:40, marginRight:40}]}
                                onPress={this._onPlayPausePressed}
                                disabled={this.state.isLoading}
                            >

                                {this.state.isPlaying &&

                                <Svg  fill='#491C08'  width={24}  height={20}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"  xmlSpace="preserve"  enableBackground="new 0 0 512 512">
                                    <Path d="M224 435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8 0-12.2 5.4-12.2 12.1v359.7c0 6.7 5.4 12.2 12.2 12.2h71.6c6.8 0 12.2-5.4 12.2-12.2zM371.8 64h-71.6c-6.7 0-12.2 5.4-12.2 12.1v359.7c0 6.7 5.4 12.2 12.2 12.2h71.6c6.7 0 12.2-5.4 12.2-12.2V76.1c0-6.7-5.4-12.1-12.2-12.1z" />
                                </Svg>
                                }

                                {!this.state.isPlaying &&

                                <Svg  width={20}  height={20}  viewBox="0 0 17 20"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M16.5 9.134a1 1 0 010 1.732l-15 8.66A1 1 0 010 18.66V1.34A1 1 0 011.5.474l15 8.66z" fill="#491C08" />
                                </Svg>

                                }

                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {

                                if(this.state.next15_active)
                                {
                                    this.next15()
                                }
                            }}>
                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path  fillRule="evenodd"  clipRule="evenodd"  d="M1.034 11.982c0 6.047 4.901 10.948 10.948 10.948 6.046 0 10.948-4.901 10.948-10.948a.5.5 0 111 0c0 6.599-5.35 11.948-11.948 11.948C5.383 23.93.034 18.58.034 11.982.034 5.384 5.384.034 11.982.034c3.408 0 6.482 1.428 8.658 3.716V1.679a.5.5 0 011 0v3.434a.5.5 0 01-.5.5h-3.434a.5.5 0 010-1h2.372a10.917 10.917 0 00-8.096-3.579c-6.047 0-10.948 4.902-10.948 10.948zm22.472-3.165a.5.5 0 01-.962.273l-.118-.401a.5.5 0 01.956-.291c.044.139.085.278.124.419zM10.25 16V7.972h-.972L6.794 9.508l.48.78 1.872-1.14V16h1.104zm3.272-7.164h3.132l.156-.864h-4.344v4.044h.864c.2-.096.388-.164.564-.204.176-.048.368-.072.576-.072.448 0 .804.132 1.068.396s.396.688.396 1.272c0 .584-.148 1.036-.444 1.356-.288.32-.688.48-1.2.48-.344 0-.652-.06-.924-.18a2.846 2.846 0 01-.792-.576l-.648.636c.328.336.684.592 1.068.768.384.168.82.252 1.308.252.552 0 1.036-.112 1.452-.336.424-.232.752-.552.984-.96.232-.416.348-.888.348-1.416 0-.792-.208-1.412-.624-1.86-.416-.456-.968-.684-1.656-.684a2.79 2.79 0 00-1.284.312V8.836z"  fill="#491C08"/>
                                </Svg>
                            </TouchableOpacity>


                        </View>

                        {/*PLAY END*/}


                    </View>

                    {/* AUDIOGID TAB END*/}




                    {/*CONTACT TAB START*/}

                    {this.state.contacts_tab &&

                        <View style={[{width:'100%', paddingHorizontal: 16, marginTop: 16}, !this.state.contacts_tab ? {display:'none'} : {}]}>


                            <View style={{width:'100%', minHeight:208, position:'relative'}}>


                                <TouchableOpacity onPress={()=> this.setState({bigMap:true}) } style={{position:'absolute', bottom:16, right:16, zIndex: 555}}>
                                    <Svg  width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M15.828 8.172a.5.5 0 00.707 0L23 1.708V6.25a.5.5 0 101 0V.5a.5.5 0 00-.5-.5h-5.75a.5.5 0 100 1h4.543l-6.465 6.465a.5.5 0 000 .707zm-8.363 7.656a.5.5 0 11.707.707L1.708 23H6.25a.5.5 0 010 1H.5a.5.5 0 01-.5-.5v-5.75a.5.5 0 111 0v4.542l6.465-6.464zm9.07 0a.5.5 0 00-.707.707L22.293 23H17.75a.5.5 0 100 1h5.75a.5.5 0 00.5-.5v-5.75a.5.5 0 10-1 0v4.542l-6.465-6.464zm-9.07-7.656a.5.5 0 10.707-.707L1.708 1H6.25a.5.5 0 000-1H.5a.5.5 0 00-.5.5v5.75a.5.5 0 001 0V1.707l6.465 6.464z"  fill="#1D1D20"/>
                                    </Svg>
                                </TouchableOpacity>


                                <MapView
                                    onPress={e => console.log(e.nativeEvent)}
                                    style={{ flex: 1,width:'100%', height:'100%'}}
                                    provider='google'
                                    mapType='standard'
                                    showsScale
                                    showsCompass
                                    showsPointsOfInterest
                                    showsBuildings
                                    initialRegion={{
                                        latitude: this.state.latitude ,
                                        longitude: this.state.longitude ,
                                        latitudeDelta: 0.02,
                                        longitudeDelta: 0.02
                                    }}
                                    // onMapReady={this.onMapLayout}
                                    onMapLoaded={this.onMapLayout}
                                    provider={PROVIDER_GOOGLE}
                                    loadingEnabled={true}
                                    scrollEnabled={false}
                                >


                                    { this.state.isMapReady &&
                                    <Marker
                                        title={this.props.title}
                                        coordinate={{
                                            latitude: this.state.latitude,
                                            longitude: this.state.longitude
                                        }}

                                    />
                                    }
                                </MapView>


                                <TouchableOpacity
                                    onPress={()=> {

                                        if (this.state.isLogin) {
                                            this.openGps()
                                        } else {

                                            this.setState({
                                                show_unautorize_modal: true
                                            })

                                        }
                                    }}
                                    style={{position:'absolute', bottom:16, left:16, zIndex: 555, paddingHorizontal:12, paddingVertical:8, flexDirection:'row', backgroundColor:'#2EC5FF', borderRadius:8}}
                                >

                                    <Svg  width={18}  height={18}  viewBox="0 0 18 18"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M16 4c0 3-2.5 6-4 6S8 7 8 4a4 4 0 118 0zM.5 3.5A.5.5 0 011 3h5a.5.5 0 01.5.5v8h8v-1a.5.5 0 011 0V17a.5.5 0 01-.5.5H1a.5.5 0 01-.5-.5V3.5zm14 9H8.793l4.4 4H14.5v-4zm-2.793 4l-4.4-4H6.5v4h5.207zm-6.207 0v-4h-2v4h2zm-3 0v-4h-1v4h1zm-1-5h4v-4h-4v4zm0-5h4V4h-4v2.5zm11-4.5a.5.5 0 00-1 0v2a.5.5 0 001 0V2zm0 3.5a.5.5 0 00-1 0V6a.5.5 0 001 0v-.5z" fill="#032B3A"/>
                                    </Svg>

                                    <Text style={{marginLeft:10, fontFamily:'FiraSans_500Medium'}}>

                                        {this.state.language.get_directions}

                                    </Text>
                                </TouchableOpacity>

                            </View>




                            <Modal
                                style={{height:200}}
                                animationType="slide"
                                transparent={true}
                                visible={this.state.bigMap}
                                onRequestClose={() => {
                                    this.closeModal()
                                }}>

                                <View style={[{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}]}>

                                    <View style={[{backgroundColor:'white',width:'95%', height:'97%', borderRadius: 15, overflow:'hidden'}, styles.mapsModal]}>

                                        <TouchableOpacity onPress={()=> this.setState({bigMap:false}) } style={[{position:'absolute', top:16, right:16, zIndex: 555},  Platform.OS === 'ios' ? {top:36} : {}]}>
                                            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M12 0C8.793 0 5.772 1.241 3.517 3.517 1.241 5.772 0 8.793 0 12c0 3.207 1.241 6.228 3.517 8.483A11.893 11.893 0 0012 24c3.207 0 6.228-1.241 8.483-3.517A11.893 11.893 0 0024 12c0-3.207-1.241-6.228-3.517-8.483C18.228 1.241 15.207 0 12 0zm0 1.241c2.876 0 5.566 1.117 7.614 3.145S22.759 9.124 22.759 12c0 2.876-1.117 5.566-3.145 7.614-2.048 2.027-4.738 3.145-7.614 3.145-2.876 0-5.566-1.117-7.614-3.145S1.241 14.876 1.241 12c0-2.876 1.117-5.566 3.145-7.614S9.124 1.241 12 1.241zM9.22 8.586a.575.575 0 00-.427.187.6.6 0 000 .868L11.131 12l-2.358 2.338a.6.6 0 000 .869c.124.124.29.186.434.186.145 0 .31-.062.434-.186L12 12.869l2.338 2.338c.124.124.29.186.435.186.144 0 .31-.062.434-.186a.6.6 0 000-.869L12.869 12l2.338-2.338a.644.644 0 00.02-.89.6.6 0 00-.868 0L12 11.133l-2.338-2.36a.625.625 0 00-.442-.186z" fill="#1D1D20"                                           />
                                            </Svg>
                                        </TouchableOpacity>

                                        <MapView
                                            onPress={e => console.log(e.nativeEvent)}
                                            style={[{ flex: 1,width:'100%', height:'100%', borderRadius:15}]}
                                            provider='google'
                                            mapType='standard'
                                            showsScale
                                            showsCompass
                                            showsPointsOfInterest
                                            showsBuildings
                                            initialRegion={{
                                                latitude: this.state.latitude,
                                                longitude: this.state.longitude,
                                                latitudeDelta: 0.02,
                                                longitudeDelta: 0.02
                                            }}
                                            // onMapReady={this.onMapLayout}
                                            onMapLoaded={this.onMapLayout}
                                            // provider={PROVIDER_GOOGLE}
                                            loadingEnabled={true}
                                            scrollEnabled={false}
                                        >


                                            { this.state.isMapReady &&
                                            <Marker
                                                title={this.props.title}
                                                coordinate={{
                                                    latitude: this.state.latitude,
                                                    longitude: this.state.longitude
                                                }}

                                            />
                                            }
                                        </MapView>

                                        <TouchableOpacity onPress={()=> {

                                            if (this.state.isLogin) {
                                                this.openGps()
                                            } else {
                                                this.setState({
                                                    show_unautorize_modal: true
                                                })
                                            }

                                        }}
                                            style={{position:'absolute', bottom:16, left:16, zIndex: 555, paddingHorizontal:12, paddingVertical:8, flexDirection:'row', backgroundColor:'#2EC5FF', borderRadius:8}}
                                        >
                                            <Svg  width={18}  height={18}  viewBox="0 0 18 18"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                                <Path fillRule="evenodd" clipRule="evenodd" d="M16 4c0 3-2.5 6-4 6S8 7 8 4a4 4 0 118 0zM.5 3.5A.5.5 0 011 3h5a.5.5 0 01.5.5v8h8v-1a.5.5 0 011 0V17a.5.5 0 01-.5.5H1a.5.5 0 01-.5-.5V3.5zm14 9H8.793l4.4 4H14.5v-4zm-2.793 4l-4.4-4H6.5v4h5.207zm-6.207 0v-4h-2v4h2zm-3 0v-4h-1v4h1zm-1-5h4v-4h-4v4zm0-5h4V4h-4v2.5zm11-4.5a.5.5 0 00-1 0v2a.5.5 0 001 0V2zm0 3.5a.5.5 0 00-1 0V6a.5.5 0 001 0v-.5z" fill="#032B3A"/>
                                            </Svg>

                                            <Text style={{marginLeft:10,  fontFamily:'FiraSans_500Medium'}}>
                                                {/*ПРОЛОЖИТЬ МАРШРУТ*/}
                                                {this.state.language.get_directions}
                                            </Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>


                            <View style={{width:'100%', flexDirection:'row', alignItems:'center', marginBottom: 16, marginTop:16}}>
                                <View style={{marginRight:8}}>
                                    <Svg  width={18}  height={18}  viewBox="0 0 18 18"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M3 7.038C3 3.701 5.689 1 9 1c3.31 0 6 2.7 6 6.038 0 .86-.362 1.917-.959 3.058-.591 1.13-1.385 2.29-2.189 3.34A42.768 42.768 0 019 16.78a42.767 42.767 0 01-2.853-3.343c-.803-1.05-1.597-2.21-2.188-3.34C3.362 8.955 3 7.897 3 7.038zm5.645 10.814L9 17.499l-.355.353a.5.5 0 00.71 0L9 17.499l.355.353.001-.002.004-.004.015-.015.056-.057.21-.218a43.793 43.793 0 003.006-3.512c.822-1.075 1.653-2.285 2.28-3.484C15.549 9.37 16 8.14 16 7.037 16 3.154 12.868 0 9 0 5.13 0 2 3.154 2 7.038c0 1.102.45 2.333 1.073 3.521.627 1.2 1.458 2.41 2.28 3.485a43.796 43.796 0 003.216 3.73l.056.057.015.015.004.004v.001h.001zM12 7a3 3 0 11-6 0 3 3 0 016 0zm1 0a4 4 0 11-8 0 4 4 0 018 0z" fill="#9F9EAE"/>
                                    </Svg>
                                </View>

                                <View style={{flex:1}}>

                                    <View style={{flexDirection:'row', }}>
                                        <Text style={{color:'#44434C', fontSize:14,  fontFamily:'FiraSans_400Regular'}}>
                                            {this.state.address}
                                        </Text>
                                    </View>

                                </View>
                            </View>



                            {/*PHONES START*/}

                            {this.props.object_data.data.PROPERTIES.PHONE.VALUE.length > 0 && this.props.object_data.data.PROPERTIES.PHONE.VALUE[0] !== null &&

                                <View style={{width:'100%', flexDirection:'row', alignItems:'flex-start', marginBottom: 8}}>
                                    <View style={{marginRight:8}}>
                                        <Svg  width={18}  height={18}  viewBox="0 0 18 18"  fill="none"  xmlns="http://www.w3.org/2000/svg" >
                                            <Path d="M16 14.143c0 .563-2.746 2.792-3.907 2.856a.178.178 0 01-.095-.023C3.563 12.4 3 4.428 3 3.857 3 3.286 6.391 1 6.957 1c.565 0 2.26 4 2.26 4.571 0 .419-1.263 1.189-2.055 1.608a.203.203 0 00-.072.296l2.58 3.65a.202.202 0 00.275.053c.614-.4 1.686-1.035 2.098-1.035.566 0 3.957 3.428 3.957 4z" stroke="#9F9EAE" strokeLinecap="round" strokeLinejoin="round" />
                                            <Mask id="a"style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x={3} y={1} width={13} height={16}>
                                                <Path d="M16 14.143c0 .563-2.746 2.792-3.907 2.856a.178.178 0 01-.095-.023C3.563 12.4 3 4.428 3 3.857 3 3.286 6.391 1 6.957 1c.565 0 2.26 4 2.26 4.571 0 .419-1.263 1.189-2.055 1.608a.203.203 0 00-.072.296l2.58 3.65a.202.202 0 00.275.053c.614-.4 1.686-1.035 2.098-1.035.566 0 3.957 3.428 3.957 4z" fill="#C4C4C4"/>
                                            </Mask>
                                            <G mask="url(#a)" fill="#9F9EAE"><Path d="M4.13 8.229v-6.4a.2.2 0 00-.249-.195l-1.898.48a.2.2 0 00-.144.142L.242 8.176a.2.2 0 00.193.253H3.93a.2.2 0 00.2-.2zM12.043 15.286c.813 0 2.901-1.537 4.137-2.54.14-.113.35 0 .33.18l-.498 4.538a.2.2 0 01-.109.156l-3.228 1.632a.2.2 0 01-.139.015l-4.353-1.1a.2.2 0 01-.135-.116l-1.5-3.538a.2.2 0 01.233-.273c1.617.4 4.43 1.046 5.262 1.046z" /></G>
                                        </Svg>
                                    </View>

                                    <View style={{flex:1}}>


                                        {this.props.object_data.data.PROPERTIES.PHONE.VALUE.map((phone, index) => {
                                            return (

                                                <TouchableOpacity
                                                    key={index}
                                                    style={{flexDirection:'row', }}
                                                    onPress={() => {

                                                        let new_phone = phone.replace(/\D/g, '');
                                                        // let url = `tel:${new_phone}`;
                                                        let url = Platform.OS !== 'android' ? `tel://${new_phone}` : `tel:${new_phone}`;

                                                        // Linking.openURL(url)
                                                        console.log(url, 'phone')
                                                        Linking.canOpenURL(url)
                                                            .then((supported) => {
                                                                if (supported) {
                                                                    return Linking.openURL(url)
                                                                        .catch(() => null);
                                                                }
                                                            });
                                                    }}
                                                >

                                                    <Text style={{color:'#44434C', fontSize:14, marginBottom:8, fontFamily:'FiraSans_400Regular'}}>
                                                        {phone}
                                                    </Text>

                                                </TouchableOpacity>

                                            );})
                                        }

                                        {!this.props.object_data.data.PROPERTIES.PHONE.VALUE[0] &&

                                            <Text style={{color:'#44434C', fontSize:14, marginBottom:8,fontFamily:'FiraSans_400Regular'}}>Не указан</Text>

                                        }


                                    </View>


                                </View>

                            }

                            {/*PHONES END*/}


                            {/*FAX START*/}

                            {this.props.object_data.data.PROPERTIES.FAX.VALUE !== null &&

                                <View style={{flex:1, flexDirection:'row', marginBottom:16 }}>
                                    <Svg  width={19}  height={18}  viewBox="0 0 19 18"  fill="none"  xmlns="http://www.w3.org/2000/svg"  >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M9 6.5a.5.5 0 01-.5-.5v-.665H7.477a.5.5 0 00-.5.5v9.66a.5.5 0 00.5.5h9.026a.5.5 0 00.5-.5v-9.66a.5.5 0 00-.5-.5H15.5V6a.5.5 0 01-.5.5H9zm6.5-2.165V2a.5.5 0 00-.5-.5H9a.5.5 0 00-.5.5v2.335H7.477a1.5 1.5 0 00-1.5 1.5v9.66a1.5 1.5 0 001.5 1.5h9.026a1.5 1.5 0 001.5-1.5v-9.66a1.5 1.5 0 00-1.5-1.5H15.5zM9.5 2.5v3h5v-3h-5zm.7 6.1a.6.6 0 11-1.2 0 .6.6 0 011.2 0zm2.4 0a.6.6 0 11-1.2 0 .6.6 0 011.2 0zm1.8.6a.6.6 0 100-1.2.6.6 0 000 1.2zM10.2 11A.6.6 0 119 11a.6.6 0 011.2 0zm1.8.6a.6.6 0 100-1.2.6.6 0 000 1.2zm3-.6a.6.6 0 11-1.2 0 .6.6 0 011.2 0zm-5.4 3a.6.6 0 100-1.2.6.6 0 000 1.2zm3-.6a.6.6 0 11-1.2 0 .6.6 0 011.2 0zm1.8.6a.6.6 0 100-1.2.6.6 0 000 1.2zM4.477 2.079a.5.5 0 01.5.5v12.886a1.5 1.5 0 01-1.5 1.5H1.51a1.5 1.5 0 01-1.5-1.5V5.893a1.5 1.5 0 011.5-1.5h1.966c.175 0 .344.03.5.086v-1.9a.5.5 0 01.5-.5zM1.51 5.393a.5.5 0 00-.5.5v9.572a.5.5 0 00.5.5h1.967a.5.5 0 00.5-.5V5.893a.5.5 0 00-.5-.5H1.51z" fill="#9F9EAE" />
                                    </Svg>
                                    <View style={{flexDirection:'row',marginLeft:8 }}>



                                        <Text style={{color:'#44434C', fontSize:14, fontFamily:'FiraSans_400Regular'}}>
                                            {this.state.object_data.data.PROPERTIES.FAX.VALUE}
                                        </Text>


                                        {!this.props.object_data.data.PROPERTIES.FAX.VALUE &&

                                            <Text style={{color:'#44434C', fontSize:14, fontFamily:'FiraSans_400Regular'}}>
                                                Не указан
                                            </Text>

                                        }
                                    </View>

                                </View>

                            }

                            {/*FAX END*/}




                            {/*Mail START*/}
                            {this.props.object_data.data.PROPERTIES.MAIL.VALUE.length > 0 && this.props.object_data.data.PROPERTIES.MAIL.VALUE[0] !== null &&
                              <View style={{width:'100%', flexDirection:'row', alignItems:'flex-start', marginBottom: 17}}>
                                <View style={{marginRight:8}}>
                                    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M1.56 1.073a1.5 1.5 0 00-1.5 1.5v12.89a1.5 1.5 0 001.5 1.5h14.91a1.5 1.5 0 001.5-1.5V2.574a1.5 1.5 0 00-1.5-1.5H1.56zm-.5 1.5a.5.5 0 01.5-.5h14.91a.5.5 0 01.5.5v12.89a.5.5 0 01-.5.5H1.56a.5.5 0 01-.5-.5V2.574zM9 4.999a4 4 0 000 8 .5.5 0 010 1 5 5 0 115-5c0 1.259-.663 2.188-1.625 2.188-.464 0-.859-.216-1.143-.58a2.75 2.75 0 11.518-1.55c.017.942.465 1.13.625 1.13.162 0 .625-.196.625-1.188a4 4 0 00-4-4zm1.75 4V8.97a1.75 1.75 0 100 .03z" fill="#9F9EAE"  />
                                    </Svg>
                                </View>

                                <View style={{flex:1}}>
                                    { this.props.object_data.data.PROPERTIES.MAIL.VALUE.map((email, index) => {
                                        return (

                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL(`mailto:${{email}}`)
                                                }}
                                                key={index} style={{flexDirection:'row', }}>
                                                <Text style={{color:'#44434C', fontSize:14, fontFamily:'FiraSans_400Regular'}}>{email}</Text>
                                            </TouchableOpacity>

                                        );
                                    })}

                                    {!this.props.object_data.data.PROPERTIES.MAIL.VALUE[0] &&

                                    <View  style={{flexDirection:'row', }}>
                                        <Text style={{color:'#44434C', fontSize:14, fontFamily:'FiraSans_400Regular'}}>Не указан</Text>
                                    </View>
                                    }


                                </View>

                            </View>
                            }
                            {/*MAIL END*/}


                            {/*TIME START*/}

                            {this.props.object_data.data.PROPERTIES.hasOwnProperty('TIME') && this.props.object_data.data.PROPERTIES.TIME.VALUE.length > 0 && this.props.object_data.data.PROPERTIES.TIME.VALUE[0].NAME !== null &&

                                <View style={{width:'100%', flexDirection:'row', alignItems:'flex-start', marginBottom: 17}}>

                                    <View style={{marginRight:8}}>
                                        <Svg  width={18}  height={18}  viewBox="0 0 18 18"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                            <Path  fillRule="evenodd"  clipRule="evenodd"  d="M5.783.514a.5.5 0 00-1 0v2.072H2.515a2.5 2.5 0 00-2.5 2.5v10.4a2.5 2.5 0 002.5 2.5H15.47a2.5 2.5 0 002.5-2.5v-10.4a2.5 2.5 0 00-2.5-2.5h-2.268V.514a.5.5 0 10-1 0v2.072H5.783V.514zm6.919 3.072H2.515a1.5 1.5 0 00-1.5 1.5v.071H16.97v-.071a1.5 1.5 0 00-1.5-1.5h-2.768zm4.268 2.571H1.015v9.329a1.5 1.5 0 001.5 1.5H15.47a1.5 1.5 0 001.5-1.5V6.157zM9.493 8.743a.5.5 0 00-1 0v3.086a.5.5 0 00.151.358l1.59 1.543a.5.5 0 00.696-.717l-1.437-1.396V8.743z"  fill="#9F9EAE" />
                                        </Svg>
                                    </View>

                                    <View style={{flex:1, width:'100%'}}>

                                        {this.props.object_data.data.PROPERTIES.hasOwnProperty('TIME') && this.props.object_data.data.PROPERTIES.TIME.VALUE.map((time, index) => {

                                            console.log(this.props.object_data.data.PROPERTIES.TIME, 'TIME')

                                            return (
                                                <View key={time.VALUE} style={{flexDirection:'row', marginBottom:8, width:'100%' }}>
                                                    <Text style={{color:'#44434C', fontSize:14,  marginRight: 8, fontFamily:'FiraSans_400Regular'}}>{time.VALUE}</Text>
                                                    <Text style={{color:'#55545F', fontSize:13, fontFamily:'FiraSans_400Regular'}}>{time.NAME} </Text>
                                                </View>
                                            );

                                        })}


                                        {!this.props.object_data.data.PROPERTIES.TIME &&

                                            <View  style={{flexDirection:'row', marginBottom:8, width:'100%' }}>
                                                <Text style={{color:'#44434C', fontSize:14,  marginRight: 8, fontFamily:'FiraSans_400Regular'}}>Не указан</Text>
                                            </View>

                                        }

                                    </View>
                                </View>
                            }
                            {/*TIME END*/}


                            <View style={ styles.weekDaysWrapper}>


                                <View style={[{fontFamily:'Ubuntu_400Regular'},styles.weekDaysWrapperItem, styles.borderRightUnset, this.state.MONDAY === true  ?  styles.weekDaysWrapperItemActive : {}]}>
                                    <Text style={[styles.weekDaysWrapperItemText, this.state.MONDAY === true  ?  styles.weekDaysWrapperItemTextActive : {}]}>
                                        ПН
                                    </Text>
                                </View>


                                <View style={[{fontFamily:'Ubuntu_400Regular'},styles.weekDaysWrapperItem, styles.borderRightUnset,this.state.TUESDAY === true  ?  styles.weekDaysWrapperItemActive : {}]}>
                                    <Text style={[styles.weekDaysWrapperItemText,this.state.TUESDAY === true  ?  styles.weekDaysWrapperItemTextActive : {}]}>
                                        ВТ
                                    </Text>
                                </View>


                                <View style={[{fontFamily:'Ubuntu_400Regular'},styles.weekDaysWrapperItem, styles.borderRightUnset,this.state.WEDNESDAY === true  ?  styles.weekDaysWrapperItemActive : {}]}>
                                    <Text style={[styles.weekDaysWrapperItemText,this.state.WEDNESDAY === true  ?  styles.weekDaysWrapperItemTextActive : {}]}>
                                        СР
                                    </Text>
                                </View>


                                <View style={[{fontFamily:'Ubuntu_400Regular'},styles.weekDaysWrapperItem, styles.borderRightUnset, this.state.THURSDAY === true  ?  styles.weekDaysWrapperItemActive : {}]}>
                                    <Text style={[styles.weekDaysWrapperItemText, this.state.THURSDAY === true  ?  styles.weekDaysWrapperItemTextActive : {}]}>
                                        ЧТ
                                    </Text>
                                </View>


                                <View style={[{fontFamily:'Ubuntu_400Regular'},styles.weekDaysWrapperItem, styles.borderRightUnset, this.state.FRIDAY === true  ?  styles.weekDaysWrapperItemActive : {}]}>
                                    <Text style={[styles.weekDaysWrapperItemText, this.state.FRIDAY === true  ?  styles.weekDaysWrapperItemTextActive : {}]}>
                                        ПТ
                                    </Text>
                                </View>


                                <View style={[{fontFamily:'Ubuntu_400Regular'},styles.weekDaysWrapperItem, styles.borderRightUnset, this.state.SATURDAY === true  ?  styles.weekDaysWrapperItemActive : {}]}>
                                    <Text style={[styles.weekDaysWrapperItemText, this.state.SATURDAY === true  ?  styles.weekDaysWrapperItemTextActive : {}]}>
                                        СБ
                                    </Text>
                                </View>


                                <View style={[{fontFamily:'Ubuntu_400Regular'},styles.weekDaysWrapperItem, this.state.SUNDAY === true  ?  styles.weekDaysWrapperItemActive : {}]}>
                                    <Text style={[styles.weekDaysWrapperItemText, this.state.SUNDAY === true  ?  styles.weekDaysWrapperItemTextActive : {}]}>
                                        ВС
                                    </Text>
                                </View>

                            </View>

                        </View>

                    }

                    {/*CONTACT TAB END*/}



                    {/*RESERVE A TABLE TAB START*/}

                        <View style={[{width:'100%', paddingHorizontal: 16, paddingVertical: 16}, !this.state.reserve_a_table ? {display:'none'} : {}]}>

                        {/* Visit Dates input  START */}
                            <View style={styles.inputWrapper}>


                                <View style={[styles.emptyInput, {top:13, zIndex:98}]}>


                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                openVisitDates: true
                                            })
                                        }}
                                    >
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M2 7.5V19a4 4 0 004 4h12a4 4 0 004-4V7.5m-20 0v0A3.5 3.5 0 015.5 4h1M2 7.5h20m0 0v0A3.5 3.5 0 0018.5 4h-1m-11 0V.5m0 3.5h11m0 0V.5" stroke="#C29A0A" strokeLinecap="round"/>
                                        </Svg>

                                    </TouchableOpacity>


                                    { this.state.openVisitDates &&


                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={this.state.visit_dates_for_picker}
                                            mode={'date'}
                                            is24Hour={true}
                                            onChange={(event, selectedDate) => {
                                                this.changeVisitDates(event, selectedDate)
                                            }}
                                        />


                                    }



                                    {/*<DatePicker*/}
                                    {/*    style={{width:30, height:30}}*/}
                                    {/*    mode="date" //The enum of date, datetime and time*/}
                                    {/*    // placeholder="select date"*/}
                                    {/*    format="DD-MM-YYYY"*/}
                                    {/*    minDate="01-01-1940"*/}
                                    {/*    maxDate="30-12-2022"*/}
                                    {/*    confirmBtnText="Confirm"*/}
                                    {/*    cancelBtnText="Cancel"*/}
                                    {/*    customStyles={{*/}
                                    {/*        dateIcon: {position: 'absolute',zIndex:56,},*/}
                                    {/*        dateInput: { display:'none', position: 'absolute', width:0, height:0},*/}
                                    {/*        datePicker: { backgroundColor: "#E1C1B7",},*/}

                                    {/*    }}*/}
                                    {/*    onDateChange={(date) => {*/}
                                    {/*        this.setState({*/}
                                    {/*            visit_dates: date,*/}
                                    {/*            visit_dates_error: false,*/}
                                    {/*            visit_dates_valid: true*/}
                                    {/*        })*/}
                                    {/*        console.log(date)*/}
                                    {/*    }}*/}
                                    {/*    iconComponent={*/}
                                    {/*        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*            <Path d="M2 7.5V19a4 4 0 004 4h12a4 4 0 004-4V7.5m-20 0v0A3.5 3.5 0 015.5 4h1M2 7.5h20m0 0v0A3.5 3.5 0 0018.5 4h-1m-11 0V.5m0 3.5h11m0 0V.5" stroke="#C29A0A" strokeLinecap="round"/>*/}
                                    {/*        </Svg>*/}
                                    {/*    }*/}
                                    {/*/>*/}





                                </View>



                                <TextInput
                                    value={this.state.visit_dates}
                                    // onChangeText={(edit_country) => this.changeCountry(edit_country)}
                                    editable={false}
                                    style={[
                                        styles.input,
                                        this.state.visit_dates_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.visit_dates_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        }
                                    ]}
                                    underlineColorAndroid ='transparent'
                                    label={
                                        <Text
                                            style={[ {color: this.state.visit_dates_error ? '#A4223C' : this.state.visit_dates_valid ? '#337363' : '#55545F' }, {fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Дата*/}
                                            {this.state.language.data}:

                                        </Text>
                                    }
                                    error={false}
                                    // onBlur={() => this.onBlurCountry()}
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    underlineColor='transparent'
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'

                                />


                                {this.state.visit_dates_error  ?

                                    <Text style={[styles.inp_buttom_label, {color: '#A4223C', fontFamily:'FiraSans_400Regular'}]}>
                                        {/*Поле обязательно для заполнения!*/}
                                        {this.state.language.required_field}
                                    </Text>

                                    :

                                    <Text style={[styles.inp_buttom_label, {fontFamily:'FiraSans_400Regular'}]}>
                                        {/*Выберите даты посещения*/}
                                        {this.state.language.select_visit_dates_table}
                                    </Text>
                                }



                            </View>

                        {/* Visit Dates input END */}


                        {/* Guest Count */}

                            <View style={styles.guestCountWrapper}>

                                <TouchableOpacity
                                    style={styles.minusGuest}
                                    onPress={() => {this.minusGuestCountTable()}}
                                >

                                    <Svg  width={18}  height={2}  viewBox="0 0 18 2"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M1 1h16" stroke="#3A2E03" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                                    </Svg>

                                </TouchableOpacity>

                                <TextInput
                                    value={this.state.guest_count_table}
                                    onChangeText={(guest_count_table) => this.setState({guest_count_table:guest_count_table == '' ? 0 : guest_count_table})}
                                    editable={true}
                                    style={[
                                        styles.guestCountInput,
                                        this.state.guest_count_table_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.guest_count_table_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        },
                                        {borderRadius: 0, height: 45, fontFamily:'FiraSans_400Regular'},

                                    ]}
                                    underlineColorAndroid ='transparent'
                                    // label={
                                    //     <Text
                                    //         style={[ {color: this.state.guest_count_error ? '#A4223C' : this.state.guest_count_valid ? '#337363' : '#55545F', textAlign:'center', width: '100%', backgroundColor:'red' },]}>
                                    //         Количество гостей
                                    //     </Text>
                                    // }
                                    placeholder={'Количество гостей'}
                                    error={false}
                                    keyboardType = 'number-pad'

                                    // onBlur={() => this.onBlurCountry()}
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    underlineColor='transparent'
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'

                                />


                                <TouchableOpacity
                                    style={styles.plusGuest}
                                    onPress={() => {this.plusGuestCountTable()}}
                                >
                                    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M8 17a1 1 0 102 0v-7h7a1 1 0 100-2h-7V1a1 1 0 10-2 0v7H1a1 1 0 100 2h7v7z" fill="#3A2E03"/>
                                    </Svg>
                                </TouchableOpacity>


                            </View>

                        {/*  Details   */}

                            <View style={{width: '100%'}}>

                                <TextInput
                                    multiline
                                    placeholder={this.state.language.wishes}
                                    style={[
                                        styles.detailsTextarea,
                                        this.state.visit_details_wishes_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.visit_details_wishes_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        },
                                        {fontFamily:'FiraSans_400Regular'}
                                    ]}
                                    error={false}
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    underlineColor='transparent'
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'
                                    value={this.state.visit_details_wishes}
                                    onChangeText={(visit_details_wishes) =>  {
                                        if(visit_details_wishes.length > 0) {
                                            this.setState({
                                                visit_details_wishes_error: false
                                            })
                                        }
                                        this.setState({visit_details_wishes: visit_details_wishes})
                                    }}

                                    // onChang
                                />


                                {this.state.visit_details_wishes_error ?

                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C', fontSize:12, fontFamily:'FiraSans_400Regular'}]}>
                                        {/*Поле обязательно для заполнения!*/}
                                        {this.state.language.required_field}
                                    </Text>

                                    :

                                    <Text style={[styles.inp_buttom_label, {color:'#9F9EAE', fontSize:12, fontFamily:'FiraSans_400Regular'}]}>
                                        {/*Опишите пожелания по размещению*/}
                                        {this.state.language.describe_your_wishes_for_accommodation}
                                    </Text>


                                }


                            </View>


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
                                            {fontFamily:'FiraSans_400Regular'}
                                        ]
                                        }>
                                        {/*Ф. И. О*/}
                                        {this.state.language.full_name}

                                    </Text>
                                }
                                error={false}
                                underlineColor='transparent'
                                style={[

                                    styles.input,
                                    this.state.edit_fio_valid && {
                                        borderWidth:1, borderColor:'#337363'
                                    },
                                    {fontFamily:'FiraSans_400Regular'}
                                ]}
                                theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                selectionColor='#E1C1B7'
                                activeOutlineColor='transparent'
                            />



                            {this.state.edit_fio_error ?

                                <Text style={[styles.inp_buttom_label, {color:'#A4223C',fontFamily:'FiraSans_400Regular'}]}>

                                       {/*Поле обязательно для заполнения!*/}
                                    {this.state.language.required_field}

                                </Text>

                                :

                                <Text style={[styles.inp_buttom_label, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Введите фамилию, имя, отчество*/}
                                    {this.state.language.enter_last_name_first_name_patronymic}

                                </Text>


                            }



                        </View>


                        {/*  Phone Input */}

                        <View style={styles.inputWrapper}>


                            {this.state.edit_phone_error &&

                                <TouchableOpacity style={styles.emptyInput}
                                                  onPress={( )=> {
                                                      this.clearPhoneInput()
                                                  }}
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


                            <TextInput
                                value={this.state.edit_phone}
                                // onChangeText={(edit_phone) => this.changeRegisterPhone(edit_phone)}
                                onChangeText={(edit_phone) => this.changeReserveTablePhone(edit_phone)}
                                underlineColorAndroid ='transparent'
                                label={
                                    <Text
                                        style={[
                                            {color: this.state.edit_phone_error ? '#A4223C' : this.state.edit_phone_valid ? '#337363' : '#55545F' },
                                            {fontFamily:'FiraSans_400Regular'}
                                        ]}
                                    >


                                {/*Телефон*/}
                                {this.state.language.phone}
                                        <Text style={{color:'red'}}>*</Text>
                                    </Text>
                                }
                                error={false}
                                underlineColor='transparent'
                                style={[
                                    styles.input,
                                    this.state.edit_phone_error && {
                                        borderWidth:1, borderColor:'#A4223C'
                                    },
                                    this.state.edit_phone_valid && {
                                        borderWidth:1, borderColor:'#337363'
                                    },
                                    {fontFamily:'FiraSans_400Regular'}
                                ]}
                                theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                selectionColor='#E1C1B7'
                                activeOutlineColor='transparent'
                            />



                            {this.state.edit_phone_error ?

                                <Text style={[styles.inp_buttom_label, {color:'#A4223C', fontFamily:'FiraSans_400Regular'}]}>
                                    {this.state.edit_phone_error_text}
                                </Text>
                                :

                                <Text style={[styles.inp_buttom_label, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Введите телефон в формате +375 (__) ___-__-__*/}
                                    {this.state.language.enter_your_phone_in_the_format} +375 (__) ___-__-__
                                </Text>

                            }



                        </View>



                            {/*  Email Table  Input START*/}

                            <View style={styles.inputWrapper}>

                                {this.state.edit_email_table_error &&

                                <TouchableOpacity style={styles.emptyInput}
                                      onPress={()=> {
                                          this.clearEditEmailTableInput()
                                      }}
                                >
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                    </Svg>
                                </TouchableOpacity>

                                }

                                {this.state.edit_email_table_valid &&

                                <TouchableOpacity style={styles.emptyInput}>
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                    </Svg>
                                </TouchableOpacity>

                                }


                                <TextInput
                                    value={this.state.edit_email_table}
                                    onChangeText={(edit_email_table) => {
                                        this.changeRoomEmail(edit_email_table)
                                    }}
                                    // onBlur={(edit_email_table) => this.onBlurRegisterEmail()}
                                    style={[
                                        styles.input,
                                        this.state.edit_email_table_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.edit_email_table_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        },
                                        {fontFamily:'FiraSans_400Regular'}
                                    ]}
                                    label={
                                        <Text
                                            style={[
                                                {color: this.state.edit_email_table_error ? '#A4223C' :  this.state.edit_email_table_valid ? '#337363' : '#55545F'  },
                                                {fontFamily:'FiraSans_400Regular'}
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



                                {this.state.edit_email_table_error ?

                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C', fontFamily:'FiraSans_400Regular'}]}>
                                        {this.state.edit_email_table_error_text}
                                    </Text>
                                    :

                                    (
                                        !this.state.edit_email_table_valid &&

                                        <Text style={[styles.inp_buttom_label, {fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Введите адрес электронной почты*/}
                                            {this.state.language.enter_your_email_address}

                                        </Text>
                                    )

                                }

                            </View>

                            {/*  Email Table Input END*/}



                        {/*Book now Button*/}

                        <View style={styles.book_now_wrapper}>

                            <TouchableOpacity style={styles.book_now} onPress={() => this.bookNowTableHandler()}>

                                <Text style={[styles.book_now_text, {fontFamily:'FiraSans_400Regular'}]} >
                                    {/*ЗАБРОНИРОВАТЬ СТОЛИК*/}
                                    {this.state.language.book}
                                </Text>

                            </TouchableOpacity>

                        </View>


                    </View>

                    {/*RESERVE A TABLE TAB END*/}





                    {/*RESERVE A ROOM TAB START*/}

                        <View style={[{width:'100%', paddingHorizontal: 16, paddingVertical: 16}, !this.state.book_a_room  ? {display:'none'} : {}]}>


                            {/* Birth input  START */}

                                 <View style={styles.inputWrapper}>


                                   <View style={{flexDirection:'row'}}>
                                       <View style={{flex:1, marginRight: 10}} >


                                           <View style={[styles.emptyInput, {top:13, zIndex:98}]}>

                                               <TouchableOpacity
                                                   onPress={() => {
                                                       this.setState({
                                                           openVisitDatesFrom: true
                                                       })
                                                   }}
                                               >
                                                   <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <Path d="M2 7.5V19a4 4 0 004 4h12a4 4 0 004-4V7.5m-20 0v0A3.5 3.5 0 015.5 4h1M2 7.5h20m0 0v0A3.5 3.5 0 0018.5 4h-1m-11 0V.5m0 3.5h11m0 0V.5" stroke="#C29A0A" strokeLinecap="round"/>
                                                   </Svg>

                                               </TouchableOpacity>


                                               { this.state.openVisitDatesFrom &&


                                                   <DateTimePicker
                                                       testID="dateTimePicker"
                                                       value={this.state.visit_dates_from_for_picker}
                                                       mode={'date'}
                                                       is24Hour={true}
                                                       onChange={(event, selectedDate) => {
                                                           this.changeVisitDatesFrom(event, selectedDate)
                                                       }}
                                                   />


                                               }



                                               {/*<DatePicker*/}
                                               {/*    style={{width:30, height:30}}*/}
                                               {/*    mode="date" //The enum of date, datetime and time*/}
                                               {/*    // placeholder="select date"*/}
                                               {/*    format="DD-MM-YYYY"*/}
                                               {/*    minDate="01-01-1940"*/}
                                               {/*    maxDate="30-12-2022"*/}
                                               {/*    confirmBtnText="Confirm"*/}
                                               {/*    cancelBtnText="Cancel"*/}
                                               {/*    customStyles={{*/}
                                               {/*        dateIcon: {position: 'absolute',zIndex:56,},*/}
                                               {/*        dateInput: { display:'none', position: 'absolute', width:0, height:0},*/}
                                               {/*        datePicker: { backgroundColor: "#E1C1B7",},*/}

                                               {/*    }}*/}
                                               {/*    onDateChange={(visit_dates_from) => {*/}
                                               {/*        this.setState({*/}
                                               {/*            visit_dates_from: visit_dates_from,*/}
                                               {/*            visit_dates_from_error:false,*/}
                                               {/*            visit_dates_from_valid:true,*/}
                                               {/*        })*/}
                                               {/*        console.log(visit_dates_from)*/}
                                               {/*    }}*/}
                                               {/*    iconComponent={*/}
                                               {/*        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                               {/*            <Path d="M2 7.5V19a4 4 0 004 4h12a4 4 0 004-4V7.5m-20 0v0A3.5 3.5 0 015.5 4h1M2 7.5h20m0 0v0A3.5 3.5 0 0018.5 4h-1m-11 0V.5m0 3.5h11m0 0V.5" stroke="#C29A0A" strokeLinecap="round"/>*/}
                                               {/*        </Svg>*/}
                                               {/*    }*/}
                                               {/*/>*/}



                                           </View>

                                           <TextInput
                                               value={this.state.visit_dates_from}
                                               // onChangeText={(edit_country) => this.changeCountry(edit_country)}
                                               editable={false}
                                               style={[
                                                   styles.input,
                                                   this.state.visit_dates_from_error && {
                                                       borderWidth:1, borderColor:'#A4223C'
                                                   },
                                                   this.state.visit_dates_from_valid && {
                                                       borderWidth:1, borderColor:'#337363'
                                                   },
                                                   {fontFamily:'FiraSans_400Regular'}
                                               ]}
                                               underlineColorAndroid ='transparent'
                                               label={
                                                   <Text
                                                       style={[ {color: this.state.visit_dates_from_error ? '#A4223C' : this.state.visit_dates_from_valid ? '#337363' : '#55545F' }, {fontFamily:'FiraSans_400Regular'}]}>
                                                       {/*Дата C:*/}
                                                       {this.state.language.date_from}:
                                                   </Text>
                                               }
                                               error={false}
                                               // onBlur={() => this.onBlurCountry()}
                                               theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                               underlineColor='transparent'
                                               selectionColor='#E1C1B7'
                                               activeOutlineColor='transparent'

                                           />
                                       </View>

                                       <View style={{flex:1}}>
                                           <View style={[styles.emptyInput, {top:13, zIndex:98}]}>

                                               <TouchableOpacity
                                                   onPress={() => {
                                                       this.setState({
                                                           openVisitDatesTo: true
                                                       })
                                                   }}
                                               >
                                                   <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <Path d="M2 7.5V19a4 4 0 004 4h12a4 4 0 004-4V7.5m-20 0v0A3.5 3.5 0 015.5 4h1M2 7.5h20m0 0v0A3.5 3.5 0 0018.5 4h-1m-11 0V.5m0 3.5h11m0 0V.5" stroke="#C29A0A" strokeLinecap="round"/>
                                                   </Svg>

                                               </TouchableOpacity>


                                               { this.state.openVisitDatesTo &&


                                                   <DateTimePicker
                                                       testID="dateTimePicker"
                                                       value={this.state.visit_dates_to_for_picker}
                                                       mode={'date'}
                                                       is24Hour={true}
                                                       onChange={(event, selectedDate) => {
                                                           this.changeVisitDatesTo(event, selectedDate)
                                                       }}
                                                   />


                                               }


                                               {/*<DatePicker*/}
                                               {/*    style={{width:30, height:30}}*/}
                                               {/*    mode="date" //The enum of date, datetime and time*/}
                                               {/*    // placeholder="select date"*/}
                                               {/*    format="DD-MM-YYYY"*/}
                                               {/*    minDate="01-01-1940"*/}
                                               {/*    maxDate="30-12-2022"*/}
                                               {/*    confirmBtnText="Confirm"*/}
                                               {/*    cancelBtnText="Cancel"*/}
                                               {/*    customStyles={{*/}
                                               {/*        dateIcon: {position: 'absolute',zIndex:56,},*/}
                                               {/*        dateInput: { display:'none', position: 'absolute', width:0, height:0},*/}
                                               {/*        datePicker: { backgroundColor: "#E1C1B7",},*/}

                                               {/*    }}*/}
                                               {/*    onDateChange={(visit_dates_to) => {*/}
                                               {/*        this.setState({*/}
                                               {/*            visit_dates_to: visit_dates_to,*/}
                                               {/*            visit_dates_to_error: false,*/}
                                               {/*            visit_dates_to_valid: true,*/}
                                               {/*        })*/}
                                               {/*        console.log(visit_dates_to)*/}
                                               {/*    }}*/}
                                               {/*    iconComponent={*/}
                                               {/*        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                               {/*            <Path d="M2 7.5V19a4 4 0 004 4h12a4 4 0 004-4V7.5m-20 0v0A3.5 3.5 0 015.5 4h1M2 7.5h20m0 0v0A3.5 3.5 0 0018.5 4h-1m-11 0V.5m0 3.5h11m0 0V.5" stroke="#C29A0A" strokeLinecap="round"/>*/}
                                               {/*        </Svg>*/}
                                               {/*    }*/}
                                               {/*/>*/}





                                           </View>

                                           <TextInput
                                               value={this.state.visit_dates_to}
                                               // onChangeText={(edit_country) => this.changeCountry(edit_country)}
                                               editable={false}
                                               style={[
                                                   styles.input,
                                                   this.state.visit_dates_to_error && {
                                                       borderWidth:1, borderColor:'#A4223C'
                                                   },
                                                   this.state.visit_dates_to_valid && {
                                                       borderWidth:1, borderColor:'#337363'
                                                   },
                                                   {fontFamily:'FiraSans_400Regular'}
                                               ]}
                                               underlineColorAndroid ='transparent'
                                               label={
                                                   <Text
                                                       style={[ {color: this.state.visit_dates_to_error ? '#A4223C' : this.state.visit_dates_to_valid ? '#337363' : '#55545F' }, {fontFamily:'FiraSans_400Regular'}]}>
                                                       {/*Дата ДО:*/}
                                                       {this.state.language.date_to}:

                                                   </Text>
                                               }
                                               error={false}
                                               // onBlur={() => this.onBlurCountry()}
                                               theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                               underlineColor='transparent'
                                               selectionColor='#E1C1B7'
                                               activeOutlineColor='transparent'

                                           />
                                       </View>
                                   </View>

                                     <Text style={[styles.inp_buttom_label, {fontFamily:'FiraSans_400Regular'}]}>
                                        {/*Выберите даты посещения*/}
                                         {this.state.language.select_visit_dates_room   }
                                     </Text>


                                </View>

                            {/* Birth input END */}


                            {/* Guest Count */}

                            <View style={styles.guestCountWrapper}>

                                <TouchableOpacity
                                    style={styles.minusGuest}
                                    onPress={() => {this.minusGuestCountRoom()}}
                                >

                                    <Svg  width={18}  height={2}  viewBox="0 0 18 2"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M1 1h16" stroke="#3A2E03" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                                    </Svg>

                                </TouchableOpacity>

                                <TextInput
                                    value={this.state.guest_count_room}
                                    onChangeText={(guest_count_room) => this.setState({guest_count_room:guest_count_room == '' ? 0 : guest_count_room})}
                                    editable={true}

                                    style={[
                                        styles.guestCountInput,
                                        this.state.guest_count_room_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.guest_count_room_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        },
                                        {borderRadius: 0, height: 45, fontFamily:'FiraSans_400Regular'},
                                    ]}

                                    underlineColorAndroid ='transparent'
                                    // label={
                                    //     <Text
                                    //         style={[ {color: this.state.guest_count_error ? '#A4223C' : this.state.guest_count_valid ? '#337363' : '#55545F', textAlign:'center', width: '100%', backgroundColor:'red' },]}>
                                    //         Количество гостей
                                    //     </Text>
                                    // }
                                    placeholder={'Количество гостей'}
                                    error={false}
                                    keyboardType = 'number-pad'

                                    // onBlur={() => this.onBlurCountry()}
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    underlineColor='transparent'
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'

                                />


                                <TouchableOpacity
                                    style={styles.plusGuest}
                                    onPress={() => {this.plusGuestCountRoom()}}
                                >
                                    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M8 17a1 1 0 102 0v-7h7a1 1 0 100-2h-7V1a1 1 0 10-2 0v7H1a1 1 0 100 2h7v7z" fill="#3A2E03"/>
                                    </Svg>
                                </TouchableOpacity>


                            </View>



                            {/*  Details   */}

                            <View>

                                <TextInput
                                    multiline
                                    //placeholder="Детали размещения"
                                    placeholder={this.state.language.accommodation_details}
                                    // onContentSizeChange={(event) => {
                                    //     this.setState({
                                    //         height:event.nativeEvent.contentSize.height
                                    //     })
                                    // }}
                                    style={[
                                        styles.detailsTextarea,
                                        this.state.visit_details_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.visit_details_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        },
                                        {fontFamily:'FiraSans_400Regular'}
                                    ]}
                                    error={false}
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    underlineColor='transparent'
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'
                                    value={this.state.visit_details}
                                    onChangeText={(visit_details)  =>  {

                                        this.setState({
                                            visit_details: visit_details,
                                        });

                                        if(visit_details.length > 0 ) {
                                            this.setState({
                                                visit_details_error: false,
                                            });
                                        }

                                    }}
                                />

                                {this.state.visit_details_error ?

                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C', fontSize:12, fontFamily:'FiraSans_400Regular'}]}>
                                        {this.state.visit_details_error_text}
                                    </Text>

                                    :

                                    <Text style={[styles.inp_buttom_label, {color:'#9F9EAE', fontSize:12, fontFamily:'FiraSans_400Regular'}]}>
                                        {/*Опишите детали размещение, пребывания*/}
                                        {this.state.language.describe_details_of_accommodation_stay}

                                    </Text>
                                }


                            </View>


                            {/*  ФИО input  */}

                            <View style={styles.inputWrapper}>

                                {this.state.edit_fio_room_valid &&

                                    <TouchableOpacity style={styles.emptyInput}>
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                        </Svg>
                                    </TouchableOpacity>

                                }

                                <TextInput
                                    value={this.state.edit_fio_room}
                                    onChangeText={(edit_fio_room) => this.changeFioRoom(edit_fio_room)}
                                    underlineColorAndroid ='transparent'
                                    label={
                                        <Text
                                            style={[
                                                {color: this.state.edit_fio_room_error ? '#A4223C' : this.state.edit_fio_room_valid ? '#337363' : '#55545F' },
                                                {fontFamily:'FiraSans_400Regular'}
                                            ]
                                            }>
                                            {/*Ф. И. О*/}
                                            {this.state.language.full_name}
                                        </Text>
                                    }
                                    error={false}
                                    underlineColor='transparent'
                                    style={[

                                        styles.input,
                                        this.state.edit_fio_room_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        },
                                        this.state.edit_fio_room_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        {fontFamily:'FiraSans_400Regular'}
                                    ]}
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'
                                />



                                {this.state.edit_fio_room_error ?

                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C', fontFamily:'FiraSans_400Regular'}]}>
                                        {this.state.edit_fio_room_error_text}
                                    </Text>

                                    :

                                    (
                                        !this.state.edit_fio_room_valid &&

                                        <Text style={[styles.inp_buttom_label, {fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Введите фамилию, имя, отчество*/}
                                            {this.state.language.enter_last_name_first_name_patronymic}
                                        </Text>
                                    )

                                }



                            </View>


                            {/*  Phone Input */}

                            <View style={styles.inputWrapper}>


                                {this.state.edit_phone_room_error &&

                                <TouchableOpacity style={styles.emptyInput}
                                      onPress={( )=> {
                                          this.clearPhoneRoomInput()
                                      }}
                                >
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                    </Svg>
                                </TouchableOpacity>

                                }

                                {this.state.edit_phone_room_valid &&

                                <TouchableOpacity style={styles.emptyInput}>
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                    </Svg>
                                </TouchableOpacity>

                                }

                                {/*<MaskInput*/}
                                {/*    style={[*/}
                                {/*        styles.input,*/}
                                {/*        this.state.edit_phone_room_error && {*/}
                                {/*            borderWidth:1, borderColor:'#A4223C'*/}
                                {/*        },*/}
                                {/*        this.state.edit_phone_room_valid && {*/}
                                {/*            borderWidth:1, borderColor:'#337363'*/}
                                {/*        }*/}
                                {/*    ]}*/}
                                {/*    value={this.state.edit_phone_room_masked}*/}
                                {/*    onChangeText={(masked, unmasked) => {*/}

                                {/*        this.changeRegisterPhoneRoom(masked,unmasked);*/}

                                {/*        // you can use the unmasked value as well*/}

                                {/*        // assuming you typed "9" all the way:*/}
                                {/*        //console.log(masked); // (99) 99999-9999*/}
                                {/*        //console.log(unmasked); // 99999999999*/}
                                {/*    }}*/}
                                {/*    mask={[ '+', /\d/, /\d/,/\d/, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/,  '-', /\d/,/\d/,'-', /\d/, /\d/, ]}*/}
                                {/*/>*/}


                                <TextInput
                                    value={this.state.edit_phone_room}
                                    onChangeText={(edit_phone_room) => this.changeRegisterPhoneRoom(edit_phone_room)}
                                    underlineColorAndroid ='transparent'
                                    label={
                                        <Text
                                            style={[
                                                {color: this.state.edit_phone_room_error ? '#A4223C' : this.state.edit_phone_room_valid ? '#337363' : '#55545F' },
                                                {fontFamily:'FiraSans_400Regular'}
                                            ]}
                                        >
                                            {/*Телефон*/}
                                            {this.state.language.phone} <Text style={{color:'red'}}>*</Text>
                                        </Text>
                                    }
                                    error={false}
                                    underlineColor='transparent'
                                    style={[
                                        styles.input,
                                        this.state.edit_phone_room_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.edit_phone_room_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        },
                                        {fontFamily:'FiraSans_400Regular'}
                                    ]}
                                    theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                    selectionColor='#E1C1B7'
                                    activeOutlineColor='transparent'
                                />

                                {this.state.edit_phone_room_error ?

                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C',fontFamily:'FiraSans_400Regular'}]}>
                                        {this.state.edit_phone_room_error_text}
                                    </Text>
                                    :
                                    (
                                        !this.state.edit_phone_room_valid &&

                                        <Text style={[styles.inp_buttom_label, {fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Введите телефон в формате +375 (__) ___-__-__*/}
                                            {this.state.language.enter_your_phone_in_the_format} +375 (__) ___-__-__

                                        </Text>
                                    )

                                }

                            </View>


                            {/*  Email  Input START*/}

                            <View style={styles.inputWrapper}>

                                {this.state.edit_email_room_error &&

                                <TouchableOpacity style={styles.emptyInput}
                                                  onPress={()=>this.clearRegEmailInput()}
                                >
                                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.354 8.646a.5.5 0 10-.708.708L11.293 12l-2.647 2.646a.5.5 0 00.708.708L12 12.707l2.646 2.647a.5.5 0 00.708-.708L12.707 12l2.647-2.646a.5.5 0 00-.708-.708L12 11.293 9.354 8.646z" fill="#A4223C"/>
                                    </Svg>
                                </TouchableOpacity>

                                }

                                {this.state.edit_email_room_valid &&

                                    <TouchableOpacity style={styles.emptyInput}>
                                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <Path  fillRule="evenodd"  clipRule="evenodd"  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm1 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.09-2.917a.66.66 0 01.442-.197.547.547 0 01.427.176c.248.228.248.62.02.87l-4.758 4.985a.626.626 0 01-.91-.02l-2.71-2.918a.62.62 0 01.041-.869.619.619 0 01.869.042l2.255 2.42 4.324-4.49z"  fill="#337363"/>
                                        </Svg>
                                    </TouchableOpacity>

                                }


                                <TextInput
                                    value={this.state.edit_email_room}
                                    onChangeText={(edit_email_room) => this.changeRegisterEmail(edit_email_room)}
                                    // onBlur={(edit_email_room) => this.onBlurRegisterEmail()}
                                    style={[
                                        styles.input,
                                        this.state.edit_email_room_error && {
                                            borderWidth:1, borderColor:'#A4223C'
                                        },
                                        this.state.edit_email_room_valid && {
                                            borderWidth:1, borderColor:'#337363'
                                        },
                                        {fontFamily:'FiraSans_400Regular'}
                                    ]}
                                    label={
                                        <Text
                                            style={[
                                                {color: this.state.edit_email_room_error ? '#A4223C' :  this.state.edit_email_room_valid ? '#337363' : '#55545F'  },
                                                {fontFamily:'FiraSans_400Regular'}
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



                                {this.state.edit_email_room_error ?

                                    <Text style={[styles.inp_buttom_label, {color:'#A4223C', fontFamily:'FiraSans_400Regular'}]}>
                                        {this.state.edit_email_room_error_text}
                                    </Text>
                                    :

                                    (
                                        !this.state.edit_email_room_valid &&

                                        <Text style={[styles.inp_buttom_label, {fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Введите адрес электронной почты*/}
                                            {this.state.language.enter_your_email_address}

                                        </Text>
                                    )

                                }

                            </View>

                            {/*  Email  Input END*/}


                            {/*Book now Button*/}

                            <View style={styles.book_now_wrapper}>

                                <TouchableOpacity style={styles.book_now} onPress={() => this.bookNowROOMHandler()}>

                                    <Text style={[styles.book_now_text, {fontFamily:'FiraSans_400Regular'}]} >
                                        {/*ЗАБРОНИРОВАТЬ КОМНАТУ*/}
                                        {this.state.language.book}
                                    </Text>

                                </TouchableOpacity>

                            </View>


                        </View>

                    {/*RESERVE A ROOM  TAB END*/}



                    {/*Restoran MENU TAB START*/}

                        <View style={[{width:'100%',  paddingVertical: 16}, !this.state.restorane_menu ? {display:'none'} : {}]}>

                            {this.state.menu_data.map((menu_item, index) => {

                                return (
                                    <View key={index} style={styles.menuItemWrapper}>
                                        <TouchableOpacity
                                            style={styles.menuItem}
                                            onPress={() => {this.toggleMenu(menu_item)}}
                                        >
                                            <Text style={[styles.menuItemText, {fontFamily:'Ubuntu_400Regular'}]}>
                                                {menu_item.menu_item_name}
                                            </Text>

                                            {menu_item.isOpen ?
                                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M19 15l-7-7-7 7" stroke="#C29A0A" strokeLinecap="round"
                                                          strokeLinejoin="round"/>
                                                </Svg>
                                                :
                                                <Svg style={styles.menuItemSvg}  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                                                    <Path   d="M5 9l7 7 7-7"   stroke="#C29A0A"   strokeLinecap="round"   strokeLinejoin="round"/>
                                                </Svg>
                                            }
                                        </TouchableOpacity>

                                        {menu_item.isOpen && menu_item.menu_item_arr.map((item, index2) => {
                                            return (
                                                <View key={index2} style={styles.menuItemMoreWrapper}>
                                                    <TouchableOpacity style={styles.menuItemMoreWrapperItem}>
                                                        <View style={styles.menuItemMoreWrapperItemLeft}>
                                                            <Text style={{fontSize: 16, color:'#1D1D20', fontFamily:'Ubuntu_400Regular'}}>{item.NAME}</Text>
                                                            <Text style={{color:'#54535F', fontSize: 12, fontFamily:'FiraSans_400Regular'}}>{item.WEIGHT} {this.state.language.g}</Text>
                                                        </View>

                                                        <Text style={[styles.menuItemMoreWrapperItemRightText, {fontFamily:'Ubuntu_400Regular'}]}>
                                                            {item.PRICE}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })}

                                    </View>
                                )
                            })}
                        </View>

                    {/*Restoran MENU  TAB END*/}




                    {/*Reviews TAB START*/}

                        <View style={[{width:'100%',  paddingBottom: 16}, !this.state.reviews_tab ? {display:'none'} : {}]}>

                            {/*Rate yellow top block START*/}

                                <View
                                    style={{
                                        width: '100%',
                                        height: 72,
                                        backgroundColor:'#FDF5D8',
                                        marginBottom: 26,
                                        paddingVertical: 17,
                                        paddingHorizontal:16,
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}
                                >
                                    <View style={{flexDirection:'row'}}>

                                        <View
                                            style={{
                                                width:40,
                                                height:40,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                justifyContent:'center'
                                            }}
                                        >
                                            <StarSvg
                                                style={{
                                                    position:'absolute',
                                                    top:0,
                                                    left: 0
                                                }}
                                            />

                                            {this.state.obj_vote > 0 &&
                                                <Text style={{color:'#C29A0A', fontSize: 20 }}>
                                                    {this.state.obj_vote}
                                                </Text>
                                            }

                                        </View>

                                        {this.state.obj_vote > 0 ?
                                            <View style={{paddingLeft:16}}>
                                                <Text
                                                    style={{
                                                        color: '#3A2E03',
                                                        fontSize: 14,
                                                        fontWeight:'500',
                                                        marginBottom:7
                                                    }}
                                                >
                                                    {this.printRateText()}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: '#393840',
                                                        fontSize: 12,
                                                        fontWeight:'400',
                                                        fontFamily:'FiraSans_400Regular'
                                                    }}
                                                >
                                                    {/*Оставлено {this.state.reviews_data.length} отзыва*/}
                                                    {this.state.language.left} {this.state.reviews_data.length} {this.declination(this.state.reviews_data.length)}
                                                </Text>
                                            </View>
                                            :
                                            <View style={{paddingLeft:16, alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}}>
                                                <Text
                                                    style={{
                                                        color: '#3A2E03',
                                                        fontSize: 14,
                                                        fontWeight:'500',
                                                    }}
                                                >
                                                    {/*Никто не оценил*/}
                                                    {this.state.language.no_one_appreciated}
                                                </Text>

                                            </View>
                                        }


                                    </View>

                                    { this.state.obj_vote > 0 &&
                                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                                            <View
                                                style={{
                                                    paddingVertical:4,
                                                    paddingHorizontal:8,
                                                    backgroundColor:'white',
                                                    borderRadius: 20
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 10,
                                                        fontWeight:'bold',
                                                        color: '#3A2E03',
                                                        fontFamily:'FiraSans_400Regular'
                                                    }}
                                                >
                                                    {/*ВАША ОЦЕНКА */}
                                                    {this.state.language.your_mark} {this.state.user_vote}
                                                </Text>
                                            </View>
                                        </View>
                                    }


                                </View>

                            {/*Rate yellow top block END*/}

                            {this.state.reviews_data.length === 0 &&
                                <Text style={{width: '100%', textAlign:'center',marginTop: 0, marginBottom: 24, fontFamily:'FiraSans_400Regular'}}>
                                    {/*Нет отзывов!*/}
                                    {this.state.language.no_reviews}
                                </Text>
                            }

                            {this.state.reviews_data.length > 0 &&

                                <View>

                                    {this.state.reviews_data.map((review_item, index) => {

                                        return (

                                            <View key={index} style={{width: '100%', paddingHorizontal: 16,marginBottom: 45}}>

                                                <View style={{width: '100%',  justifyContent:'space-between', marginBottom:14, alignItems:'flex-start', flexDirection:'row'}}>

                                                    <View>
                                                        <Text style={{color: '#1D1D20', fontSize: 16, fontFamily:'Ubuntu_400Regular'}}>{this.state.language.login_tr}: {review_item.login}</Text>
                                                        <Text style={{color: '#54535F', fontSize: 12, fontFamily:'FiraSans_400Regular'}}>{review_item.date}</Text>
                                                    </View>

                                                   <View style={{flexDirection:'row', alignItems:'flex-start', position:'relative', left:-2, marginTop: 10}}>

                                                       {/*{this.printNotChangedStars(review_item.stars)}*/}
                                                       <StarSvg/>

                                                       <Text style={{color:'#C29A0A', fontSize: 20, position:'absolute', top:7,left: 6, }}>{review_item.stars}.0</Text>
                                                   </View>

                                                </View>

                                                <Text style={{fontFamily:'FiraSans_400Regular'}}>{review_item.review}</Text>

                                            </View>


                                        )

                                    })}



                                    <TouchableOpacity
                                        onPress={()=> {
                                           this.showMoreReviews()
                                        }}
                                        style={{width: '100%', height: 36, justifyContent:'center', alignItems:'center', marginBottom: 19}}
                                    >

                                        <Text style={{color: '#8F7000', fontSize: 14, fontFamily:'FiraSans_400Regular'}}>
                                            {/*ЕЩЕ ОТЗЫВЫ*/}
                                            {this.state.language.more_reviews}

                                        </Text>


                                    </TouchableOpacity>


                                </View>

                            }



                            <View style={styles.sendReviewWrapper}>


                                {/*Поставьте оценку START*/}
                                <Text style={{fontSize: 14, color:'#1D1D20', textAlign:'center', marginBottom: 14, fontFamily:'FiraSans_400Regular'}}>
                                    {this.state.language.make_a_review}
                                </Text>
                                <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                                {/*Поставьте оценку END*/}


                                <View style={{width: '100%', height:1, backgroundColor:'#FAE69E', marginBottom: 21}}></View>


                                <View style={{width: '100%',  borderRadius: 8, overflow: 'hidden', marginBottom: 5}}>

                                    <Text style={{fontSize: 14, color:'#1D1D20', textAlign:'center', marginBottom: 14, fontFamily:'FiraSans_400Regular'}}>
                                        {this.state.language.write_feadback}
                                    </Text>

                                    <TextInput
                                        multiline
                                        placeholder={this.state.language.review_input_label}
                                        style={[
                                            styles.detailsTextarea,
                                            this.state.guest_count_error && {
                                                borderWidth:1, borderColor:'#A4223C'
                                            },
                                            this.state.guest_count_valid && {
                                                borderWidth:1, borderColor:'#337363'
                                            },
                                            {width: '100%', borderRadius: 8, fontFamily:'FiraSans_400Regular'}
                                        ]}
                                        error={false}
                                        theme={{colors: {text: '#55545F', primary: 'transparent'}}}
                                        underlineColor='transparent'
                                        selectionColor='#E1C1B7'
                                        activeOutlineColor='transparent'
                                        value={this.state.review_value}
                                        onChangeText={(review_value) =>  {this.setState({review_value: review_value})} }

                                        // onChang
                                    />

                                    <Text style={[styles.inp_buttom_label, {color:'#54535F', fontSize:12, marginTop:5}]}>

                                        {this.state.language.write_your_review_about_the_institution}

                                    </Text>

                                </View>



                                <TouchableOpacity style={styles.book_now} onPress={() => {this.sendReviewHandler()}}>

                                    <Text style={[styles.book_now_text, {fontFamily:'FiraSans_400Regular'}]} >
                                        {/*ОСТАВИТЬ ОТЗЫВ*/}
                                        {this.state.language.leave_feadback}
                                    </Text>

                                </TouchableOpacity>


                            </View>



                        </View>

                    {/*Reviews  TAB END*/}


                </ScrollView>




                {/* AUDIOGID TAB RATE START*/}

                    <View style={[{position:'absolute', bottom:16, left:16}]}>
                        <TouchableOpacity onPress={() => this.changeRate()}  style={this.state.audio_tab === false ? {display:'none'} : {}}>
                            {this.printRate()}
                        </TouchableOpacity>
                    </View>

                {/* AUDIOGID TAB RATE END*/}



                {/* AUDIOGID TAB TURN ON PLAYER AFTER START*/}

                <View style={[{position:'absolute', bottom:16, right:16}]}>
                    <TouchableOpacity onPress={() => this.openModal()}  style={[{width: 30, height: 30, justifyContent:'center', alignItems:'center'} ,this.state.audio_tab === false ? {display:'none'} : {}]}>
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <Path d="M12 10.026V13h2m-2-9.5V1m0 2.5c6.706 0 9.5 5.551 9.5 9.5M12 3.5c-6.706 0-9.5 5.551-9.5 9.5 0 6.09 5.5 9.5 9 9.5 1.5 0 1.5-2 0-2s-7-1.295-7-7.5S9.765 5.5 12 5.5c3.398 0 7.5 2.423 7.5 7.5 0 4.061-3.03 6.051-3.03 6.051M12 1h2.794M12 1H9.206" stroke="#491C08" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => {
                        this.closeModal()
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Выключить проигрывание через</Text>


                            <TouchableOpacity
                                style={{width:'100%', flexDirection:'row', justifyContent:'flex-start', marginBottom: 15}}
                                onPress={()=> {
                                    this.setState({fifteen: !this.state.fifteen, thirty: false, sixty: false})
                                }}
                            >
                                <View style={{
                                    width:20, height:20, flexDirection:'row', justifyContent:'center',
                                    alignItems:'center', borderRadius: 50,borderColor:'#FF9161', borderWidth: 1, marginRight:20}}
                                >

                                    {this.state.fifteen &&
                                    <View style={{width:'70%',height:'70%', backgroundColor:'#FF9161', borderRadius: 50 }}>
                                    </View>
                                    }
                                </View>
                                <Text>15 минут</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{width:'100%', flexDirection:'row', justifyContent:'flex-start', marginBottom: 15}}
                                onPress={()=> {
                                    this.setState({fifteen: false, thirty: !this.state.thirty, sixty: false})
                                }}
                            >
                                <View style={{
                                    width:20, height:20, flexDirection:'row', justifyContent:'center',
                                    alignItems:'center', borderRadius: 50,borderColor:'#FF9161', borderWidth: 1, marginRight:20}}>

                                    {this.state.thirty &&
                                    <View style={{width:'70%',height:'70%', backgroundColor:'#FF9161', borderRadius: 50 }}>
                                    </View>
                                    }
                                </View>
                                <Text>30 минут</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{width:'100%', flexDirection:'row', justifyContent:'flex-start', marginBottom: 15}}
                                onPress={()=> {
                                    this.setState({fifteen: false, thirty: false, sixty: !this.state.sixty})
                                }}
                            >
                                <View style={{
                                    width:20, height:20, flexDirection:'row', justifyContent:'center',
                                    alignItems:'center', borderRadius: 50,borderColor:'#FF9161', borderWidth: 1, marginRight:20}}>

                                    {this.state.sixty &&
                                        <View style={{width:'70%',height:'70%', backgroundColor:'#FF9161', borderRadius: 50 }}>
                                        </View>
                                    }
                                </View>
                                <Text>60 минут</Text>
                            </TouchableOpacity>

                            <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>
                                <TouchableOpacity
                                    style={[]}
                                    onPress={() => this.closeModal()}>
                                    <Text style={styles.textStyle}>ОТМЕНА</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{marginLeft:16}}
                                    onPress={() => {
                                        this.startPlayerTurnOffTimer()
                                    }}>
                                    <Text style={styles.textStyle}>ПОДТВЕРДИТЬ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>




                {/*<Modal*/}
                {/*    animationType="slide"*/}
                {/*    transparent={true}*/}
                {/*    visible={this.state.not_auth_user_modal}*/}
                {/*    onRequestClose={() => {*/}
                {/*        this.closeAudioGidModal()*/}
                {/*    }}>*/}
                {/*    <View style={styles.centeredView}>*/}
                {/*        <View style={styles.modalView}>*/}
                {/*            <Text style={styles.modalText}>*/}
                {/*                /!*Чтобы запустить аудиогид зарегистрируйтесь или войдите.*!/*/}
                {/*                {this.state.language.modal_text2}*/}
                {/*            </Text>*/}



                {/*            <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>*/}
                {/*                <TouchableOpacity*/}
                {/*                    style={[]}*/}
                {/*                    onPress={() => this.closeAudioGidModal()}>*/}
                {/*                    <Text style={styles.textStyle}>*/}
                {/*                        /!*Зарегистрироваться*!/*/}
                {/*                        {this.state.language.sign_up}*/}
                {/*                    </Text>*/}
                {/*                </TouchableOpacity>*/}

                {/*                <TouchableOpacity*/}
                {/*                    style={{marginLeft:16}}*/}
                {/*                    onPress={() => this.closeAudioGidModal()}>*/}
                {/*                    <Text style={styles.textStyle}>*/}
                {/*                        /!*Войти*!/*/}
                {/*                        {this.state.language.sign_in}*/}

                {/*                    </Text>*/}
                {/*                </TouchableOpacity>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</Modal>*/}


                {/* AUDIOGID TAB TURN ON PLAYER AFTER END*/}


                {/*Not autorise gps modal START*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.not_autorise_gps_modal}
                        onRequestClose={() => {
                            this.setState({
                                not_autorise_gps_modal: false
                            })
                        }}>
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, {backgroundColor:'#E6E6E6'}]}>
                                <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Чтобы составить маршрут зарегистрируйтесь или войдите.*/}

                                    {this.state.language.modal_text3}
                                </Text>



                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>
                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => {
                                            this.setState({
                                                not_autorise_gps_modal: false
                                            })
                                            this.goToLogin()

                                        }}>
                                        <Text style={[styles.textStyle, {color:'#076388', fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Зарегистрироваться*/}
                                            {this.state.language.sign_up}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{marginLeft:16}}
                                        onPress={() => {
                                            this.setState({
                                                not_autorise_gps_modal: false
                                            })
                                            this.goToLogin()

                                        }}>
                                        <Text style={[styles.textStyle, {color:'#076388', fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Войти*/}
                                            {this.state.language.sign_in}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                {/*Not autorise gps modal END*/}



                {/*Not autorise BOOK a room modal START*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.book_a_room_modal}
                        onRequestClose={() => {
                            this.setState({
                                book_a_room_modal: false
                            })
                        }}>

                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, {backgroundColor:'#FDF5D8'}]}>
                                <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Чтобы забронировать место зарегистрируйтесь или войдите.*/}
                                    {this.state.language.to_reserve_a_place_register_or_log_in}
                                </Text>

                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>

                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => {{
                                            this.setState({
                                                book_a_room_modal: false
                                            })
                                            this.goToLogin()

                                        }}}
                                    >
                                        <Text style={[styles.textStyle, {color:'#8F7000', fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Зарегистрироваться*/}
                                            {this.state.language.sign_up}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{marginLeft:16}}
                                        onPress={() =>  {
                                            this.setState({
                                                book_a_room_modal: false
                                            })
                                            this.goToLogin()

                                        }}
                                    >
                                        <Text style={[styles.textStyle, {color:'#8F7000', fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Войти*/}
                                            {this.state.language.sign_in}

                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </Modal>

                {/*Not autorise BOOK a room modal END*/}



                {/*Not autorise BOOK a Table modal START*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.reserve_a_table_modal}
                        onRequestClose={() => {
                            this.setState({
                                reserve_a_table_modal: false
                            })
                        }}>

                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, {backgroundColor:'#FDF5D8'}]}>
                                <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Чтобы забронировать место зарегистрируйтесь или войдите.*/}
                                    {this.state.language.to_reserve_a_place_register_or_log_in}
                                </Text>

                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>

                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => {

                                            this.setState({
                                                reserve_a_table_modal: false
                                            })
                                            this.goToLogin()
                                        }}>
                                        <Text style={[styles.textStyle, {color:'#8F7000',fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Зарегистрироваться*/}
                                            {this.state.language.sign_up}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{marginLeft:16}}
                                        onPress={() =>  {
                                            this.setState({
                                                reserve_a_table_modal: false
                                            })
                                            this.goToLogin()
                                        }}>
                                        <Text style={[styles.textStyle, {color:'#8F7000', fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Войти*/}
                                            {this.state.language.sign_in}

                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </Modal>

                {/*Not autorise BOOK a Table modal END*/}



                {/*Not autorise Send review modal START*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.send_review_modal}
                        onRequestClose={() => {
                            this.setState({
                                send_review_modal: false
                            })
                        }}>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    send_review_modal: false
                                })
                            }}
                            style={styles.centeredView}
                        >
                           <TouchableHighlight>
                               <View style={[styles.modalView, {backgroundColor:'#FDF5D8'}]}>

                                   <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                       {/*Чтобы оставить отзыв зарегистрируйтесь или войдите.*/}
                                       {this.state.language.to_leave_a_review_register_or_login}
                                   </Text>

                                   <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>

                                       <TouchableOpacity
                                           style={[]}
                                           onPress={() => {

                                               this.setState({
                                                   send_review_modal: false
                                               })
                                               this.goToLogin()
                                           }}
                                       >
                                           <Text style={[styles.textStyle, {color:'#8F7000',fontFamily:'FiraSans_400Regular'}]}>
                                               {/*Зарегистрироваться*/}
                                               {this.state.language.sign_up}

                                           </Text>
                                       </TouchableOpacity>

                                       <TouchableOpacity
                                           style={{marginLeft:16}}
                                           onPress={() =>  {
                                               this.setState({
                                                   send_review_modal: false
                                               })
                                               this.goToLogin()
                                           }}
                                       >
                                           <Text style={[styles.textStyle, {color:'#8F7000', fontFamily:'FiraSans_400Regular'}]}>
                                               {/*Войти*/}
                                               {this.state.language.sign_in}
                                           </Text>
                                       </TouchableOpacity>

                                   </View>
                               </View>
                           </TouchableHighlight>
                        </TouchableOpacity>
                    </Modal>

                {/*Not autorise Send review modal END*/}





                {/* Send review Success modal START*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.showSuccessAddReviewModal}
                        onRequestClose={() => {
                            this.setState({
                                showSuccessAddReviewModal: false
                            })
                        }}>

                        <View style={styles.centeredView}>

                            <View style={[styles.modalView, {backgroundColor:'#FDF5D8'}]}>

                                <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Благодарим за отзыв! {'\n'}Ваш отзыв на модерации!*/}

                                    {this.state.language.review_form_success_message}
                                </Text>

                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>

                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => { this.setState({
                                            showSuccessAddReviewModal: false
                                        })}}>
                                        <Text style={[styles.textStyle, {color:'#8F7000',fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Закрыть*/}
                                            {this.state.language.close}
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </Modal>

                {/*Send review Success modal END*/}




                {/* Send review Error modal START*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.sendReviewErrorModal}
                        onRequestClose={() => {
                            this.setState({
                                sendReviewErrorModal: false
                            })
                        }}>

                        <View style={styles.centeredView}>

                            <View style={[styles.modalView, {backgroundColor:'#FDF5D8'}]}>

                                <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                    {this.state.sendReviewErrorModalText}
                                </Text>

                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>

                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => { this.setState({
                                            sendReviewErrorModal: false
                                        })}}>
                                        <Text style={[styles.textStyle, {color:'#8F7000',fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Закрыть*/}
                                            {this.state.language.close}

                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </Modal>

                {/*Send review Error modal END*/}






                {/* bookRoomSuccessModal modal START*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.bookRoomSuccessModal}
                        onRequestClose={() => {
                            this.setState({
                                bookRoomSuccessModal: false
                            })
                        }}>

                        <View style={styles.centeredView}>

                            <View style={[styles.modalView, {backgroundColor:'#FDF5D8'}]}>

                                <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>
                                    {/*Ваша заявка на бронирование комнаты на рассмотрение!*/}

                                    {this.state.language.book_room_success}

                                </Text>

                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>

                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => { this.setState({
                                            bookRoomSuccessModal: false
                                        })}}>
                                        <Text style={[styles.textStyle, {color:'#8F7000', fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Закрыть*/}
                                            {this.state.language.close}

                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </Modal>

                {/*bookRoomSuccessModal modal END*/}





                {/* bookTableSuccessModal modal START*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.bookTableSuccessModal}
                        onRequestClose={() => {
                            this.setState({
                                bookTableSuccessModal: false
                            })
                        }}>

                        <View style={styles.centeredView}>

                            <View style={[styles.modalView, {backgroundColor:'#FDF5D8'}]}>

                                <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>

                                    {/*Ваша заявка на бронирование столика на рассмотрение!*/}
                                    {this.state.language.book_table_success}

                                </Text>

                                <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>

                                    <TouchableOpacity
                                        style={[]}
                                        onPress={() => { this.setState({
                                            bookTableSuccessModal: false
                                        })}}>
                                        <Text style={[styles.textStyle, {color:'#8F7000', fontFamily:'FiraSans_400Regular'}]}>
                                            {/*Закрыть*/}
                                            {this.state.language.close}

                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </Modal>

                {/*Send review Error modal END*/}




                {/* show_unautorize_menu_modal */}

                {/*SHOW MENU MODAL START*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.show_unautorize_menu_modal}
                        onRequestClose={() => {
                            this.setState({
                                show_unautorize_menu_modal: false
                            })
                        }}>
                        <TouchableOpacity
                            style={styles.centeredView}
                            onPress={() => {
                                this.setState({
                                    show_unautorize_menu_modal: false
                                })
                            }}
                        >

                            <TouchableHighlight>
                                <View style={[styles.modalView, {backgroundColor:'#E6E6E6'}]}>
                                    <Text style={[styles.modalText, {fontFamily:'FiraSans_400Regular'}]}>

                                        {/*Чтобы изучить меню зарегистрируйтесь или войдите.*/}

                                        {this.state.language.modal_text4}
                                    </Text>



                                    <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center', flexDirection:'row', marginTop:30}}>
                                        <TouchableOpacity
                                            style={[]}
                                            onPress={() => {
                                                this.setState({
                                                    show_unautorize_menu_modal: false
                                                })
                                                this.props.navigation.navigate('Login')
                                            }}>
                                            <Text style={[styles.textStyle, {color:'#076388', fontFamily:'FiraSans_400Regular'}]}>
                                                {/*Зарегистрироваться*/}
                                                {this.state.language.sign_up}
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{marginLeft:16}}
                                            onPress={() => {

                                                this.setState({
                                                    show_unautorize_menu_modal: false
                                                })
                                                this.props.navigation.navigate('Login')

                                            }}>
                                            <Text style={[styles.textStyle, {color:'#076388', fontFamily:'FiraSans_400Regular'}]}>
                                                {/*Войти*/}
                                                {this.state.language.sign_in}

                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </TouchableOpacity>
                    </Modal>


                {/*SHOW MENU MODAL END*/}






            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        alignSelf: "stretch",
        backgroundColor: BACKGROUND_COLOR
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: BACKGROUND_COLOR
    },
    wrapper: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'white',
        width:56,
        height:56,
        borderRadius:50
    },
    nameContainer: {
        height: FONT_SIZE
    },
    space: {
        height: FONT_SIZE
    },
    videoContainer: {
        height: VIDEO_CONTAINER_HEIGHT
    },
    video: {
        maxWidth: DEVICE_WIDTH
    },
    playbackContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        minHeight: ICON_THUMB_1.height * 2.0,
        maxHeight: ICON_THUMB_1.height * 2.0
    },
    playbackSlider: {
        alignSelf: "stretch",
        width:'100%'
    },
    timestampRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "stretch",
        minHeight: FONT_SIZE,
    },
    text: {
        fontSize: FONT_SIZE,
        minHeight: FONT_SIZE
    },
    buffering: {
        textAlign: "left",
        paddingLeft: 20
    },
    timestamp: {
        textAlign: "right",
        fontSize:12

        // paddingRight: 20
    },
    button: {
        backgroundColor: BACKGROUND_COLOR
    },
    buttonsContainerBase: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonsContainerTopRow: {
        maxHeight: ICON_PLAY_BUTTON.height,
        minWidth: DEVICE_WIDTH / 2.0,
        maxWidth: DEVICE_WIDTH / 2.0
    },
    buttonsContainerMiddleRow: {
        maxHeight: ICON_MUTED_BUTTON.height,
        alignSelf: "stretch",
        paddingRight: 20
    },
    volumeContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: DEVICE_WIDTH / 2.0,
        maxWidth: DEVICE_WIDTH / 2.0
    },
    volumeSlider: {
        width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width
    },
    buttonsContainerBottomRow: {
        maxHeight: ICON_THUMB_1.height,
        alignSelf: "stretch",
        paddingRight: 20,
        paddingLeft: 20
    },
    rateSlider: {
        width: DEVICE_WIDTH / 2.0
    },
    buttonsContainerTextRow: {
        maxHeight: FONT_SIZE,
        alignItems: "center",
        paddingRight: 20,
        paddingLeft: 20,
        minWidth: DEVICE_WIDTH,
        maxWidth: DEVICE_WIDTH
    },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'white',
        position:'relative'
    },
    topBlock:{
        width:'100%',
        height:56,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
    bottomBlock:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    text1:{
        fontSize:24,
    },
    topPanel:{
        backgroundColor:'white',
        width:'100%',
        height:56,
        zIndex:555,
        paddingLeft:12,
        paddingRight:12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection:'row'
    },
    topPanelRight: {
        alignItems:"center",
        justifyContent:'flex-end',
        flexDirection:'row',
        flex:1
    },
    objectTitle:{
        width:'100%',
        backgroundColor:'white',
        alignItems:"center",
        justifyContent:'center',
        flexDirection:'row',

    },
    objectTitle2:{
        width:'80%',
    },
    objectTitleText:{
        color:'#1D1D20',
        fontSize: 20,
        textAlign:'left',
        paddingBottom:16,
        fontWeight:'bold',
    },

    actionItem:{
        paddingHorizontal:10,
        height:'100%',
        alignItems:"center",
        justifyContent:'center',
        flexDirection:'row',
        flex:1
    },
    actionItemText:{
        color:'#9F9EAE'
    },

    activeActionsItem:{
        borderBottomColor :'#44434C',
        borderBottomWidth :3
    },

    activeActionsItemText:{
        color:'#44434C'
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
    textStyle: {
        color: '#B14313',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:14
    },
    modalText: {
        marginBottom: 22,
        textAlign: 'left',
        fontSize:16
    },
    weekDaysWrapper: {
        width:'100%',
        paddingHorizontal: 26,
        flexDirection:'row',
        marginBottom: 16
    },

    weekDaysWrapperItem:{
        flex:1,
        height:40,
        borderWidth:1,
        borderColor:'#E1C1B7',
        justifyContent:'center',
        alignItems:'center'
    },

    borderRightUnset:{
        borderRightWidth:0
    },
    weekDaysWrapperItemText:{
        color:'#55545F'
    },
    weekDaysWrapperItemTextActive:{
        color:'#E1C1B7'
    },
    weekDaysWrapperItemActive:{
        backgroundColor:'#F9F3F1'
    },

    galleryModal:{
        position:'absolute',
        bottom:16,
        right:16,
        zIndex: 5555,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // padding: 5,
        // backgroundColor:'red'
    },
    more_description_button: {
        minHeight: 48,
        backgroundColor:'#F3C316',
        paddingHorizontal: 13,
        paddingVertical:13,
        position:'absolute',
        bottom:16,
        right:16,
        zIndex: 55,
        borderRadius:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        maxWidth:250,
        shadowColor: '#000',
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },

    inputWrapper:{
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



    guestCountWrapper:{
        width:'100%',
        flexDirection:'row',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 16
    },
    minusGuest:{
        width: 48,
        height: 48,
        backgroundColor:'#FAE69E',
        justifyContent:'center',
        alignItems:'center'
    },
     plusGuest:{
        width: 48,
        height: 48,
        backgroundColor:'#FAE69E',
        justifyContent:'center',
        alignItems:'center'
    },


    guestCountInput: {
       flex:1,
        height: 48,
        backgroundColor: 'white',
        fontSize:14,
        color:'#55545F',
        borderRadius:0,
        paddingHorizontal:16,
        textAlign:'center'
    },


    detailsTextarea: {
        flex:1,
        backgroundColor: 'white',
        fontSize:14,
        color:'#55545F',
        borderRadius:0,
        padding:16,
    },
    book_now_wrapper:{
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
        marginTop: 24
    },
    book_now:{
        width:'100%',
        backgroundColor:'#F3C316',
        height:34,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8
    },
    book_now_text:{
        color:'#3A2E03',
        fontSize:14,
        // fontWeight:'bold'
    },


    menuItemWrapper: {
        width: '100%',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    menuItem: {
        width: '100%',
        minHeight: 64,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

        paddingHorizontal: 16,

    },
    menuItemText: {
        fontSize: 14,
        color:'#54535F'
    },
    menuItemSvg: {

    },

    menuItemMoreWrapper:{
        width: '100%',
        marginBottom: 31
    },

    menuItemMoreWrapperItem:{
        width: '100%',
        minHeight: 64,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal: 16,

    },
    menuItemMoreWrapperItemLeft:{
        flex:1
    },
    menuItemMoreWrapperItemRightText:{
        marginLeft: 14,
        fontSize: 14,
        color:'#54535F'
    },

    sendReviewWrapper:{
        padding: 16,
        backgroundColor:'#FDF5D8'
    },
    StarImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },

    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 24,
    },
});

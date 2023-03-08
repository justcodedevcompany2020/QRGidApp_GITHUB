import React, { Component } from 'react';
import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    ImageBackground
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

import Svg, { Path, Defs, G, ClipPath, Circle, Mask } from "react-native-svg"

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            one_text:true,
            two_text:false,
            three_text:true,
            language:'en'
        };

    }


    setText = () =>{

        if (this.state.one_text) {
            return (
                <View style={[styles.topBlock, {backgroundColor: '#E1C1B7'}]}>
                    <Text style={ styles.text}>Вандруем разам!</Text>
                </View>
            );
        } else if(this.state.two_text) {
            return (
                <View style={[styles.topBlock, {backgroundColor: '#F7D764'}]}>
                    <Text style={ styles.text}>Путешествуем вместе!</Text>
                </View>

            );
        } else if(this.state.three_text) {
            return (
                <View style={[styles.topBlock, {backgroundColor: '#85dcff'}]}>
                    <Text style={ styles.text}>Traveling together!</Text>
                </View>

            );
        }
        else if(this.state.four_text) {
            return (
                <View style={[styles.topBlock, {backgroundColor: '#E1C1B7'}]}>
                    <Text style={ styles.text}>Вандруем разам!</Text>
                </View>
            );
        }


    }


    componentDidMount() {
        let a = 0;
        const timer =  setInterval(()=> {

            if (a == 0) {

                this.setState({
                    one_text: true,
                    two_text:false,
                    three_text:false,
                })
            } else if(a == 1) {

                this.setState({
                    one_text: false,
                    two_text:true,
                    three_text:false,
                })

            } else if(a == 2) {
                this.setState({
                    one_text: false,
                    two_text:false,
                    three_text:true,
                })
            } else if(a == 3) {
                this.setState({
                    one_text: false,
                    two_text:false,
                    three_text:false,
                    four_text:true,
                })
            }

            if (a >= 3 ) {
                console.log('enddddd')
                clearInterval(timer);
                this.props.navigation.navigate('Dashboard')
            }

            a++


        }, 1300);

        const { navigation } = this.props;

        this.focusListener = navigation.addListener("focus", ()  =>  {

            if(a > 3) {
                this.props.navigation.navigate('Dashboard')
            }
        });
    }


    render() {

        return (

            <SafeAreaView style={styles.container}>


                {this.setText()}

                <View style={styles.bottomBlock}>
                    <Svg width={192} height={192} viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path  fillRule="evenodd"  clipRule="evenodd"  d="M148 4h-16v28h16c6.627 0 12 5.373 12 12s-5.373 12-12 12h-16v28.714L154 124h34l-24.212-43.236C178.028 74.64 188 60.484 188 44c0-22.091-17.909-40-40-40zM64 4c33.137 0 60 26.863 60 60v60H64C30.863 124 4 97.137 4 64S30.863 4 64 4zm0 92c17.673 0 32-14.327 32-32 0-17.673-14.327-32-32-32-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32zM24 132c-11.046 0-20 8.954-20 20v36h18v-30a8 8 0 018-8h30v-18H24zM68 132h18v28l18-28h20v56h-18v-28l-18 28H68v-56zM156 132c-13.255 0-24 10.745-24 24v32h56v-56h-32zm2 18a8 8 0 00-8 8v12h20v-20h-12z"  fill="#fff"/>
                    </Svg>
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    topBlock:{
        width:'100%',
        height:56,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    bottomBlock:{
        flex: 1,
        width: '100%',
        backgroundColor:'#FF9161',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    text:{
        fontSize:24,
    }

});

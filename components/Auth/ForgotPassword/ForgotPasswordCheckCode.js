import React, { Component } from 'react';
import { Text, Alert, Button, View, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
// import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {Path} from "react-native-svg";
import axios from "axios";

export default class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            code: '',
            isValidCode: true,
            existCode: true
        };

    }

    checkCode = (code) => {

        if (code.length == 5){
            return true;
        }
        else{
            return false;
        }

    }

    goToLogin = () => {
        this.props.navigation.navigate('Login')
    }

    sendCodeAndCheck = () => {

        if (!this.checkCode(this.state.code)) {

            this.setState({
                isValidCode:false
            })

        } else {

            this.setState({
                isValidCode:true
            })


            const req = {
                email: this.props.set_email,
                code: this.state.code,
            };


            axios.post('http://194-67-111-30.cloudvps.regruhosting.ru/public/api/check-forgot-password-code', req).then(
                (response) => {
                    console.log('response', response.data.message)

                    if (response.status === 200 && response.data.message == 'сode_verified' ) {

                        console.log('сode_verified')

                        this.props.navigation.navigate('ForgotPasswordChangePassword', {
                            params:this.props.set_email,
                        })

                    }
                },

                (err) => {

                    if (err.response.status === 422 && err.response.data.message === 'code_does_not_exist_in_db') {

                        this.setState({
                            existCode: false
                        })

                        console.log('code_does_not_exist_in_db')

                    } else if (err.response.status === 422 && err.response.data.message === 'сode_doesnt_match') {
                        this.setState({
                            existCode: false
                        })

                        console.log('сode_doesnt_match')

                    } else if (err.response.status === 422 && err.response.data.message === 'сode_doesnt_match') {
                        this.setState({
                            existCode: false
                        })

                        console.log('сode_doesnt_match')

                    } else if (err.response.status === 422 && err.response.data.message === 'User_does_not_exist') {
                        this.setState({
                            existCode: false
                        })

                        console.log('сode_doesnt_match')

                    }

                },

            );

        }


    }


    render() {
        return (
            <ImageBackground source={require('../../../assets/img/background.jpg')} style={styles.container}>
                <View style={styles.loginWrapper}>




                    <Text style={styles.inputext}> Geben Sie einen Code ein</Text>


                    {this.state.existCode === false &&
                    <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'relative',top:-2}} >Falscher Code eingegeben</Text>
                    }

                    {this.state.isValidCode === false &&
                    <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'relative',top:-2}} >Geben Sie den richtigen Code ein</Text>
                    }


                    <View style={styles.labelPswWrapper}>
                        <Svg style={{width:15, height:15, fill:'black'}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 330 330" xmlSpace="preserve" enableBackground="new 0 0 330 330">
                            <Path d="M65 330h200c8.284 0 15-6.716 15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85S80 38.131 80 85v45H65c-8.284 0-15 6.716-15 15v170c0 8.284 6.716 15 15 15zm115-95.014V255c0 8.284-6.716 15-15 15s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986 0-13.785 11.215-25 25-25s25 11.215 25 25c0 8.162-3.932 15.421-10 19.986zM110 85c0-30.327 24.673-55 55-55s55 24.673 55 55v45H110V85z" />
                        </Svg>
                        <TextInput
                            value={this.state.code}
                            onChangeText={(code) => this.setState({ code })}
                            style={styles.input}
                            underlineColorAndroid ='transparent'
                            placeholder='Code'
                            maxLength={5}
                        />
                    </View>

                    <LinearGradient colors={['#055555', '#055555']} style={styles.linearGradient} >

                        <TouchableOpacity  style={styles.loginButton} onPress={() => this.sendCodeAndCheck()}  >
                            <Text style={styles.loginButtonText}>Vorgehen</Text>
                        </TouchableOpacity>

                    </LinearGradient>


                    <TouchableOpacity  style={styles.goToRegister} onPress={() => this.goToLogin()} >
                        <Text style={styles.goToRegisterText}>Zurückkommen</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    loginWrapper: {
        width:'95%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height:450,
        borderRadius:15
    },

    labelPswWrapper: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        maxWidth:300,
        width: '100%',
        marginBottom:20,
        borderWidth:1,
        borderColor:'white',
        borderBottomColor:'#00426947',

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
    }
    ,
    input: {
        flex:1,
        height: 45,
        paddingHorizontal: 15,
        paddingVertical:10,
        borderRadius:4,
        backgroundColor: 'white',
        fontSize:16,
        color:'#002033',
    },
    inputext: {
        width: '100%',
        textAlign:'center',
        fontWeight:'bold',
        lineHeight: 38.4,
        marginBottom: 40,
        fontSize: 20,
        color:'#002033'
    },
    loginButton: {
        fontSize: 18,
        color:'white',
        maxWidth:300,
        width: '100%',
        height: 48,
        justifyContent:'center',
        alignItems: 'center'
    },
    loginButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
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
    }
});
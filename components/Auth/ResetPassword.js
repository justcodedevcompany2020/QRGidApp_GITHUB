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
            email: '',
            isValidEmail: true,
            existEmail: true
        };
    }


    checkEmail = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === true){
            return true;
        }
        else{
            return false;
        }

    }


    goToLogin = () => {
        this.props.navigation.navigate('Login')
    }


    createCode = () => {

        if (!this.checkEmail()) {
            this.setState({
                isValidEmail:false
            })
        } else {

            this.setState({
                isValidEmail:true
            })

                const req = {
                    email: this.state.email
                };

                axios.post('http://194-67-111-30.cloudvps.regruhosting.ru/public/api/forgot-password', req).then(
                    (response) => {

                        if (response.status === 200 && response.data.message == 'reset_code_created' ) {

                            console.log('Go to 2 step')

                            this.props.navigation.navigate('ForgotPasswordCheckCode', {
                                params:this.state.email,
                            })

                        }
                    },

                    (err) => {

                        if (err.response.status === 422 && err.response.data.message === 'User_does_not_exist') {
                            this.setState({
                                existEmail: false
                            })

                            console.log('User_does_not_exist')
                        }

                    },

                );

        }


    }


    render() {
        return (
            <ImageBackground source={require('../../assets/img/background.jpg')} style={styles.container}>
               <View style={styles.loginWrapper}>




                   <Text style={styles.inputext}> Passwort wiederherstellen</Text>


                   {this.state.existEmail === false &&
                   <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'relative',top:-2}} >Es gibt keine Benutzer mit dieser E-Mail</Text>
                   }

                   {this.state.isValidEmail === false &&
                   <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'relative',top:-2}} >Bitte geben Sie eine gültige Email-Adresse ein</Text>
                   }


                   <View style={styles.labelPswWrapper}>
                       <Svg style={{width:15, height:15, fill:'black'}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 330.001 330.001" xmlSpace="preserve" enableBackground="new 0 0 330.001 330.001">
                           <Path d="M173.871 177.097a14.982 14.982 0 01-8.87 2.903 14.98 14.98 0 01-8.871-2.903L30 84.602.001 62.603 0 275.001c.001 8.284 6.716 15 15 15L315.001 290c8.285 0 15-6.716 15-14.999V62.602l-30.001 22-126.129 92.495z" />
                           <Path d="M165.001 146.4L310.087 40.001 19.911 40z" />
                       </Svg>
                       <TextInput
                           value={this.state.email}
                           onChangeText={(email) => this.setState({ email })}
                           style={styles.input}
                           underlineColorAndroid ='transparent'
                           placeholder='Email'
                       />
                   </View>

                   <LinearGradient colors={['#055555', '#055555']} style={styles.linearGradient} >

                       <TouchableOpacity  style={styles.loginButton} onPress={() => this.createCode()}  >
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
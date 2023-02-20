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
            password: '',
            confirm_password: '',

            isValidPassword: true,
            isValidConfirmPassword: true,
            password_changed: false
        };

    }



    goToLogin = () => {
        this.props.navigation.navigate('Login')
    }

    checkPasswords = () => {

        let password = this.state.password;
        let confirm_password = this.state.confirm_password;
        let valid = true;

        if (password == '' || password.length < 6){
            this.setState({
                isValidPassword:false
            })

            valid = false;
        } else {
            this.setState({
                isValidPassword:true
            })
        }

        if (confirm_password == '' || confirm_password.length < 6){
            this.setState({
                isValidConfirmPassword:false
            })

            valid = false;
        } else {
            this.setState({
                isValidConfirmPassword:true
            })
        }

        if (valid === true) {

            if (password != confirm_password) {

                this.setState({
                    isValidPassword:false
                })
                this.setState({
                    isValidConfirmPassword:false
                })

                valid = false;

            }

        }

        return valid;

    }

    changePassword = () => {

        if (this.checkPasswords() === true) {

            this.setState({
                isValidCode:true
            })

            const req = {
                email: this.props.set_email,
                password: this.state.password,
                confirm_password: this.state.confirm_password,
            };


            axios.post('http://194-67-111-30.cloudvps.regruhosting.ru/public/api/change-password', req).then(
                (response) => {
                    console.log('response', response.data.message)

                    if (response.status === 200 && response.data.message == 'password_changes' ) {

                        this.setState({
                            password_changed:true
                        })
                    }
                },

                (err) => {

                    if (err.response.status === 422 && err.response.data.message === 'User_does_not_exist') {



                    }

                },

            );

        }

    }


    render() {
        return (
            <ImageBackground source={require('../../../assets/img/background.jpg')} style={styles.container}>

                {this.state.password_changed === true &&

                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor:'#00000080', zIndex:200}} >
                    <View style={{width:'90%', height:150, backgroundColor:'white', justifyContent:'center', alignItems:'center', borderRadius:5}}>
                        <Text style={{width:'100%', textAlign:'center', marginBottom:15, fontSize:20}}>
                            Password changed
                        </Text>
                        <TouchableOpacity  style={{width:'80%', height:50,justifyContent:'center', alignItems:'center',backgroundColor:'#055555'}} onPress={() => this.goToLogin()}  >
                            <Text style={styles.loginButtonText}>Go to login</Text>
                        </TouchableOpacity>


                    </View>
                </View>

                }
                <View style={styles.loginWrapper}>



                    <Text style={styles.inputext}>Passwort ändern</Text>


                    {/*isValidPassword*/}
                    {/*isValidConfirmPassword*/}


                    <View style={styles.labelPswWrapper} opacity={0.5}>
                        <Svg style={{width:15, height:15, fill:'black'}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 330.001 330.001" xmlSpace="preserve" enableBackground="new 0 0 330.001 330.001">
                            <Path d="M173.871 177.097a14.982 14.982 0 01-8.87 2.903 14.98 14.98 0 01-8.871-2.903L30 84.602.001 62.603 0 275.001c.001 8.284 6.716 15 15 15L315.001 290c8.285 0 15-6.716 15-14.999V62.602l-30.001 22-126.129 92.495z" />
                            <Path d="M165.001 146.4L310.087 40.001 19.911 40z" />
                        </Svg>
                        <TextInput
                            value={this.props.set_email}
                            onChangeText={(email) => this.setState({ email })}
                            style={[styles.input]}
                            underlineColorAndroid ='transparent'
                            placeholder='Email'
                            editable={false}
                        />
                    </View>

                    <View style={styles.labelPswWrapper}>



                        <Svg style={{width:15, height:15, fill:'black'}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 330 330" xmlSpace="preserve" enableBackground="new 0 0 330 330">
                            <Path d="M65 330h200c8.284 0 15-6.716 15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85S80 38.131 80 85v45H65c-8.284 0-15 6.716-15 15v170c0 8.284 6.716 15 15 15zm115-95.014V255c0 8.284-6.716 15-15 15s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986 0-13.785 11.215-25 25-25s25 11.215 25 25c0 8.162-3.932 15.421-10 19.986zM110 85c0-30.327 24.673-55 55-55s55 24.673 55 55v45H110V85z" />
                        </Svg>
                        <TextInput
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                            secureTextEntry={true}
                            style={styles.input}
                            underlineColorAndroid ='transparent'
                            placeholder='Passwort'
                        />


                        {this.state.isValidPassword === false &&
                        <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'absolute',top:-2, textAlign:'right'}} >Geben Sie das richtige Passwort ein</Text>
                        }
                    </View>

                    <View style={styles.labelPswWrapper}>
                        <Svg style={{width:15, height:15, fill:'black'}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 330 330" xmlSpace="preserve" enableBackground="new 0 0 330 330">
                            <Path d="M65 330h200c8.284 0 15-6.716 15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85S80 38.131 80 85v45H65c-8.284 0-15 6.716-15 15v170c0 8.284 6.716 15 15 15zm115-95.014V255c0 8.284-6.716 15-15 15s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986 0-13.785 11.215-25 25-25s25 11.215 25 25c0 8.162-3.932 15.421-10 19.986zM110 85c0-30.327 24.673-55 55-55s55 24.673 55 55v45H110V85z" />
                        </Svg>
                        <TextInput
                            value={this.state.confirm_password}
                            onChangeText={(confirm_password) => this.setState({ confirm_password })}
                            secureTextEntry={true}
                            style={styles.input}
                            underlineColorAndroid ='transparent'
                            placeholder='Bestätige das Passwort'
                        />

                        {this.state.isValidConfirmPassword === false &&
                        <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'absolute',top:-2, textAlign:'right'}} >Geben Sie das richtige Passwort ein</Text>
                        }

                    </View>

                    <LinearGradient colors={['#055555', '#055555']} style={styles.linearGradient} >

                        <TouchableOpacity  style={styles.loginButton} onPress={() => this.changePassword()}  >
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
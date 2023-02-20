import React, { Component } from 'react';
import { Text, Alert, Button, View, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
// import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from "react-native-custom-dropdown";
import Svg, {Path} from "react-native-svg";
import axios from "axios";

import i18n from 'i18n-js';
import { de, en } from '../../i18n/supportedLanguages';
i18n.fallbacks = false;
i18n.translations = { en, de };

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

            language: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',

            isValidLanguage: true,
            isValidName: true,
            isValidEmail: true,
            isValidPassword: true,
            isValidConfirmPassword: true,
            errorEmailExist:false,

            registered:false

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

    checkFields = () => {

        let language = this.state.language;
        let name     = this.state.name;
        let email    = this.state.email;
        let password = this.state.password;
        let password_confirmation = this.state.password_confirmation;

        let valid    = true;

        console.log(language, name, email, password, password_confirmation, this.checkEmail());

        if (language == '') {
            this.setState({
                isValidLanguage:false
            })

            valid = false;
        } else {
            this.setState({
                isValidLanguage:true
            })
        }

        if (name == '') {
            this.setState({
                isValidName:false
            })

            valid = false;
        } else {
            this.setState({
                isValidName:true
            })
        }

        if (email == '') {
            this.setState({
                isValidEmail:false
            })

            valid = false;
        } else {

            if (!this.checkEmail()) {
                this.setState({
                    isValidEmail:false
                })
                valid = false;

            } else {
                this.setState({
                    isValidEmail:true
                })
            }
        }

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

        if (password_confirmation == '' || password_confirmation.length < 6){
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

            if (password != password_confirmation) {

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


    goToLogin = () => {
        this.setState({
            language: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            registered:false
        })
        this.props.navigation.navigate('Login')
    }

    changeLanguage = (language) => {

        this.setState({
            language:language.value
        })

    }

    registerUser = () => {

        if (this.checkFields() === true) {

            const req = {
                name: this.state.name,
                language: this.state.language,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
            };


            axios.post('http://194-67-111-30.cloudvps.regruhosting.ru/public/api/register', req).then(
                (response) => {

                    if (response.status === 200 && response.data.message == 'user_created' ) {

                        this.setState({
                            registered:true
                        })
                    }
                },

                (err) => {

                    if (err.response.status === 422 && err.response.data.message == 'email_has_already_exist') {

                        this.setState({
                            errorEmailExist:true
                        })

                    }

                },

            );

        } else {
            console.log('error')
        }

    }




    onLogin() {
        const { email, password } = this.state;
        Alert.alert('Credentials', `${email} + ${password}`);
    }

    render() {
        return (
            <ImageBackground  source={require('../../assets/img/background.jpg')} style={styles.container}>


                {this.state.registered === true &&

                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor:'#00000080', zIndex:200}} >
                    <View style={{width:'90%', height:150, backgroundColor:'white', justifyContent:'center', alignItems:'center', borderRadius:5}}>
                        <Text style={{width:'100%', textAlign:'center', marginBottom:15, fontSize:20}}>
                            Registered Successfully
                        </Text>
                        <TouchableOpacity  style={{width:'80%', height:50,justifyContent:'center', alignItems:'center',backgroundColor:'#055555'}} onPress={() => this.goToLogin()}  >
                            <Text style={styles.loginButtonText}>Go to login</Text>
                        </TouchableOpacity>


                    </View>
                </View>

                }
               <View style={styles.loginWrapper}>
                   <Text style={styles.inputext}> Anmeldung </Text>

                   {/*<View style={{width:'100%', marginBottom:20, maxWidth:300, borderBottomColor: '#00426947', borderBottomWidth:1, zIndex:300, elevation: 1,}}>*/}


                   {this.state.isValidLanguage === false &&
                   <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10, textAlign:'right'}} >Eror Language</Text>
                   }
                       <DropDownPicker
                           items={[
                               {
                                   label: 'English',
                                   value: 'english',
                               },
                               {
                                   label: 'France',
                                   value: 'france',
                               },
                               {
                                   label: 'Germany',
                                   value: 'germany',
                               },
                           ]}
                           containerStyle={{height: 45}}
                           style={{
                               backgroundColor: '#fff',
                               borderWidth:0,
                               borderBottomColor: '#00426947',
                               borderBottomWidth:1,
                               width:'100%',
                               maxWidth:300
                           }}
                           placeholder='Language'
                           labelStyle={{
                               color:'#4C4C66',
                           }}
                           itemStyle={{
                               justifyContent: 'flex-start',
                               width:'100%'
                           }}
                           dropDownStyle={{
                               backgroundColor: 'white',
                               maxWidth:300
                           }}
                           onChangeItem={item => this.changeLanguage(item)}
                       />
                   {/*</View>*/}

                   {/*START ФИО*/}
                   <View style={[styles.labelPswWrapper, {marginTop:15}]}>


                       <Svg  style={{width:15, height:15, fill:'black'}}  xmlns="http://www.w3.org/2000/svg"  x="0px"  y="0px"  viewBox="0 0 60 60"  xmlSpace="preserve"  enableBackground="new 0 0 60 60">
                           <Path d="M48.014 42.889l-9.553-4.776A2.63 2.63 0 0137 35.748v-3.381c.229-.28.47-.599.719-.951a22.886 22.886 0 002.954-5.799A3.968 3.968 0 0043 22v-4c0-.963-.36-1.896-1-2.625v-5.319c.056-.55.276-3.824-2.092-6.525C37.854 1.188 34.521 0 30 0s-7.854 1.188-9.908 3.53C17.724 6.231 17.944 9.506 18 10.056v5.319c-.64.729-1 1.662-1 2.625v4c0 1.217.553 2.352 1.497 3.109.916 3.627 2.833 6.36 3.503 7.237v3.309c0 .968-.528 1.856-1.377 2.32l-8.921 4.866A9.018 9.018 0 007 50.762V54c0 4.746 15.045 6 23 6s23-1.254 23-6v-3.043a8.973 8.973 0 00-4.986-8.068z" />
                       </Svg>

                       <TextInput
                           value={this.state.name}
                           onChangeText={(name) => this.setState({ name })}
                           style={styles.input}
                           underlineColorAndroid="transparent"
                           placeholder='Vollständiger Name'
                       />

                       {this.state.isValidName === false &&
                       <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'absolute',top:-2, textAlign:'right'}} >Eror name</Text>
                       }
                   </View>
                   {/*END ФИО*/}


                   {/*START Email*/}
                   <View style={styles.labelPswWrapper}>
                       <Svg style={{width:15, height:15, fill:'black'}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 330.001 330.001" xmlSpace="preserve" enableBackground="new 0 0 330.001 330.001">
                           <Path d="M173.871 177.097a14.982 14.982 0 01-8.87 2.903 14.98 14.98 0 01-8.871-2.903L30 84.602.001 62.603 0 275.001c.001 8.284 6.716 15 15 15L315.001 290c8.285 0 15-6.716 15-14.999V62.602l-30.001 22-126.129 92.495z" />
                           <Path d="M165.001 146.4L310.087 40.001 19.911 40z" />
                       </Svg>

                       <TextInput
                           value={this.state.email}
                           onChangeText={(email) => this.setState({ email })}
                           style={styles.input}
                           underlineColorAndroid="transparent"
                           placeholder='Email'
                       />


                       {this.state.isValidEmail === false &&
                       <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'absolute',top:-2, textAlign:'right'}} >Eror Email</Text>
                       }

                       {this.state.errorEmailExist === true &&
                       <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'absolute',top:-2, textAlign:'right'}} >Email exist</Text>
                       }

                   </View>
                   {/*END Email*/}

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
                       <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'absolute',top:-2, textAlign:'right'}} >Eror Password</Text>
                       }
                   </View>

                   <View style={styles.labelPswWrapper}>
                       <Svg style={{width:15, height:15, fill:'black'}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 330 330" xmlSpace="preserve" enableBackground="new 0 0 330 330">
                           <Path d="M65 330h200c8.284 0 15-6.716 15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85S80 38.131 80 85v45H65c-8.284 0-15 6.716-15 15v170c0 8.284 6.716 15 15 15zm115-95.014V255c0 8.284-6.716 15-15 15s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986 0-13.785 11.215-25 25-25s25 11.215 25 25c0 8.162-3.932 15.421-10 19.986zM110 85c0-30.327 24.673-55 55-55s55 24.673 55 55v45H110V85z" />
                       </Svg>
                       <TextInput
                           value={this.state.password_confirmation}
                           onChangeText={(password_confirmation) => this.setState({ password_confirmation })}
                           secureTextEntry={true}
                           style={styles.input}
                           underlineColorAndroid ='transparent'
                           placeholder='Kennwort bestätigen'
                       />


                       {this.state.isValidConfirmPassword === false &&
                       <Text style={{color:'red', fontSize:8,  maxWidth:300,width: '100%',marginBottom:10,position:'absolute',top:-2, textAlign:'right'}} >Eror Password Confirm</Text>
                       }
                   </View>


                   <LinearGradient colors={['#055555', '#055555']} style={styles.linearGradient} >
                       <TouchableOpacity  style={styles.loginButton} onPress={() => this.registerUser()} >
                           <Text style={styles.loginButtonText}>Registrieren</Text>
                       </TouchableOpacity>
                   </LinearGradient>


                   <View style={styles.existAccountWrapper}>
                       <Text style={styles.goToLogin}>Ein Konto haben? </Text>
                       <TouchableOpacity  style={{}} onPress={() => this.goToLogin()} >
                           <Text style={styles.goToLogin}>Betreten</Text>
                       </TouchableOpacity>
                   </View>


               </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    loginWrapper: {
        width:'95%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius:15,
        paddingVertical:25
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    existAccountWrapper:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    labelPswWrapper: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        maxWidth:300,
        width: '100%',
        marginBottom:15,
        borderWidth:1,
        borderColor:'white',
        borderBottomColor:'#00426947',
        paddingBottom:1
    },
    emailWrapper: {
        width:'100%',
        maxWidth:300,
        height:45,
        marginBottom:16
    }
    ,
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
    },
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
    goToLogin:{
        fontSize:18,
        color:'#00395ccc'
    }
    ,
    inputext: {
        maxWidth:300,
        width: '100%',
        textAlign:'left',
        fontWeight:'bold',
        lineHeight: 38.4,
        marginBottom: 40,
        fontSize: 25,
        color:'#002033',

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
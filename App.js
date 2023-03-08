import * as React from 'react';
import 'react-native-gesture-handler';

import { Button, View, Text, Image, ScrollView, StyleSheet, StatusBar, Dimensions, ActivityIndicator   } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


import LoaderComponent from './components/Loader';
import DashboardComponent from './components/Dashboard';
//
import QrScannerComponent from './components/qr_scaner';
import ObjectComponent from './components/Object/ObjectComponent';
import ObjectMapComponent from './components/Object/ObjectMapComponent';
import AboutComponent from './components/AboutComponent';
import ChangeLanguage from './components/ChangeLanguage';
import ContactForm from './components/ContactForm';
import ProfileComponent from './components/Profile/Profile';
import LoginComponent from './components/Auth/LoginScreen';
import MyPlacesComponent from './components/MyPlaces';


import { AuthContext } from './components/AuthContext/context';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'


function LoaderComponentScreen({ navigation }) {
    return (
        <LoaderComponent navigation={navigation}  />
    );
}


function DashboardScreen({ navigation }) {
  return (
      <DashboardComponent navigation={navigation}  />
  );
}

function LoginScreen({ navigation }) {
    return (
        <LoginComponent navigation={navigation}  />
    );
}


function QrScannerScreen({ navigation }) {
  return (
      <QrScannerComponent navigation={navigation}  />
  );
}

function ObjectScreen({route, navigation }) {

  const {params} = route.params;

  return (
      <ObjectComponent object_data={params} navigation={navigation}  />
  );
}

function ObjectMapScreen({route, navigation }) {
  // const {params} = route.params;

  return (
      <ObjectMapComponent  navigation={navigation}  />
  );
}

function AboutScreen({route, navigation }) {
  // const {params} = route.params;
  return (
      <AboutComponent  navigation={navigation}  />
  );
}

function ChangeLanguageScreen({route, navigation }) {
  // const {params} = route.params;
  return (
      <ChangeLanguage  navigation={navigation}  />
  );
}

function ContactFormScreen({route, navigation }) {
  // const {params} = route.params;
  return (
      <ContactForm  navigation={navigation}  />
  );
}


function ProfileScreen({route, navigation }) {
  // const {params} = route.params;
  return (
      <ProfileComponent  navigation={navigation}  />
  );
}

function MyPlacesScreen({route, navigation }) {
  // const {params} = route.params;
  return (
      <MyPlacesComponent  navigation={navigation}  />
  );
}


// const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


const tabBarStyle = {
  height: 90,
  backgroundColor: 'white',
  elevation: 0,
  borderTopColor:'white',
  width: Dimensions.get('window').width - 50,
  marginTop: 0,
  marginRight: 'auto',
  marginBottom: 0,
  marginLeft: 'auto',
}


export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userEmail: null,
    userToken: null,
    userId: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':

          console.log({
              ...prevState,
              userEmail: action.email,
              userToken: action.token,
              userId: action.userId,
              isLoading: false,
          })

        return {
          ...prevState,
          userEmail: action.email,
          userToken: action.token,
          userId: action.userId,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({

    signIn: async(foundUser, callback) => {
      // setIsLoading(true);

      const userToken = String(foundUser.token);
      const userEmail = foundUser.email;
      const userPassword = foundUser.password;
      const userId = foundUser.userId;
      // const language = foundUser.language;
      // setUserToken(userToken);

      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('language', JSON.stringify({language: 'ru'}));

        await AsyncStorage.setItem('userEmail', userEmail);
        await AsyncStorage.setItem('userPassword', userPassword);

      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', email: userEmail, token: userToken, userId:userId  });
        callback()
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('language');

        setIsLoading(false);

      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    getToken: async() => {
      try {
          // let userToken = await AsyncStorage.getItem('userToken');
          // return userToken;
          console.log('getToken')
      } catch(e) {
        console.log(e);
      }
    },
    signUp: () => {
      // setIsLoading(false);
    }
  }), []);


  // Проверка при входе в приложение.

  React.useEffect(() => {
    setTimeout(async() => {

      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        // console.log(userToken, 'userToken');
        setIsLoading(  false);

      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 500);
    // }, 1000);
  }, []);


  // if( isLoading ) {
  // // if( true ) {
  //   return(
  //       // <LoaderComponent />
  //
  //       <View style={{width: '100%', height: '100%', backgroundColor: '#FF9161'}}>
  //
  //       </View>
  //   );
  // }


if( isLoading ) {
    return(
        <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
            <ActivityIndicator size="large" color="#E1C1B7"/>
        </View>
    );
}

  return (
      <AuthContext.Provider  value={authContext}>
        <NavigationContainer>
                  <Stack.Navigator
                      initialRouteName="LoaderComponent"
                      screenOptions={{
                          tabBarShowLabel: false,
                          headerShown: false,
                          tabBarActiveTintColor: '#2EB6A5',
                          tabBarInactiveTintColor: 'gray',
                          tabBarStyle: {display: 'none'},
                      }}
                      tabBar={() => null}
                  >

                    <Stack.Screen name="LoaderComponent" component={LoaderComponentScreen}
                        options={({route}) => ({
                          tabBarButton: () => null,
                          tabBarStyle: {display: 'none'}
                        })}
                    />

                    <Stack.Screen name="Dashboard" component={DashboardScreen}
                        options={({route}) => ({
                          tabBarButton: () => null,
                          tabBarStyle: {display: 'none'}
                        })}
                    />


                    <Stack.Screen name="QrScanner" component={QrScannerScreen}
                        options={({route}) => ({
                          tabBarButton: () => null,
                          tabBarStyle: {display: 'none'}
                        })}
                    />

                    <Stack.Screen name="Object" component={ObjectScreen}
                        options={({route}) => ({
                          tabBarButton: () => null,
                          tabBarStyle: {display: 'none'}
                        })}
                    />

                    <Stack.Screen name="ObjectMap" component={ObjectMapScreen}
                        options={({route}) => ({
                          tabBarButton: () => null,
                          tabBarStyle: {display: 'none'}
                        })}
                    />

                    <Stack.Screen name="About" component={AboutScreen}
                        options={({route}) => ({
                          tabBarButton: () => null,
                          tabBarStyle: {display: 'none'}
                        })}
                    />

                    <Stack.Screen name="ChangeLanguage" component={ChangeLanguageScreen}
                        options={({route}) => ({
                          tabBarButton: () => null,
                          tabBarStyle: {display: 'none'}
                        })}
                    />

                <Stack.Screen name="ContactForm" component={ContactFormScreen}
                    options={({route}) => ({
                      tabBarButton: () => null,
                      tabBarStyle: {display: 'none'}
                    })}
                />


                  <Stack.Screen name="Profile" component={ProfileScreen}
                      options={({route}) => ({
                          tabBarButton: () => null,
                          tabBarStyle: {display: 'none'}
                      })}
                  />


                  <Stack.Screen name="Login" component={LoginScreen}
                        options={({route}) => ({
                          tabBarButton: () => null,
                          tabBarStyle: {display: 'none'}
                        })}
                  />


                  <Stack.Screen name="MyPlaces" component={MyPlacesScreen}
                        options={({route}) => ({
                          tabBarButton: () => null,
                          tabBarStyle: {display: 'none'}
                        })}
                  />

                  </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
  );
}

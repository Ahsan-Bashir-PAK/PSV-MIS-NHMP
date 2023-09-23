import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Home from '../screens/home';
import MyTabs from './tabnavigation';
import TestPage from '../screens/forms/testPage';
import SignUp from '../screens/forms/signUp';
import AddDrivernew from '../screens/forms/addDrivernew';
import AddDocumentation from '../screens/forms/addDocumentation';
import TripReport from '../screens/forms/tripReport';




const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen name="Home" component={Home} 
         options={{ headerShown: false }}
        />
         <Stack.Screen name="TestPage" component={TestPage} /> 
         {/* <Stack.Screen name="AddDrivernew" component={AddDrivernew} />   */}
         <Stack.Screen name="Trip Report" component={TripReport} />
         <Stack.Screen name="SignUp" component={SignUp} /> 
        <Stack.Screen name="MyTabs" component={MyTabs} 
        options={{
          headerShown:false
        }}
        />
      </Stack.Navigator>
     </NavigationContainer>
  );
};

export default MyStack
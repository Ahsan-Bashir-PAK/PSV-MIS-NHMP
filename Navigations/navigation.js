import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/loginnew';
import Home from '../screens/home';
import MyTabs from './tabnavigation';
import OnlineVerifications from '../screens/forms/onlineVerifications';
import SignUp from '../screens/forms/signUp';
import TripReport from '../screens/forms/tripReport';
import AddDrivernew from '../screens/forms/addDrivernew';
import AddVehicle from '../screens/forms/addVehicle';
import AddDocumentation from '../screens/forms/addDocumentation';
import AddCondition from '../screens/forms/addCondition'
import AddOtherInfo from '../screens/forms/addOtherinfo';
import Downloads from '../screens/downloads';
import Profile from '../screens/profile'
import FeedBack from '../screens/feedBack';
import InspectionReport from '../screens/reports/VehicleinspectionHistory';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="InspectionHistory" component={InspectionReport}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen name="Login" component={Login}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen name="Home" component={Home} 
         options={{ 
          unmountOnBlur:true,
          headerShown: false }}
        />
         <Stack.Screen name="Feed Back" component={FeedBack} /> 
         <Stack.Screen name="OnlineVerifications" component={OnlineVerifications} /> 
         <Stack.Screen name="Profile" component={Profile} /> 
         <Stack.Screen name="Downloads" component={Downloads} /> 
         <Stack.Screen name="Trip Report" component={TripReport} />
         <Stack.Screen name="SignUp" component={SignUp} /> 
        <Stack.Screen name="MyTabs" component={MyTabs} 
        options={{
          headerShown:false
         
        }}
        />
         <Stack.Screen name="AddDrivernew" component={AddDrivernew} />
         <Stack.Screen name="Add Vehicle" component={AddVehicle} />
         <Stack.Screen name="Add Documentation" component={AddDocumentation} />
         <Stack.Screen name="Add Condition" component={AddCondition} />
         <Stack.Screen name="Other Info" component={AddOtherInfo} />

      </Stack.Navigator>
     </NavigationContainer>
  );
};

export default MyStack
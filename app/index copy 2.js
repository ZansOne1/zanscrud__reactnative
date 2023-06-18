import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dataikan from './Dataikan'

const Stack = createNativeStackNavigator();

class Index extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Dataikan">
              <Stack.Screen name="Dataikan" component={Dataikan} 
                options={{
                    headerShown:false
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
         );
    }
}
 
export default Index;
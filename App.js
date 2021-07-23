/* react */
import React from 'react';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

/* react-navigation requests */
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* Pages to navigation */ 
import Home from './src/pages/home/home.component';
import Post from './src/pages/new-post/post.component';
import ViewPost from './src/components/view-post/view-post.component';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFAFA'
  },
};

export const HomeScreen = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="View Post" component={ViewPost}/>
            <Stack.Screen name="Post" component={Post}/>
        </Stack.Navigator>
    );
}

export const PostScreen = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Post">
            <Stack.Screen name="Post" component={Post}/>
            <Stack.Screen name="View Post" component={ViewPost}/>
        </Stack.Navigator>
    );
}

export const SearchScreen = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Searh">
            <Stack.Screen name="View Post" component={ViewPost}/>
        </Stack.Navigator>
    );
}


export default function App() {
    return (
        <NavigationContainer initialRouteName="Home" theme={theme}> 
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => { //default values
                        let iconName;

                        switch (route.name) {
                            case 'Home':
                                iconName = 'home';
                                break;
                            case 'Search':
                                iconName = 'search';
                                break;
                            case 'Post':
                                iconName = 'edit';
                                break;
                            default:
                                iconName = 'circle';
                                break;
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
                    tabBarOptions={{
                    activeTintColor: '#004AAD',
                    inactiveTintColor: '#777',
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Post" component={PostScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

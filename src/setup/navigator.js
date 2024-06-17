import React, {useEffect} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {Text, StyleSheet, Platform} from 'react-native';
import {colors, fontFaces, fontSizes} from '../styles/index';
import Welcome from '../screens/welcome';
import Login from '../screens/login';
import Home from '../screens/home';

const Tab = createBottomTabNavigator();

const WelcomeNav = createStackNavigator();
const AuthNav = createStackNavigator();

const WelcomeStack = () => (
  <WelcomeNav.Navigator
    initialRouteName="welcome"
    screenOptions={{
      headerShown: false,
    }}
    defaultScreenOptions={{headerShown: false}}>
    <WelcomeNav.Screen name="welcome" component={Welcome} />
  </WelcomeNav.Navigator>
);

const AuthStack = () => (
  <AuthNav.Navigator
    initialRouteName="home"
    screenOptions={{
      headerShown: false,
    }}
    defaultScreenOptions={{headerShown: false}}>
    <AuthNav.Screen name="login" component={Login} />
    <AuthNav.Screen name="home" component={Home} />
    {/* <AuthNav.Screen name="forgotPassword" component={ForgotPassword} /> */}
  </AuthNav.Navigator>
);

const TabNavigator = () => {
  const tabBarTitleMapper = {
    homeStack: {
      title: 'Home',
    },
    requestStack: {
      title: 'Request',
    },
    recent: {
      title: 'Recent',
    },
    meStack: {
      title: 'Me',
    },
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const Icon = '';
          // tabBarIconMapper[route.name][focused ? 'active' : 'inactive'];
          return (
            <Icon
              style={styles.navIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
            />
          );
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={[
              styles.navText,
              {
                // color: focused ? colors.textSecondary : colors.text2,
              },
            ]}>
            {tabBarTitleMapper[route.name]?.title}
          </Text>
        ),
        tabBarStyle: [
          styles.tabBar,
          {
            // display:
            //   tabBarVisibilityMapper[
            //     getFocusedRouteNameFromRoute(route) || route?.name
            //   ] || "flex",
          },
        ],
        tabBarItemStyle:
          Platform.OS === 'android' ? styles.tabBarItemAndroid : {},
        headerShown: false,
      })}
      initialRouteName="homeStack">
      {/* <Tab.Screen name="homeStack" component={HomeStack} /> */}
    </Tab.Navigator>
  );
};

const Navigator = props => {
  const token = useSelector(state => state.login.token);
  const displayWelcomeScreen = useSelector(
    state => state.welcomeScreen.display,
  );

  return token ? (
    <TabNavigator {...props} />
  ) : displayWelcomeScreen ? (
    <WelcomeStack />
  ) : (
    <AuthStack {...props} />
  );
};

const styles = StyleSheet.create({
  navText: {
    // ...fontFaces.regular.medium,
    fontSize: fontSizes.size11,
    lineHeight: 12.6,
    letterSpacing: 0.1,
    marginTop: -5,
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  tabBar: {
    height: Platform.OS === 'ios' ? 83 : 70,
    borderTopColor: '#0000004d',
    backgroundColor: '#ffffff',
  },
  tabBarItemAndroid: {height: 70},
  navIcon: {marginBottom: 0},
});

export default Navigator;

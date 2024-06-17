import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import RadialGradient from 'react-native-radial-gradient';
import {Button} from '../components';
import {colors, fontSizes, radius, spacing} from '../styles';

const xml = `
 <svg
          xmlns="http://www.w3.org/2000/svg"
          width="393"
          height="150"
          fill="none">
          <g clipPath="url(#a)">
            <path
              fill="#05427D"
              d="m-170 0 28.125 25.02C-113.75 49.805-57.5 100.195-1.25 109.394c56.25 9.55 112.5-22.09 168.75-43.77 56.25-21.68 112.5-34.57 168.75-25.02 56.25 9.2 112.5 40.84 168.75 50.04 56.25 9.55 112.5-3.34 140.625-9.376L673.75 75v75H-170V0Z"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h393v150H0z" />
            </clipPath>
          </defs>
        </svg>
`;

const Welcome = () => {
  return (
    <View style={styles.container}>
      <RadialGradient
        style={styles.linearGradient}
        colors={['#2E679C', '#00478A']}
        stops={[0, 0.9]}
        center={[200, 350]}
        radius={300}>
        <View style={styles.logoContainer}>
          <Text style={styles.northwestMonitoringText}>
            NORTHWEST MONITORING
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.description}>
            Lorem Ipsum has been the industry's standard
          </Text>
          <Button
            text={'Login'}
            isLoading={false}
            textStyle={styles.buttonText}
            rippleContainerBorderRadius={radius.radius8}
            style={styles.button}
            onPress={() => console.log('Login pressed')}
          />
        </View>
        <SvgXml xml={xml} width="100%" />
      </RadialGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  backgroundNwmText: {
    fontSize: 128,
    fontWeight: '900',
    color: '#05427D',
    position: 'absolute',
    top: Dimensions.get('screen').height / 2 - 300,
  },
  northwestMonitoringText: {
    fontSize: fontSizes.size24,
    color: colors.white,
    marginTop: spacing.sm,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: fontSizes.size40,
    color: colors.white,
    paddingTop: spacing.lg,
    marginBottom: spacing.sm,
    fontWeight: 'bold',
  },
  description: {
    fontSize: fontSizes.size16,
    color: colors.white,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: radius.radius4,
    paddingHorizontal: spacing.md,
    height: 45,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: fontSizes.size16,
    color: '#004495',
    fontWeight: 'bold',
  },
});

export default Welcome;

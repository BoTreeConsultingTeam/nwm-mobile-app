import { Formik } from 'formik';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Input, Button, Ripple } from '../components';
import { colors, fontSizes, radius, spacing } from '../styles';
import AppIcon from '../assets/icons/AppLogo.png';
import { useDispatch } from 'react-redux';
import { setToken } from '../reducers/login';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../schema/login';

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

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(setToken('token'));
  };

  const [{ isLoading }, { handleLoginSubmit }] = useLogin();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={AppIcon} style={styles.appIcon} resizeMode="contain" />
      </View>
      <View style={styles.loginForm}>
        <Text style={styles.loginTitle}>Login</Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          validateOnBlur
          validateOnChange
          onSubmit={values => {
            handleLoginSubmit(values);
          }}>
          {({ handleSubmit, setFieldValue, values, errors, touched }) => {
            return (
              <View style={styles.form}>
                <Input
                  floatingLabel="Email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={text => {
                    setFieldValue('email', text);
                  }}
                  value={values?.email}
                  showError={errors.email && touched.email}
                  error={errors.email}
                />
                <Input
                  floatingLabel="Password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={text => setFieldValue('password', text)}
                  value={values?.password}
                  showError={errors.password && touched.password}
                  error={errors.password}
                  secureTextEntry={true}
                />
                <Ripple
                  style={styles.forgotPasswordView}
                  onPress={() => navigation.navigate('forgotPassword')}>
                  <Text style={styles.forgotPassword}>Forgot Password</Text>
                </Ripple>

                <Button
                  text={'Login'}
                  isLoading={isLoading}
                  textStyle={styles.buttonText}
                  rippleContainerBorderRadius={radius.radius8}
                  style={styles.button}
                  onPress={() => handleSubmit()}
                  disabled={isLoading}
                />
              </View>
            );
          }}
        </Formik>
        <View style={styles.bottomCurve}>
          <SvgXml xml={xml} width="100%" />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  appIcon: {
    marginBottom: spacing.sm,
    top: -20,
    width: 200,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#00478A',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },

  northwestMonitoringText: {
    fontSize: fontSizes.size24,
    color: colors.white,
    marginTop: spacing.sm,
  },
  loginForm: {
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderTopRightRadius: spacing.xxl,
    borderTopLeftRadius: spacing.xxl,
    flex: 1,
  },
  loginTitle: {
    fontSize: fontSizes.size32,
    fontWeight: 'bold',
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  bottomCurve: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    borderRadius: radius.radius8,
    backgroundColor: '#00529B',
    paddingHorizontal: spacing.md,
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.size16,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#00529B',
    fontSize: fontSizes.size16,
    fontWeight: 'bold',
    marginRight: spacing.md,
  },
  forgotPasswordView: {
    alignSelf: 'flex-end',
    marginTop: spacing.md,
  },
  form: {
    margin: spacing.md,
  },
});
export default Login;

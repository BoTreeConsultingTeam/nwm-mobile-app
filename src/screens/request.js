import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, WithContainer} from '../components';
import {colors, fontSizes, radius, spacing} from '../styles';
import RequestItem from '../components/projectRequest/requestItem';

const ProjectRequest = () => {
  return (
    <WithContainer
      pageTitle={'New Project Request'}
      actions={[
        {
          icon: 'magnify',
        },
        {
          icon: 'bell-badge-outline',
        },
      ]}>
      <View style={styles.main}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={() => <RequestItem />}
        />
        <View style={{paddingHorizontal: 20}}>
          <Button
            text={'Accept All'}
            isLoading={false}
            textStyle={styles.buttonText}
            rippleContainerBorderRadius={radius.radius8}
            style={styles.button}
          />
        </View>
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonText: {
    color: colors.success,
    fontSize: fontSizes.size16,
  },
  button: {
    borderRadius: radius.radius8,
    backgroundColor: '#D8FFD5',
    paddingHorizontal: spacing.md,
    alignSelf: 'center',
    marginTop: spacing.md,
  },
});
export default ProjectRequest;

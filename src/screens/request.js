import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Button, WithContainer } from '../components';
import { colors, fontFaces, fontSizes, radius, spacing } from '../styles';
import RequestItem from '../components/projectRequest/requestItem';
import { useProjectRequest } from '../hooks/useRequest';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const ProjectRequest = ({ navigation }) => {
  const [
    { isLoading, projectList, isPaginationLoading, endReached, refreshing },
    {
      fetchNextPage,
      handleRefresh,
      handleProjectRequest,
      handleAcceptAllRequest,
    },
  ] = useProjectRequest();

  return (
    <WithContainer
      pageTitle={'New Project Request'}
      actions={[
        {
          icon: 'bell-badge-outline',
          onPress: () => navigation.navigate('notification'),
        },
      ]}
      headerStyle={styles.header}>
      <View style={styles.main}>
        {projectList.length ? (
          <FlatList
            data={projectList}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item, index }) => (
              <RequestItem
                item={item}
                index={index}
                handleProjectRequest={handleProjectRequest}
              />
            )}
            bounces
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                enabled={true}
                tintColor={colors.backgroundPrimary}
                progressBackgroundColor={colors.white}
              />
            }
            keyExtractor={(_, index) => index}
            onEndReachedThreshold={0.01}
            onEndReached={fetchNextPage}
            ListFooterComponent={
              isPaginationLoading && !endReached ? (
                <ActivityIndicator animating color={colors.backgroundPrimary} />
              ) : null
            }
          />
        ) : isLoading ? (
          <View style={styles.noContent}>
            <ActivityIndicator animating color={colors.primary} />
          </View>
        ) : (
          <View style={styles.noContent}>
            <Text style={styles.text}>No Results Found</Text>
          </View>
        )}
        {!!projectList.length && (
          <View style={{ paddingHorizontal: 20 }}>
            <Button
              text={'Accept All'}
              onPress={handleAcceptAllRequest}
              isLoading={false}
              textStyle={styles.buttonText}
              rippleContainerBorderRadius={radius.radius8}
              style={styles.button}
            />
          </View>
        )}
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
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
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...fontFaces.regular.bold,
    fontSize: fontSizes.size18,
    lineHeight: 23,
    color: colors.text1,
  },
});
export default ProjectRequest;

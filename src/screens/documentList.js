import React from 'react';
import { useDocument } from '../hooks/useDocument';
import { Ripple, WithContainer } from '../components';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../styles';
import { ActivityIndicator, Snackbar } from 'react-native-paper';

const DocumentList = ({ navigation, route }) => {
  const [{ isLoading, documentList, loading }, { handleDocumentOpen }] =
    useDocument({
      route: route,
      navigation: navigation,
    });

  const getFileName = url => {
    return url.split('/').pop();
  };

  return (
    <WithContainer
      actions={[]}
      pageTitle={'Documents'}
      searchBar={false}
      onBackPress={() => navigation.goBack()}
      headerStyle={styles.header}>
      <View style={styles.main}>
        {isLoading ? (
          <View style={styles.noContent}>
            <ActivityIndicator animating color={colors.primary} />
          </View>
        ) : documentList.length ? (
          <FlatList
            data={documentList}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.itemBox}>
                <Ripple onPress={() => handleDocumentOpen(item)}>
                  <Text style={styles.text}>{getFileName(item)}</Text>
                </Ripple>
              </View>
            )}
          />
        ) : (
          <View style={styles.noContent}>
            <Text>No results found</Text>
          </View>
        )}
        <Snackbar visible={loading}>Opening...</Snackbar>
      </View>
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
  },
  main: {
    flex: 1,
    margin: spacing.sm,
  },
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBox: {
    margin: 3,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DocumentList;

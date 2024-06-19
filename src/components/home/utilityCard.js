import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Badge, Card, Icon} from 'react-native-paper';
import {fontFaces, fontSizes} from '../../styles';

const UtilityCard = ({icon, text, count, style, onClick}) => {
  return (
    <Card style={style} onPress={onClick}>
      <Card.Content style={styles.content}>
        {count ? <Badge style={styles.badgeStyle}>{count}</Badge> : null}
        <View style={styles.innerContent}>
          <Icon source={icon} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};
const styles = StyleSheet.create({
  innerContent: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  content: {
    height: 125,
  },
  text: {
    fontSize: fontSizes.size14,
    marginTop: 10,
    ...fontFaces.regular.medium,
  },
  badgeStyle: {
    backgroundColor: '#D8FFD5',
    color: 'green',
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
export default UtilityCard;

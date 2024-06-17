import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Badge, Card, Icon} from 'react-native-paper';

const UtilityCard = ({icon, text, count, style}) => {
  return (
    <Card style={style}>
      <Card.Content style={styles.content}>
        <Badge style={{backgroundColor: '#D8FFD5', color: 'green'}}>
          {count}
        </Badge>
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
  text: {
    marginTop: 5,
  },
});
export default UtilityCard;

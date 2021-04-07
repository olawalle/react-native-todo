import React from 'react';
import {Button, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from 'react-native-reanimated';
import {colors} from '../utils/theme';

export default function CustomButton(props) {
  const {type, size, children, style, ...rest} = props;
  return (
    <TouchableOpacity
      {...rest}
      style={[
        size === 'large' ? styles.bigButton : styles.smallButton,
        {
          backgroundColor:
            type === 'primary'
              ? colors.accent
              : type === 'pink'
              ? colors.pink
              : type === 'white'
              ? '#ffffff'
              : colors.grey2,
          marginBottom: 12,
          ...style,
        },
      ]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bigButton: {
    height: 60,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    height: 45,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, {useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import SvgCogIcon from '../assets/icons/Cog';
import SvgHomeIcon from '../assets/icons/Home';
import CreateTask from './CreateTask';
import CustomButton from './CustomButton';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../utils/theme';

export default function Nav() {
  const refRBSheet = useRef();
  return (
    <View>
      <View style={styles.nav}>
        <SvgHomeIcon width={24} height={24} />
        <CustomButton
          onPress={() => refRBSheet.current.open()}
          type="pink"
          style={{
            width: 40,
            height: 40,
            shadowColor: '#d0516f',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}>
          <Text style={{fontSize: 24, color: '#fff'}}>+</Text>
        </CustomButton>
        <SvgCogIcon width={24} height={24} />
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={hp('80%')}
        customStyles={{
          wrapper: {
            // backgroundColor: '#ffffff',
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: colors.grey1,
            width: 80,
          },

          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 0,

            shadowRadius: 20,
            shadowOffset: {
              width: 0,
              height: -100,
            },
            shadowColor: '#000000',
            elevation: 60,
          },
        }}>
        <View style={{padding: 10}}>
          <CreateTask onClose={() => refRBSheet.current.close()} />
        </View>
      </RBSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    paddingVertical: 6,
    position: 'absolute',
    bottom: -30,
    backgroundColor: '#fff',
    marginLeft: -30,
    width: wp('100%'),
  },
});

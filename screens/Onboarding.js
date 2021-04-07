import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Onboarding from 'react-native-onboarding-swiper';
import SvgEmailIcon from '../assets/icons/Email';
import SvgFacebookIcon from '../assets/icons/Facebook';
import CustomButton from '../components/CustomButton';
import SvgGoogleIcon from '../assets/icons/Google';
import {colors} from '../utils/theme';

export default function OnboardingScreen({navigation}) {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{height: hp('75%'), backgroundColor: '#ffffff'}}>
        <Onboarding
          showNext={false}
          showSkip={false}
          showDone={false}
          containerStyles={{
            backgroundColor: '#fff',
          }}
          imageContainerStyles={{marginTop: -160}}
          bottomBarColor="#fff"
          titleStyles={{fontWeight: 'bold'}}
          subTitleStyles={{color: colors.grey5}}
          DotComponent={({selected}) => (
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: selected ? '#fe93a1' : '#e0e1e3',
                borderRadius: 100,
                marginHorizontal: 5,
              }}></View>
          )}
          pages={[
            {
              backgroundColor: '#fff',
              image: (
                <Image
                  style={{height: 200, width: 200}}
                  source={require('../assets/images/onboard.png')}
                />
              ),
              title: 'Organize your works',
              subtitle:
                "Lets's organize your works with priority and do everything without stress",
            },
            {
              backgroundColor: '#fff',
              image: (
                <Image
                  style={{height: 200, width: 200}}
                  source={require('../assets/images/onboard.png')}
                />
              ),
              title: 'Onboarding',
              subtitle: 'Done with React Native Onboarding Swiper.',
            },
          ]}
        />
      </View>
      <View style={{padding: 15}}>
        <CustomButton
          onPress={() => navigation.navigate('Home')}
          type="grey"
          size="large"
          style={{width: '100%'}}>
          <SvgFacebookIcon
            width={25}
            height={25}
            style={{
              position: 'absolute',
              left: 20,
            }}
          />
          <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 14}}>
            Continue with facebook
          </Text>
        </CustomButton>
        <CustomButton type="grey" size="large" style={{width: '100%'}}>
          <SvgGoogleIcon
            width={25}
            height={25}
            style={{
              position: 'absolute',
              left: 20,
            }}
          />
          <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 14}}>
            Continue with Google
          </Text>
        </CustomButton>
        <CustomButton
          type="white"
          size="large"
          style={{width: '100%'}}
          style={{borderWidth: 2, borderColor: colors.grey3}}>
          <SvgEmailIcon
            width={25}
            height={25}
            style={{
              position: 'absolute',
              left: 20,
            }}
          />
          <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 14}}>
            Continue with Email
          </Text>
        </CustomButton>
      </View>
    </ScrollView>
  );
}

import React, { useEffect } from 'react'

import {
  Image,
  ImageBackground,
  Pressable,
  View,
  StyleSheet,
} from 'react-native'
import MediumButton from '../../../components/Buttons/MediumButton'
import Text from '../../../components/Text/Text'
// import { useSelector } from 'react-redux'
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen'
// import { useAnalytics } from '@segment/analytics-react-native'
// import { RootState, useAppDispatch } from '@app/store'
// import { fetchBatches } from '@app/features'
// import { addBatchAndIds, upcommingLceture } from '@app/features/Batches/reducer'

// import { SkipAndProceedButton } from '@app/components'
// import { Container, LabelMedium } from '@app/styles'
// import PhoneLogo from '@app/assets/images/phone.svg'
// import background from '@app/assets/images/processing-bg.png'
// import API from '@app/api'
// // import API, { BatchDocument } from '@app/api';
// import { ProcessingTypes } from 'types'
// import { showToastWithGravityAndOffset } from '@app/lib/androidToast'
import { COLOR, rh } from '../../../theme/Theme'
function ProcessingScreen() {
  //   const { track } = useAnalytics()
  //   const dispatch = useAppDispatch()
  //   const userId = useSelector(state => state.Auth.user._id)
  const [isLoading, setLoading] = React.useState(true)
  let timeOutLoading, timeOutNavigation

  //   const confirmCourse = async () => {
  //     if (purchasType === 'subscription') {
  //       try {
  //         const res = await API.confirmSubscriptionPurchase({
  //           purchaseId,
  //           gateway: 'amarpay',
  //           payedAmount: billedAmount,
  //           paymentMethod: 'bkash',
  //         });

  //         if (res.message === 'Purchase confirmed') {
  //           track('Subscribe Purchase Complete', {
  //             batchtype: 'subscription',
  //             purchaseId: purchaseId,
  //             gateway: 'amarpay',
  //             payedAmount: billedAmount,
  //             paymentMethod: 'bkash',
  //           });
  //           timeOutLoading = setTimeout(() => {
  //             setLoading(false);
  //           }, 1000);
  //           timeOutNavigation = setTimeout(() => {
  //             navigation.navigate('HomeScreen');
  //           }, 3000);
  //         }
  //       } catch (e) {
  //         showToastWithGravityAndOffset(
  //           'Something went wrong in Processing, Try Again !!!',
  //           undefined,
  //           'error',
  //           1000,
  //         );
  //         timeOutNavigation = setTimeout(() => {
  //           navigation.navigate('HomeScreen');
  //         }, 3000);
  //       }
  //     } else if (purchasType === 'mini') {
  //       try {
  //         const res = await API.confirmMentorPurchaseMini({
  //           purchaseId,
  //           gateway: 'amarpay',
  //           payedAmount: billedAmount,
  //           paymentMethod: 'bkash',
  //         });

  //         if (res.message === 'Purchase confirmed') {
  //           // const result = await dispatch(fetchBatches(userId));
  //           const recentLecture = await API.getNextLectureForUser();
  //           await dispatch(upcommingLceture(recentLecture));

  //           track('Purchase Complete', {
  //             batchtype: 'mini',
  //             purchaseId: purchaseId,
  //             gateway: 'amarpay',
  //             payedAmount: billedAmount,
  //             paymentMethod: 'bkash',
  //           });
  //           timeOutLoading = setTimeout(() => {
  //             setLoading(false);
  //           }, 1000);
  //           timeOutNavigation = setTimeout(() => {
  //             navigation.navigate('HomeScreen');
  //           }, 3000);
  //         }
  //       } catch (e) {}
  //     } else if (purchasType === 'one') {
  //       try {
  //         const res = await API.confirmMentorPurchaseOneOnOne({
  //           purchaseId,
  //           gateway: 'amarpay',
  //           payedAmount: billedAmount,
  //           paymentMethod: 'bkash',
  //         });

  //         if (res.message === 'Purchase confirmed') {
  //           // const result = await dispatch(fetchBatches(userId));
  //           const recentLecture = await API.getNextLectureForUser();
  //           await dispatch(upcommingLceture(recentLecture));

  //           track('Purchase Complete', {
  //             batchtype: 'one to one',
  //             purchaseId: purchaseId,
  //             gateway: 'amarpay',
  //             payedAmount: billedAmount,
  //             paymentMethod: 'bkash',
  //           });
  //           timeOutLoading = setTimeout(() => {
  //             setLoading(false);
  //           }, 1000);
  //           timeOutNavigation = setTimeout(() => {
  //             navigation.navigate('HomeScreen');
  //           }, 3000);
  //         }
  //       } catch (e) {}
  //     } else {
  //       try {
  //         const res = await API.confirmCoursePurchase({
  //           purchaseId,
  //           gateway: 'aamarpay',
  //           payedAmount: billedAmount,
  //           paymentMethod: 'bkash',
  //         });
  //         if (res.message === 'Purchase confirmed') {
  //           const result = await dispatch(fetchBatches(userId));
  //           const recentLecture = await API.getNextLectureForUser();
  //           await dispatch(upcommingLceture(recentLecture));

  //           addBatchAndIds(result);

  //           track('Purchase Complete', {
  //             batchtype: 'large',
  //             purchaseId: purchaseId,
  //             gateway: 'amarpay',
  //             payedAmount: billedAmount,
  //             paymentMethod: 'bkash',
  //           });
  //           timeOutLoading = setTimeout(() => {
  //             setLoading(false);
  //           }, 1000);
  //           timeOutNavigation = setTimeout(() => {
  //             navigation.navigate('HomeScreen');
  //           }, 3000);
  //         }
  //       } catch (e) {
  //         track('Purchase Failed', {
  //           error: e,
  //           purchaseId: purchaseId,
  //           gateway: 'amarpay',
  //           payedAmount: billedAmount,
  //           paymentMethod: 'bkash',
  //         });
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     confirmCourse();
  //     return () => {
  //       clearTimeout(timeOutLoading);
  //       clearTimeout(timeOutNavigation);
  //     };
  //   }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      {/* <ImageBackground source={background} style={styles.backgroundImage} /> */}

      {/* {isLoading ? (
        <Container>
          <Image
            style={styles.containerImage}
            source={require('../../assets/animations/paperplane.gif')}
          />
          <LabelMedium color="primaryMain">
            We are processing your submission. Hold tight!
          </LabelMedium>
          <Pressable hitSlop={5} style={styles.pressableContainer}>
            <LabelMedium style={{ marginRight: widthPercentageToDP(3) }}>
              Call us for assistance
            </LabelMedium>
            <PhoneLogo />
          </Pressable>
        </Container>
      ) : (
        <Container>
          <Image
            style={{ width: 300, height: 300 }}
            source={require('../../assets/animations/complete.gif')}
          />
          <LabelMedium color="primaryMain" style={{ textAlign: 'center' }}>
            Purchase Complete!
          </LabelMedium>
        </Container>
      )} */}
      <Text>Hello</Text>

      <MediumButton
        title={'Back'}
        stylesButton={{
          backgroundColor: '#3369B3',
          // borderRadius: 35,
        }}
        onPress={() => navigation.navigate('HomeScreen')}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 200,
  },
  pressableContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    bottom: rh(7),
    alignItems: 'center',
  },
  containerImage: {
    width: 300,
    height: 300,
  },
})

export default ProcessingScreen

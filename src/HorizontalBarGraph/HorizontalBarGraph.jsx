// import { Dimensions, ScrollView, View } from 'react-native'
// import { BarChart } from 'react-native-gifted-charts'
// // import { COLOR } from '../theme/Theme'

// // // const data = {
// // //   labels: ['Life', 'Life', 'Life', 'April', 'May', 'June', 'June', 'June'],
// // //   datasets: [
// // //     {
// // //       data: [20, 45, 28, 80, 99, 43, 50, 60],
// // //     },
// // //   ],
// // // }
// const lineData = [
//   { value: 8, pointerShiftX: 10, pointerShiftY: -10 },
//   { value: 10 },
//   { value: 6 },
//   { value: 18 },
//   { value: 11 },
//   { value: 0 },
//   { value: 19 },
//   { value: 18 },
//   { value: 10 },
//   // {value: 20},
//   // {value: 28},
//   // {value: 32},
//   // {value: 36},
//   // {value: 40},
//   // {value: 38},
//   // {value: 40},
//   // {value: 42},
//   // {value: 46},
//   // {value: 44},
//   // {value: 40},
//   // {value: 36},
//   // {value: 32},
//   // {value: 38},
//   // {value: 36},
//   // {value: 32},
//   // {value: 28},
//   // {value: 22},
//   // {value: 20},
// ]

// // // const chartConfig = {
// // //   backgroundColor: '#e26a00',
// // //   backgroundGradientFrom: '#fb8c00',
// // //   backgroundGradientTo: '#ffa726',
// // //   decimalPlaces: 2, // optional, defaults to 2dp
// // //   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
// // //   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
// // //   //   style: {
// // //   //     borderRadius: 16,
// // //   //   },
// // //   propsForDots: {
// // //     r: '6',
// // //     strokeWidth: '2',
// // //     stroke: COLOR.black,
// // //   },
// // // }

// export const HorizontalBarGraph = () => {
//   return (
//     <View style={{ transform: [{ rotateZ: '30deg' }, { skewX: '35deg' }] }}>
//       <BarChart
//         width={560}
//         side={'right'}
//         data={lineData}
//         isThreeD
//         sideWidth={40}
//         hideAxesAndRules
//         // frontColor={'rgb(200,50,50)'}
//         // topColor={'rgba(250,50,50,0.8)'}
//         // sideColor={'rgb(220,50,50)'}
//         frontColor={'rgba(100,90,100,1)'}
//         topColor={'rgba(100,150,100,0.8)'}
//         sideColor={'rgba(100,120,100,1)'}
//       />
//     </View>
//   )
// }

// import React, { useState } from "react";
// import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import CalendarPicker from "react-native-calendar-picker";

// const CustomDatePicker = ({ label, required, dateProps, error }) => {
//   let today = new Date();
//   const [selectedDate, setSelectedDate] = useState("");
//   const [open, setOpen] = useState(false);
//   const [date, setDate] = useState([today]);
//   let yesterday = new Date();
//   yesterday.setDate(today.getDate() + 1);
//   const startDate = date ? date.toString() : "";
//   const months = () => {
//     const m = startDate?.slice(4, 7);
//     if (m === "Jan") {
//       return 1;
//     } else if (m === "Feb") {
//       return 2;
//     } else if (m === "Mar") {
//       return 3;
//     } else if (m === "Apr") {
//       return 4;
//     } else if (m === "May") {
//       return 5;
//     } else if (m === "Jun") {
//       return 6;
//     } else if (m === "Jul") {
//       return 7;
//     } else if (m === "Aug") {
//       return 8;
//     } else if (m === "Sep") {
//       return 9;
//     } else if (m === "Oct") {
//       return 10;
//     } else if (m === "Nov") {
//       return 11;
//     } else {
//       return 12;
//     }
//   };
//   const day = startDate?.slice(8, 10);
//   const month = months();
//   const year = startDate?.slice(11, 15);
//   const onDateChange = (dateValue, type) => {
//     setDate(dateValue);
//     console.log("dateValue", dateValue == undefined ? "No Data" : "Have data");
//     dateProps(`${day} ${month} ${year}`);
//   };
//   const handelSelected = () => {
//     setSelectedDate(date);
//   };
//   const handelClose = () => {
//     setDate([today]);
//   };
//   return (
//     <>
//       {label == undefined ? (
//         ""
//       ) : (
//         <Text style={[styles.label]}>
//           {label}
//           {required ? (
//             <Text
//               style={{
//                 textAlignVertical: "top",
//                 color: "#EC0000",
//               }}
//             >
//               {" "}
//               *
//             </Text>
//           ) : (
//             ""
//           )}
//         </Text>
//       )}
//       <TouchableOpacity
//         activeOpacity={1}
//         onPress={() => {
//           setOpen(true);
//         }}
//       >
//         <View style={styles.dateView}>
//           <Text
//             style={{
//               color: "#dddd",
//               fontSize: 13,
//             }}
//           >{`${day}-${month}-${year}`}</Text>
//           <Icon name="date-range" size={25} color={"#fff"} />
//         </View>
//       </TouchableOpacity>
//       {error && (
//         <Text style={[styles.errorLabel]}>This field can't be empty.</Text>
//       )}

//       {/* Date packer */}
//       <Modal animationType="fade" transparent={false} visible={open}>
//         <View style={styles.container}>
//           <View style={styles.containerBox}>
//             <CalendarPicker
//               width={350}
//               minDate={yesterday}
//               previousTitle={
//                 <Icon name="arrow-back-ios" size={20} color={"black"} />
//               }
//               nextTitle={
//                 <Icon name="arrow-forward-ios" size={20} color={"black"} />
//               }
//               todayBackgroundColor="#e6ffe6"
//               selectedDayColor="#66ff33"
//               selectedDayTextColor="#000000"
//               scaleFactor={375}
//               textStyle={{
//                 fontFamily: "Cochin",
//                 color: "#000000",
//               }}
//               onDateChange={onDateChange}
//               dayLabelsWrapper={{
//                 backgroundColor: "#dddd",
//               }}
//               headerWrapperStyle={{
//                 // backgroundColor: COLORS.lightBackground,
//                 paddingBottom: 20,
//               }}
//               yearTitleStyle={{
//                 fontSize: 25,
//                 color: "black",
//               }}
//               monthTitleStyle={{
//                 fontSize: 20,
//                 color: "black",
//               }}
//               selectedStartDate={selectedDate}

//               // customDayHeaderStyles={styles.customDayHeaderStyles}
//             />
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignSelf: "flex-end",
//               }}
//             >
//               <TouchableOpacity
//                 onPress={() => {
//                   setOpen(false);
//                   handelClose();
//                 }}
//                 style={{
//                   paddingHorizontal: 10,
//                 }}
//               >
//                 <Text style={{ color: "black" }}>Close</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => {
//                   setOpen(false);
//                   handelSelected();
//                 }}
//                 style={{
//                   paddingHorizontal: 10,
//                 }}
//               >
//                 <Text style={{ color: "black" }}>Select</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };
// export default CustomDatePicker;

// const styles = StyleSheet.create({
//   customDayHeaderStyles: {
//     backgroundColor: "red",
//     color: "red",
//     paddingVertical: 10,
//   },
//   //
//   container: {
//     backgroundColor: "#000000A7",
//     height: "100%",
//     width: "100%",
//     alignSelf: "center",
//     justifyContent: "center",
//   },
//   textStyle: {
//     marginTop: 10,
//     color: "red",
//   },
//   titleStyle: {
//     textAlign: "center",
//     fontSize: 20,
//     margin: 20,
//     color: "red",
//   },
//   label: {
//     color: "black",
//     marginBottom: 4,
//     fontSize: 12,
//   },
//   errorLabel: {
//     color: "black",
//     marginBottom: 4,
//     fontSize: 12,
//   },
//   dateView: {
//     backgroundColor: "#ffff",
//     borderWidth: 1,
//     borderColor: "#f70909",
//     paddingHorizontal: 10,
//     marginBottom: 8,
//     borderRadius: 5,
//     fontSize: 13,
//     color: "black",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     height: 50,
//     alignItems: "center",
//   },
//   containerBox: {
//     backgroundColor: "#fff",
//     padding: 15,
//     width: 350,
//     borderRadius: 5,
//     alignSelf: "center",
//   },
// });

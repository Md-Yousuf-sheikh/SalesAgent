import React, { memo, useMemo, useRef, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import {
  Animated,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import moment from 'moment'
import { Images } from './assets'
import { CALENDAR_STATES, MONTHS } from './constant/index'
import {
  getDateInfo,
  getInitialDate,
  getYearArray,
  dateProp,
} from './func/index'
import { COLOR, rf, rh } from '../../../theme/Theme'
import { useEffect } from 'react'

/**
 *
 * @param {string} defaultValue - initial deflate date to show - format DD-MM-YYYY to convert format YYYY-MM-DD
 * @param {string} initialViewDate - initial month to show
 * @param {string} initialSelectedDate - currently selected date - format YYYY-MM-DD
 * @param {string} minDate - minimum date can be selected
 * @param {string} maxDate - maximum date can be selected
 * @param {ViewStyle} selectedDateStyles - styles for the selected date
 * @param {ViewStyle} calendarHeaderTextStyles - styles for the calendar header text
 * @param {ViewStyle} calendarHeaderWrapperStyles - styles for the calendar header wrapper button
 * @param {ViewStyle} validWeekendDateStyles - styles for weekend date which is in the valid date range
 * @param {ViewStyle} validWeekDateStyles - styles for weekday date which is in the valid date range
 * @param {ViewStyle} disabledDateStyles - styles for a date which is outside the valid date range
 * @param {ViewStyle} arrowWrapperStyles - styles for arrow wrapper
 * @param {ViewStyle} arrowStyles - styles for arrow
 * @param {ViewStyle} monthWrapperStyles - styles for month container in month selection
 * @param {ViewStyle} selectedMonthWrapperStyles - styles for selected month container in month selection
 * @param {ViewStyle} monthTextStyles - styles for month text in month selection
 * @param {ViewStyle} selectedMonthTextStyles - styles for selected month text in month selection
 * @param {ViewStyle} yearWrapperStyles - styles for year container in year selection
 * @param {ViewStyle} yearTextStyles - styles for year text in year selection
 * @param {ViewStyle} selectedYearWrapperStyles - styles for selected year container in year selection
 * @param {ViewStyle} selectedYearTextStyles - styles for selected year text in year selection
 * @param {string} todayDateColor - color of the today's date text
 * @param {string} weekendDateColor - color of the weekend's date text
 * @param {string} weekDateColor - color of the weekday's date text
 * @param {string} disabledDateColor - color of a disabled date text
 * @param {string} selectedDateColor - color of a selected date text
 * @param {string} fontFamily - font family to apply for all text inside the calendar
 * @param {Function} onChange - callback to execute when the selected date changed
 * @returns Datepicker component
 */
//

const DatePicker = ({
  placeholder,
  setValue,
  error,
  styleInput,
  label,
  disabled,
  required,
  defaultValue,
  minDate,
  maxDate,
  todayDateColor,
  weekendDateColor,
  weekDateColor,
  disabledDateColor,
  selectedDateColor,
  arrowWrapperStyles = {},
  arrowStyles = {},
  monthWrapperStyles = {},
  selectedMonthWrapperStyles = {},
  monthTextStyles = {},
  selectedMonthTextStyles = {},
  yearWrapperStyles = {},
  yearTextStyles = {},
  selectedYearWrapperStyles = {},
  selectedYearTextStyles = {},
  selectedDateStyles = {},
  calendarHeaderTextStyles = {},
  calendarHeaderWrapperStyles = {},
  validWeekendDateStyles = {},
  validWeekDateStyles = {},
  disabledDateStyles = {},
  fontFamily,
  onChange,
}) => {
  let initialViewDate = `${
    defaultValue
      ? moment(defaultValue, 'DD-MM-YYYY').format('YYYY-MM-DD')
      : moment().format('YYYY-MM-DD')
  }`
  let initialSelectedDate = `${
    defaultValue
      ? moment(defaultValue, 'DD-MM-YYYY').format('YYYY-MM-DD')
      : moment().format('YYYY-MM-DD')
  }`
  // formate date
  const [selectedDate, setSelectedDate] = useState(
    initialSelectedDate || moment().format('DD-MM-YYYY')
  )
  const [selectedNewDate, setSelectedNewDate] = useState(
    defaultValue ? defaultValue : ''
  )
  const [isVisible, setVisible] = useState(false)
  const [isMonthView, setMonthView] = useState(false)
  const [isYearView, setYearView] = useState(false)
  const [isCalendarView, setCalendarView] = useState(true)
  const [hasChanged, setHasChanged] = useState(false)
  const [yearArray, setYearArray] = useState([])
  const selectedDateInfo = useMemo(
    () => getDateInfo(selectedDate),
    [selectedDate]
  )
  const initialDate = useMemo(
    () => getInitialDate(selectedDate, initialViewDate, hasChanged),
    [selectedDate, initialViewDate]
  )

  useMemo(() => {
    setYearArray(getYearArray(selectedDate))
  }, [selectedDate])

  const monthOpacity = useRef(new Animated.Value(0)).current
  const yearOpacity = useRef(new Animated.Value(0)).current
  const calendarOpacity = useRef(new Animated.Value(1)).current

  const minMoment = minDate ? moment(minDate) : null
  const maxMoment = maxDate ? moment(maxDate) : null

  const sharedTextStyles = {
    fontFamily,
  }

  const onChangeSelectedDate = date => {
    onChange?.(date)
    setSelectedDate(date)
  }

  const toggleMonthView = () => {
    if (isMonthView) {
      setCalendarView(true)
      Animated.parallel([
        Animated.timing(monthOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(calendarOpacity, {
          toValue: 1,
          delay: 200,
          useNativeDriver: true,
          duration: 300,
        }),
      ]).start(() => setMonthView(false))
    } else {
      setMonthView(true)
      Animated.parallel([
        Animated.timing(monthOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(calendarOpacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }),
      ]).start(() => setCalendarView(false))
    }
  }

  const toggleYearView = () => {
    if (isYearView) {
      setCalendarView(true)
      Animated.parallel([
        Animated.timing(yearOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(calendarOpacity, {
          toValue: 1,
          delay: 200,
          useNativeDriver: true,
          duration: 300,
        }),
      ]).start(() => setYearView(false))
    } else {
      setYearView(true)
      Animated.parallel([
        Animated.timing(yearOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(calendarOpacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }),
      ]).start(() => setCalendarView(false))
    }
  }
  //  header
  const renderCalendarHeader = date => {
    return (
      <View style={styles.calendarHeaderContainer}>
        <TouchableOpacity
          onPress={toggleMonthView}
          style={[styles.calendarHeaderWrapper, calendarHeaderWrapperStyles]}
        >
          <Text
            style={[
              styles.calendarHeader,
              calendarHeaderTextStyles,
              sharedTextStyles,
            ]}
          >
            {moment(new Date(date)).format('MMMM')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleYearView}
          style={[styles.calendarHeaderWrapper, calendarHeaderWrapperStyles]}
        >
          <Text
            style={[
              styles.calendarHeader,
              calendarHeaderTextStyles,
              sharedTextStyles,
            ]}
          >
            {moment(new Date(date)).format('YYYY')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const calendarDayContainerStyle = (date, state) => {
    const dayOfWeek = new Date(date.dateString).getDay()
    switch (true) {
      case selectedDate === date.dateString:
        // if the date is before the today's date and it has been selected
        return {
          ...styles.greenDayContainer,
          ...sharedContainerStyles,
          ...selectedDateStyles,
        }

      case state === CALENDAR_STATES.DISABLED:
        // if the date is disabled
        return {
          ...styles.noBackgroundDayContainer,
          ...sharedContainerStyles,
          ...disabledDateStyles,
        }

      case dayOfWeek === 6:
      case dayOfWeek === 0:
        // if the date is in valid range, is not selected, but is a weekend
        return {
          ...styles.noBackgroundDayContainer,
          ...sharedContainerStyles,
          ...validWeekendDateStyles,
        }

      default:
        // if the date is in valid range and a weekday
        return {
          ...styles.whiteDayContainer,
          ...sharedContainerStyles,
          ...validWeekDateStyles,
        }
    }
  }

  const calendarDayTextStyle = (date, state) => {
    const dayOfWeek = new Date(date.dateString).getDay()
    switch (true) {
      case selectedDate === date.dateString:
        // if the date is before the today's date and it has been selected
        return selectedDateColor
          ? { color: selectedDateColor }
          : styles.whiteColor

      case state === CALENDAR_STATES.DISABLED:
        // if the date is disabled
        return disabledDateColor
          ? { color: disabledDateColor }
          : styles.disabledColor

      case state === CALENDAR_STATES.TODAY:
        // if the date is the today's date
        return todayDateColor ? { color: todayDateColor } : styles.primaryColor

      case dayOfWeek === 6:
      case dayOfWeek === 0:
        // if the date is a weekend
        return weekendDateColor ? { color: weekendDateColor } : styles.redColor

      default:
        // if the date is a week day
        return weekDateColor ? { color: weekDateColor } : styles.blackColor
    }
  }

  const renderCalendarDate = ({ date, state }) => {
    return (
      <TouchableOpacity
        disabled={state === CALENDAR_STATES.DISABLED}
        onPress={() => {
          onChangeSelectedDate(date.dateString)
        }}
        style={calendarDayContainerStyle(date, state)}
      >
        <Text style={[calendarDayTextStyle(date, state), sharedTextStyles]}>
          {date.day}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderCalendarArrow = direction => {
    return (
      <View style={[styles.calendarArrowContainer, arrowWrapperStyles]}>
        <Image
          resizeMode="contain"
          source={Images.ic_chevron}
          style={[styles.calendarArrow(direction), arrowStyles]}
        />
      </View>
    )
  }

  const renderCalendarMonth = ({ item, index }) => {
    const isSelected = index === selectedDateInfo.month
    const monthMoment = moment({
      year: selectedDateInfo.year,
      month: index,
      date: 1,
    })

    let isDisabled = false
    if (maxMoment && minMoment) {
      isDisabled =
        monthMoment.isAfter(maxMoment) || monthMoment.isBefore(minMoment)
    } else if (maxMoment) {
      isDisabled = monthMoment.isAfter(maxMoment)
    } else if (minMoment) {
      isDisabled = monthMoment.isBefore(minMoment)
    }
    return (
      <View style={{ width: '33%', height: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          disabled={isDisabled}
          style={[
            styles.monthYear(
              isSelected,
              isDisabled,
              selectedMonthWrapperStyles
            ),
            monthWrapperStyles,
          ]}
          onPress={() => onSelectMonth(index)}
        >
          <Text
            style={[
              styles.monthYearText(
                isSelected,
                isDisabled,
                selectedMonthTextStyles
              ),
              sharedTextStyles,
              monthTextStyles,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderCalendarYear = ({ item }) => {
    const isSelected = item === selectedDateInfo.year
    const yearMoment = moment({
      year: item,
      month: selectedDateInfo.month,
      date: 1,
    })

    let isDisabled = false
    if (maxMoment && minMoment) {
      isDisabled =
        yearMoment.isAfter(maxMoment) || yearMoment.isBefore(minMoment)
    } else if (maxMoment) {
      isDisabled = yearMoment.isAfter(maxMoment)
    } else if (minMoment) {
      isDisabled = yearMoment.isBefore(minMoment)
    }
    return (
      <View style={{ width: '25%', height: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          disabled={isDisabled}
          style={[
            styles.monthYear(isSelected, isDisabled, selectedYearWrapperStyles),
            yearWrapperStyles,
          ]}
          onPress={() => onSelectYear(item)}
        >
          <Text
            style={[
              styles.monthYearText(
                isSelected,
                isDisabled,
                selectedYearTextStyles
              ),
              sharedTextStyles,
              yearTextStyles,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const onSelectMonth = index => {
    const newSelectedMoment = moment({
      year: selectedDateInfo.year,
      month: index,
      date: 1,
    }).endOf('month')
    if (selectedDateInfo.date <= newSelectedMoment.date()) {
      newSelectedMoment.date(selectedDateInfo.date)
    }
    if (maxMoment && minMoment) {
      if (newSelectedMoment.isBefore(minMoment)) {
        onChangeSelectedDate(minMoment.format('YYYY-MM-DD'))
      } else if (newSelectedMoment.isAfter(maxMoment)) {
        onChangeSelectedDate(maxMoment.format('YYYY-MM-DD'))
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'))
      }
    } else if (maxMoment) {
      if (newSelectedMoment.isAfter(maxMoment)) {
        onChangeSelectedDate(maxMoment.format('YYYY-MM-DD'))
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'))
      }
    } else if (minMoment) {
      if (newSelectedMoment.isBefore(minMoment)) {
        onChangeSelectedDate(minMoment.format('YYYY-MM-DD'))
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'))
      }
    } else {
      onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'))
    }

    toggleMonthView()
    setHasChanged(true)
  }

  const onSelectYear = item => {
    const newSelectedMoment = moment({
      year: item,
      month: selectedDateInfo.month,
      date: 1,
    }).endOf('month')
    if (selectedDateInfo.date <= newSelectedMoment.date()) {
      newSelectedMoment.date(selectedDateInfo.date)
    }
    if (maxMoment && minMoment) {
      if (newSelectedMoment.isBefore(minMoment)) {
        onChangeSelectedDate(minMoment.format('YYYY-MM-DD'))
      } else if (newSelectedMoment.isAfter(maxMoment)) {
        onChangeSelectedDate(maxMoment.format('YYYY-MM-DD'))
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'))
      }
    } else if (maxMoment) {
      if (newSelectedMoment.isAfter(maxMoment)) {
        onChangeSelectedDate(maxMoment.format('YYYY-MM-DD'))
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'))
      }
    } else if (minMoment) {
      if (newSelectedMoment.isBefore(minMoment)) {
        onChangeSelectedDate(minMoment.format('YYYY-MM-DD'))
      } else {
        onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'))
      }
    } else {
      onChangeSelectedDate(newSelectedMoment.format('YYYY-MM-DD'))
    }
    toggleYearView()
    setHasChanged(true)
  }

  const onPressYearArrow = direction => {
    if (direction === 'left') {
      setYearArray(Array.from({ length: 20 }, (_, i) => yearArray[0] - 20 + i))
    } else {
      setYearArray(
        Array.from(
          { length: 20 },
          (_, i) => yearArray[yearArray.length - 1] + 1 + i
        )
      )
    }
  }

  const renderYearArrows = () => {
    let isLeftDisabled = false
    if (yearArray[0] === 0) {
      isLeftDisabled = true
    } else if (minMoment) {
      const prevSetLastYearMoment = moment({
        year: yearArray[0] - 1,
        month: 11,
        date: 1,
      }).endOf('month')
      isLeftDisabled = prevSetLastYearMoment.isBefore(minMoment)
    }

    let isRightDisabled = false
    if (maxMoment) {
      const nextSetLastFirstMoment = moment({
        year: yearArray[yearArray.length - 1] + 1,
        month: 0,
        date: 1,
      })
      isRightDisabled = nextSetLastFirstMoment.isAfter(maxMoment)
    }

    return (
      <View style={styles.row}>
        <TouchableOpacity
          disabled={isLeftDisabled}
          onPress={() => onPressYearArrow('left')}
          style={[styles.calendarArrowContainer, arrowWrapperStyles]}
        >
          <Image
            resizeMode="contain"
            source={Images.ic_chevron}
            style={[styles.calendarArrow('left'), arrowStyles]}
          />
        </TouchableOpacity>
        <View style={[styles.row, { marginHorizontal: 20 }]}>
          <Text
            style={[
              styles.calendarHeader,
              sharedTextStyles,
              calendarHeaderTextStyles,
            ]}
          >
            {yearArray[0]}
            {' - '}
          </Text>
          <Text
            style={[
              styles.calendarHeader,
              sharedTextStyles,
              calendarHeaderTextStyles,
            ]}
          >
            {yearArray[yearArray.length - 1]}
          </Text>
        </View>
        <TouchableOpacity
          disabled={isRightDisabled}
          onPress={() => onPressYearArrow('right')}
          style={[styles.calendarArrowContainer, arrowWrapperStyles]}
        >
          <Image
            resizeMode="contain"
            source={Images.ic_chevron}
            style={[styles.calendarArrow('right'), arrowStyles]}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const handelModal = () => {
    setVisible(prv => !prv)
  }
  //
  const [filedError, setFiledError] = useState(false)

  useEffect(() => {
    //
    if (error && !selectedNewDate) {
      setFiledError(true)
    } else {
      setFiledError(false)
    }
  }, [error, selectedNewDate])
  // handel apply
  const handelApply = () => {
    console.log('selectedDate', selectedDate)
    if (selectedDate) {
      setValue(`${moment(selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD')}`)
      setSelectedNewDate(
        `${moment(selectedDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}`
      )
      handelModal()
    }
  }
  return (
    <>
      {/* input box  */}
      {label == undefined ? (
        ''
      ) : (
        <View style={styles.labelContainerStyle}>
          <Text style={[styles.label]}>
            {label} {required && <Text style={{ color: 'red' }}>*</Text>}{' '}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={handelModal}
        style={[
          styles.labelContainer,
          filedError && {
            borderColor: 'red',
          },
          styleInput,
          disabled && {
            opacity: 0.6,
          },
        ]}
        disabled={disabled}
      >
        <Text>
          {selectedNewDate ? (
            <Text>{selectedNewDate}</Text>
          ) : (
            <Text
              style={{
                color: '#979797',
              }}
            >
              {placeholder}
            </Text>
          )}
        </Text>
        <View>
          <Svg width={12} height={11} fill="none">
            <Path
              d="M11.25 1.54H8.247v-.6c0-.165-.167-.3-.375-.3-.207 0-.375.135-.375.3v.6h-3v-.6c0-.165-.167-.3-.375-.3-.207 0-.375.135-.375.3v.6H.75c-.414 0-.75.268-.75.6v7.513c0 .332.336.6.75.6h10.5c.414 0 .75-.268.75-.6V2.14c0-.331-.336-.6-.75-.6Zm0 8.113H.75V2.14h2.997v.303c0 .166.168.3.375.3.208 0 .375-.134.375-.3v-.302h3v.302c0 .166.168.3.375.3.208 0 .375-.134.375-.3v-.302h3.003v7.512ZM8.625 5.446h.75c.207 0 .375-.135.375-.3v-.602c0-.165-.168-.3-.375-.3h-.75c-.207 0-.375.135-.375.3v.601c0 .166.168.3.375.3Zm0 2.404h.75c.207 0 .375-.135.375-.3v-.602c0-.166-.168-.3-.375-.3h-.75c-.207 0-.375.134-.375.3v.601c0 .166.168.3.375.3Zm-2.25-1.202h-.75c-.207 0-.375.134-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.166-.168-.301-.375-.301Zm0-2.404h-.75c-.207 0-.375.135-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.167-.168-.301-.375-.301Zm-3 0h-.75c-.207 0-.375.135-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.167-.168-.301-.375-.301Zm0 2.404h-.75c-.207 0-.375.134-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.166-.168-.301-.375-.301Z"
              fill="#8A8A8A"
            />
          </Svg>
        </View>
      </TouchableOpacity>
      {/*  Modal and calender */}
      <Modal transparent={true} visible={isVisible}>
        <View style={styles.modal}>
          {/* date card */}
          <View style={styles.card}>
            <View style={styles.dateCard}>
              {isCalendarView && (
                <Animated.View
                  style={{
                    opacity: calendarOpacity,
                    position: 'absolute',
                    width: '100%',
                  }}
                >
                  <Calendar
                    current={initialDate}
                    maxDate={
                      maxDate ? maxMoment.format('YYYY-MM-DD') : undefined
                    }
                    minDate={
                      minDate ? minMoment?.format('YYYY-MM-DD') : undefined
                    }
                    firstDay={1} // starts from monday
                    renderHeader={renderCalendarHeader}
                    dayComponent={renderCalendarDate}
                    renderArrow={renderCalendarArrow}
                    theme={{
                      calendarBackground: 'transparent',
                      textSectionTitleColor: '#000000',
                      textDayHeaderFontFamily: fontFamily,
                    }}
                    onDayPress={day => {
                      setSelectedDate(day.dateString)
                      setInitialDate(day.dateString) //
                    }}
                  />
                </Animated.View>
              )}
              {isMonthView && (
                <Animated.View
                  style={{
                    opacity: monthOpacity,
                    position: 'absolute',
                    width: '100%',
                    // top: 25,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      // fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    Months
                  </Text>
                  <FlatList
                    data={MONTHS}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderCalendarMonth}
                    contentContainerStyle={{ width: '100%', height: '100%' }}
                    columnWrapperStyle={{ width: '100%', marginVertical: '3%' }}
                  />
                </Animated.View>
              )}
              {isYearView && (
                <Animated.View
                  style={{
                    opacity: yearOpacity,
                    position: 'absolute',
                    width: '100%',
                  }}
                >
                  {renderYearArrows()}
                  <FlatList
                    data={yearArray}
                    numColumns={4}
                    keyExtractor={item => item.toString()}
                    renderItem={renderCalendarYear}
                    contentContainerStyle={{ width: '100%', height: '100%' }}
                    columnWrapperStyle={{ width: '100%', marginVertical: '3%' }}
                  />
                </Animated.View>
              )}
            </View>
            {/* Button */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={handelModal}
                style={{
                  // borderColor: '#0089ED',
                  // marginRight: 10,
                  width: 70,
                  paddingVertical: 10,
                  // borderWidth: 2,
                  // borderRadius: 50,
                }}
              >
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: '800',
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handelApply}
                style={{
                  // backgroundColor: '#0089ED',
                  marginRight: 10,
                  width: 70,
                  paddingVertical: 10,
                  // borderWidth: 2,
                  // borderColor: '#0089ED',
                  // borderRadius: 50,
                }}
              >
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: '800',
                  }}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Background button */}
          <TouchableOpacity
            onPress={handelModal}
            style={styles.backgroundButton}
          />
        </View>
      </Modal>
    </>
  )
}

const sharedContainerStyles = {
  paddingVertical: 6,
  width: 35,
  borderWidth: 1,
  borderRadius: 10,
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
}

const styles = StyleSheet.create({
  //  filed
  container: {
    marginVertical: rh(1),
  },
  labelContainerStyle: {
    flexDirection: 'row',
  },
  startIcon: {},
  label: {
    marginBottom: 7,
    lingHeight: 21,
    color: '#646464',
    fontWeight: '400',
    // lineHeight: 17,
    marginTop: rh(1.2),
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLOR.blue200,
    // paddingHorizontal: 10,
    color: COLOR.gray400,
    height: rh(6.5),
    borderRadius: 10,
    paddingHorizontal: rh(1.8),
    maxWidth: '100%',
  },

  // modal
  modal: {
    flex: 1,
    backgroundColor: '#0202025e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundButton: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  card: {
    backgroundColor: '#ffff',
    width: '95%',
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 10,
  },
  dateCard: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    minHeight: 400,
    paddingVertical: 25,
  },
  calendarHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarHeader: {
    color: 'black',
    overflow: 'hidden',
  },
  calendarHeaderWrapper: {
    backgroundColor: '#ffffff',
    borderColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  greenDayContainer: {
    borderColor: '#0089ED',
    backgroundColor: '#0089ED',
  },
  whiteDayContainer: {
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  noBackgroundDayContainer: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  whiteColor: {
    color: '#ffffff',
  },
  redColor: {
    color: '#ff7474',
  },
  blackColor: {
    color: '#000000',
  },
  disabledColor: {
    color: '#eeeeee',
  },
  primaryColor: {
    color: '#0089ED',
  },
  calendarArrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  calendarArrow: direction => ({
    tintColor: '#0089ED',
    transform: [
      { rotate: direction === 'left' ? '90deg' : '-90deg' },
      { scale: 0.4 },
    ],
  }),
  bottomButtonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  monthYear: (isSelected, isDisabled, selectedStyles) => ({
    backgroundColor: isDisabled || !isSelected ? '#ffffff' : '#0089ED',
    borderRadius: 10,
    ...(isSelected ? selectedStyles : {}),
  }),
  monthYearText: (isSelected, isDisabled, selectedStyles) => ({
    color: isDisabled ? '#eeeeee' : isSelected ? '#ffffff' : '#000000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    ...(isSelected ? selectedStyles : {}),
  }),
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default memo(DatePicker)

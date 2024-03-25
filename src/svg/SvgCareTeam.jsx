import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

const SvgCareTeam = (props) => (
  <Svg
    width={50}
    height={50}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={25} cy={25} r={25} fill="#E28905" />
    <Path
      d="M35.636 20.271A2.364 2.364 0 0 1 38 22.636v4.727a2.364 2.364 0 0 1-2.364 2.364h-1.255A9.456 9.456 0 0 1 25 37.999v-2.364a7.09 7.09 0 0 0 7.09-7.09v-7.092a7.091 7.091 0 1 0-14.18 0v8.273h-3.546A2.364 2.364 0 0 1 12 27.362v-4.727a2.364 2.364 0 0 1 2.364-2.364h1.255a9.456 9.456 0 0 1 18.762 0h1.255Zm-15.647 9.2 1.253-2.003A7.058 7.058 0 0 0 25 28.544a7.058 7.058 0 0 0 3.758-1.076l1.253 2.004A9.411 9.411 0 0 1 25 30.908a9.411 9.411 0 0 1-5.01-1.436Z"
      fill="#fff"
    />
  </Svg>
)

export default SvgCareTeam

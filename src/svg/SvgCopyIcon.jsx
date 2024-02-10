import * as React from 'react'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'

const SvgCopyIcon = (props) => (
  <Svg
    width={24}
    height={15}
    fill="none"
    style={{
      marginLeft: 5,
    }}
  >
    <G clipPath="url(#a)">
      <Path
        d="M1.25 13.375h5V14H.625V4h5.444L8.75 6.68v1.695h-.625v-1.25h-2.5v-2.5H1.25v8.75Zm5-6.875h1.43L6.25 5.07V6.5Zm2.5 5.18.796-.79.44.44-1.549 1.547-1.547-1.548.44-.44.795.792V9h.625v2.68ZM10 13.376V14H6.875v-.625H10Z"
        fill="#868686"
      />
    </G>
    <G clipPath="url(#b)">
      <Path
        d="M4.25 9.375h5V10H3.625V0h5.444l2.681 2.68v1.695h-.625v-1.25h-2.5v-2.5H4.25v8.75Zm5-6.875h1.43L9.25 1.07V2.5Zm2.5 5.18.796-.79.44.44-1.549 1.547L9.89 7.329l.44-.44.795.792V5h.625v2.68ZM13 9.376V10H9.875v-.625H13Z"
        fill="#868686"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(0 4)" d="M0 0h10v10H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" transform="translate(3)" d="M0 0h10v10H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgCopyIcon

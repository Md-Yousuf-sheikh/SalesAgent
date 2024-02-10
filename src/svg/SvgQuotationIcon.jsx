import * as React from 'react'
import Svg, { Circle, G, Path, Defs, ClipPath } from 'react-native-svg'

const SvgQuotationIcon = (props) => (
  <Svg
    width={50}
    height={50}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={25} cy={25} r={25} fill="#03A01C" />
    <G clipPath="url(#a)" fill="#fff">
      <Path d="M32.108 25.952a6.155 6.155 0 1 0 0 12.31 6.155 6.155 0 0 0 0-12.31Zm-.77 8.782-2.627-2.627L29.8 31.02l1.539 1.54 3.078-3.078 1.088 1.087-4.166 4.166Z" />
      <Path d="M23.644 12c-5.515 0-10.003 4.59-10.003 10.105 0 2.423.85 4.705 2.408 6.506L12 32.107h11.644c.264 0 .516-.048.776-.068.038-4.21 3.468-7.626 7.687-7.626.42 0 .826.06 1.228.124a9.99 9.99 0 0 0 .311-2.432C33.646 16.59 29.16 12 23.644 12Zm.77 14.721h-1.54v-1.538h1.54v1.538Zm.385-4.926a.775.775 0 0 0-.386.668v1.18h-1.539v-1.18c0-.822.442-1.587 1.154-1.999a.77.77 0 1 0-1.153-.667h-1.54a2.31 2.31 0 0 1 2.309-2.309 2.31 2.31 0 0 1 2.308 2.309c0 .821-.442 1.587-1.153 1.998Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          transform="translate(12 12)"
          d="M0 0h26.263v26.263H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgQuotationIcon

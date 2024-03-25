import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function SvgRightArrow() {
  return (
    <Svg width={23} height={20} fill="none">
      <Path
        d="M21.509 8.293H5.028l5.044-5.934a1.344 1.344 0 0 0-.18-1.92 1.411 1.411 0 0 0-1.96.178L.984 8.783a1.613 1.613 0 0 0-.125.204c0 .068 0 .109-.098.177a1.337 1.337 0 0 0-.097.49c.001.168.034.334.097.49 0 .068 0 .109.098.177.036.07.078.139.125.204l6.948 8.166a1.414 1.414 0 0 0 1.07.49c.325 0 .64-.11.89-.313a1.367 1.367 0 0 0 .496-.923 1.337 1.337 0 0 0-.316-.996l-5.044-5.934h16.481c.369 0 .722-.143.983-.399.26-.255.407-.601.407-.962s-.147-.707-.407-.962a1.405 1.405 0 0 0-.983-.4Z"
        fill="#fff"
      />
    </Svg>
  )
}

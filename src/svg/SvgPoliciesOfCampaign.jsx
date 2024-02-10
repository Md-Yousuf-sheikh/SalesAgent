import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgPoliciesOfCampaign = (props) => (
  <Svg
    width={11}
    height={11}
    fill="none"
    style={{
      marginTop: 4,
      marginRight: 8,
    }}
  >
    <Path
      d="M5.125 0a.375.375 0 0 1 .371.324L5.5.375v2.397A3.127 3.127 0 0 1 8.228 5.5h2.397a.375.375 0 0 1 .051.747l-.05.003H8.227A3.127 3.127 0 0 1 5.5 8.978v.648a.375.375 0 0 1-.747.05l-.003-.051v-.648A3.127 3.127 0 0 1 2.022 6.25h-.647a.375.375 0 0 1-.051-.747l.05-.003h.648A3.126 3.126 0 0 1 4.75 2.772V.375A.375.375 0 0 1 5.125 0Zm0 2.75a3.2 3.2 0 0 0-.375.022V5.5H2.022c-.03.25-.03.5 0 .75H4.75v2.727c.249.03.5.03.75 0V6.25h2.728c.03-.25.03-.5 0-.75H5.5V2.772a3.156 3.156 0 0 0-.375-.022Z"
      fill="#2253A5"
    />
  </Svg>
)

export default SvgPoliciesOfCampaign

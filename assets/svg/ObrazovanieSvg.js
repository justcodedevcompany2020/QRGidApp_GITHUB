import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function ObrazovanieSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_3170_23525)"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <Path
          d="M24 48c7.714 0 20.571-16.628 20.571-27.79C44.571 9.05 35.361 0 24 0S3.428 9.049 3.428 20.21C3.428 31.373 17.571 48 24 48zM17.95 5.978a1 1 0 10-.76-1.85c-4.288 1.764-7.725 5.144-9.527 9.375a1 1 0 101.84.784c1.594-3.743 4.64-6.743 8.447-8.309zm-9.666 14.3a1 1 0 10-2 0c0 1.493.283 3.065.765 4.645a1 1 0 001.913-.583c-.44-1.443-.678-2.815-.678-4.063z"
          fill="#F3C316"
        />
        <Path
          d="M24.477 11.148a.675.675 0 00-.954 0l-2.7 2.7a.675.675 0 00-.198.477v4.05h-5.4a.675.675 0 00-.675.675v10.125a.675.675 0 00.675.675h17.55a.675.675 0 00.675-.675V19.05a.675.675 0 00-.675-.675h-5.4v-4.05a.675.675 0 00-.198-.477l-2.7-2.7zM15.9 19.725h4.725v1.35H15.9v-1.35zm0 2.7h4.725V28.5H15.9v-6.075zM26.025 28.5h-.675v-1.687a1.35 1.35 0 10-2.7 0V28.5h-.675V14.605L24 12.58l2.025 2.025V28.5zm6.075 0h-4.725v-6.075H32.1V28.5zm0-7.425h-4.725v-1.35H32.1v1.35zm-8.1-5.4a.675.675 0 100-1.35.675.675 0 000 1.35zm0 1.35c.373 0 .675.302.675.675v6.413a.337.337 0 01-.338.337h-.674a.338.338 0 01-.338-.337V17.7c0-.373.302-.675.675-.675zM17.25 23.1a.675.675 0 00-.675.675v1.013c0 .186.151.337.338.337h.674a.337.337 0 00.338-.337v-1.013a.675.675 0 00-.675-.675zm2.025 0a.675.675 0 00-.675.675v1.013c0 .186.151.337.337.337h.675a.337.337 0 00.338-.337v-1.013a.675.675 0 00-.675-.675zm-2.7 3.375a.675.675 0 011.35 0v1.013a.337.337 0 01-.338.337h-.674a.338.338 0 01-.338-.337v-1.013zm2.7-.675a.675.675 0 00-.675.675v1.013c0 .186.151.337.337.337h.675a.337.337 0 00.338-.337v-1.013a.675.675 0 00-.675-.675zm8.775-2.025a.675.675 0 011.35 0v1.013a.337.337 0 01-.337.337h-.675a.338.338 0 01-.338-.337v-1.013zm2.025 0a.675.675 0 111.35 0v1.013a.337.337 0 01-.338.337h-.674a.337.337 0 01-.338-.337v-1.013zm-1.35 2.025a.675.675 0 00-.675.675v1.013c0 .186.151.337.337.337h.675a.337.337 0 00.338-.337v-1.013a.675.675 0 00-.675-.675zm1.35.675a.675.675 0 111.35 0v1.013a.337.337 0 01-.338.337h-.674a.337.337 0 01-.338-.337v-1.013z"
          fill="#3A2E03"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3170_23525">
          <Path fill="#fff" d="M0 0H48V48H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ObrazovanieSvg

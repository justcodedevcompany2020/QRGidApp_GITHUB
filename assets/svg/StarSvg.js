import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={40}
            height={41}
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Rect y={0.5} width={40} height={40} rx={20} fill="#FDF5D8" />
            <Path
                d="M19.077 2.72c.341-.821 1.505-.821 1.846 0l4.133 9.935a1 1 0 00.843.613l10.725.86c.887.07 1.247 1.177.571 1.756l-8.172 7a1 1 0 00-.322.991l2.497 10.467c.206.865-.735 1.549-1.494 1.085l-9.183-5.609a1 1 0 00-1.042 0l-9.183 5.61c-.759.463-1.7-.221-1.494-1.086L11.3 23.875a1 1 0 00-.322-.991l-8.172-7c-.676-.579-.316-1.685.57-1.757l10.726-.86a1 1 0 00.843-.612l4.133-9.935z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SvgComponent

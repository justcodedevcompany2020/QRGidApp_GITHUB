import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Obshepit(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.286 2.455a.677.677 0 011.354 0v8.014h2.709L13.115 2.55a.67.67 0 111.322-.206l1.267 8.125v3.264c0 .438-.182.856-.502 1.155l-2.659 2.482v11.272a1.58 1.58 0 11-3.16 0V17.37l-2.659-2.482a1.58 1.58 0 01-.502-1.155V10.47l1.266-8.125a.67.67 0 111.323.206l-1.234 7.92h2.709V2.454zm13.082-.085a.942.942 0 011.817.35V28.642a1.58 1.58 0 11-3.16 0v-8.217l-3.587-2.152a1.58 1.58 0 01-.654-1.942l5.584-13.96z"
                fill="#3A2E03"
            />
        </Svg>
    )
}

export default Obshepit

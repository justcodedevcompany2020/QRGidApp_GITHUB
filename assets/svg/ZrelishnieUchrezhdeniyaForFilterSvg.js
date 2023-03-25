import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
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
                d="M16.707 2.293a1 1 0 00-1.414 0l-4 4A1 1 0 0011 7v6H3a1 1 0 00-1 1v15a1 1 0 001 1h26a1 1 0 001-1V14a1 1 0 00-1-1h-8V7a1 1 0 00-.293-.707l-4-4zM4 15h7v2H4v-2zm0 4h7v9H4v-9zm15 9h-1v-2.5a2 2 0 10-4 0V28h-1V7.414l3-3 3 3V28zm9 0h-7v-9h7v9zm0-11h-7v-2h7v2zM16 9a1 1 0 100-2 1 1 0 000 2zm0 2a1 1 0 011 1v9.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V12a1 1 0 011-1zM6 20a1 1 0 00-1 1v1.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V21a1 1 0 00-1-1zm3 0a1 1 0 00-1 1v1.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V21a1 1 0 00-1-1zm-4 5a1 1 0 112 0v1.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V25zm4-1a1 1 0 00-1 1v1.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V25a1 1 0 00-1-1zm13-3a1 1 0 112 0v1.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V21zm3 0a1 1 0 112 0v1.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V21zm-2 3a1 1 0 00-1 1v1.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V25a1 1 0 00-1-1zm2 1a1 1 0 112 0v1.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V25z"
                fill="#3A2E03"
            />
        </Svg>
    )
}

export default SvgComponent

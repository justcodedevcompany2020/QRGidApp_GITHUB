import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RemoveAccount(props) {
    return (
        <Svg
            width={19}
            height={18}
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M4.5 7.5v7a2 2 0 002 2h6a2 2 0 002-2V6m0 0v0a1 1 0 001-1v-.25c0-.69-.56-1.25-1.25-1.25h-9.5c-.69 0-1.25.56-1.25 1.25v0C3.5 5.44 4.06 6 4.75 6h9.75zM11 8.5V14M8 8.5V14M7.5 1.5h4"
                stroke="#A4223C"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default RemoveAccount

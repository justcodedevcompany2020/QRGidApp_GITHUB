import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Dosug(props) {
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
                d="M3.182 2.022a.75.75 0 00-.932.728v17.5a.75.75 0 001.5 0V3.702C6.777 4.408 12.32 5.5 16 5.5c3.68 0 9.223-1.092 12.25-1.798V20.25a.75.75 0 001.5 0V2.75a.75.75 0 00-.932-.728C26.154 2.688 19.9 4 16 4 12.1 4 5.845 2.688 3.182 2.022zM9 19.75a2 2 0 00-2 2v1.5a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a2 2 0 00-2-2H9zm10 0a2 2 0 00-2 2v1.5a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a2 2 0 00-2-2h-4zm-17 8a2 2 0 012-2h4a2 2 0 012 2v1.5a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-1.5zm12-2a2 2 0 00-2 2v1.5a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a2 2 0 00-2-2h-4zm8 2a2 2 0 012-2h4a2 2 0 012 2v1.5a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-1.5z"
                fill="#3A2E03"
            />
        </Svg>
    )
}

export default Dosug

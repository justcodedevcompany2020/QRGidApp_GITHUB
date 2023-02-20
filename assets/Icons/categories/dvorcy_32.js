import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Dvorcy(props) {
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
                d="M5.5 4.5A.5.5 0 005 5v4a.5.5 0 00.093.29L7.5 12.66V21H6v-1a1 1 0 00-1-1H3a1 1 0 00-1 1v9a1 1 0 001 1h5a.5.5 0 00.5-.5v-17a.5.5 0 00-.093-.29L6 8.84V5.5h1a.5.5 0 000-1H5.5zm5.5 0a.5.5 0 00-.5.5v1.5H9a.5.5 0 000 1h2a.5.5 0 00.5-.5V5.5h2V7a.5.5 0 00.5.5h2a1 1 0 01-1 1H8.309a.5.5 0 000 1h5.837c.472 0 .854.382.854.854 0 .652-.49 1.2-1.14 1.273l-2.89.32A.528.528 0 0011.027 13h3.354c.413 0 .805.14 1.118.387V29.5a.5.5 0 00.5.5h13a1 1 0 001-1v-9a1 1 0 00-1-1h-2a1 1 0 00-1 1v1h-2v-1a1 1 0 00-1-1h-2a1 1 0 00-1 1v1h-2v-1a1 1 0 00-1-1h-.5v-6.315l2.88-3.36A.5.5 0 0019.5 9V5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v1.5h-1V5a.5.5 0 00-.5-.5h-3zM12 24a2 2 0 00-2 2v3.143c0 .473.384.857.857.857h2.286a.857.857 0 00.857-.857V26a2 2 0 00-2-2z"
                fill="#3A2E03"
            />
        </Svg>
    )
}

export default Dvorcy

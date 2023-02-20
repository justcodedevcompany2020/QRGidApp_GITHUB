import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Sanatori(props) {
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
                d="M25.25 7.571a.79.79 0 10-1.117-1.117c-.415.414-1.022 1.46-1.022 2.929 0 1.031.513 1.8.889 2.362l.034.051c.412.618.657 1.02.657 1.537 0 .43-.283.747-.558 1.022a.79.79 0 101.117 1.117l.02-.02c.27-.27 1.002-.998 1.002-2.119 0-1.031-.513-1.8-.89-2.362l-.033-.051c-.412-.618-.658-1.02-.658-1.537 0-1.06.447-1.7.56-1.812zm-4.74 3.623a.79.79 0 00-1.118 1.118c.213.213.361.586.361 1.021 0 .436-.148.809-.361 1.022a.79.79 0 101.117 1.117c.577-.576.824-1.39.824-2.139 0-.75-.247-1.562-.824-2.139zM8.098 9.383a3.16 3.16 0 11-6.321 0 3.16 3.16 0 016.32 0zM2.06 19.525a.474.474 0 01.436-.66h2.37l-.051-.08a3.026 3.026 0 014.368-4.045l5.5 4.124h13.958c.873 0 1.58.708 1.58 1.58v6.321a3.16 3.16 0 01-3.16 3.16H9.645a4.74 4.74 0 01-4.358-2.872l-3.226-7.528zm3.512-1.436a.79.79 0 01.93.62c.119.592.406 1.482.861 2.202.468.74.985 1.114 1.525 1.114.764 0 1.75-.33 2.736-.81a15.29 15.29 0 002.32-1.403.79.79 0 01.949 1.264 16.87 16.87 0 01-2.578 1.56c-1.043.508-2.295.969-3.427.969-1.356 0-2.288-.944-2.86-1.85-.586-.925-.93-2.01-1.075-2.736a.79.79 0 01.62-.93z"
                fill="#3A2E03"
            />
        </Svg>
    )
}

export default Sanatori
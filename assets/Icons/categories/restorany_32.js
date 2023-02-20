import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Restorany(props) {
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
                d="M9.922 7.304a.764.764 0 00-1.08-1.08c-.026.026-.049.043-.1.082-.032.024-.074.056-.134.104-.132.103-.305.25-.468.46-.341.445-.54 1.048-.54 1.93 0 .549.182 1.054.402 1.485.22.431.506.839.762 1.191l.166.227c.198.27.367.5.501.719.18.292.205.423.205.45 0 .67-.443 1.146-.794 1.497a.764.764 0 001.08 1.08l.022-.022c.345-.344 1.22-1.217 1.22-2.554 0-.481-.23-.924-.432-1.252-.17-.277-.388-.573-.59-.848l-.143-.195a7.706 7.706 0 01-.637-.988c-.162-.317-.235-.575-.235-.79 0-.645.141-.89.224-.998.05-.065.11-.12.2-.191l.046-.036c.082-.062.22-.167.325-.271zM5.34 10.296a.764.764 0 10-1.08 1.08c.35.351.795.827.795 1.497 0 .67-.444 1.145-.795 1.496a.764.764 0 001.08 1.08l.022-.022c.345-.344 1.22-1.217 1.22-2.554 0-1.337-.875-2.21-1.22-2.555l-.022-.022zM17.527 14.4a1.527 1.527 0 11-3.054 0 1.527 1.527 0 013.054 0zm.735 2.053a3.054 3.054 0 10-4.518.007c-2.158.54-4.025 1.83-5.515 3.504-1.984 2.227-3.342 5.172-3.9 8.098l-.16.847H2.763a.764.764 0 100 1.527h26.472a.764.764 0 000-1.527h-1.374l-.035-.248c-.44-3.078-1.777-6.173-3.799-8.512-1.537-1.778-3.493-3.142-5.766-3.696zm8.058 12.456H5.723l.107-.561c.51-2.684 1.758-5.369 3.54-7.369 1.777-1.995 4.046-3.27 6.63-3.27 2.7 0 5.061 1.343 6.873 3.44 1.816 2.1 3.04 4.916 3.442 7.728l.005.032zm-10.582-9.526a.764.764 0 01-.648.864c-1.055.15-2.129.914-3.107 1.99a.764.764 0 11-1.13-1.026c1.06-1.168 2.437-2.25 4.02-2.476.418-.06.805.23.865.648zm-5.86 4.352c.365.21.49.678.28 1.043-.245.426-.444.817-.59 1.138a.764.764 0 01-1.39-.632c.167-.37.389-.803.656-1.268a.764.764 0 011.043-.28z"
                fill="#3A2E03"
            />
        </Svg>
    )
}

export default Restorany
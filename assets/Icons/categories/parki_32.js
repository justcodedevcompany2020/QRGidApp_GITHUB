import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Parki(props) {
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
                d="M16 4.018c.562 0 1.018-.452 1.018-1.009C17.018 2.452 16.562 2 16 2s-1.018.452-1.018 1.009c0 .557.456 1.009 1.018 1.009zm0 23.207c.562 0 1.018-.452 1.018-1.009 0-.557-.456-1.009-1.018-1.009s-1.018.452-1.018 1.01c0 .556.456 1.008 1.018 1.008zM5.31 14.613c0-.558-.457-1.01-1.02-1.01-.561 0-1.017.452-1.017 1.01 0 .557.456 1.009 1.018 1.009s1.018-.452 1.018-1.01zm23.417 0c0-.558-.456-1.01-1.018-1.01s-1.018.452-1.018 1.01c0 .557.456 1.009 1.018 1.009s1.018-.452 1.018-1.01zM6.37 7.937c.487.279.654.896.372 1.378a1.023 1.023 0 01-1.39.37 1.004 1.004 0 01-.373-1.379 1.023 1.023 0 011.39-.37zm20.28 11.604c.488.278.654.895.373 1.378a1.023 1.023 0 01-1.39.37 1.004 1.004 0 01-.373-1.38 1.023 1.023 0 011.39-.368zM10.655 5.437c.487-.278.653-.895.372-1.378a1.023 1.023 0 00-1.39-.37 1.004 1.004 0 00-.373 1.379c.28.483.904.648 1.39.37zm11.709 20.098c.487-.278.653-.895.372-1.378a1.023 1.023 0 00-1.39-.37 1.004 1.004 0 00-.373 1.379c.281.483.904.648 1.39.37zM25.63 7.937a1.004 1.004 0 00-.372 1.378c.28.483.904.648 1.39.37.487-.279.654-.896.373-1.379a1.023 1.023 0 00-1.39-.37zM5.351 19.54a1.004 1.004 0 00-.373 1.378c.281.482.904.648 1.39.37.488-.28.655-.897.373-1.38a1.023 1.023 0 00-1.39-.368zM21.345 5.437a1.004 1.004 0 01-.372-1.378 1.023 1.023 0 011.39-.37c.488.28.654.896.373 1.379a1.023 1.023 0 01-1.39.37zM9.636 25.535a1.004 1.004 0 01-.372-1.378 1.023 1.023 0 011.39-.37c.488.28.654.896.373 1.379a1.023 1.023 0 01-1.39.37zM7.6 15.117c0-4.597 3.76-8.324 8.4-8.324 4.64 0 8.4 3.727 8.4 8.324 0 2.886-1.48 5.428-3.734 6.923a.753.753 0 00-.21 1.05.768.768 0 001.06.208c2.658-1.764 4.411-4.77 4.411-8.18 0-5.434-4.444-9.839-9.927-9.839s-9.927 4.405-9.927 9.838c0 3.412 1.753 6.417 4.411 8.18.35.233.825.14 1.06-.207a.753.753 0 00-.21-1.05C9.08 20.546 7.6 18.003 7.6 15.117zM16 9.82a5.35 5.35 0 00-4.341 2.207.768.768 0 01-1.066.173.752.752 0 01-.174-1.056A6.882 6.882 0 0116 8.306a.76.76 0 01.764.757.76.76 0 01-.764.757zm-5.985 3.863c.42.047.72.422.674.837a5.326 5.326 0 00-.034.603.76.76 0 01-.764.757.76.76 0 01-.764-.757c0-.261.015-.519.044-.773a.762.762 0 01.844-.667zm12.094.683a.76.76 0 01.764.757 6.751 6.751 0 01-1.283 3.966.768.768 0 01-1.065.175.752.752 0 01-.177-1.056 5.247 5.247 0 00.998-3.085.76.76 0 01.763-.757zm-5.375.543A.763.763 0 0016 14.36c-.34 0-.64.224-.734.55L11.35 28.485H2.764a.76.76 0 00-.764.757.76.76 0 00.764.757h26.472a.76.76 0 00.764-.757.76.76 0 00-.764-.756H20.65l-3.915-13.578zm2.326 13.577h-6.12L16 17.872l3.06 10.614z"
                fill="#3A2E03"
            />
        </Svg>
    )
}

export default Parki

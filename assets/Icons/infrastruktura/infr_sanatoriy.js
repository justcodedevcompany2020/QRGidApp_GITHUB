import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function InfrSanatoriy(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={41}
            height={40}
            viewBox="0 0 41 40"
            fill="none"
            {...props}
        >
            <G clipPath="url(#clip0_36_2028)" fillRule="evenodd" clipRule="evenodd">
                <Path
                    d="M20.716 40c6.429 0 17.143-13.856 17.143-23.158C37.859 7.54 30.184 0 20.716 0S3.573 7.54 3.573 16.842 15.36 40 20.716 40zM15.739 5.136a1 1 0 10-.76-1.85c-3.614 1.486-6.51 4.334-8.03 7.901a1 1 0 101.84.784c1.312-3.078 3.818-5.547 6.95-6.835zM7.787 16.898a1 1 0 10-2 0c0 1.265.24 2.592.644 3.92a1 1 0 001.914-.583c-.363-1.191-.558-2.318-.558-3.337z"
                    fill="#F3C316"
                />
                <Path
                    d="M26.57 11.854a.5.5 0 00-.707-.708c-.263.263-.647.924-.647 1.854 0 .653.325 1.139.563 1.495l.021.032c.26.392.416.646.416.973 0 .272-.18.472-.354.646a.5.5 0 00.708.708l.012-.013c.172-.17.634-.632.634-1.341 0-.653-.325-1.139-.562-1.495l-.022-.032c-.26-.392-.416-.646-.416-.973 0-.67.283-1.075.354-1.146zm-3 2.292a.5.5 0 00-.707.708c.134.135.228.37.228.646s-.094.511-.229.646a.5.5 0 00.708.708c.365-.365.521-.88.521-1.354 0-.474-.156-.989-.521-1.354zM15.716 13a2 2 0 11-4 0 2 2 0 014 0zm-3.82 6.418A.3.3 0 0112.17 19h1.5l-.032-.05a1.915 1.915 0 012.764-2.56l3.48 2.61h8.833a1 1 0 011 1v4a2 2 0 01-2 2H16.694a3 3 0 01-2.757-1.818l-2.042-4.764zm2.222-.908a.5.5 0 01.588.392c.075.374.257.938.545 1.393.296.469.623.705.965.705.484 0 1.108-.209 1.731-.512a9.68 9.68 0 001.47-.888.5.5 0 01.6.8c-.357.267-.959.66-1.632.987-.66.322-1.453.613-2.169.613-.858 0-1.448-.597-1.81-1.17a5.417 5.417 0 01-.68-1.732.5.5 0 01.392-.588z"
                    fill="#3A2E03"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_36_2028">
                    <Path fill="#fff" transform="translate(.716)" d="M0 0H40V40H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default InfrSanatoriy

import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Gostinicy(props) {
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
                d="M4.702 3.448c-.678 0-1.228.54-1.228 1.207v12.07c0 .4-.33.723-.737.723A.73.73 0 012 16.724V4.655C2 3.19 3.21 2 4.702 2h22.596C28.79 2 30 3.189 30 4.655v12.552c0 .4-.33.724-.737.724a.73.73 0 01-.737-.724V4.655c0-.666-.55-1.207-1.228-1.207H4.702zm3.438 7c0 .267-.22.483-.49.483a.487.487 0 01-.492-.483c0-.266.22-.482.491-.482s.491.216.491.482zm8.351.483a.487.487 0 00.492-.483.487.487 0 00-.492-.482.487.487 0 00-.491.482c0 .267.22.483.491.483zm8.351-.483c0 .267-.22.483-.491.483a.487.487 0 01-.491-.483c0-.266.22-.482.49-.482.272 0 .492.216.492.482zM3.474 26.862v-.488c.04.004.081.005.122.005h.369v2.897c0 .4.33.724.737.724a.73.73 0 00.737-.724v-1.931H26.07v1.93c0 .4.33.725.737.725a.73.73 0 00.737-.724v-2.897h.859c.042 0 .083-.002.123-.005v.488c0 .4.33.724.737.724a.73.73 0 00.737-.724v-6.759a.73.73 0 00-.674-.721 1.974 1.974 0 00-1.537-.727h-.08a8.507 8.507 0 00-6.419-2.896 7.294 7.294 0 00-5.29 2.25 7.294 7.294 0 00-5.29-2.25 8.507 8.507 0 00-6.42 2.896h-.08c-.621 0-1.175.284-1.536.727a.73.73 0 00-.674.721v6.76c0 .399.33.723.737.723a.73.73 0 00.737-.724zM28.5 20.103H3.228c0 2.945 6.043 3.862 8.15 3.862 5.664 0 11.674-2.186 17.179-3.334a.268.268 0 00.215-.26.27.27 0 00-.271-.268z"
                fill="#3A2E03"
            />
        </Svg>
    )
}

export default Gostinicy
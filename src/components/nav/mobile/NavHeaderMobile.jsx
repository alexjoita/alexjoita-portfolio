import "./NavHeaderMobile.scss"
import React from 'react'
import LanguagePicker from "/src/components/widgets/LanguagePicker.jsx"
import ThemePicker from "/src/components/widgets/ThemePicker.jsx"
import NavHeader from "/src/components/nav/desktop/NavHeader.jsx"
import Box from "/src/components/wrappers/Box.jsx"

function NavHeaderMobile() {
    return (
        <Box nav={true} id={`nav-mobile-top`} className={`nav-mobile-top`}>
            <div className={`float-top-left`}>
                <LanguagePicker shrink={true}/>
            </div>

            <div className={`float-top-right`}>
                <ThemePicker shrink={true}/>
            </div>

            <NavHeader shrink={false}/>
        </Box>
    )
}

export default NavHeaderMobile
import "./NavSectionTabs.scss"
import React from 'react'
import {useData} from "/src/providers/DataProvider.jsx"
import {useGlobalState} from "/src/providers/GlobalStateProvider.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"
import NavPills from "/src/components/nav/mobile/NavPills.jsx"

/**
 * Sticky sub-navigation for the sections within the active mobile category.
 * Lives in the normal document flow (right below the header) and sticks to
 * the top of the viewport via CSS once scrolled to - no separate fixed
 * clone, no pop-in: the same element that's visible at the top of the page
 * is the one that stays pinned, so navigation never seems to "gain" a new
 * bar out of nowhere.
 */
function NavSectionTabs() {
    const {getActiveCategory} = useGlobalState()
    const {getCategorySections} = useData()
    const {isMobileLayout} = useWindow()

    if(!isMobileLayout())
        return null

    const category = getActiveCategory()
    const sections = category ? getCategorySections(category) : []

    if(!category || sections.length <= 1)
        return null

    return (
        <div className={`nav-section-tabs-wrapper`}>
            <NavPills sections={sections}/>
        </div>
    )
}

export default NavSectionTabs

import "./NavTabController.scss"
import React, {useEffect, useRef, useState} from 'react'
import {useData} from "/src/providers/DataProvider.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useGlobalState} from "/src/providers/GlobalStateProvider.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"
import SensitiveButton from "/src/components/generic/SensitiveButton.jsx"

/**
 * Single, uniform mobile nav: every section is an equal, top-level tab here -
 * there is no separate category/sub-nav tier, so no second bar can ever pop
 * in elsewhere on the page. Since a phone can't show ~7 labelled tabs at
 * once, the bar scrolls horizontally instead, and auto-centers the active
 * tab whenever it changes (including via swipe on the content itself).
 */
function NavTabController() {
    const {isSectionActive, setActiveSection} = useGlobalState()
    const {getSections} = useData()
    const {isShowingSpinner} = useFeedbacks()
    const {hasFooterOffset, isMobileLayout} = useWindow()

    const sections = getSections()
    const addOnClass = hasFooterOffset() ? `nav-tab-controller-with-offset` : ``
    const scrollRef = useRef(null)

    const [clickedSectionId, setClickedSectionId] = useState(null)

    const _isActive = (section) => {
        if(isShowingSpinner())
            return false

        if(clickedSectionId)
            return section.id === clickedSectionId
        return isSectionActive(section.id)
    }

    const activeSection = sections.find(_isActive)

    useEffect(() => {
        const container = scrollRef.current
        const activeBtn = container && container.querySelector('.nav-tab-btn-active')
        if(!container || !activeBtn)
            return

        const targetLeft = activeBtn.offsetLeft - (container.clientWidth - activeBtn.clientWidth) / 2
        container.scrollTo({left: Math.max(0, targetLeft), behavior: 'smooth'})
    }, [activeSection && activeSection.id])

    const _onTabClicked = (section) => {
        if(isSectionActive(section.id)) {
            window.scrollTo(0, 0)
            return
        }

        _onSectionSelected(section)
    }

    const _onSectionSelected = (section) => {
        if(clickedSectionId)
            return

        setClickedSectionId(section.id)
        setTimeout(() => { setActiveSection(section.id) }, 60)
        setTimeout(() => { setClickedSectionId(null) }, 100)
    }

    return (
        <>
            {isMobileLayout() && (
                <div className={`nav-tab-controller ${addOnClass}`}>
                    <div className={`nav-tab-controller-scroll`} ref={scrollRef}>
                        {sections.map((section, key) => (
                            <NavTab section={section}
                                    key={key}
                                    active={_isActive(section)}
                                    onClick={_onTabClicked}/>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

function NavTab({section, active, onClick}) {
    const {getTranslation} = useLanguage()

    const label = getTranslation(section.content["locales"], "title_menu", true) ||
                  getTranslation(section.content["locales"], "title")

    return (
        <SensitiveButton className={`nav-tab-btn ${active ? `nav-tab-btn-active` : ''}`}
                         onClick={() => { onClick(section) }}>
            <FaIcon iconName={section.faIcon}/>
            <span className={`mb-1`}>{label}</span>
        </SensitiveButton>
    )
}

export default NavTabController

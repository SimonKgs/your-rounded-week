import React from 'react'

import { 
    AboutSection,
    ThreeScene, 
    CallToSchedule,
    TitleComponent,
} from '../components'

import { homeStyles } from '../styles'

const Home: React.FC = () => {
    return (
        <div className={homeStyles['home-container']}>
            <ThreeScene />
            <TitleComponent />
            <AboutSection />
            <CallToSchedule />
        </div>
    )
}

export {
    Home
}
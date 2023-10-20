import { useState, useEffect, useRef } from 'react'
import { gsap, Power0 } from 'gsap'
import { Canvas } from '@react-three/fiber'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function Landing(props)
{
    /**
     * ---------------------------------- GENERAL SETUP -----------------------------------
     */
    const [ curtainsOpen, setCurtainsOpen ] = useState(false)
    const [ curtainState, setCurtainState ] = useState('curtainContainer')

    const [ headerLinksVisible, setHeaderLinksVisible ] = useState(false)
    const [ dividingLineAnimated, setDividingLineAnimated ] = useState(false)

    const [ hamburgerMenuOpened, setHamburgerMenuOpened ] = useState(false)
    const [ krabbyPattyLinks, setKrabbyPattyLinks ] = useState('krabbyPattyLinks hidden')
        
    const [ skillDescription, setSkillDescription ] = useState(null)
    const [ wheelDirection, setWheelDirection ] = useState('wheelOfWonder')

    const [ box1playing, setBox1Playing ] = useState(false)
    const [ box2playing, setBox2Playing ] = useState(false)
    const [ box3playing, setBox3Playing ] = useState(false)

    // Run Once
    useEffect(() =>
    {
        // Always bring user to top of page on refresh
        document.getElementById('scrollableContent').scrollTop = 0
        document.body.scrollTop = 0

        // Animate the webgl scene on startup
        gsap.delayedCall(0.5, () =>
        {
            showWebgl()
            gsap.delayedCall(0.5, () =>
            {
                document.getElementById('cursorPic').style.opacity = 1
            })
        })
    }, [])

    /**
     * ------------------------------ FRAMER MOTION ---------------------------------
     */

    const motionControls = useAnimation()

    const portfolioRef = useRef(null)
    const portfolioIsInView = useInView(portfolioRef, { once: true })
    const aboutRef = useRef(null)
    const aboutIsInView = useInView(aboutRef, { once: true })
    const servicesRef = useRef(null)
    const servicesIsInView = useInView(servicesRef, { once: true })
    const contactRef = useRef(null)
    const contactIsInView = useInView(contactRef, { once: true })

    // Run everytime a motion element is in view
    useEffect(() =>
    {
        if( portfolioIsInView ){ motionControls.start('portfolioVisible') }
        if( aboutIsInView ){ motionControls.start('aboutVisible') }
        if( contactIsInView ){ motionControls.start('contactVisible') }
        if( servicesIsInView ){ motionControls.start('servicesVisible') }
    }, 
    [
        portfolioIsInView, aboutIsInView, contactIsInView, servicesIsInView
    ])

    /**
     * ----------------------------- PRESET FUNCTIONS ------------------------------------
     */

    const triggerBox1 = () => { setBox1Playing( true ) }
    const triggerBox2 = () => { setBox2Playing( true ) }
    const triggerBox3 = () => { setBox3Playing( true ) }

    const untriggerBox1 = () => { setBox1Playing( false ) }
    const untriggerBox2 = () => { setBox2Playing( false ) }
    const untriggerBox3 = () => { setBox3Playing( false ) }

    const openBox1 = () => { window.open('https://www.performancearchitects.ca/', '_blank') }
    const openBox2 = () => { window.open('https://altshiftspace.xyz/', '_blank') }
    const openBox3 = () => { window.open('https://tuningthecity.com/', '_blank') }

    const changeToJs = () => { setSkillDescription('js'), setWheelDirection('one wheelOfWonder') }
    const changeToCss = () => { setSkillDescription('css'), setWheelDirection('three wheelOfWonder') }
    const changeToReact = () => { setSkillDescription('react'), setWheelDirection('four wheelOfWonder') }
    const changeToThree = () => { setSkillDescription('three'), setWheelDirection('five wheelOfWonder') }
    const changeToPhotoshop = () => { setSkillDescription('photoshop'), setWheelDirection('six wheelOfWonder') }
    
    const openCurtains = () =>
    {
        setCurtainsOpen(true)
        setCurtainState('curtainContainer halfOpen')

        gsap.delayedCall(0.4, () =>
        {
            setHeaderLinksVisible(true)
            setCurtainState('curtainContainer open')
        })
    }

    const closeCurtains = () =>
    {
        setCurtainsOpen(false)
        setCurtainState('curtainContainer halfClose')
        setDividingLineAnimated(false) 
        gsap.delayedCall(0.45, () =>
        {
            setHeaderLinksVisible(false)
            setCurtainState('curtainContainer close')
        })
    }

    const animateDividingLine = () =>
    {
        gsap.delayedCall(0.6, () =>
        {
            setDividingLineAnimated(true)
        })
    }

    const onScroll = () =>
    {
        if(document.getElementById('scrollableContent').scrollTop > 10 && curtainsOpen === false)
        {
            openCurtains()
            animateDividingLine()
            hideWebgl()
            document.getElementById('sphereActivation').style.pointerEvents = "none"
            document.getElementById('cursorPic').style.opacity = 0
        }
        if(document.getElementById('scrollableContent').scrollTop <= 2 && curtainsOpen === true)
        {
            closeCurtains()
            showWebgl()
            document.getElementById('sphereActivation').style.pointerEvents = "all"
            document.getElementById('cursorPic').style.opacity = 1
        }
    }

    const engageKrabbyPatty = () =>
    {
        // Open Hamburger Menu
        if( hamburgerMenuOpened === false )
        {
            setKrabbyPattyLinks('krabbyPattyLinks')
            setHamburgerMenuOpened(true)
        }
        // Close Hamburger Menu
        else if( hamburgerMenuOpened === true )
        {
            setKrabbyPattyLinks('krabbyPattyLinks hidden')
            setHamburgerMenuOpened(false)
        }
    }

    const exitKrabbyPatty = () =>
    {
        setKrabbyPattyLinks('krabbyPattyLinks hidden')
        setHamburgerMenuOpened(false)
    }

    const showWebgl = () => { document.getElementById('three').style.opacity = 1 }

    const hideWebgl = () => { document.getElementById('three').style.opacity = 0 }

    return <>
        {/* =================================== CURTAINS =================================== */}
        <div className={ curtainState }>
            <h1 className={ hamburgerMenuOpened ? 'landingTitle hidden' : 'landingTitle' }>Julien Darling-Funk Design.</h1>
        </div>
        {/* ================================== HEADER LINKS ================================= */}
        <div className='headerLinksContainer'>
            <div className={ headerLinksVisible ? 'headerLinks visible' : 'headerLinks' }>
                <ul>
                    <li><a href="#contactAnchor">Contact</a></li>
                    <li><a href="#aboutAnchor">About</a></li>
                    <li><a href="#portfolioAnchor">Projects</a></li>
                </ul>
            </div>
            {/* =============================== HAMBURGER MENU =============================== */}
            <div className={ hamburgerMenuOpened ? 'krabbyPatty opened' : 'krabbyPatty' } onClick={ engageKrabbyPatty }>
                <div className='lettuce' />
                <div className='patty' />
                <div className='tomato' />
                <div className='bun1' />
                <div className='bun2' />
            </div>

            <div className={ hamburgerMenuOpened ? 'krabbyPattyLinks opened' : 'krabbyPattyLinks' }>
                <ul>
                    <li><a href="#portfolioAnchor" onClick={exitKrabbyPatty}>Projects</a></li>
                    <li><a href="#contactAnchor" onClick={exitKrabbyPatty}>Contact</a></li>
                    <li><a href="#aboutAnchor" onClick={exitKrabbyPatty}>About</a></li>
                </ul>
            </div>

            <ul className={ krabbyPattyLinks }>
                <li><a href="#portfolioAnchor">Projects</a></li>
                <li><a href="#aboutAnchor">About</a></li>
                <li><a href="#contactAnchor">Contact</a></li>
            </ul>

            <div className={ headerLinksVisible ? 'instagramLink visible' : 'instagramLink' }>
                <a href="https://www.instagram.com/julienkdf/" target='_blank'>Instagram.</a>
            </div>
        </div>
        {/* ================================== BACKDROP ================================== */}
        <div className='stage'>
            <h1 className='stageTitle'>Julien Darling-Funk Design.</h1>
        </div>

        <div className={ hamburgerMenuOpened ? 'scrollableContent hidden' : 'scrollableContent'} id='scrollableContent' onScroll={ onScroll } >
            <a id='topAnchor'></a>
            {/* ============================= LANDING PAGE================================= */}
            <div className='portfolioPage'>
                <a id='landingAnchor' />
                <div className='welcomeContainer'>
                    <h2 className='landingSubtitle' contentEditable role='textbox' aria-multiline='true'>
                        Professional. Handcrafted. Interactive.
                    </h2>
                </div>
            </div>
            {/* ================================ PORTFOLIO PAGE =============================== */}
            <div className='portfolioPage' id='portfolioPage'>
                <a id='portfolioAnchor' />
                <div className={ dividingLineAnimated ? 'dividingLine animation' : 'dividingLine' }>
                    <p className='scrollPrompt'>Scroll</p>
                    <div className='pointerLine'></div>
                    <div className='horizontalLine'></div>
                </div>

                <div className='pageHeadingContainer'>
                    <motion.div
                        className='pageHeading'
                        ref={portfolioRef} 
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            portfolioVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        Featured Projects
                        <motion.div 
                            className='animatedOverlay'
                            variants={{
                                hidden: { opacity: 1 },
                                portfolioVisible: { height: 0 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        />
                    </motion.div>
                </div>

                <div className='presentationContainer'>
                    <div className='presentationBox'>
                        <img src="./images/performanceArchitects.png" alt="" />
                        <img 
                            className={ box1playing ? 'webAnim visible' : 'webAnim' } 
                            src="./images/performanceArchitectsAnim.gif" 
                            onPointerOver={triggerBox1} 
                            onPointerLeave={untriggerBox1}
                            onClick={openBox1}
                        />
                    </div>

                    <motion.div 
                        className='presentationTextBox'
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            portfolioVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.75 }}
                    >
                        <h1>Performance Architects</h1>
                        <p>
                        2023 • Business Portfolio Website
                        <br />
                        <br />
                        Professional business portfolio for Performance Kinetics Consultant Jeniffer Swan.
                        </p>
                    </motion.div>
                </div>
                <div className='presentationContainer'>
                    <div className='presentationBox'>
                        <img src="./images/AltShiftSpace.png" />
                        <img 
                            className={ box2playing ? 'webAnim visible' : 'webAnim' } 
                            src="./images/AltShiftSpaceAnim.gif" 
                            onPointerOver={triggerBox2} 
                            onPointerLeave={untriggerBox2} 
                            onClick={openBox2}    
                        />
                    </div>

                    <motion.div 
                        className='presentationTextBox'
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            portfolioVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.85 }}
                    >
                        <h1>ALT + SHIFT _</h1> 
                        <p>
                        2022 • Exhibition Event Promotion & Documentation
                        <br />
                        <br />
                        Promotion of the 2022 Graduating IMCA Concoridia IMCA program students.
                        </p>
                    </motion.div>
                </div>
                <div className='presentationContainer'>
                    <div className='presentationBox'>
                        <img src="./images/tuningTheCity.png" />
                        <img 
                            className={ box3playing ? 'webAnim visible' : 'webAnim' } 
                            src="./images/tuningTheCityAnim.gif"
                            onPointerOver={triggerBox3} 
                            onPointerLeave={untriggerBox3}
                            onClick={openBox3}
                        />
                    </div>

                    <motion.div 
                        className='presentationTextBox'
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            portfolioVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <h1>Tuning the City</h1>
                        <p>
                        2021 • Collaborative Work by Malte Leandre and Julien Darling-Funk
                        <br />
                        <br />
                        Interactive online soundscape investigating the sonic landscape of a neighborhood in Villeray, Montreal.
                        </p>
                    </motion.div>
                </div>
                {/* <a href=''>See more projects &#8649;</a> */}
            </div>
            {/* ==================================== ABOUT PAGE ================================== */}
            <div className='page' id='aboutPage'>
                <a id='aboutAnchor' />
                <div className='pageHeadingContainer'>
                    
                    <motion.div
                        className='pageHeading'
                        ref={aboutRef}
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            aboutVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        About
                        <motion.div 
                            className='animatedOverlay'
                            variants={{
                                hidden: { opacity: 1 },
                                aboutVisible: { height: 0 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        />
                    </motion.div>

                </div>
                <dir className='aboutImg'>
                    <img src="./images/water.png" alt="" />
                </dir>

                <div className='aboutContainer'>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            aboutVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <p className='aboutText'>
                        Julien Darling-Funk Design is focused on providing front-end website design services with an emphasis on accessability, backwards compatability, cross-device compatability, and cross-browser compatability. All projects are optimized for older devices as well as for mobile. 
                        <br />
                        <br />
                        </p>
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            aboutVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <p className='aboutText'>
                        Utilizing a broad skillset, websites are aesthetically and functionally designed to reflect the client, business, or brand. Yes, this is me selling out...
                        <br />
                        <br />
                        </p>
                    </motion.div>
                    
                </div>
            </div>
            {/* ================================= SERVICES PAGE ================================== */}
            <div className='page'>
                <a id="serviceAnchor" />

                <div className='pageHeadingContainer'>
                    <motion.div 
                        className='pageHeading'
                        ref={servicesRef}
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            servicesVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        Services
                    </motion.div>
                </div>

                <div className='servicesContainer'>

                    <motion.div 
                        className='wheelContainer'
                        variants={{
                            hidden: { opacity: 0 },
                            aboutVisible: { opacity: 1 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <img src="./images/wheel.png" className={ wheelDirection } />
                        <img src="./images/wheel.png" className={ wheelDirection + 'Inner' } />
                        <img src="./images/wheel.png" className={ wheelDirection + 'Axis' } />
                    </motion.div>

                    <div className='skillboxContainer'>
                        <img className='skillbox' id='jsSkill' src='./images/logos/javascript.png' onPointerOver={ changeToJs } />
                        <img className='skillbox' id='cssSkill' src='./images/logos/css.png' onPointerOver={ changeToCss } />
                        <img className='skillbox' id='reactSkill' src='./images/logos/react.png' onPointerOver={ changeToReact } />
                        <img className='skillbox' id='threeSkill' src='./images/logos/three.png' onPointerOver={ changeToThree } />
                        <img className='skillbox' id='psSkill' src='./images/logos/photoshop.png' onPointerOver={ changeToPhotoshop } />
                    </div>

                    
                        <div className='selectedSkill' id='selectedSkill'>

                            <div className='selectedSkillDescription'>
                                <p className={ skillDescription === null ? 'skillDescription visible' : 'skillDescription' } >
                                Hover over an icon to begin...
                                </p>
                                <p className={ skillDescription === 'js' ? 'skillDescription visible' : 'skillDescription' } >
                                <span className='textHighlight' >Javascript</span> makes websites dynamic, easy to navigate, and optimized.
                                </p>
                                <p className={ skillDescription === 'css' ? 'skillDescription visible' : 'skillDescription' } >
                                    Custom <span className='textHighlight' >CSS</span> animations bring life to a website, giving it a professional and buttery-smooth feel.
                                </p>
                                <p className={ skillDescription === 'react' ? 'skillDescription visible' : 'skillDescription' } >
                                <span className='textHighlight' >React</span> framework for content management.
                                </p>
                                <p className={ skillDescription === 'three' ? 'skillDescription visible' : 'skillDescription' } >
                                    Three.js allows for 3D interactivity on the web with the use of <span className='textHighlight' >webGl</span>.
                                </p>
                                <p className={ skillDescription === 'photoshop' ? 'skillDescription visible' : 'skillDescription' } >
                                    Custom logos, icons, and handdrawn animations drawn in <span className='textHighlight' >Photoshop</span> truly bring out a the character of a website.
                                </p>
                            </div>
                        </div>
                   
                </div>
            </div>
            {/* ================================= CONTACT PAGE =================================== */}
            <div className='page'>
                <a id='contactAnchor' />
                <div className='pageHeadingContainer'>
                    <motion.div
                        className='pageHeading'
                        ref={contactRef}
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            contactVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.75, delay: 0.25 }}
                    >
                        Contact
                        <motion.div 
                            className='animatedOverlay'
                            variants={{
                                hidden: { opacity: 1 },
                                contactVisible: { height: 0 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.65, delay: 0.5 }}
                        />
                    </motion.div>
                </div>
                <div className='contactContainer'>
                    <p className='contactPrompt'>Interested in a stunning website?</p>
                    <div className='contactForm'>
                        <a href='mailto:juliendarlingfunk@gmail.com?subject=Inquiry' className='submitForm'>Click here to send an email inquiry.</a>
                    </div>
                    <div className='mediaLinks'>
                        <motion.div
                            className='socialTitle'
                            ref={contactRef}
                            variants={{
                                hidden: { opacity: 0, x: 30 },
                                contactVisible: { opacity: 1, x: 0 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.75, delay: 0.25 }}
                        >
                            <h2>Socials</h2>
                        </motion.div>
                        <ul className='mediaLinkYepper'>
                            <li><a href="https://www.linkedin.com/in/julien-darling-funk-263aa5225/" target='_blank'>Linkedin</a></li>
                            <li>•</li>
                            <li><a href="https://github.com/Keonikun" target='_blank'>Github</a></li>
                            <li>•</li>
                            <li><a href="https://www.instagram.com/julienkdf/" target='_blank'>Instagram</a></li>
                        </ul>
                    </div>
                    <img src="./images/droplet.gif" alt="" />
                    <br />
                    <a href="#topAnchor" className='backTo'>Back to top</a>
                </div>
            </div>
        </div>  
    </>
}
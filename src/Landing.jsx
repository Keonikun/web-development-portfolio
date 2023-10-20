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
    const [ krabbyPattyState, setKrabbyPattyState ] = useState('krabbyPatty homeState')
        
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
                if(document.getElementById('scrollableContent').scrollTop < 10)
                {
                    document.getElementById('cursorPic').style.opacity = 1   
                }
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

    // Run every time a motion element is in view
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
    const openArtistWebsite = () => { window.open('https://juliendarling-funk.com/works', '_blank') }

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
            if(document.getElementById('scrollableContent').scrollTop < 10)
            {
                setKrabbyPattyState('krabbyPatty homeState')
            }
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
            setKrabbyPattyState('krabbyPatty')
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
            setKrabbyPattyState('krabbyPatty homeState opened')
            if(document.getElementById('scrollableContent').scrollTop < 10)
            {
                hideWebgl()
                document.getElementById('cursorPic').style.opacity = 0
            }
        }
        // Close Hamburger Menu
        else if( hamburgerMenuOpened === true )
        {
            setKrabbyPattyLinks('krabbyPattyLinks hidden')
            setHamburgerMenuOpened(false)

            if(document.getElementById('scrollableContent').scrollTop < 10)
            {
                setKrabbyPattyState('krabbyPatty homeState')
                showWebgl()
                document.getElementById('cursorPic').style.opacity = 1
            }
            else
            {
                setKrabbyPattyState('krabbyPatty')
            }
        }
    }

    const exitKrabbyPatty = () =>
    {
        setKrabbyPattyLinks('krabbyPattyLinks hidden')
        setHamburgerMenuOpened(false)
    }

    const showWebgl = () => { document.getElementById('three').style.opacity = 1 }

    const hideWebgl = () => { document.getElementById('three').style.opacity = 0 }

    const backToTop = () =>
    {
        closeCurtains()
        showWebgl()
        document.getElementById('sphereActivation').style.pointerEvents = "all"
    }

    return <>
        {/* =================================== CURTAINS =================================== */}
        <div className={ curtainState }>
            <h1 className={ hamburgerMenuOpened ? 'landingTitle hidden' : 'landingTitle' }>Julien Darling-Funk Design.</h1>
        </div>

        <div className={ hamburgerMenuOpened ? 'krabbyPattyLinks opened' : 'krabbyPattyLinks' }>
            <ul>
                <li><a href="#portfolioAnchor" onClick={exitKrabbyPatty}>Projects</a></li>
                <li><a href="#aboutAnchor" onClick={exitKrabbyPatty}>About</a></li>
                <li><a href="#servicesAnchor" onClick={exitKrabbyPatty}>Services</a></li>
                <li><a href="#contactAnchor" onClick={exitKrabbyPatty}>Contact</a></li>
            </ul>
        </div>
        {/* ================================== HEADER LINKS ================================= */}
        <div className='headerLinksContainer'>
            <div className={ headerLinksVisible ? 'headerLinks visible' : 'headerLinks' }>
                <ul>
                    <li><div><a href="#contactAnchor">Contact</a></div></li>
                    <li><div><a href="#servicesAnchor">Services</a></div></li>
                    <li><div><a href="#aboutAnchor">About</a></div></li>
                    <li><div><a href="#portfolioAnchor">Projects</a></div></li>
                </ul>
            </div>
            {/* =============================== HAMBURGER MENU =============================== */}
            <div className={ krabbyPattyState } onClick={ engageKrabbyPatty }>
                <div className='lettuce' />
                <div className='patty' />
                <div className='tomato' />
                <div className='bun1' />
                <div className='bun2' />
            </div>            

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
                    <div className='presentationBox' ref={portfolioRef} >
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
                        transition={{ duration: 0.5, delay: 0.5 }}
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
                        transition={{ duration: 0.5, delay: 0.75 }}
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
                        transition={{ duration: 0.5, delay: 1 }}
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
            <div className='page aboutFix' id='aboutPage'>
                <a id='aboutAnchor' />
                <div className='pageHeadingContainer'>
                    
                    <motion.div
                        className='pageHeading'
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
                            transition={{ duration: 0.5, delay: 0.25 }}
                        />
                    </motion.div>

                </div>

                <motion.div 
                    className='aboutImg' 
                    variants={{
                        hidden: { opacity: 0 },
                        aboutVisible: { opacity: 1 }
                    }}
                    initial='hidden'
                    animate={motionControls}
                    transition={{ duration: 0.5, delay: 0.25 }}
                >
                    <img src="./images/water.png" alt="" />
                </motion.div>

                <div className='aboutContainer'>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            aboutVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.75 }}
                    >
                        <p className='aboutText' ref={aboutRef}>
                        Julien Darling-Funk Design is focused on providing front-end website design services with an emphasis on accessibility as well as, backwards, cross-device, and cross-browser compatibility. All projects are optimized for mobile devices. 
                        <br />
                        </p>
                    </motion.div>
                        
                    <div className='hz' />
                    
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            aboutVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <p className='aboutText'>
                        Utilizing a broad skill-set, websites are aesthetically and functionally designed to reflect the client, business, or brand.
                        <br />
                        </p>
                    </motion.div>

                    <div className='hz' />

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            aboutVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 1.25 }}
                    >
                        <p className='aboutText'>
                        Julien is an artist, programmer, and digital enthusiast. Designing websites for more than two years, Julien finds new and unique ways to tell stories on the internet. <a href="https://juliendarling-funk.com/works" target='_blank' style={{color: '#3f1a24'}}>See more of Julien's work here</a>.
                        </p>
                    </motion.div>
                    
                </div>
            </div>
            {/* ================================= SERVICES PAGE ================================== */}
            <div className='page servicesFix'>
                <a id="servicesAnchor" />

                <div className='pageHeadingContainer'>
                    <motion.div 
                        className='pageHeading'
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            servicesVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0 }}
                    >
                        Services
                        <motion.div 
                            className='animatedOverlay'
                            variants={{
                                hidden: { opacity: 1 },
                                servicesVisible: { height: 0 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.5, delay: 0.25 }}
                        />
                    </motion.div>
                </div>

                <div className='servicesContainer'>

                    <motion.div 
                        className='wheelContainer'
                        variants={{
                            hidden: { opacity: 0 },
                            servicesVisible: { opacity: 1 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <img src="./images/wheel.png" className={ wheelDirection } />
                        <img src="./images/wheel.png" className={ wheelDirection + 'Inner' } />
                        <img src="./images/wheel.png" className={ wheelDirection + 'Axis' } />
                    </motion.div>

                    <div className='skillboxContainer' ref={servicesRef}>
                        <motion.div 
                            className='skillbox'
                            variants={{
                                hidden: { opacity: 0 },
                                servicesVisible: { opacity: 1 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        ><img id='jsSkill' src='./images/logos/javascript.png' onPointerOver={ changeToJs } /></motion.div>
                        <motion.div 
                            className='skillbox'
                            variants={{
                                hidden: { opacity: 0 },
                                servicesVisible: { opacity: 1 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        ><img id='cssSkill' src='./images/logos/css.png' onPointerOver={ changeToCss } /></motion.div>
                        <motion.div 
                            className='skillbox'
                            variants={{
                                hidden: { opacity: 0 },
                                servicesVisible: { opacity: 1 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        ><img id='reactSkill' src='./images/logos/react.png' onPointerOver={ changeToReact } /></motion.div>
                        <motion.div 
                            className='skillbox'
                            variants={{
                                hidden: { opacity: 0 },
                                servicesVisible: { opacity: 1 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        ><img id='threeSkill' src='./images/logos/three.png' onPointerOver={ changeToThree } /></motion.div>
                        <motion.div 
                            className='skillbox'
                            variants={{
                                hidden: { opacity: 0 },
                                servicesVisible: { opacity: 1 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.5, delay: 1 }}
                        ><img id='psSkill' src='./images/logos/photoshop.png' onPointerOver={ changeToPhotoshop } /></motion.div>
                    </div>

                    
                        <motion.div 
                            className='selectedSkill' 
                            id='selectedSkill'
                            variants={{
                                hidden: { opacity: 0 },
                                servicesVisible: { opacity: 1 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            <div className='selectedSkillDescription'>
                                <p className={ skillDescription === null ? 'skillDescription visible' : 'skillDescription' } >
                                <span className='textLowlight'>Hover over an icon to begin...</span> 
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
                        </motion.div>
                   
                </div>
            </div>
            {/* ================================= CONTACT PAGE =================================== */}
            <div className='page contactFix'>
                <a id='contactAnchor' />
                <div className='pageHeadingContainer'>
                    <motion.div
                        className='pageHeading'
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
                            transition={{ duration: 0.65, delay: 0.1 }}
                        />
                    </motion.div>
                </div>
                <div className='contactContainer'>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            contactVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.75, delay: 0.5 }}
                    ><p className='contactPrompt'>Interested in creating a stunning website?</p></motion.div>
                    <motion.div 
                        className='contactForm'
                        ref={contactRef}
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            contactVisible: { opacity: 1, x: 0 }
                        }}
                        initial='hidden'
                        animate={motionControls}
                        transition={{ duration: 0.75, delay: 0.75 }}
                    >
                        <a href='mailto:juliendarlingfunk@gmail.com?subject=Inquiry' className='submitForm'>Click here to send an email inquiry.</a>
                    </motion.div>
                    <br />
                    <div className='mediaLinks'>
                        <motion.div
                            className='socialTitle'
                            variants={{
                                hidden: { opacity: 0, x: 30 },
                                contactVisible: { opacity: 1, x: 0 }
                            }}
                            initial='hidden'
                            animate={motionControls}
                            transition={{ duration: 0.75, delay: 1 }}
                        >
                            <h2>Socials</h2>
                        </motion.div>
                        <ul className='mediaLinkYepper'>
                            <li><motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: 30 },
                                        contactVisible: { opacity: 1, x: 0 }
                                    }}
                                    initial='hidden'
                                    animate={motionControls}
                                    transition={{ duration: 0.75, delay: 1.2 }}
                                ><a href="https://www.linkedin.com/in/julien-darling-funk-263aa5225/" target='_blank'>Linkedin</a></motion.div></li>
                            <li><motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: 30 },
                                        contactVisible: { opacity: 1, x: 0 }
                                    }}
                                    initial='hidden'
                                    animate={motionControls}
                                    transition={{ duration: 0.75, delay: 1.4 }}
                                >•</motion.div></li>
                            <li><motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: 30 },
                                        contactVisible: { opacity: 1, x: 0 }
                                    }}
                                    initial='hidden'
                                    animate={motionControls}
                                    transition={{ duration: 0.75, delay: 1.6 }}
                                ><a href="https://github.com/Keonikun" target='_blank'>Github</a></motion.div></li>
                            <li><motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: 30 },
                                        contactVisible: { opacity: 1, x: 0 }
                                    }}
                                    initial='hidden'
                                    animate={motionControls}
                                    transition={{ duration: 0.75, delay: 1.8 }}
                                >•</motion.div></li>
                            <li><motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: 30 },
                                        contactVisible: { opacity: 1, x: 0 }
                                    }}
                                    initial='hidden'
                                    animate={motionControls}
                                    transition={{ duration: 0.75, delay: 2.0 }}
                                ><a href="https://www.instagram.com/julienkdf/" target='_blank'>Instagram</a></motion.div></li>
                        </ul>
                    </div>
                </div>
                <img src="./images/droplet.gif" className='droplet' onClick={openArtistWebsite} />
                <motion.div 
                    className='backTo'
                    variants={{
                        hidden: { opacity: 0 },
                        contactVisible: { opacity: 1 }
                    }}
                    initial='hidden'
                    animate={motionControls}
                    transition={{ duration: 0.75, delay: 2.5 }}
                >
                    <a href="#topAnchor" onClick={backToTop}>Back to top</a>
                </motion.div>
            </div>
        </div>  
    </>
}
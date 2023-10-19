import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import { Sparkles, OrbitControls, useGLTF, Environment, Html, shaderMaterial } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import { gsap, Power0 } from 'gsap'

import Landing from './Landing.jsx'
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

export default function Experience()
{
    // const laptop = useGLTF('./models/laptop.gltf')

    const shader = useRef()

    const waterMaterial = useLoader(TextureLoader, './images/water.png')
    waterMaterial.wrapS = THREE.RepeatWrapping
    waterMaterial.wrapD = THREE.RepeatWrapping
    waterMaterial.wrapT = THREE.RepeatWrapping

    let sphereActivated = false
    let wiggleTransition = 0.0
    let zoomTransition = 0.0

    let wiggleFadeOut = 0
    let zoomFadeOut = 0

    let paramFadeOut = 0

    useEffect(() =>
    {
        document.getElementById('sphereActivation').addEventListener('mouseover', () =>
        {
            sphereActivated = true
            document.body.style.cursor = "progress"
            document.getElementById('cursorPic').style.opacity = 0
        })

        document.getElementById('sphereActivation').addEventListener('mouseout', () =>
        {
            sphereActivated = false
            document.body.style.cursor = "revert"
        })
    }, [])

    // UPDATE SCENE HERE
    useFrame(( state, delta ) =>
    {
        shader.current.uniforms.uTime.value += delta
        if(sphereActivated === true && shader.current.uniforms.uZoom.value < 0.01)
        {
            if(shader.current.uniforms.uWiggleIntensity.value <  0.5)
            {
                shader.current.uniforms.uWiggleIntensity.value += delta * wiggleTransition
            }
            shader.current.uniforms.uZoom.value += delta * zoomTransition

            if(shader.current.uniforms.uZoom.value < -0.5)
            {
                wiggleTransition += 0.001
                zoomTransition += 0.02
            }
            else if(0.01 > shader.current.uniforms.uZoom.value > shader.current.uniforms.uZoom.value * 0.5 && zoomTransition > 0)
            {
                wiggleTransition -= 0.001
                zoomTransition -= 0.02

                console.log("chilling OUt")
            }
        }

        if(sphereActivated === false && shader.current.uniforms.uZoom.value > -1.0)
        {
            wiggleTransition = 0.0
            zoomTransition = 0.0
            shader.current.uniforms.uWiggleIntensity.value -= delta * 0.02
            shader.current.uniforms.uZoom.value -= delta * 0.4

        }
    })

    return <>
        <Environment preset="city" />

        <mesh position={[ 0, -0.01, 0 ]} scale={0.09}>
            <sphereGeometry args={[ 1, 100, 100 ]}/>
            <shaderMaterial
                ref={ shader }
                vertexShader={vertex}
                fragmentShader={fragment}
                uniforms={ {
                    uTime: { value: 0 },
                    uMap: { type: "t", value: waterMaterial },
                    uWiggleIntensity: { value: 0.01 },
                    uZoom: { value: -1.0 }
                } }
            />
        </mesh>
        {/* <Sparkles 
            size={ 5 }
            color={ new Color('#000000') }
            speed={ 1 }
            noise={ 0.4 }
            scale={ 4 }
            position={[ 0, 0, -10 ]}
        /> */}

        {/* <OrbitControls makeDefault /> */}

        {/* <primitive object={ laptop.scene } position-y={ -0.15 } scale={ 1 }>
            <Html 
                transform 
                wrapperClass="htmlScreen"
                distanceFactor={ 0.149 }
                position={ [ 0, 0.151, -0.15 ] }
                occlude
            >
                <iframe src="./iframe/OS.html" />
            </Html>
        </primitive> */}
    </>
}
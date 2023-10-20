import { useFrame, useLoader } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useRef, useEffect, Suspense } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

export default function Experience()
{
    const shader = useRef()

    const waterMaterial = useLoader(TextureLoader, './images/water.png')
    waterMaterial.wrapS = THREE.RepeatWrapping
    waterMaterial.wrapD = THREE.RepeatWrapping
    waterMaterial.wrapT = THREE.RepeatWrapping

    let sphereActivated = false
    let wiggleTransition = 0.0
    let zoomTransition = 0.0

    // RUN ONCE ON STARTUP
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

    // UPDATE WEBGL SCENE HERE
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

    return <Suspense fallback={null} >
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
    </Suspense>
}
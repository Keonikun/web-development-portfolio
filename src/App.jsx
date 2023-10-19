import { Canvas } from '@react-three/fiber'

import Landing from './Landing.jsx'
import Experience from './Experience.jsx'

export default function App()
{
    return <>
        <Landing scrollHeight={0} />
        <div id='sphereActivation' />
        <img id='cursorPic' src="./images/cursor.png" alt="" />

        <Canvas
            className='three'
            id='three'
            camera={ {
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [ 0, 0, 0.6 ],
                rotation: [ 0, 0, 0 ]
            } }
        >
            <Experience />
        </Canvas>
    </>
}
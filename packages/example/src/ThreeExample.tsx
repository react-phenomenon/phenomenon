import { animate, fromTo, val } from '@phenomenon/lightning'
import { useStep } from '@phenomenon/slides'
import React, { useRef } from 'react'
import { Canvas } from 'react-three-fiber'

export const ThreeExample = (props: any) => {
    const mesh = useRef<any>()

    useStep(
        props.in,
        ({ duration }) =>
            animate(
                values => {
                    mesh.current.rotation.x = values.x
                    mesh.current.rotation.y = values.y
                },
                [
                    fromTo(
                        {
                            x: val(0, 4),
                            y: val(0, 4),
                        },
                        duration.slow * 2,
                    ),
                ],
            ),
        { title: '→3D' },
    )

    useStep(
        props.out,
        ({ duration }) =>
            animate(
                values => {
                    mesh.current.scale.x = values.scale
                    mesh.current.scale.y = values.scale
                },
                [
                    fromTo(
                        {
                            scale: val(2, 0.5),
                        },
                        duration.slow,
                    ),
                ],
            ),
        { title: '←3D' },
    )

    return (
        <div style={{ height: 500, width: 500 }}>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <mesh position={[0, 0, 0]} ref={mesh} scale={[2, 2, 2]}>
                    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                    <meshStandardMaterial attach="material" color="orange" />
                </mesh>
            </Canvas>
        </div>
    )
}

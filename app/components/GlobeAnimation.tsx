"use client"

import React, {MutableRefObject, useEffect, useRef} from 'react'
import dynamic from 'next/dynamic'
import {GlobeMethods} from "react-globe.gl";
import * as THREE from "three"

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const GlobeAnimation = () => {
    const globeEl = useRef<GlobeMethods | null>(null);

    useEffect(() => {
        const globe = globeEl.current;
        if (globe) {
            const globeScene = globe.scene() as THREE.Scene;

            // Add lights
            const pointLight = new THREE.PointLight(0xffffff, 10, 100);
            pointLight.position.set(100, 100, 0);
            globeScene.add(pointLight);

            const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
            globeScene.add(ambientLight);

            // Set up controls
            const controls = globe.controls();
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;
            controls.rotateSpeed = 0.1;
            controls.minDistance = 200;
            controls.maxDistance = 800;
        }
    }, []);

    const handleZoom = (direction: 'in' | 'out') => {
        const globe = globeEl.current;
        if (!globe) return;

        const camera = globe.camera() as THREE.PerspectiveCamera;
        const controls = globe.controls();

        // Get current distance from camera position
        const currentDistance = camera.position.length();
        const zoomSpeed = 30; // Adjust this value for zoom speed

        // Calculate new distance
        let newDistance;
        if (direction === 'in') {
            newDistance = currentDistance - zoomSpeed;
        } else {
            newDistance = currentDistance + zoomSpeed;
        }

        // Clamp distance
        newDistance = Math.max(controls.minDistance, Math.min(controls.maxDistance, newDistance));

        // Update camera position
        const direction_vector = camera.position.clone().normalize();
        camera.position.copy(direction_vector.multiplyScalar(newDistance));

        // Update controls
        controls.update();
    };

    return (
        <div className={"flex flex-col items-center"}>
            <Globe
                ref={globeEl as MutableRefObject<GlobeMethods>}
                height={250}
                width={250}
                backgroundColor="rgba(170,170,170,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                labelsData={[
                    {
                        lat: 34.71,
                        lng: 137.743,
                        text: `Hamamatsu\n(I'm here!)`
                    },
                    {
                        lat: 16.84,
                        lng: 96.17,
                        text: `Yangon\n(My hometown)`
                    }
                    ]}
                labelSize={1}
                labelDotRadius={0.5}
            />
            <div className={"flex justify-center gap-8 py-2 text-2xl items-center"}>
                <button
                    onClick={() => handleZoom('out')}
                    className={"text-white opacity-50 hover:opacity-100"}
                >-</button>
                Zoom
                <button
                    onClick={() => handleZoom('in')}
                    className={"text-white opacity-50 hover:opacity-100"}
                >+</button>
            </div>
        </div>
    )
}
export default GlobeAnimation

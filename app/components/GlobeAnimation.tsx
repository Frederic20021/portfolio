"use client"

import React, {useEffect, useRef} from 'react'
import dynamic from 'next/dynamic'
import {GlobeMethods} from "react-globe.gl";
import * as THREE from "three"

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const GlobeAnimation = () => {
    const globeEl = useRef<GlobeMethods | null>(null);

    useEffect(() => {
        if (globeEl.current) {
            const globeScene = globeEl.current.scene(); // Access the Three.js scene

            // Create a point light
            const pointLight = new THREE.PointLight(0xffffff, 10, 100);
            pointLight.position.set(100, 100, 0); // Position of the light
            globeScene.add(pointLight);

            // Optional: Add ambient light
            const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Color and intensity
            globeScene.add(ambientLight);
            const controls = globeEl.current.controls();
            controls.minZoom = 50;
            controls.maxZoom = 50;

            const camera = globeEl.current.camera();
            camera.position.set(0, 0, 100); // Set starting position
            camera.lookAt(0, 0, 0); // Look at the globe's center
        }
    }, []);
    return (
        <div className={"flex flex-col items-center"}>
            <Globe
                ref={globeEl}
                height={200}
                width={200}
                backgroundColor="rgba(170,170,170,0)"
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{
                    lat: 34,
                    lng: 137,
                    text: "I'm here!",
                    color: 'white',
                    size: 7,
                }]}
            />
            <div className={"flex justify-center gap-8"}>
                <button>-</button>
                <button>+</button>
            </div>
        </div>
    )
}
export default GlobeAnimation

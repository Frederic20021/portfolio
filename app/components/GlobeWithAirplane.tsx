'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import dynamic from "next/dynamic";

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const GlobeWithAirplane = () => {
    const globeRef = useRef(null);
    const airplaneRef = useRef(null);

    useEffect(() => {
        if (!globeRef.current) return;

        // Get the Globe Three.js scene
        const globeObj = globeRef.current;
        const globeScene = globeObj.scene();
        const globeRadius = globeObj.getGlobeRadius();

        // Load Airplane Model
        const loader = new GLTFLoader();
        loader.load('/models/airplane-model.glb', (gltf) => {
            const airplane = gltf.scene;
            airplane.scale.set(0.02, 0.02, 0.02); // Scale down
            airplaneRef.current = airplane;

            // Add airplane to globe scene
            globeScene.add(airplane);

            // Animate the airplane around coordinates
            let angle = 0;
            const animateAirplane = () => {
                angle += 0.01; // Adjust speed here
                const lat = 30 + Math.sin(angle) * 20; // Adjust orbit
                const lng = -100 + Math.cos(angle) * 20;

                const { x, y, z } = globeObj.getCoords(lat, lng, globeRadius * 1.1);
                airplane.position.set(x, y, z);
                airplane.lookAt(0, 0, 0); // Ensure airplane faces the globe center

                requestAnimationFrame(animateAirplane);
            };

            animateAirplane();
        });
    }, []);

    return (
        <Globe
            ref={globeRef}
            height={326}
            width={326}
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere
            showGraticules
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            labelsData={[
                {
                    lat: 40,
                    lng: -100,
                    text: "I'm here!",
                    color: 'white',
                    size: 20,
                },
            ]}
        />
    );
};

export default GlobeWithAirplane;

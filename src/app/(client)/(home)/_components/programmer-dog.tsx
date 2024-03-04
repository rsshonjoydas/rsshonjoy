'use client';

import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Spinner } from '@/components/ui/spinner';
import { loadGLTFModel } from '@/lib/gltf-model';

// Off initial loading 4 replace 0
function easeOutCirc(x: number) {
  return Math.sqrt(1 - (x - 1) ** 4);
}

const DogContainer = forwardRef(({ children }: { children: React.ReactNode }, ref: any) => (
  <div
    ref={ref}
    className='row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0'
  >
    {children}
  </div>
));

export const ProgrammerDogLoader = () => (
  <DogContainer>
    <div className='mt-[78%] flex items-center justify-center'>
      <Spinner size='lg' />
    </div>
  </DogContainer>
);

export default function ProgrammerDog() {
  const refContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const refRenderer = useRef<THREE.WebGLRenderer | null>(null);
  const urlDogGLB = 'dog.glb';

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer as React.MutableRefObject<THREE.WebGLRenderer | null>;
    const { current: container } = refContainer as React.MutableRefObject<HTMLDivElement | null>;
    if (container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;
      renderer.setSize(scW, scH);
    }
  }, []);

  useEffect(() => {
    const { current: container } = refContainer;
    if (container) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);
      refRenderer.current = renderer;
      const scene = new THREE.Scene();

      const target = new THREE.Vector3(-0.5, 1.2, 0);
      const initialCameraPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      );

      const scale = scH * 0.005 + 4.8;
      const camera = new THREE.OrthographicCamera(-scale, scale, scale, -scale, 0.01, 50000);
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);

      const ambientLight = new THREE.AmbientLight(0xcccccc, Math.PI);
      scene.add(ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;

      let req: number | null = null;
      let frame = 0;
      const animate = () => {
        req = requestAnimationFrame(animate);

        frame = frame <= 100 ? frame + 1 : frame;

        if (frame <= 100) {
          const p = initialCameraPosition;
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

          camera.position.y = 10;
          camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
          camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
          camera.lookAt(target);
        } else {
          controls.update();
        }

        renderer.render(scene, camera);
      };

      loadGLTFModel(scene, urlDogGLB, {
        receiveShadow: false,
        castShadow: false,
      }).then(() => {
        animate();
        setLoading(false);
      });

      return () => {
        if (req) {
          cancelAnimationFrame(req);
        }
        if (renderer) {
          renderer.domElement.remove();
          renderer.dispose();
        }
      };
    }

    return undefined;
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [handleWindowResize]);

  return (
    <DogContainer ref={refContainer}>
      {loading && (
        <div className='mt-[80%] flex items-center justify-center'>
          <Spinner size='lg' />
        </div>
      )}
    </DogContainer>
  );
}

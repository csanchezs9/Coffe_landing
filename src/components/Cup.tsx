'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { Box3, Vector3 } from 'three';
import { useCup } from './CupContext';

const TARGET_SIZE = 1.7;

export default function Cup() {
  const { ref, setReady } = useCup();
  const { scene } = useGLTF('/red_coffe_cup.glb');

  const normalizedScale = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return TARGET_SIZE / maxDim;
  }, [scene]);

  useEffect(() => {
    setReady(true);
    return () => setReady(false);
  }, [setReady]);

  return (
    <group ref={ref}>
      <primitive object={scene} scale={normalizedScale} dispose={null} />
    </group>
  );
}

useGLTF.preload('/red_coffe_cup.glb');

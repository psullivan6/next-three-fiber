import React, { useEffect } from 'react';
// import * as THREE from 'three';
import { useThree } from 'react-three-fiber';

const useGLDebugger = THREE => {
  const { camera, scene } = useThree();

  useEffect(() => {
    window.camera = camera;
    window.scene = scene;
    window.THREE = THREE;
  }, [camera, scene]);
};

export default useGLDebugger;

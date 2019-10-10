import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';

// [TODO] Make this work
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import styled from 'styled-components';

try {
  window.THREE = THREE;
} catch {
  console.log('NAH');
}

// Models
const path =
  'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Duck/glTF/';

// Styles
const CanvasContainer = styled.div`
  width: 100%;
  height: 400px;
`;

// const model = new GLTFLoader().load(path, res => {
//   console.log('res', res);
// });

const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 2;

const Thing = ({ onClick }) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.z += 0.01));

  return (
    <mesh
      ref={ref}
      onClick={onClick}
      onPointerOver={e => console.log('hover')}
      onPointerOut={e => console.log('unhover')}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial
        attach="material"
        color="hotpink"
        opacity={0.5}
        transparent
      />
    </mesh>
  );
};

const TestPage = () => {
  return (
    <section>
      <h1>Here's the canvas</h1>
      <CanvasContainer>
        <Canvas pixelRatio={pixelRatio}>
          <Thing />
        </Canvas>
      </CanvasContainer>
    </section>
  );
};

export default TestPage;

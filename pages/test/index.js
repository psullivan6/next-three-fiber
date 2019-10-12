import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';

//
// [TODO] Make these imports work w/o relative paths
//
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
//
//

import styled from 'styled-components';

extend({ OrbitControls });

// Models
// const path = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Duck/glTF/Duck.gltf';
const path = '/1970_pontiac_firebird_trans_am/scene.gltf';

// Styles
const CanvasContainer = styled.div`
  width: 100%;
  height: 400px;
  background: beige;
`;

const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 2;

const Thing = ({ onClick }) => {
  const ref = useRef();
  // useFrame(() => (ref.current.rotation.z += 0.01));

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

const Controls = props => {
  const { camera } = useThree();
  const controls = useRef();

  useRender(() => controls.current && controls.current.update());

  return <orbitControls ref={controls} args={[camera]} {...props} />;
};

const TestPage = () => {
  const [scene, setScene] = useState();
  // const scene = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.THREE = THREE;
      new GLTFLoader().load(path, ({ scene: loadedScene }) => {
        setScene(loadedScene);
        window.THREE = THREE;
        window.scene = loadedScene;
        // console.log('loadedScene', loadedScene);
        // scene.current = loadedScene;
      });
    }
  }, []);

  console.log('scene', scene);

  if (scene == null) {
    return <h1>Loading...</h1>;
  }

  const SceneComponent = scene;
  console.log('TEST PAGE', scene);

  return (
    <section>
      <h1>Here's the canvas</h1>
      <CanvasContainer>
        <Canvas pixelRatio={pixelRatio}>
          {/* <Thing /> */}
          <ambientLight intensity={30.5} />
          <spotLight intensity={0.8} position={[200, 200, 0]} />
          <Controls
            enableDamping
            enablePan={false}
            dampingFactor={0.1}
            rotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
          />
          <primitive object={scene} />
        </Canvas>
      </CanvasContainer>
    </section>
  );
};

export default TestPage;

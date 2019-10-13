import React, { Fragment, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';

//
// [TODO] Make these imports work w/o relative paths
//
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
//
//
import useGLTFModel from '../../components/GL/useGLTFModel';
import useGLDebugger from '../../components/GL/useGLDebugger';

import styled from 'styled-components';

extend({ OrbitControls });

const getRandomColor = () =>
  '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

// Styles
const CanvasContainer = styled.div`
  width: 100%;
  height: 400px;
  background: ${({ backgroundColor }) => backgroundColor};
`;

const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 2;

const Controls = props => {
  const { camera } = useThree();
  const controls = useRef();

  useRender(() => controls.current && controls.current.update());

  return <orbitControls ref={controls} args={[camera]} {...props} />;
};

const SceneStuff = ({ children }) => {
  useGLDebugger(THREE);

  return (
    <Fragment>
      <ambientLight intensity={30.5} />
      <spotLight intensity={0.8} position={[200, 200, 0]} />
      <Controls
        enableDamping
        enablePan={false}
        dampingFactor={0.1}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
      />
      {children}
    </Fragment>
  );
};

const listenForCommands = ({ setBackgroundColor }) => {
  const commands = {
    'change color': () => {
      setBackgroundColor(getRandomColor());
    }
  };

  if (typeof window !== 'undefined') {
    import('annyang').then(annyang => {
      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening.
      annyang.start();
    });
  }
};

const stopListeningForCommands = () => {
  // [TODO] Destroy annyang
};

const TestPage = () => {
  const [backgroundColor, setBackgroundColor] = useState('beige');
  const { Component: FirebirdModel, hasLoaded } = useGLTFModel({
    path: '/1970_pontiac_firebird_trans_am/scene.gltf'
  });

  useEffect(() => {
    listenForCommands({ backgroundColor, setBackgroundColor });
    return () => {
      stopListeningForCommands();
    };
  }, []);

  if (!hasLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <h1>Here's the canvas</h1>
      <CanvasContainer backgroundColor={backgroundColor}>
        <Canvas
          camera={{ fov: 40, position: [0, 200, -300] }}
          pixelRatio={pixelRatio}
        >
          <SceneStuff>
            <FirebirdModel position={[60, -90, -40]} />
          </SceneStuff>
        </Canvas>
      </CanvasContainer>
    </section>
  );
};

export default TestPage;

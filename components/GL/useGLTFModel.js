import React, { useEffect, useState } from 'react';

//
// [TODO] Make these imports work w/o relative paths
//
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader';

const useGLTFModel = ({ path }) => {
  const [component, setComponent] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      new GLTFLoader().load(path, ({ scene: loadedComponent }) => {
        setComponent(loadedComponent);
      });
    }
  }, []);

  return {
    Component: props => <primitive object={component} {...props} />,
    hasLoaded: component != null
  };
};

export default useGLTFModel;

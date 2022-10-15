import { useEffect, useState, Children } from "react";
import usePrevious from "../hooks/usePrevious";

const calculateBoundingBoxes = children => {
    const boundingBoxes = {};
  
    Children.forEach(children, child => {
        if (!child?.ref?.current){
            return
        }
      const domNode = child.ref.current;
      const nodeBoundingBox = domNode.getBoundingClientRect();
      boundingBoxes[child.key] = nodeBoundingBox;
    });
  
    return boundingBoxes;
  };

const AnimateBubbles = ({ children }) => {
    const [boundingBox, setBoundingBox] = useState({});
    const [prevBoundingBox, setPrevBoundingBox] = useState({});
    const prevChildren = usePrevious(children);
  
    useEffect(() => {
      const newBoundingBox = calculateBoundingBoxes(children);
      setBoundingBox(newBoundingBox);
    }, [children]);
  
    useEffect(() => {
      const prevBoundingBox = calculateBoundingBoxes(prevChildren);
      setPrevBoundingBox(prevBoundingBox);
    }, [prevChildren]);
    useEffect(() => {
        const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;
    
        if (hasPrevBoundingBox) {
          Children.forEach(children, child => {
            const domNode = child.ref.current;
            const firstBox = prevBoundingBox[child.key];
            const lastBox = boundingBox[child.key];
            const changeInY = firstBox.top - lastBox.top;
    
            if (changeInY) {
              requestAnimationFrame(() => {
                domNode.style.transform = `translateY(${changeInY}px)`;
                domNode.style.transition = "transform 0s";
    
                requestAnimationFrame(() => {
                  domNode.style.transform = "";
                  domNode.style.transition = "transform 500ms";
                });
              });
            }
          });
        }
      }, [boundingBox, prevBoundingBox, children]);
  
    return children;
  };

  export default AnimateBubbles;
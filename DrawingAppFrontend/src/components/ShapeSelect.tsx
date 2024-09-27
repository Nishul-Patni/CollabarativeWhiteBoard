import React, {useEffect, useState, useContext} from 'react'
import { DrawingContext, DrawingContextPropsObject } from './Context/DrawingContext';
import Circle from './Entity/Circle';
import { CanvasContext, CanvasContextPropsObject } from './Context/CanvasContext';
import Rectangle from './Entity/Rectangle';
import Line from './Entity/Line';
import CanvasConfig from './Entity/CanvasConfig';

export default function ShapeSelect() {

    const [selectedShape, setselectedShape] = useState<number>(0)
    let {setCurrShape, currShape, setCurrShapeType, handleCurrShape, currShapeType} = useContext(DrawingContext) as DrawingContextPropsObject;

    const handleShapeSelect = (num)=>{
        setselectedShape(num);
        let type : string | null= null;
        if(selectedShape==num){
          setselectedShape(0);
          setCurrShape(null);
          handleCurrShape(null);
        }
        else{

          if(num==1)
            type = "circle";
        else if(num==2)
          type = "rectangle"
        else if(num==3)
          type = "line";

        setCurrShapeType(type);
        handleCurrShape(type);
      }
    }

    useEffect(() => {
    
      return () => {
        setselectedShape(0);
        setCurrShape(null);
      }
    }, [])
    

  return (
    <div id='shape-select-container'>
        <div onClick={()=>{handleShapeSelect(1)}} className={"shape-button " +(selectedShape == 1? 'shape-selected':"")}><img  className='shape-icon' alt='circle shape' src='/images/circle.svg'/></div>
        <div onClick={()=>{handleShapeSelect(2)}} className={"shape-button " +(selectedShape == 2? 'shape-selected':"")}><img  className='shape-icon' alt='square shape' src='/images/square.svg'/></div>
        <div onClick={()=>{handleShapeSelect(3)}} className={"shape-button " +(selectedShape == 3? 'shape-selected':"")}><img  className='shape-icon' alt='line shape' src='/images/line.svg'/></div>
    </div>
  )
}

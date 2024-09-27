import React, { useContext, useState } from 'react'
import { DrawingContext, DrawingContextPropsObject } from './Context/DrawingContext';
import "./Controller.css"
import { CanvasContext, CanvasContextPropsObject } from './Context/CanvasContext';
import ColorPickerWithTransparency from './ColorPicker';

export default function Controller() {
    let {handleCurrShape, currShapeType, setCurrShapeType,showShapeSelect, setSelectedShape, setShowShapeSelect, setEraser, eraser, pencil, setPencil} = useContext(DrawingContext) as DrawingContextPropsObject;
    let {canvasConfig} = useContext(CanvasContext) as CanvasContextPropsObject;
    let [selectedButton, setSelectedButton] = useState<number>(1)
    let [lineWidth, setLineWidth] = useState<number>(canvasConfig.lineWidth);

    const handleControlClick = (num)=>{
        setEraser(false)
        setPencil(false)
        setCurrShapeType(null);
        handleCurrShape(null);
        if(num==selectedButton){
            setSelectedButton(1);
        }else{
            setSelectedButton(num);
        }

        if(num==2){
            setPencil(!pencil);
            if(pencil){
                setCurrShapeType(null);
                handleCurrShape(null);
            }else{
                setCurrShapeType("line");
                handleCurrShape("line")
            }
        }

        if(num==3){
            setShowShapeSelect(!showShapeSelect);
        }else{
            setShowShapeSelect(false);
        }

        if(num==4){ 
            setEraser(!eraser);
            if(eraser){
                setCurrShapeType(null);
                handleCurrShape(null);
            }else{
                console.log("eraser selected");
                setCurrShapeType("eraser");
                handleCurrShape("eraser");
            }
        }
    }

    let handleLineWidth = (event : React.FormEvent<HTMLInputElement>)=>{
        setLineWidth(Number.parseInt(event.currentTarget.value));
        canvasConfig.lineWidth=Number.parseInt(event.currentTarget.value);
        handleCurrShape(currShapeType)
    }

  return (
    <>
        <div id='shape-config-container'>
            <div className='config-control'>
                <ColorPickerWithTransparency defaultColor='#ffffff' colorChange={(color:string):void=>{canvasConfig.fillStyle=color; handleCurrShape(currShapeType)}}/>
                <span>Fill</span>
            </div>
            <div className='config-control'>
                <ColorPickerWithTransparency defaultColor='#000000' colorChange={(color:string):void=>{canvasConfig.strokeStyle=color; handleCurrShape(currShapeType)}}/>
                <span>Stroke</span>
            </div>
            <div className='config-control'>
                <input type="number" min="0" max="9" name="line-width" id="line-width" value={lineWidth} onChange={handleLineWidth}/>
                <span>Line Width</span>
            </div>
        </div>
        <div id='controller'>
            <button onClick={()=>{handleControlClick(1)}} className={"control "+ (selectedButton == 1? 'control-selected':"")}><img src='/images/cursor.svg' alt='cursor' className='control-icon'/></button>
            <button onClick={()=>{handleControlClick(2)}} className={"control "+ (selectedButton == 2? 'control-selected':"")}><img src='/images/pencil.svg' alt='pencil' className='control-icon' /></button>
            <button onClick={()=>{handleControlClick(3)}} className={"control "+ (selectedButton == 3? 'control-selected':"")}><img src="/images/shapes.svg" alt="shapes" className="control-icon" /></button>
            <button onClick={()=>{handleControlClick(4)}} className={"control "+ (selectedButton == 4? 'control-selected':"")}><img src="/images/eraser.svg" alt="eraser" className="control-icon" /></button>
            <button className="control"><img src="/images/undo.svg" alt="undo" className="control-icon" /></button>
            <button className="control"><img src="/images/redo.svg" alt="redo" className="control-icon" /></button>
        </div>
    </>
  )
}

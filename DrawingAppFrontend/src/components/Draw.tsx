import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {usePinch, useScroll, useGesture, useDrag, useMove} from "@use-gesture/react"
import "./Draw.css"
import Controller from './Controller.jsx';
import { DrawingContext, DrawingContextPropsObject} from './Context/DrawingContext.tsx';
import ShapeSelect from './ShapeSelect.jsx';
import { CanvasContext, CanvasContextPropsObject } from './Context/CanvasContext.tsx';
import Shape from './Entity/Shape.ts';
import Circle from './Entity/Circle.ts';
import Rectangle from './Entity/Rectangle.ts';
import Line from './Entity/Line.ts';
import Eraser from './Entity/Eraser.ts';

const Draw : React.FC = ()=> {
    // console.log("draw rendered");
    let {pencil,showShapeSelect, eraser, addTestShapes, shapes, draw, clearCanvas, currShape, handleCurrShape, currShapeType, setShapes} = useContext(DrawingContext) as DrawingContextPropsObject;
    let {setCanvas, setCtx, canvas, observableConfig, ctx,handleCanvasConfigUpdate, canvasConfig} = useContext(CanvasContext) as CanvasContextPropsObject;
    let flowShapes : Shape [] = []
    let canvasRef = useRef<HTMLCanvasElement>(null)

    usePinch ( ({offset : [d]})=>{
        handleCanvasConfigUpdate({...canvasConfig, scale:d})
        clearCanvas(canvas!, ctx!);
        handleCurrShape(currShapeType);
        draw(shapes);
      },
    {
      target : canvasRef,
      eventOptions : {passive:false},
      scaleBounds : {min:0.2, max:5}
    }
    );

    useDrag(({xy:[currX, currY], delta: [offsetX, offsetY],movement : [x, y], initial : [initialX, initialY], last, movement : [distanceX, distanceY]})=>{
      
      if(currShape==null){
        console.log("dragging");
        handleCanvasConfigUpdate({ ...canvasConfig, xOffset: offsetX, yOffset:offsetY})
        clearCanvas(canvas!, ctx!);
        draw(shapes);
      }else if(currShape!=null){
        console.log("drawing")
        clearCanvas(canvas!, ctx!);

        if(last){
          let newShapes : Shape [] = [];
          shapes.forEach(s=>newShapes.push(s));
          if(eraser || pencil){
            flowShapes.forEach(s=>{
              newShapes.push(s);
              observableConfig.addObserver(s);
            })
            flowShapes = [];
          }else{
            newShapes.push(currShape);
            observableConfig.addObserver(currShape);
          }
          handleCurrShape(currShapeType);
          setShapes(newShapes);
        }
        if(pencil || eraser){
          let preX : number = currX - offsetX;
          let preY : number = currY - offsetY;
          let line : Line = pencil?new Line(ctx!, {...currShape.canvasConfig}) : new Eraser(ctx!, {...currShape.canvasConfig});
          line.updateProperties({x:preX, y:preY, endX:currX, endY:currY});
          flowShapes.push(line);
        }else{
          if(currShape instanceof Circle){
            let tempShape: Circle = currShape as Circle;
            tempShape.updateProperties({x:initialX, y:initialY, radiusX : Math.abs(x), radiusY : Math.abs(y)})
            
          }else if(currShape instanceof Rectangle){
            let tempShape : Rectangle = currShape as Rectangle;
            tempShape.updateProperties({x:initialX, y:initialY, height:y, width:x})
          }else if(currShape instanceof Line){
            let tempShape : Line = currShape as Line;
            tempShape.updateProperties({x:initialX, y:initialY, endX:initialX+distanceX, endY:initialY+distanceY})
          }
        }
        draw(shapes)
        currShape.draw();
        flowShapes.forEach(s=>s.draw())
      }
    },
    {
      target : canvasRef,
      eventOptions : {passive : false}
    }
  )

    useEffect(()=>{
      let tempCanvas = canvasRef.current;
      ctx = tempCanvas!.getContext("2d")
      setCanvas(tempCanvas!);
      setCtx(ctx!);
      tempCanvas!.width = window.innerWidth;
      tempCanvas!.height = window.innerHeight;
      addTestShapes(ctx!, shapes)
    }, [])

    draw(shapes)
  return (
   <>
      <div id='canvas-container'  style={{"overflow":"hidden"}}>
      <Controller/>

      {
        showShapeSelect?
        <ShapeSelect/>:""
      }  
      
      <canvas id="canvas" ref={canvasRef}></canvas>
      </div>
   </>
  )
}



export default Draw;








// const rect = canvas.getBoundingClientRect();
// canvas.width = rect.width;
// canvas.height = rect.height;


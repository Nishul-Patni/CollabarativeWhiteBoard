import React, { createContext, useContext, useRef, useState } from 'react';
import Shape from "../Entity/Shape";
import Circle from "../Entity/Circle"
import Rectangle from "../Entity/Rectangle"; 
import Line from "../Entity/Line"
import CanvasConfig from "../Entity/CanvasConfig";
import { CanvasContext, CanvasContextPropsObject } from './CanvasContext';


export interface DrawingContextPropsObject {
    currShape : Shape | null;
    showShapeSelect: boolean;
    shapes : Shape [];
    currShapeType : string | null;
    eraser : boolean;
    selectedShape : Shape | null;
    pencil : boolean;
    setPencil : (pencil : boolean) => void;
    setSelectedShape : (shape : Shape | null) => void;
    setEraser : (eraser : boolean) => void;
    setCurrShape : (shape : Shape | null)=> void
    setShowShapeSelect: (showShapeSelect: boolean) => void;
    addTestShapes : (ctx : CanvasRenderingContext2D, shapes : Shape []) => void;
    draw : (shape : Shape []) => void;
    clearCanvas : (canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D) => void;
    setShapes : (shaps : Shape []) => void;
    handleCurrShape : (shapeType : string | null) => void;
    setCurrShapeType : (shapeType : string | null) => void;
}

export const DrawingContext = createContext<DrawingContextPropsObject | null>(null);

export const DrawingContextProvider = (props)=>{
    // console.log("drawing context rendered");


    let [shapes, setShapes] = useState<Shape []>([]);
    let [eraser, setEraser] = useState<boolean>(false);
    let [selectedShape, setSelectedShape] = useState<Shape | null>(null);
    const [showShapeSelect, setShowShapeSelect] = useState<boolean>(false)
    let [currShape, setCurrShape] = useState<Shape | null>(null);
    let [currShapeType, setCurrShapeType] = useState<string | null>(null);
    let [pencil, setPencil] = useState<boolean>(false);
    let {observableConfig, ctx, canvasConfig} = useContext(CanvasContext) as CanvasContextPropsObject;


    function addTestShapes(ctx : CanvasRenderingContext2D, shapes : Shape []) : void {
        let circle = new Circle(ctx, new CanvasConfig());
        circle.updateProperties({x:400, y:100, radiusX:40, radiusY:40});
        observableConfig.addObserver(circle);
        let rectangle = new Rectangle(ctx, new CanvasConfig());
        rectangle.updateProperties({x:400, y:200, height: 200, width:150});
        observableConfig.addObserver(rectangle);
        setShapes([...shapes, rectangle]);
        // rectangle.draw();
    }

    const handleCurrShape = (shapeType : string | null = currShapeType) : void=>{
        if(shapeType==null){
            setCurrShape(null);
        }else{
            let shapeConfig = new CanvasConfig();
            shapeConfig.fillStyle = canvasConfig.fillStyle;
            shapeConfig.lineWidth = canvasConfig.lineWidth;
            shapeConfig.strokeStyle = canvasConfig.strokeStyle;
            shapeConfig.scale = canvasConfig.scale
            shapeType = shapeType.toLocaleLowerCase();
            if(shapeType == "circle"){
            let circle : Circle = new Circle(ctx!, shapeConfig)
            setCurrShape(circle);
          }
          else if(shapeType=="rectangle"){
            let rectangle : Rectangle = new Rectangle(ctx!, shapeConfig);
            setCurrShape(rectangle);
          }
          else if(shapeType=="line"){
            let line : Line = new Line(ctx!, shapeConfig);
            setCurrShape(line);
          }else if(shapeType=="eraser"){
            shapeConfig.lineWidth = 0;
            let erased : Rectangle = new Rectangle(ctx!, shapeConfig, {x:0,y:0, height:2, width:2});
            setCurrShape(erased)
          }

        }
    }

    let draw = (shapes : Shape []) : void =>{
        // console.log(shapes)
        shapes.forEach((shape: Shape)=>{
            shape.draw();
        })
    }

    const clearCanvas = (canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D)  : void  => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <DrawingContext.Provider value={{setPencil, pencil, selectedShape, setSelectedShape, eraser, setEraser, showShapeSelect, currShape, currShapeType, setCurrShapeType, handleCurrShape,setShowShapeSelect, setCurrShape, addTestShapes, shapes, draw, clearCanvas, setShapes}}>
            {props.children}
        </DrawingContext.Provider>
    )
}

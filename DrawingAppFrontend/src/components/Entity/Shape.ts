import { Observer } from "../Observers/CanvasConfigObserver";
import CanvasConfig from "./CanvasConfig"
import { v4 as uuidv4 } from 'uuid';

abstract class Shape implements Observer{
    canvasConfig : CanvasConfig;
    ctx: CanvasRenderingContext2D;
    shapeId :string;
    lineWidth : number;
    fillStyle : string;
    strokeStyle : string;

    constructor(ctx: CanvasRenderingContext2D, canvasConfig : CanvasConfig){
        this.shapeId = uuidv4();
        this.ctx = ctx;
        this.canvasConfig = canvasConfig
        this.lineWidth = canvasConfig.lineWidth;
        this.fillStyle = canvasConfig.fillStyle;
        this.strokeStyle = canvasConfig.strokeStyle;
    };

    abstract draw () : void;
    abstract updateProperties(properties : object) : void;
    abstract getProperties() : object;

    update(config : CanvasConfig) : void{
        // console.log(this.canvasConfig.scale, config.scale, config.scale+this.canvasConfig.scale)
        this.canvasConfig.scale = config.scale;
        this.canvasConfig.xOffset += config.xOffset;
        this.canvasConfig.yOffset += config.yOffset;
    }
    
}


export default Shape;
import Shape from "./Shape";
import CanvasConfig from "./CanvasConfig";
import { v4 as uuidv4 } from 'uuid';

class Circle extends Shape{
    
    x : number = 0;
    y : number = 0;
    radiusX : number = 0;
    radiusY : number = 0;
    
    constructor(ctx: CanvasRenderingContext2D, canvasConfig : CanvasConfig) {
        super(ctx, canvasConfig);
        this.x = 0;
        this.y = 0;
        this.radiusX = 0;
        this.radiusY = 0;
    }

    updateProperties(properties: {x: number, y : number, radiusX : number, radiusY : number}): void {
        this.x = properties.x/this.canvasConfig.scale;
        this.y = properties.y/this.canvasConfig.scale;
        this.radiusX = properties.radiusX/this.canvasConfig.scale;
        this.radiusY = properties.radiusY/this.canvasConfig.scale;
    }
    getProperties(): {x: number, y : number, radiusX : number, radiusY : number} {
        return {x : this.x, y : this.y, radiusX : this.radiusX, radiusY : this.radiusY}
    }
    
    draw() : void{    
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth
        this.ctx.ellipse(
            (this.x + this.canvasConfig.xOffset) * this.canvasConfig.scale, 
            (this.y + this.canvasConfig.yOffset) * this.canvasConfig.scale, 
            this.radiusX * this.canvasConfig.scale, 
            this.radiusY * this.canvasConfig.scale, 
            0, 0, 2 * Math.PI); 
            
        this.ctx.fillStyle = this.fillStyle
        this.ctx.fill();
        this.ctx.strokeStyle = this.canvasConfig.strokeStyle;
        this.ctx.stroke();
    }

    isCursorPointingMe(x: number, y: number): boolean {
        let virtualX = (this.x+this.canvasConfig.xOffset)*this.canvasConfig.scale;
        let virtualY = (this.y+this.canvasConfig.yOffset)*this.canvasConfig.scale;
        let virtualRadiusX = this.radiusX*this.canvasConfig.scale;
        let virtualRadiusY = this.radiusY*this.canvasConfig.scale;

        let val = Math.pow((x-virtualX)/virtualRadiusX, 2) + Math.pow((y-virtualY)/virtualRadiusY, 2);
        
        return 0.9<= val && val<=1.1;
    }
}

export default Circle;
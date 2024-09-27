import Shape from "./Shape";
import CanvasConfig from "./CanvasConfig";

class Line extends Shape{
    
    x : number = 0;
    y : number = 0;
    endX : number = 0;
    endY : number = 0;
    
    constructor(ctx: CanvasRenderingContext2D, canvasConfig : CanvasConfig) {
        super(ctx, canvasConfig);
        this.x = 0;
        this.y = 0;
        this.endX = 0;
        this.endY = 0;
    }

    updateProperties(properties: {x: number, y : number, endX : number, endY : number}): void {
        this.x = properties.x/this.canvasConfig.scale;
        this.y = properties.y/this.canvasConfig.scale;
        this.endX = properties.endX/this.canvasConfig.scale;
        this.endY = properties.endY/this.canvasConfig.scale;
    }
    getProperties(): {x: number, y : number, endX : number, endY : number}{
        return {x : this.x, y : this.y, endX : this.endX, endY : this.endY};
    }

    draw () : void{
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.canvasConfig.strokeStyle;
        this.ctx.moveTo((this.x+this.canvasConfig.xOffset)*this.canvasConfig.scale, (this.y+this.canvasConfig.yOffset)*this.canvasConfig.scale);
        this.ctx.lineTo((this.endX+this.canvasConfig.xOffset)*this.canvasConfig.scale, (this.endY+this.canvasConfig.yOffset)*this.canvasConfig.scale);
        this.ctx.lineWidth = this.canvasConfig.lineWidth
        this.ctx.stroke();
    }
}

export default Line;
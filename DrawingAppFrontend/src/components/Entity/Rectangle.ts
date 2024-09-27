import Shape from "./Shape";
import CanvasConfig from "./CanvasConfig";

class Rectangle extends Shape{
    
    x : number;
    y : number;
    width : number;
    height : number;

    constructor(ctx: CanvasRenderingContext2D, canvasConfig : CanvasConfig, properties : {x:number, y:number, height:number, width:number} = {x:0, y:0, height:0, width:0}) {
        super(ctx, canvasConfig);
        this.x = 0;
        this.y = 0;
        this.height = properties.height;
        this.width = properties.width;
    }    
    
    updateProperties(properties: {x:number, y:number, height:number, width:number}): void {
        this.x = properties.x/this.canvasConfig.scale;
        this.y = properties.y/this.canvasConfig.scale;
        this.height = properties.height/this.canvasConfig.scale;
        this.width = properties.width/this.canvasConfig.scale;        
        // console.log(properties.x, properties.y, this.x, this.y)
    }
    
    
    getProperties(): {x:number, y:number, height:number, width:number} {
        return {x : this.x, y : this.y, height : this.height, width : this.width};
    }

    draw() : void{
        this.ctx.beginPath();
        this.ctx.rect(
            (this.x + this.canvasConfig.xOffset) * this.canvasConfig.scale, 
            (this.y + this.canvasConfig.yOffset) * this.canvasConfig.scale, 
            this.width * this.canvasConfig.scale, 
            this.height*this.canvasConfig.scale);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fill();
        this.ctx.strokeStyle = this.strokeStyle;
        if(this.canvasConfig.lineWidth!=0)
            this.ctx.stroke();
    }

    isCursorPointingMe(x: number, y: number): boolean {
        let vX1 = (this.x+this.canvasConfig.xOffset)*this.canvasConfig.scale;
        let vY1 = (this.y+this.canvasConfig.yOffset)*this.canvasConfig.scale;
        let vX2 = vX1 + this.width*this.canvasConfig.scale;
        let vY2 = vY1 + this.height*this.canvasConfig.scale;
        
        // console.log(vX1 + " " + vX2 + " " + x + " " + vY1 +" "+ vY2+ " " + y);

        return (vX1<=x && x<=vX1) || (vX2<=x && x<=vX2) || (vY1<=y && y<=vY1) || (vY2<=y && y<=vY2)
    }
}
export default Rectangle


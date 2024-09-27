
class CanvasConfig{
    xOffset : number;
    yOffset : number;
    scale : number;
    lineWidth : number;
    fillStyle : string;
    strokeStyle : string

    constructor(){
        this.xOffset = 0;
        this.yOffset = 0;
        this.scale = 1;
        this.lineWidth = 5;
        this.fillStyle = "#ffffff";
        this.strokeStyle = "#000000"
    }
}

export default CanvasConfig;
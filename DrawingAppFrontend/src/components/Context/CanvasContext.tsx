import React, {createContext, useContext, useEffect, useState} from "react"
import CanvasConfig from "../Entity/CanvasConfig";
import { ObservableCanvasConfig } from "../Observers/CanvasConfigObserver";

export interface CanvasContextPropsObject{
    canvas : HTMLCanvasElement | null;
    ctx : CanvasRenderingContext2D | null;
    canvasConfig : CanvasConfig;
    observableConfig : ObservableCanvasConfig;
    roomId : string | null;
    setRoomId : (rommId : string | null)=> void;
    setCanvas : (canvas : HTMLCanvasElement)=> void;
    setCtx : (ctx : CanvasRenderingContext2D)=> void;
    setCanvasConfig : (canvasConfig : CanvasConfig) => void;
    handleCanvasConfigUpdate : (newConfig: CanvasConfig) => void;
}

export const CanvasContext = createContext<CanvasContextPropsObject | null>(null);

export const CanvasContextProvider = (props)=>{
    // console.log("canvas context rendered");
    let [roomId, setRoomId] = useState<string | null>(null)
    let [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    let [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    let [canvasConfig, setCanvasConfig] = useState<CanvasConfig>(new CanvasConfig());
    const [observableConfig] = useState<ObservableCanvasConfig>(new ObservableCanvasConfig(canvasConfig));

    const handleCanvasConfigUpdate = (newConfig: CanvasConfig) => {
        setCanvasConfig(newConfig)
        observableConfig.updateConfig(newConfig);
      };
    

    return (
        <CanvasContext.Provider value={{roomId, setRoomId, canvas, ctx, canvasConfig, setCanvas, setCtx, setCanvasConfig, observableConfig, handleCanvasConfigUpdate}}>
            {props.children}
        </CanvasContext.Provider>
    )
}
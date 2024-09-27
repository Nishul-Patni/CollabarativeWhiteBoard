import React, { useContext, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { CanvasContext, CanvasContextPropsObject } from './Context/CanvasContext';


interface Color {
    hex: string;
    rgba: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
}

const rgbaToHex = ({ r, g, b, a }: { r: number; g: number; b: number; a: number }): string => {
    const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
  
    const alpha = Math.round(a * 255);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
  };
  
  const hexToRgba = (hex: string): { r: number; g: number; b: number; a: number } => {
    let r = 0, g = 0, b = 0, a = 1;
    if (hex.length === 9) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
      a = parseInt(hex.slice(7, 9), 16) / 255;
    } else if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    return { r, g, b, a };
  };

const ColorPickerWithTransparency = (props : {defaultColor : string, colorChange : (color : string)=>void}) => {
 
  let {canvasConfig} = useContext(CanvasContext) as CanvasContextPropsObject;

  let defaultColor = props.defaultColor;
  let colorChange = props.colorChange;

  let [localColor, setLocalColor] = useState<Color>({hex:"#ffffff00", rgba:hexToRgba(defaultColor)})
  let [showPicker, setShowPicker] = useState<boolean>(false)

  const handleChangeComplete = (newColor : ColorResult) => {
    setLocalColor({hex:newColor.hex, rgba:newColor.rgb})
    colorChange(newColor.hex)
  };

  return (
    <div style={{ textAlign: 'center'}}>
      {
        showPicker?
          <ChromePicker className="color-picker-input"
          color={localColor.rgba}
          onChange={handleChangeComplete}
          disableAlpha={false}
          />:''
      }
      <div
        className='color-picker'
        style={{
          backgroundColor: `rgba(${localColor.rgba.r},${localColor.rgba.g},${localColor.rgba.b},${localColor.rgba.a})`
        }}
        onClick={()=>{setShowPicker(!showPicker)}}
      />
    </div>
  );

};

export default ColorPickerWithTransparency;

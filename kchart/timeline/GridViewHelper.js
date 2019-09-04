import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ART
} from 'react-native';

const { Surface, Shape, Path, Text,Group } = ART;

//分时图表网格、边框等绘制
import Config from '../Config.js';

const GridViewHelper={};

var frameWidth=0.5;
var frameColor='#cccccc'

//主图框   2/3
GridViewHelper.RenderMainFrame = function(){
      var mainHeight = Config.TimeHeight/3*2;
      const mainFramePath = Path().moveTo(0, 0).lineTo(0, mainHeight).lineTo(Config.TimeWidth, mainHeight).lineTo(Config.TimeWidth,0).close();
      return (<Shape d={ mainFramePath } stroke={frameColor}  strokeWidth={frameWidth} />);
};



//子图框  1/3
GridViewHelper.RenderChildFrame=function(){
     var mainHeight = Config.TimeHeight/3*2;
      var childHeight = Config.TimeHeight/3;
      var startY = mainHeight+Config.TimeTabHeight;
      const childFramePath = Path().moveTo(0, startY).lineTo(0, childHeight+startY).lineTo(Config.TimeWidth, childHeight+startY).lineTo(Config.TimeWidth,startY).close();
      return (<Shape d={ childFramePath } stroke={frameColor}  strokeWidth={frameWidth} />);
};


//横向虚线
GridViewHelper.RenderRowDash=function(){
           //主框图
         var mainHeight = Config.TimeHeight/3*2;
         var mainSpaceHeight = mainHeight / 4;
         var rowDashPath =new Path();
         for(var i=1;i<4;i++){
               rowDashPath.moveTo(0, mainSpaceHeight*i).lineTo(Config.TimeWidth, mainSpaceHeight*i);
         }
         //子框图
         var mainHeight = Config.TimeHeight/3*2;
         var childHeight = Config.TimeHeight/3;
         var startY = mainHeight+Config.TimeTabHeight;
         var childSpaceHeight = childHeight / 2;
         rowDashPath.moveTo(0, childSpaceHeight+startY).lineTo(Config.TimeWidth, childSpaceHeight+startY);
        return ( <Shape d={rowDashPath}  stroke={frameColor}  strokeWidth={frameWidth} strokeDash={[8,8]}/>);
}

//竖向虚线
GridViewHelper.RenderColumnDash=function(){
   var mainHeight = Config.TimeHeight/3*2;
    var spaceWidth = Config.TimeWidth/4;
    var childHeight = Config.TimeHeight/3;
    var startY = mainHeight+Config.TimeTabHeight;
    var columnDashPath =new Path();
    for(var i = 1;i<4;i++){
        columnDashPath.moveTo(spaceWidth*i,0).lineTo(spaceWidth*i,mainHeight).moveTo(spaceWidth*i,startY).lineTo(spaceWidth*i,startY+childHeight);
    }
    return ( <Shape d={columnDashPath}  stroke={frameColor}  strokeWidth={frameWidth} strokeDash={[8,8]}/>);
}

export   default  GridViewHelper;
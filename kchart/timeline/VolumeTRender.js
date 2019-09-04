//子量图绘制
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ART
} from 'react-native';

const { Surface, Shape, Path, Text,Group } = ART;

//分时图表网格、边框等绘制
import Config from '../Config.js';

var mainHeight = Config.TimeHeight/3*2;
var mainWidth = Config.TimeWidth;
var childHeight = Config.TimeHeight/3;
var startY = mainHeight+Config.TimeTabHeight;

var childBottom = startY + childHeight;

const VolumeTRender={};

//绘制轴上的文字
VolumeTRender.RenderText = function(yesClose,max,min){
        let arrTxt = [];
        //量图Y轴文字
        arrTxt.push(<Text key={0}  fill="#000000" font="10px"  x={0} y={startY} >成交量 </Text>);
        arrTxt.push(<Text key={1}  fill="#000000" font="10px"  x={mainWidth-60} y={startY} >{this.formatValue(max,0,0)} </Text>);
        arrTxt.push(<Text key={2}  fill="#000000" font="10px"  x={mainWidth-10} y={startY+childHeight-12} >{this.formatValue(min,0,0)} </Text>);
        return arrTxt;
};

//计算
VolumeTRender.calculateValue=function(values){
    console.log("子图计算完毕");
    return values;
};

//获取最大值
VolumeTRender.getMaxValue= function(value,point){
    return  Math.max(value, point.v);
};
//获取最小值
VolumeTRender.getMinValue= function(value,point){
    return 0;
};
//绘制量图
VolumeTRender.RenderLine=function(values,timeline,max,min){
      var r = 1;
      var redVolumePath = Path();
      var greenVolumePath = Path();
      var gayVolumePath = Path();
       for(var i=0;i<values.length;i++){
            var point = values[i];
            if(point.colorIndex>0){
               redVolumePath.moveTo(timeline.getX(i)-r,childBottom).lineTo(timeline.getX(i)+r,childBottom)
               .lineTo(timeline.getX(i)+r,this.getChildY(point.v,max,min)).lineTo(timeline.getX(i)-r,this.getChildY(point.v,max,min)).close();
            }else if(point.colorIndex<0){
                  greenVolumePath.moveTo(timeline.getX(i)-r,childBottom).lineTo(timeline.getX(i)+r,childBottom)
                               .lineTo(timeline.getX(i)+r,this.getChildY(point.v,max,min)).lineTo(timeline.getX(i)-r,this.getChildY(point.v,max,min)).close();
            }else{
                 gayVolumePath.moveTo(timeline.getX(i)-r,childBottom).lineTo(timeline.getX(i)+r,childBottom)
                                           .lineTo(timeline.getX(i)+r,this.getChildY(point.v,max,min)).lineTo(timeline.getX(i)-r,this.getChildY(point.v,max,min)).close();
            }
       };
        let arrLine = [];
        arrLine.push(<Shape key={80} d={ redVolumePath } fill='#ff0000'/>);
        arrLine.push(<Shape key={81} d={ greenVolumePath } fill='#009900' />);
        arrLine.push(<Shape key={82} d={ gayVolumePath } fill='#888888' />);
//        console.log(redVolumePath);
        return arrLine;
};

VolumeTRender.getChildY=function(value,max,min){
    return childHeight / (max - min) * (max - value) +startY;
}

VolumeTRender.pixelsToValueChild = function(value,max,min){
     return max - (max - min) / childHeight * (value - startY);
}


// 数值格式化
VolumeTRender.formatValue=function(value,max,min){
    var num = new Number(value);
    if(num>10000){
           num /=10000;
          return num.toFixed(1)+"万";
    }
    return num.toFixed(0);
};



export   default  VolumeTRender;

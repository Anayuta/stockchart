//主图绘制
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ART
} from 'react-native';

const { Surface, Shape, Path, Text,Group } = ART;

//分时图表网格、边框等绘制
import Config from '../Config.js';

const MainTRender={};
var mainWidth = Config.TimeWidth;
 var mainHeight = Config.TimeHeight/3*2;
 var mainSpaceHeight = mainHeight / 4;

var textHeight = 12;

var mValueFormat;

//绘制轴上的文字
MainTRender.RenderText = function(yesClose,max,min,offset,startTime,centerTime,endTime){
        let arrTxt = [];
        //主图Y轴文字
        arrTxt.push(<Text key={0}  fill="#ff0000" font="10px"  x={0} y={0} >{this.formatValue(max)} </Text>);
        arrTxt.push(<Text key={1}  fill="#000000" font="10px"  x={0} y={mainSpaceHeight*2-textHeight} >{this.formatValue(yesClose)} </Text>);
        arrTxt.push(<Text key={2}  fill="#009900" font="10px"  x={0} y={mainSpaceHeight*4-textHeight} >{this.formatValue(min)} </Text>);
        var maxP ="+"+this.formatValue(offset* 100.0/ yesClose)+ "%";
        arrTxt.push(<Text key={3}  fill="#ff0000" font="10px"  x={mainWidth-36} y={0} >{maxP} </Text>);
        var minP ="-"+this.formatValue(offset* 100.0/ yesClose)+ "%";
        arrTxt.push(<Text key={4}  fill="#009900" font="10px"  x={mainWidth-36} y={mainSpaceHeight*4-textHeight} >{minP} </Text>);
        //X轴文字
        arrTxt.push(<Text key={5}  fill="#000000" font="10px"  x={0} y={mainHeight} >{startTime} </Text>);
        arrTxt.push(<Text key={6}  fill="#000000" font="10px"  x={mainWidth/2-15} y={mainHeight} >{centerTime} </Text>);
        arrTxt.push(<Text key={7}  fill="#000000" font="10px"  x={mainWidth-30} y={mainHeight} >{endTime} </Text>);
        return arrTxt;
};

//计算
MainTRender.calculateValue=function(values){
      var totalPrice=0;
      for(var i=0;i<values.length;i++){
           var item =values[i];
           totalPrice += item.c;
           item.avg=1.0 * totalPrice / (i + 1);
      }
     console.log("主图计算完毕");
    return values;
};

//获取最大值
MainTRender.getMaxValue= function(value,point){
    return  Math.max(value, Math.max(point.avg, point.c));
};
//获取最小值
MainTRender.getMinValue= function(value,point){
    return Math.min(value, Math.min(point.avg, point.c));
};

//绘制分时线和均线
MainTRender.RenderLine=function(values,timeline){
//      console.log(values);
        var maLinePath = Path();
        var avgLinePath = Path();
         for(var i=0;i<values.length;i++){
               if(i==0){
                    maLinePath.moveTo(timeline.getX(i),timeline.getY(values[i].c));
                    avgLinePath.moveTo(timeline.getX(i),timeline.getY(values[i].avg));
               }else{
                    maLinePath.lineTo(timeline.getX(i),timeline.getY(values[i].c));
                    avgLinePath.lineTo(timeline.getX(i),timeline.getY(values[i].avg));
               }
         };
        let arrLine = [];
        arrLine.push(<Shape key={50} d={ maLinePath } stroke='#000000' strokeWidth={ 1 } />);
        arrLine.push(<Shape key={51} d={ avgLinePath } stroke='#ff9100' strokeWidth={ 1 } />);
        return arrLine;
};

//设置格式化处理器
MainTRender.setMainFormat=function(value){
    this.mValueFormat = value;
}

// 数值格式化
MainTRender.formatValue=function(value){
    if(undefined ===mValueFormat){
        var num = new Number(value);
        return num.toFixed(2);
    }else{
        return mValueFormat.format(value);
    }
};

//根据数值获取主图Y坐标
MainTRender.getY=function(value,max,min){
        return ((max - value) * mainHeight / (max - min));
};

//根据主图Y坐标获取数值
MainTRender.pixelsToValueMain=function(value,max,min){
        console.log(max,min,mainHeight,value);
        return max - (max - min) / mainHeight * value;
};

export   default  MainTRender;
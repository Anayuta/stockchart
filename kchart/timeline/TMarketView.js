//子量图绘制
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ART
} from 'react-native';

const { Surface, Shape, Path, Text,Group } = ART;

//分时图表网格、边框等绘制
import Config from '../Config';
import TimeUtils from '../TimeUtils';

var mainHeight = Config.TimeHeight/3*2;
var mainWidth = Config.TimeWidth;
var childHeight = Config.TimeHeight/3;
var childStartY = mainHeight+Config.TimeTabHeight;

var childBottom = childStartY + childHeight;

const TMarketView={};

TMarketView.RenderMarketView=function(x,y,value,timeline){
        console.log("marketview",x,y,value);
        let arr=[];
        if(y<0||y>childBottom){
            return;
        }
        if(y>mainHeight&&y<childStartY){
            return ;
        }
        if(x<0){
            x= 0;
        }else if(x>mainWidth){
            x= mainWidth;
        }
        let linePath = Path();
        //竖向线
        linePath.moveTo(x,0).lineTo(x,mainHeight).moveTo(x,childStartY).lineTo(x,childBottom);
        //横向线
        linePath.moveTo(0,y).lineTo(mainWidth,y);
         arr.push(<Shape key={70} d={ linePath } stroke="#000000"  strokeWidth={1} />);
        //时间market矩形框
        linePath.moveTo(x-15,mainHeight).lineTo(x+15,mainHeight).lineTo(x+15,childStartY).lineTo(x-15,childStartY).close();
        arr.push(<Shape key={71} d={ linePath } fill="#4290EE" stroke="#4290EE"/>)
        //时间market
        arr.push(<Text key={72}  fill="#FFFFFF" font="10px"  x={x-15} y={mainHeight} >{TimeUtils("hh:mm",new Date(value.time))} </Text>);
        //Y轴
        if(y<mainHeight){
            //主图
           var price =  timeline.getY(y);
           var formatP = timeline.getMainFormat(price);
            //主图market矩形框
            linePath.moveTo(0,y-8).lineTo(50,y-8).lineTo(50,y+8).lineTo(0,y+8).close();
            arr.push(<Shape key={73} d={ linePath } fill="#4290EE" stroke="#4290EE"/>)
            //价格market
            arr.push(<Text key={74}  fill="#FFFFFF" font="10px"  x={0} y={y-6} >{formatP} </Text>);
        }

        return arr;
};




export   default  TMarketView;

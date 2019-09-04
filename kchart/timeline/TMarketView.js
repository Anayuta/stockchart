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
        //时间market矩形框  时间market
        let timePath = Path();
        timePath.moveTo(x-15,mainHeight+2).lineTo(x+15,mainHeight+2).lineTo(x+15,childStartY-2).lineTo(x-15,childStartY-2).close();
        arr.push(
                    <Group>
                        <Shape key={71} d={ timePath } fill="#4290EE" stroke="#4290EE"/>
                        <Text key={72}  fill="#FFFFFF" font="10px"  x={x-15} y={mainHeight+3} >{TimeUtils("hh:mm",new Date(value.time))} </Text>
                     </Group>
                 );
        //Y轴
        if(y<mainHeight){
            //主图
           var price =  timeline.pixelsToValueMain(y);
           var formatP = timeline.getMainFormat(price);
            //主图market矩形框    价格market
            let mainYPath = Path();
            mainYPath.moveTo(0,y-8).lineTo(50,y-8).lineTo(50,y+8).lineTo(0,y+8).close();
            arr.push(
                            <Group>
                                <Shape key={73} d={ mainYPath } fill="#4290EE" />
                                <Text key={74}  fill="#FFFFFF" font="10px"  x={0} y={y-6} >{formatP} </Text>
                            </Group>
                          );
        }else if(y>childStartY&&y<childBottom){
              var childV =  timeline.pixelsToValueChild(y);
              var formatV = timeline.getChildFormat(childV);
             //子图market矩形框  量market
            let childYPath = Path();
            childYPath.moveTo(0,y-8).lineTo(50,y-8).lineTo(50,y+8).lineTo(0,y+8).close();
            arr.push(
                            <Group>
                                <Shape key={73} d={ childYPath } fill="#4290EE"/>
                                <Text key={74}  fill="#FFFFFF" font="10px"  x={0} y={y-6} >{formatV} </Text>
                             </Group>
                            );
        }
        return arr;
};




export   default  TMarketView;

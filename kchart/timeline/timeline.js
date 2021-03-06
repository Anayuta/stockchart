import React, { Component,PureComponent } from 'react';
import {
    View,
    StyleSheet,
    ART,
    PanResponder
} from 'react-native';

const { Surface, Shape, Path, Text,Group } = ART;

import newlist from '../data.json'

import Config from '../Config.js';
import GridViewHelper from './GridViewHelper'
import MainTRender from './MainTRender'
import VolumeTRender from './VolumeTRender'
import TMarketView from './TMarketView'

var mValueMax=-999999;
var mValueMin=999999;
var mChildMaxValue=-999999;
var mChildMinValue=999999;

class TimeLine extends PureComponent {



     constructor(props) {
            super(props);
            this.mainDraws=[MainTRender];
            this.childDraws=[VolumeTRender];
            this.state = {
                mainDraw: this.mainDraws[0],
                childDraw: this.childDraws[0],
                //用于更新界面marketView
                x: -1,
                y: -1,
                onDown:false,
            };
     };

     //获取x的坐标
    getX(position){
               var l = Config.TimeWidth / Config.Total;
               return l * (position + 0.5);
     };

    //获取换算后的主图Y值
    getY(value){
         return this.state.mainDraw.getY(value,mValueMax,mValueMin);
    };

    //根据触摸的Y坐标换算为主图的数据
   pixelsToValueMain(value){
        return this.state.mainDraw.pixelsToValueMain(value,mValueMax,mValueMin);
   }

    // 获取主图格式化
    getMainFormat(value){
        return this.state.mainDraw.formatValue(value);
    };

    //换算副图Y
    getChildY(value){
        return this.state.childDraw.getChildY(value,mChildMaxValue,mChildMinValue);
    };

    //副图单位格式化
    getChildFormat(value){
            return this.state.childDraw.formatValue(value,mChildMaxValue,mChildMinValue);
    }

    //根据触摸的Y坐标换算为副图的数据
    pixelsToValueChild(value){
        return this.state.childDraw.pixelsToValueChild(value,mChildMaxValue,mChildMinValue);
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderGrant: (evt, gestureState) => {
                //手指按下时的画笔起点坐标
                this.tempfirstX = evt.nativeEvent.locationX;
                this.tempFirstY = evt.nativeEvent.locationY;
                console.log(evt.nativeEvent);
                console.log("按下");
                this.setState({
                    x:this.tempfirstX,
                    x:this.tempFirstY,
                    onDown :true
                });

            },//激活时做的动作
            onPanResponderMove: (evt, gestureState) => {
                 var dx=  this.tempfirstX + gestureState.dx;
                 var dy= this.tempFirstY + gestureState.dy;
                console.log("移动", dx, dy);
                this.setState({
                    x:dx,
                    y:dy,
                    onDown :true
                });
            }, //移动时作出的动作

            onPanResponderRelease: (evt, gestureState) => {
               console.log("抬起");
                this.setState({
                    x:-1,
                    y:-1,
                    onDown :false
                });
            },///动作释放后做的动作

            onPanResponderTerminate: (evt, gestureState) => {
            },
        });
    }

    //设置主图格式化
    setMainFormat(value){
        this.state.mainDraw.setMainFormat(value);
    }

    //设置子图格式化
     setChildFormat(value){
         this.state.childDraw.setChildFormat(value);
     }

    //计算得到选中的x
    calculateSelected(values){
             if (values.length<=0) {
                return;
            }
            var selectedIndex = parseInt(this.state.x * 1.0/ this.getX(values.length - 1) * (values.length - 1) + 0.5);
            if (selectedIndex < 0) {
                selectedIndex = 0;
            }
            if (selectedIndex >values.length - 1) {
                selectedIndex = values.length  - 1;
            }
            return selectedIndex;
       }

    render() {

        {MainTRender.calculateValue(newlist);}
        for (var i = 0; i < newlist.length; i++) {
               var point = newlist[i];
               mValueMax = MainTRender.getMaxValue(mValueMax,point);
               mValueMin = MainTRender.getMinValue(mValueMin,point);
               mChildMaxValue = VolumeTRender.getMaxValue(mChildMaxValue,point);
               mChildMinValue = VolumeTRender.getMinValue(mChildMinValue,point);
        }
        //主图的最大最小值处理
        var yesClose = newlist[0].yc;
        var offsetValueMax = mValueMax - yesClose;
        var offsetValueMin = yesClose - mValueMin;
        var offset = Math.max(offsetValueMax, offsetValueMin);
        mValueMax = yesClose + offset;
        mValueMin = yesClose - offset;

        var selectedIndex  = this.calculateSelected(newlist);
          return (
            <View style={ styles.container } {...this._panResponder.panHandlers}>
                <Surface width={ Config.TimeWidth } height={ Config.TimeHeight +Config.TimeTabHeight} >
                    { GridViewHelper.RenderMainFrame() }
                    { GridViewHelper.RenderChildFrame() }
                    { GridViewHelper.RenderRowDash() }
                    { GridViewHelper.RenderColumnDash() }

                    {this.state.mainDraw.RenderText(yesClose,mValueMax,mValueMin,offset,"09:30","11:30","15:00")}
                    {this.state.mainDraw.RenderLine(newlist,this)}
                    {this.state.childDraw.RenderText(yesClose,mChildMaxValue,mChildMinValue)}
                    {this.state.childDraw.RenderLine(newlist,this,mChildMaxValue,mChildMinValue)}
                    {
                        this.state.onDown?TMarketView.RenderMarketView(this.getX(selectedIndex),this.state.y,newlist[selectedIndex],this):null
                    }
                </Surface>
            </View>
          );
        };
}


const styles = StyleSheet.create({
  container: {
    marginTop:100,
    marginLeft:30,
    width:300,
    alignItems:'center'
  },
});
export default TimeLine;

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ART
} from 'react-native';

const { Surface, Shape, Path, Text,Group } = ART;

import newlist from '../data.json'

import Config from '../Config';
import GridViewHelper from './GridViewHelper'
import MainTRender from './MainTRender'
import VolumeTRender from './VolumeTRender'

var mValueMax=-999999;
var mValueMin=999999;
var mChildMaxValue=-999999;
var mChildMinValue=999999;

class TLine extends Component{

     /**获取x的坐标*/
    getX(position){
               var l = Config.TimeWidth / Config.Total;
               return l * (position + 0.5);
     };

    getY(value){
        return ((mValueMax - value) * Config.TimeHeight/3*2 / (mValueMax - mValueMin));
    };

    render() {
        {MainTRender.calculateValue(newlist);}
        for (var i = 0; i < newlist.length; i++) {
               var point = newlist[i];
               mValueMax = MainTRender.getMaxValue(mValueMax,point);
               mValueMin = MainTRender.getMinValue(mValueMin,point);
               mChildMaxValue = VolumeTRender.getMaxValue(mChildMaxValue,point);
               mChildMinValue = VolumeTRender.getMinValue(mChildMinValue,point);
        }
          return (
            <View style={ styles.container }>
                <View  style={{height:100}}/>
                <Surface width={ Config.TimeWidth } height={ Config.TimeHeight +Config.TimeTabHeight} >
                    { GridViewHelper.RenderMainFrame() }
                    { GridViewHelper.RenderChildFrame() }
                    { GridViewHelper.RenderRowDash() }
                    { GridViewHelper.RenderColumnDash() }
                    {MainTRender.RenderText(newlist[0].yc,mValueMax,mValueMin,"09:30","11:30","15:00")}
                    {MainTRender.RenderLine(newlist,this)}
                    {VolumeTRender.RenderText(newlist[0].yc,mChildMaxValue,mChildMinValue)}
                    {VolumeTRender.RenderLine(newlist,this,mChildMaxValue,mChildMinValue)}
                </Surface>
            </View>
          );
        };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
});
export default TLine;

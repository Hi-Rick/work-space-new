<template>
  <div style="width: 100%;height: 100%">
    <div id="myMap"></div>
    <div class="shuiqingCard" v-show="infoShow">
      <div class="shuiqingHeader">
        <span>企业详细信息</span>
        <i class="iconfont ymq-iconguanbi1" style="cursor: pointer" @click="close"></i>
      </div>
      <div style="padding: 0.1rem">
        <el-row style="margin-top:5px">
          <span style="color:#409EFF">企业名称：</span>
          <p> {{list.companyName }}</p>
        </el-row>
        <el-row style="margin-top:5px">
          <span style="color:#409EFF">企业地址：</span>
          <p> {{list.address }}</p>
        </el-row>
        <el-row style="margin-top:5px">
          <span style="color:#409EFF">取水许可证号：</span>
          <p> {{list.getWaterNumber }}</p>
        </el-row>
        <el-row style="margin-top:5px">
          <span style="color:#409EFF">取水许可证有效期至：</span>
          <p> {{list.endTime }}</p>
        </el-row>
        <el-row style="margin-top:5px">
          <span style="color:#409EFF">取水许可证状态：</span>
          <i v-show="list.color == 'yellow'" class="iconfont ymq-iconwarning" style="color:#E6A23C"></i>
          <i  v-show="list.color == 'green'"  class="iconfont ymq-iconwarning" style="color:#67c23a"></i>
          <i  v-show="list.color == 'red'" class="iconfont ymq-iconwarning" style="color:#F56C6C"></i>
        </el-row>
      </div>
    </div>
<!--    <div class="box-card">-->
<!--      <div class="check-div">-->
<!--        <el-checkbox v-model="checkBengzhan" @change="changeBengZhan">-->
<!--          <span class="check-text">泵站</span>-->
<!--        </el-checkbox>-->
<!--      </div>-->
<!--      <div class="check-div">-->
<!--        <el-checkbox v-model="checkShuichang" @change="changeShuichang">-->
<!--          <span class="check-text">水厂</span>-->
<!--        </el-checkbox>-->
<!--      </div>-->
<!--      <div class="check-div">-->
<!--        <el-checkbox v-model="checkcompany">-->
<!--          <span class="check-text">企业用户</span>-->
<!--        </el-checkbox>-->
<!--      </div>-->
<!--  </div>-->
  </div>
</template>

<script>
import {enterpriseInfo,querycompany} from "@/api/index"
export default {
  name: "index",
  data(){
    return {
      myMap: "",
      config: {},
      infoShow:false,
      list:{},
      icon2: {
        // 图标类型，现阶段只支持 image 类型
        type: 'image',
        // 图片 url
        image: require('@/assets/company.png'),
        // 图片尺寸
        size: [30, 30],
        // 图片相对 position 的锚点，默认为 bottom-center
        anchor: 'center',
      },
      icon3: {
        // 图标类型，现阶段只支持 image 类型
        type: 'image',
        // 图片 url
        image: require('@/assets/shuiku.png'),
        // 图片尺寸
        size: [30, 30],
        // 图片相对 position 的锚点，默认为 bottom-center
        anchor: 'center',
      },
      textStyle3: {
        fontSize: 12,
        fontWeight: 'normal',
        fillColor: '#1890ff',
        // strokeColor: '#fff',
        // strokeWidth: 1,
        fold: true,
        padding: '2, 5',
      },
      textStyle2: {
        fontSize: 12,
        fontWeight: 'normal',
        fillColor: '#04F1B2',
        // strokeColor: '#fff',
        // strokeWidth: 1,
        fold: true,
        padding: '2, 5',
      },
      LabelsData: [],
      LabelsData2: [],
    }

  },
  mounted() {

    // this.baiduMap()
    this.initMap()
    this.getcompany()
    this.getShuiKu()
  },
  methods:{
    initMap() {
      var map = new AMap.Map("myMap", {
        viewMode: "3D",
        zoom: 11,
        center: [120.355782, 36.483287],
        resizeEnable: true,
      });
      this.myMap = map;
      var styleName = "amap://styles/darkblue";
      this.myMap.setMapStyle(styleName);
    },
    getShuiKu() {
      var rows = [{
        pumpName: '石棚水库',
        longitude: '120.46146154403687',
        latitude: '36.365647315979004'
      },
        {
          pumpName: '宋化泉水库',
          longitude: '120.42642116546631',
          latitude: '36.46435260772705'
        },
        {
          pumpName: '挪城水库',
          longitude: '120.23274421691895',
          latitude: '36.42765998840332'
        },
        {
          pumpName: '王圈水库',
          longitude: '120.60975551605225',
          latitude: '36.47765636444092'
        },
      ]
      for (var i =0; i<rows.length; i++) {
        var data =  {
          name: '',
          position: [],
          zooms: [10, 20],
          opacity: 1,
          zIndex: 16,
          icon: this.icon3,
          text: {
            content: '',
            direction: 'right',
            offset: [0, -5],
            style: this.textStyle3
          }
        }
        var item = rows[i]
        data.name = item.pumpName
        data.position[0] = item.longitude
        data.position[1] = item.latitude
        data.text.content = item.pumpName
        this.LabelsData2.push(data)
      }
      var markers = [];
      var allowCollision = true;
      var layer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 1000,
        // collision: false,
        // 设置 allowCollision：true，可以让标注避让用户的标注
        allowCollision,
      });
      layer.add(markers);
      // 图层添加到地图
      this.myMap.add(layer);

      // 初始化 labelMarker
      for (let i = 0; i < this.LabelsData2.length; i++) {
        var curData = this.LabelsData2[i];
        curData.extData = {
          index: i
        };

        var labelMarker = new AMap.LabelMarker(curData);

        markers.push(labelMarker);

      }
      // 将 marker 添加到图层
      layer.add(markers);
      // this.bzLayer3 = layer
      // this.bzMarkers3 = markers
      console.log(markers)
      // this.myMap.setFitView(null, false, [100, 150, 10,10], 11);
      // console.log(this.LabelsData)

    },
    getcompany(){
      enterpriseInfo().then((res) => {
        console.log('res',res)
        for (var i =0; i<res.data.rows.length; i++) {
          var item = res.data.rows[i]
          var icon2 = {
            // 图标类型，现阶段只支持 image 类型
            type: 'image',
            // 图片 url
            image: '',
            // 图片尺寸
            size: [30, 30],
            // 图片相对 position 的锚点，默认为 bottom-center
            anchor: 'center',
          }
          var textStyle2 = {
            fontSize: 12,
            fontWeight: 'normal',
            fillColor: '#04F1B2',
            // strokeColor: '#fff',
            // strokeWidth: 1,
            fold: true,
            padding: '2, 5',
          }
          if (item.status === '1') {
            icon2.image = require('@/assets/green.png')
            textStyle2.fillColor = '#04F1B2'
          } else if (item.status === '2') {
            icon2.image = require('@/assets/yellow.png')
            textStyle2.fillColor = '#f4ea2a'
          } else {
            icon2.image = require('@/assets/red.png')
            textStyle2.fillColor = '#d81e06'
          }
          var data =  {
            name: '',
            extData:'',
            position: [],
            zooms: [10, 20],
            opacity: 1,
            zIndex: 16,
            icon: icon2,
            text: {
              content: '',
              direction: 'right',
              offset: [0, -5],
              style: textStyle2
            }
          }

          data.name = item.companyName
          // console.log(item.id)
          data.id = item.id
          // console.log('data.id',data.id)
          // console.log('经纬度',item.longitudeLatitude.split(",")[0])
          data.position[0] = item.longitudeLatitude.split(",")[0]
          data.position[1] = item.longitudeLatitude.split(",")[1]
          data.text.content = item.companyName
          this.LabelsData.push(data)
        }
        var markers = [];
        var allowCollision = true;
        var layer = new AMap.LabelsLayer({
          zooms: [3, 20],
          zIndex: 1000,
          // collision: false,
          // 设置 allowCollision：true，可以让标注避让用户的标注
          allowCollision,
        });
        layer.add(markers);
        // 图层添加到地图
        this.myMap.add(layer);

        // 初始化 labelMarker
        for (let i = 0; i < this.LabelsData.length; i++) {
          var curData = this.LabelsData[i];
          curData.extData = {
            index: i
          };

          var labelMarker = new AMap.LabelMarker(curData);
          // console.log('??',labelMarker)
          markers.push(labelMarker);
          this.clickon(labelMarker)
        }
        // 将 marker 添加到图层
        layer.add(markers);
        // this.bzLayer2 = layer
        // this.bzMarkers2 = markers
        console.log(markers)
        // this.myMap.setFitView(null, false, [100, 150, 10,10], 14);
      })
      // console.log(this.LabelsData)
    },
    // getcompany(){
    //   enterpriseInfo().then((res) => {
    //     console.log('res',res)
    //     for (var i =0; i<res.data.rows.length; i++) {
    //       var data =  {
    //         name: '',
    //         id:'',
    //         position: [],
    //         zooms: [3, 20],
    //         opacity: 1,
    //         zIndex: 16,
    //         icon: this.icon3,
    //         text: {
    //           content: '',
    //           direction: 'right',
    //           offset: [0, -5],
    //           style: this.textStyle3
    //         }
    //       }
    //       var item = res.data.rows[i]
    //       data.name = item.companyName
    //       data.id = item.id
    //       // console.log('经纬度',item.longitudeLatitude.split(",")[0])
    //       data.position[0] = item.longitudeLatitude.split(",")[0]
    //       data.position[1] = item.longitudeLatitude.split(",")[1]
    //       data.text.content = item.companyName
    //       this.LabelsData.push(data)
    //     }
    //     var markers = [];
    //     var allowCollision = true;
    //     var layer = new AMap.LabelsLayer({
    //       zooms: [3, 20],
    //       zIndex: 1000,
    //       // collision: false,
    //       // 设置 allowCollision：true，可以让标注避让用户的标注
    //       allowCollision,
    //     });
    //     layer.add(markers);
    //     // 图层添加到地图
    //     this.myMap.add(layer);
    //
    //     // 初始化 labelMarker
    //     for (let i = 0; i < this.LabelsData.length; i++) {
    //       var curData = this.LabelsData[i];
    //       curData.extData = {
    //         index: i
    //       };
    //
    //       var labelMarker = new AMap.LabelMarker(curData);
    //
    //       markers.push(labelMarker);
    //       this.clickon(labelMarker);
    //
    //     }
    //     // 将 marker 添加到图层
    //     layer.add(markers);
    //     // this.bzLayer3 = layer
    //     // this.bzMarkers3 = markers
    //     console.log(markers)
    //     this.myMap.setFitView(null, false, [100, 150, 10,10], 11);
    //   })
    //   // console.log(this.LabelsData)
    // },
    clickon(labelMarker){
        labelMarker.on('click',this.getinfo)
    },
    getinfo(e){
      this.infoShow = true
      querycompany(e.target._originOpts.id).then(res => {
        console.log('res1',res)
        this.list = res.data.data
        console.log('list',this.list)
      })
    },
    close(){
      this.infoShow = false
    }

  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 90vh;
}
#myMap {
  width: 100%;
  height: 90vh;
}
.box-card {
  /*width: 1.5rem;*/
  /*height: 2rem;*/
  background-color: rgba(0,0,0,0.5);
  /*left: 2%;*/
  /*bottom: 4%;*/
  left: 26%;
  bottom: 40%;
  border-radius: 0.2rem;
  padding: 0.2rem 0.2rem;
  position: absolute;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
}
.check-text {
  color: white;
}
.check-div {
  width: 100%;
  margin-bottom: 10px;
}
.el-checkbox__inner {
  width: 0.1rem;
  height: 0.1rem;
}
.shuiqingCard {
  width: 300px;
  height: 400px;
  background-color: rgba(255,255,255, 0.9);
  position: absolute;
  top: 40%;
  left: 80%;
  transform: translate(-50%, -50%);
  border-radius: 0.1rem;
  overflow: hidden;
}
.shuiqingHeader {
  height: 30px;
  background: #56CCF2;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #2F80ED, #56CCF2);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  line-height: 30px;
  padding-right: 3px;
  padding-left: 3px;
}
/*.shuiqingHeader span{*/
/*  font-size: 0.2rem;*/
/*}*/
.shuiqingHeader i {
  float: right;
  margin-right: 10px;
  font-size: 10px;
}
</style>

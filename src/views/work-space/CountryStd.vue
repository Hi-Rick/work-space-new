<template>
<div class="center">
  <el-row >
    <span style="font-size: 18px;color: #606266;font-weight: 700;margin-right: 10px">地下水质量分类及质量分类指标:</span>
    <ul>
      <div style="font-size: 14px;color: #606266;margin-bottom: 10px">
        <span >依据我国地下水水质现状、人体健康基准值及地下水质量保护目标，并参照了生活饮用水、工业、农业用水水质最高要求，将地下水质量划分为五类。</span>
      </div>
      <li style="font-size: 14px;color: #606266;margin-bottom: 10px">Ⅰ类 主要反映地下水化学组分的天然低背景含量。适用于各种用途。</li>
      <li style="font-size: 14px;color: #606266;margin-bottom: 10px">Ⅱ类 主要反映地下水化学组分的天然背景含量。适用于各种用途。</li>
      <li style="font-size: 14px;color: #606266;margin-bottom: 10px">Ⅲ类 以人体健康基准值为依据。主要适用于集中式生活饮用水水源及工、农业用水。</li>
      <li style="font-size: 14px;color: #606266;margin-bottom: 10px">Ⅳ类 以农业和工业用水要求为依据。除适用于农业和部分工业用水外，适当处理后可作生活饮用水。</li>
      <li style="font-size: 14px;color: #606266;margin-bottom: 10px">Ⅴ类 不宜饮用，其他用水可根据使用目的选用。</li>
    </ul>
  </el-row>
  <el-row style="margin-top: 15px">
    <el-table :data="List">
      <el-table-column type="index" width="50"/>

        <el-table-column label="项目" align="center" prop="sub" />
      <el-table-column label="类别 / 标准值" align="center" >
    <el-table-column label="Ⅰ类" align="center" prop="fir"/>
      <el-table-column label="Ⅱ类" align="center" prop="sec"/>
      <el-table-column label="Ⅲ类" align="center" prop="third" :show-overflow-tooltip="true"/>
      <el-table-column label="Ⅳ类" align="center" prop="four"/>
      <el-table-column label="Ⅴ类" align="center" prop="five"/>
      </el-table-column>
<!--      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>-->
<!--          <el-button v-if="scope.row.userId !== 1" size="mini" type="text" icon="el-icon-delete"-->
<!--                     @click="handleDelete(scope.row)">删除-->
<!--          </el-button>-->
<!--          &lt;!&ndash;              <el-button size="mini" type="text" icon="el-icon-key" @click="handleResetPwd(scope.row)"&ndash;&gt;-->
<!--          &lt;!&ndash;                        >重置&ndash;&gt;-->
<!--          &lt;!&ndash;              </el-button>&ndash;&gt;-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
  </el-row>

</div>
</template>

<script>
export default {
name: "CountryStd",
  data(){
  return{
    List:[
      {
        sub:'色(度)',
        fir:'≤5',
        sec:'≤5',
        third:'≤15',
        four:'≤25',
        five:'>25',
    }, {
        sub:'嗅和味',
        fir:'无',
        sec:'无',
        third:'无',
        four:'无',
        five:'有',
      }, {
        sub:'浑浊度(度)',
        fir:'≤3',
        sec:'≤3',
        third:'≤3',
        four:'≤10',
        five:'>10',
      }, {
        sub:'肉眼可见物',
        fir:'无',
        sec:'无',
        third:'无',
        four:'无',
        five:'有',
      }, {
        sub:'pH',
        fir:'<5.5',
        sec:'5.5～6.5',
        third:'6.5～8.5',
        four:'8.5～9',
        five:'>9',
      }, {
        sub:'总硬度(以CaCO3,计)(mg/L)',
        fir:'≤150',
        sec:'≤300',
        third:'≤450',
        four:'≤550',
        five:'>550',
      }, {
        sub:'溶解性总固体(mg/L)',
        fir:'≤300',
        sec:'≤500',
        third:'≤1000',
        four:'≤2000',
        five:'>2000',
      }, {
        sub:'硫酸盐(mg/L)',
        fir:'≤50',
        sec:'≤150',
        third:'≤250',
        four:'≤350',
        five:'>350',
      }, {
        sub:'氯化物(mg/L)',
        fir:'≤50',
        sec:'≤150',
        third:'≤250',
        four:'≤350',
        five:'>350',
      },{
        sub:'挥发性酚类(以苯酚计)(mg/L)',
        fir:'≤0.001',
        sec:'≤0.001',
        third:'≤0.002',
        four:'≤0.01',
        five:'>0.01',
      },
    ]

  }
  },

}
</script>

<style scoped>
.center{
  margin: 10px 0 0 10px;
}
</style>

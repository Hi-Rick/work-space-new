<template>
  <div class="app-container">
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="4" :xs="24">-->
<!--        <div class="head-container" style="margin-bottom: 0.5rem">-->
<!--          &lt;!&ndash;          <el-input v-model="filterText" placeholder="查询监测单位" clearable size="small" prefix-icon="el-icon-search"&ndash;&gt;-->
<!--          &lt;!&ndash;          />&ndash;&gt;-->
<!--          <span style="font-size: 16px;color: #606266;font-weight: 700;">工程设计单位：</span>-->
<!--          &lt;!&ndash;                    <el-col :span="1.5">&ndash;&gt;-->
<!--          &lt;!&ndash;          <el-button icon="el-icon-plus" size="mini" @click="addTree" plain round>新增</el-button>&ndash;&gt;-->
<!--          &lt;!&ndash;          </el-col>&ndash;&gt;-->
<!--        </div>-->
<!--        <div class="head-container">-->
<!--          &lt;!&ndash;          <ul style="font-size: 14px;color: #606266;">&ndash;&gt;-->
<!--          &lt;!&ndash;            <li style="margin-bottom: 0.5rem" v-for="(item,index) in deptOptions" :key="index" @click="filterNode(item)">{{item.designUnit}}</li>&ndash;&gt;-->
<!--          &lt;!&ndash;          </ul>&ndash;&gt;-->
<!--          <el-tree-->
<!--            class="filter-tree"-->
<!--            :data="deptOptions"-->
<!--            :props="defaultProps"-->
<!--            default-expand-all-->
<!--            :filter-node-method="filterNode"-->
<!--            @node-click="handleNodeClick"-->
<!--            ref="tree">-->
<!--          </el-tree>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="20" :xs="24">-->
        <div>
          <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">泵站代码</span>
          <el-input v-model="queryParams.pumpNameCode" placeholder="请输入泵站代码" clearable size="small"
                    style="width: 200px;margin-right: 30px"/>
          <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">水厂代码</span>
          <el-input v-model="queryParams.waterPlantCodeName" placeholder="请输入水厂代码" clearable size="small"
                    style="width: 200px;margin-right: 30px"/>
          <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">水库代码</span>
          <el-input v-model="queryParams.reservoirCodeName" placeholder="请输入水库代码" clearable size="small"
                    style="width: 200px;margin-right: 30px"/>
<!--          <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">水厂代码</span>-->
<!--          <el-select v-model="queryParams.status" placeholder="请选择" style="margin-right: 40px">-->
<!--            <el-option-->
<!--              v-for="item in options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
          <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </div>

        <el-row :gutter="10" style="margin-top: 20px">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="addinfo">新增</el-button>
          </el-col>
          <!--          <el-col :span="1.5">-->
          <!--            <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single">修改</el-button>-->
          <!--          </el-col>-->
          <!--          <el-col :span="1.5">-->
          <!--            <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple">删除</el-button>-->
          <!--          </el-col>-->
          <!--          <el-col :span="1.5">-->
          <!--            <el-button type="info" icon="el-icon-upload2" size="mini">导入</el-button>-->
          <!--          </el-col>-->
          <el-col :span="1.5">
            <el-button :loading="downloadLoading" type="warning" icon="el-icon-download" size="mini"
                       @click="handleDownload">导出
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="projectList.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
          <el-table-column label="取样地点" align="center" prop="samplingLocation"/>
          <el-table-column label="取样时间" align="center" prop="samplingTime" :show-overflow-tooltip="true"/>
          <el-table-column label="检测单位" align="center" prop="monitoringUnit"/>
          <el-table-column label="质量情况" align="center" prop="quality">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.quality =='差'" type="danger">差</el-tag>
              <el-tag v-if="scope.row.quality =='良'" type="warning">良</el-tag>
              <el-tag v-if="scope.row.quality=='优'" type="success">优</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="检测结果" align="center" >
            <template slot-scope="scope">
              <el-button type="text" @click="viewDetail(scope.row)">查看详细</el-button>
            </template>
          </el-table-column>
          <el-table-column label="附件" align="center" prop="fileUrl" >
          </el-table-column>
          <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button v-if="scope.row.userId !== 1" size="mini" type="text" icon="el-icon-delete"
                         @click="handleDelete(scope.row)">删除
              </el-button>
              <!--              <el-button size="mini" type="text" icon="el-icon-key" @click="handleResetPwd(scope.row)"-->
              <!--                        >重置-->
              <!--              </el-button>-->
            </template>
          </el-table-column>
        </el-table>
<!--        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" style="text-align: center"/>-->
    <div style="text-align: center; margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10]"
        :total="projectList.length"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
<!--      </el-col>-->
<!--    </el-row>-->
    <div>
      <el-dialog :visible.sync="openinfo" :title="title">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="取样地点">
            <el-input v-model="form.samplingLocation"/>
          </el-form-item>
          <el-form-item label="取样时间">
            <el-col :span="11">
              <el-date-picker v-model="form.samplingTime" value-format=" yyyy-MM-dd " format="yyyy-MM-dd " type="date"
                              placeholder="选择日期" style="width: 60%;"/>
            </el-col>
          </el-form-item>
          <el-form-item label="检测单位">
            <el-input v-model="form.monitoringUnit"/>
          </el-form-item>
<!--          <el-form-item label="质量情况">-->
<!--            <el-input v-model="form.designUnitId"/>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="工程状态">-->
<!--            <el-select v-model="form.status" placeholder="请选择" style="margin-right: 40px">-->
<!--              <el-option-->
<!--                v-for="item in options"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="创建时间">-->
<!--            <el-col :span="11">-->
<!--              <el-date-picker v-model="form.createTime" value-format=" yyyy-MM-dd " format="yyyy-MM-dd " type="date"-->
<!--                              placeholder="选择日期" style="width: 60%;"/>-->
<!--            </el-col>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="更新时间">-->

<!--          </el-form-item>-->

        </el-form>
<!--        <el-row><span style="font-size: 14px;color: #606266;font-weight: 700;margin-left: 10px">检测结果</span></el-row>-->
        <el-row>
          <el-col :span="3">
            <span style="font-size: 14px;color: #606266;font-weight: 700;">水温:</span>
            <el-input v-model="form.waterTemperature" size="small"  />
          </el-col>
          <el-col :span="3">
            <span style="font-size: 14px;color: #606266;font-weight: 700;">ph值:</span>
            <el-input v-model="form.phValue" size="small"  />
          </el-col>
          <el-col :span="3">
            <span style="font-size: 14px;color: #606266;font-weight: 700;">电导率:</span>
            <el-input v-model="form.conductivity" size="small"  />
          </el-col>
          <el-col :span="3">
            <span style="font-size: 14px;color: #606266;font-weight: 700;">浊度:</span>
            <el-input v-model="form.turbidity" size="small"  />
          </el-col>
          <el-col :span="3">
            <span style="font-size: 14px;color: #606266;font-weight: 700;">溶解氧:</span>
            <el-input v-model="form.dissolvedOxygen" size="small"  />
          </el-col> <el-col :span="3">
          <span style="font-size: 14px;color: #606266;font-weight: 700;">总氮:</span>
          <el-input v-model="form.totalNitrogen" size="small"  />
        </el-col> <el-col :span="3">
          <span style="font-size: 14px;color: #606266;font-weight: 700;">氨氮:</span>
          <el-input v-model="form.ammoniaNitrogen" size="small"  />
        </el-col> <el-col :span="3">
          <span style="font-size: 14px;color: #606266;font-weight: 700;">化学需氧量:</span>
          <el-input v-model="form.chemicalOxygenDemand" size="small"  />
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <span style="font-size: 14px;color: #606266;font-weight: 700;">氟化物:</span>
            <el-input v-model="form.fluoride" size="small"  />
          </el-col>
          <el-col :span="3">
            <span style="font-size: 14px;color: #606266;font-weight: 700;">叶绿素:</span>
            <el-input v-model="form.chlorophyll" size="small"  />
          </el-col>
          <el-col :span="3">
            <span style="font-size: 14px;color: #606266;font-weight: 700;">挥发酚:</span>
            <el-input v-model="form.volatilePhenol" size="small"  />
          </el-col>
          <el-col :span="3">
            <span style="font-size: 14px;color: #606266;font-weight: 700;">总有机碳:</span>
            <el-input v-model="form.totalOrganicCarbon" size="small"  />
          </el-col>
          <el-col :span="3">
            <span style="font-size: 14px;color: #606266;font-weight: 700;">总磷:</span>
            <el-input v-model="form.totalPhosphorus" size="small"  />
          </el-col> <el-col :span="3">
          <span style="font-size: 14px;color: #606266;font-weight: 700;">硝酸盐氮:</span>
          <el-input v-model="form.nitrateNitrogen" size="small"  />
        </el-col>
<!--          <el-col :span="3">-->
<!--          <span style="font-size: 14px;color: #606266;font-weight: 700;">氨氮:</span>-->
<!--          <el-input v-model="form.ammoniaNitrogen" size="small"  />-->
<!--        </el-col> -->
          <el-col :span="3">
          <span style="font-size: 14px;color: #606266;font-weight: 700;">高锰酸盐指数:</span>
          <el-input v-model="form.permanganateIndex" size="small"  />
        </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openinfo = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
<div>
  <el-dialog title="检测结果" :visible.sync="detailFlag" width="800px">
    <el-table :data="gridData">
      <el-table-column prop="waterTemperature" label="水温"></el-table-column>
      <el-table-column prop="phValue" label="ph值" ></el-table-column>
      <el-table-column prop="conductivity" label="电导率"></el-table-column>
      <el-table-column prop="turbidity" label="浊度"></el-table-column>
      <el-table-column prop="dissolvedOxygen" label="溶解氧" ></el-table-column>
      <el-table-column prop="permanganateIndex" label="高锰酸盐指数"></el-table-column>
      <el-table-column prop="chemicalOxygenDemand" label="化学需氧量"></el-table-column>
      <el-table-column prop="totalNitrogen" label="总氮" ></el-table-column>
    </el-table>
    <el-table :data="gridData">
      <el-table-column prop="ammoniaNitrogen" label="氨氮"></el-table-column>
      <el-table-column prop="nitriteNitrogen" label="亚硝酸盐氮" ></el-table-column>
      <el-table-column prop="nitrateNitrogen" label="硝酸盐氮"></el-table-column>
      <el-table-column prop="totalPhosphorus" label="总磷"></el-table-column>
      <el-table-column prop="totalOrganicCarbon" label="总有机碳" ></el-table-column>
      <el-table-column prop="volatilePhenol" label="挥发酚"></el-table-column>
      <el-table-column prop="chlorophyll" label="叶绿素" ></el-table-column>
      <el-table-column prop="fluoride" label="氟化物"></el-table-column>
    </el-table>
<!--    <el-table :data="gridData">-->
<!--      <el-table-column property="date" label="日期" width="150"></el-table-column>-->
<!--      <el-table-column property="name" label="姓名" width="200"></el-table-column>-->
<!--      <el-table-column property="address" label="地址"></el-table-column>-->
<!--    </el-table>-->
  </el-dialog>
</div>

  </div>
</template>

<script>
import {
  getDesignList,
  getQualityExport,
  getWaterList,
  addquality,
  updatequality,
  deleteWaterQuality,
  getqualitylist
} from '@/api/index'
import pagination from "@/components/Pagination/index"
import {parseTime} from "@/utils";

export default {
  components: {pagination},
  data() {
    return {
      deptOptions: undefined,
      detailFlag:false,
      defaultProps: {
        children: " ",
        value: "designUnitId",
        label: "designUnit",
      },
      downloadLoading: false,
      openinfo: false,

      filterText: '',
      title: '',
      form: {},
      single: true,
      multiple: true,
      projectList: [],
      loading: true,
      currentPage: 1,
      pageSize: 5,
      queryParams: {
        pumpNameCode:undefined,
        waterPlantCodeName:undefined,
        reservoirCodeName:undefined,
      },
      total: 0,
      gridData: [],
      gridData2: [],
      options: [{
        value: '立项阶段',
        label: '立项阶段'
      }, {
        value: '招标阶段',
        label: '招标阶段'
      }, {
        value: '施工阶段',
        label: '施工阶段'
      }],
      value: '',
      data: [{
        id: 1,
        label: '水资源科',
        children: [{
          id: 4,
          label: '办公厅',
          children: [{
            id: 9,
            label: '1号'
          }, {
            id: 10,
            label: '2号'
          }]
        }]
      }, {
        id: 2,
        label: '水文水资源勘探局',
        children: [{
          id: 5,
          label: '办公厅'
        }, {
          id: 6,
          label: '人事司'
        }]
      }, {
        id: 3,
        label: '财务审计科',
        children: [{
          id: 7,
          label: '财务司'
        }, {
          id: 8,
          label: '人事司'
        }]
      },
        {
          id: 3,
          label: '水政监察大队',
          children: [{
            id: 7,
            label: '一队'
          }, {
            id: 8,
            label: '二队'
          }]
        }],
    };
  },
  mounted() {
    this.getTree()
    this.getlist()
  },
  // watch: {
  //   filterText(val) {
  //     this.$refs.tree.filter(val);
  //   }
  // },

  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    reset() {
      this.form = {
        waterQualityId: undefined,
        waterTemperature: undefined,
        phValue: undefined,
        conductivity: undefined,
        turbidity: undefined,
        samplingLocation: undefined,
        samplingTime: undefined,
        monitoringUnit: undefined,
        fileUrl: undefined,
        dissolvedOxygen: undefined,
        permanganateIndex: undefined,
        quality: undefined,
        chemicalOxygenDemand: undefined,
        totalNitrogen: undefined,
        ammoniaNitrogen: undefined,
        nitriteNitrogen: undefined,
        nitrateNitrogen: undefined,
        totalPhosphorus: undefined,
        totalOrganicCarbon: undefined,
        volatilePhenol: undefined,
        chlorophyll: undefined,
        fluoride: undefined,
        arsenic: undefined,
        mercury: undefined,
        hexavalentChromium: undefined,
        copper: undefined,
        lead: undefined,
        cadmium: undefined,
        zinc: undefined,
        antimony: undefined,
        pumpNameCode: undefined,
        waterPlantCodeName: undefined,
        reservoirCodeName: undefined,
      };
    },
    viewDetail(row){
      console.log('table',row)
      this.detailFlag = true
      this.gridData[0] = row
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    handleNodeClick(data) {
      this.queryParams.designUnitId = data.designUnitId;
      this.getlist();
    },
    addinfo() {
      this.reset();
      this.title = "添加水质信息";
      this.openinfo = true
    },

    getTree() {
      getDesignList().then(res => {
        this.deptOptions = res.rows;
        console.log(this.deptOptions)
      })
    },
    handleQuery() {
      // console.log('status', this.queryParams.status)
      // this.queryParams.page = 1;
      getqualitylist(this.queryParams).then(res => {
        console.log('',res)
        this.projectList = res.data.rows
        this.total = res.data.total
        this.loading = false
      })
    },
    getlist() {
      this.loading = true
      getWaterList(this.queryParams).then(response => {
        console.log('res',response)
        this.projectList = response.data.rows
        this.total = response.data.total
        this.loading = false
        // console.log(this.resourceList)
      })

    },
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有用户数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return getQualityExport()
        })
        .then((response) => {
          // console.log(response.msg)
          window.open(response.msg);
        })
        .catch(function () {
        });
    },
    resetQuery() {
      // this.dateRange = [];
      // this.resetForm("queryForm");
      this.queryParams.pumpNameCode = undefined
      this.queryParams.waterPlantCodeName = undefined
      this.queryParams.reservoirCodeName = undefined

      this.getlist()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['取样地点', '取样时间', '检测单位', '质量情况', '检测结果']
        const filterVal = ['samplingLocation', 'samplingTime', 'monitoringUnit', 'quality']
        const list = this.projectList
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    handleUpdate(row) {
      this.reset()
      this.form = row,
        console.log('form',this.form)
        this.openinfo = true;
      this.title = "修改水质信息";
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleDelete(row) {

      const name = row.samplingLocation;
      this.$confirm(
        '是否确认删除"' + name + '"的水质信息?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(function () {
        console.log('id',row.waterQualityId)
        return  deleteWaterQuality(row.waterQualityId);
      })
        .then(() => {

          this.$message({
            type: "success",
            message: "删除成功"
          })
          this.getlist();
        })
        .catch(function () {});
    },
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.waterQualityId != undefined) {
            updatequality(this.form).then((response) => {
              if (response.data.code === 200) {
                this.msgSuccess("修改成功");
                this.openinfo = false;
                this.getlist();
              }
            });
          } else {
            addquality(this.form).then((response) => {
              if (response.data.code === 200) {
                this.msgSuccess("新增成功");
                this.openinfo = false;
                this.getlist();
              }
            });
          }
        }
      });
    },

  },


}
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;

}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>


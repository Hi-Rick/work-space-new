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
      <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">工程名称</span>
      <el-input v-model="queryParams.pumpNameCode" placeholder="请输入工程名称" clearable size="small"
                style="width: 200px;margin-right: 30px"/>
      <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">承建单位</span>
      <el-input v-model="queryParams.waterPlantCodeName" placeholder="请输入承建单位" clearable size="small"
                style="width: 200px;margin-right: 30px"/>
      <!--      <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">所属区域</span>-->
      <!--      <el-input v-model="queryParams.reservoirCodeName" placeholder="请输入所属区域" clearable size="small"-->
      <!--                style="width: 200px;margin-right: 30px"/>-->
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

    <el-table v-loading="loading" :data="comdata">
      <el-table-column label="工程名称" align="center" prop="name"/>
      <el-table-column label="合同" align="center" prop="sub"/>
      <el-table-column label="签订日期" align="center" prop="date"/>
      <el-table-column label="承建单位名称" align="center" prop="teluser" :show-overflow-tooltip="true"/>
<!--      <el-table-column label="地址" align="center" prop="adress"/>-->
      <el-table-column label="联系人" align="center" >
        <el-table-column label="项目经理" align="center" prop="people"/>
        <!--        <template slot-scope="scope">-->
        <!--          <el-tag v-if="scope.row.status =='施工阶段'" type="danger">差</el-tag>-->
        <!--          <el-tag v-if="scope.row.status ==''" type="warning">良</el-tag>-->
        <!--          <el-tag v-if="scope.row" type="success">优</el-tag>-->
        <!--        </template>-->

      <el-table-column label="安全负责人" align="center"  prop="safe">
        <!--        <template slot-scope="scope">-->
        <!--          <el-button type="text" @click="viewDetail(scope.row)">查看详细</el-button>-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column label="质量负责人" align="center" prop="quality" width="150">
        <template slot-scope="scope">
            <span>{{ scope.row.quality}}</span>
            <el-button style="margin-left: 10px" type="text" size="mini" @click="viewinfo(scope.row)">查看信息</el-button>
        </template>

      </el-table-column>
      </el-table-column>
<!--      <el-table-column label="招标公告时间" align="center" prop="time"/>-->
<!--      <el-table-column label="招标控制价格" align="center" prop="usewater"/>-->
      <el-table-column label="操作" align="center" width="150"  class-name="small-padding fixed-width">
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
      <el-table-column label="点击完成施工" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="danger"  @click="shigong(scope.row)">施工</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" style="text-align: center"/>

    <!--      </el-col>-->
    <!--    </el-row>-->
    <div>
      <el-dialog :visible.sync="openinfo" :title="title">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="工程名称">
            <el-input v-model="form.projectName"/>
          </el-form-item>
          <el-form-item label="合同">
            <el-input v-model="form.projectName"/>
          </el-form-item>
          <el-form-item label="签订日期">
            <el-input v-model="form.projectName"/>
          </el-form-item>
          <!--          <el-form-item label="取样时间">-->
          <!--            <el-col :span="11">-->
          <!--              <el-date-picker v-model="form.updateTime" value-format=" yyyy-MM-dd " format="yyyy-MM-dd " type="date"-->
          <!--                              placeholder="选择日期" style="width: 60%;"/>-->
          <!--            </el-col>-->
          <!--          </el-form-item>-->
          <el-form-item label="承建单位名称">
            <el-input v-model="form.designScheme"/>
          </el-form-item>
          <el-form-item label="项目经理">
            <el-input v-model="form.designUnitId"/>
          </el-form-item>
          <el-form-item label="安全负责人">
            <el-input v-model="form.safe"/>
          </el-form-item>
          <el-form-item label="质量负责人">
            <el-input v-model="form.quality"/>
          </el-form-item>
<!--          <el-form-item label="招标公告时间">-->
<!--            <el-input v-model="form.num"/>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="招标控制价格">-->
<!--            <el-input v-model="form.num"/>-->
<!--          </el-form-item>-->
        </el-form>
        <!--        <el-row><span style="font-size: 14px;color: #606266;font-weight: 700;margin-left: 10px">检测结果</span></el-row>-->

        <div slot="footer" class="dialog-footer">
          <el-button @click="openinfo = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="detailVisible" title="质量负责人信息">
        <el-row :gutter="20" style="padding-top: 10px">
          <el-col :span="12">
            <span style="font-weight: bolder">姓名：</span>
            <span>{{info.quality}}</span>
          </el-col>
          <el-col :span="12">
            <div class="biaoqian">
              <span style="font-weight: bolder">性别：</span>
              <span>{{info.quality_sex}}</span>
            </div>
          </el-col>
          <!--          <el-col :span="8">-->
          <!--            <div class="biaoqian">-->
          <!--              <span style="font-weight: bolder">会议时间：</span>-->
          <!--              <span>{{}}</span>-->
          <!--            </div>-->
          <!--          </el-col>-->
        </el-row>
        <el-row :gutter="20" style="padding-top: 10px">
          <el-col :span="12">
            <div class="biaoqian">
              <span style="font-weight: bolder">身份证号码：</span>
              <span>xxxxxxxxxxxx</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="biaoqian">
              <span style="font-weight: bolder">联系方式：</span>
              <span>{{info.tel}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="padding-top: 10px">
          <el-col :span="12">
          <div class="biaoqian">
            <span style="font-weight: bolder">资格证书：</span>
            <img src="@/assets/info.jpg">
          </div>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getAllAsset,
  getTreeList,
  getDesignList,
  getProjectList,
  getQualityExport,
  addProjectList,
  updateProjectList,
  deleteProjectList,
  getWaterList
} from '@/api/index'
import pagination from "@/components/Pagination/index"
import {parseTime} from "@/utils";

export default {
  components: {pagination},
  data() {
    return {
      deptOptions: undefined,
      detailFlag:false,
      detailVisible:false,
      comdata:[
        {
          name:'七口水库安全改造工程',
          sub:'七口水库合同',
          teluser:'山东造业承建公司 ',
          adress:'即墨区45号',
          date:'2020-11-2',
          people:'王宁',
          tel:'13455667843',
          num:'JDJA234',
          time:'一年',
          usewater:'100',
          safe:' 郭雨晨',
          quality:'张惠安',
          quality_sex:'男',
          quality_id:'',
        },
        {
          date:'2020-9-21',
          name:'小桥水库水利工程',
          sub:'未上传',
          teluser:'青岛招大分公司',
          adress:'即墨区102号',
          people:'李强',
          tel:'张宁',
          num:'王思',
          time:'一年',
          usewater:'156',
          safe:' 张广慧 ',
          quality:'齐八旺',
          quality_sex:'男',
        },
        {
          date:'',
          name:'院西水库水利工程',
          sub:'未上传',
          teluser:'山东招大施工公司',
          adress:'即墨区55号',
          people:'黎明',
          tel:'李宁',
          num:'张级',
          time:'一年',
          usewater:'34',
          safe:' 刘广辉',
          quality:' 陈玉找',
          quality_sex:'男',
        },
        {
          date:'2020-11-2',
          name:'石鹏水库设备改造工程',
          sub:'石鹏水库合同',
          teluser:'华北光华施工公司',
          adress:'即墨区2号',
          people:'理宁',
          tel:'甲四号',
          num:'王朝',
          time:'一年',
          usewater:'66',
          safe:' 赵浴辰 ',
          quality:'惠冠章',
          quality_sex:'男',
        },
        {
          date:'',
          name:'即墨水利1号项目',
          sub:'未上传',
          teluser:'青岛利华施工公司',
          adress:'即墨区45号',
          people:' 王柏琦',
          tel:'李四',
          num:'六三',
          time:'一年',
          usewater:'33',
          safe:'  刘晨旭 ',
          quality:'安孟靓',
          quality_sex:'男',
        },
        {
          date:'',
          name:'即墨水井改造',
          sub:'未上传',
          teluser:'即墨研华承建公司',
          adress:'即墨区45号',
          people:' 张安红',
          tel:'13455667843',
          num:'漳扎',
          time:'张超',
          usewater:'100',
          safe:' 梁蒙岸',
          quality:' 金安晨',
          quality_sex:'女',
        },

      ],
      defaultProps: {
        children: " ",
        value: "designUnitId",
        label: "designUnit",
      },
      downloadLoading: false,
      openinfo: false,
      title: '',
      filterText: '',
      form: {},
      info:{},
      single: true,
      multiple: true,
      projectList: [],
      loading: true,
      pageSize: 10,
      pageNum: 1,
      queryParams: {
        reservoirCodeName:undefined,
        pumpNameCode:undefined,
        waterPlantCodeName:undefined,
        samplingLocation: undefined,
        samplingTime: undefined,
        monitoringUnit: undefined,
        quality: undefined,
        fileUrl: undefined
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
    reset() {
      this.form = {
        id:undefined,
        projectName: undefined,
        projectOverview: undefined,
        designScheme: undefined,
        designUnit: undefined,
        budget: undefined,
        status: undefined,
        createTime: undefined,
        updateTime: undefined,
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
    shigong(row){
      const name = row.name;
      this.$confirm(
        '确认"' + name + '"工程施工完成并进入验收阶段?',
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
        }
      )
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
      this.title = "添加施工信息";
      this.openinfo = true
    },
    viewinfo(row){
      this.detailVisible = true
      this.info = row
    },
    getTree() {
      getDesignList().then(res => {
        this.deptOptions = res.rows;
        console.log(this.deptOptions)
      })
    },
    handleQuery() {
      // console.log('status', this.queryParams.status)
      this.queryParams.page = 1;
      this.getlist();
    },
    getlist() {
      this.loading = true
      getWaterList(this.queryParams).then(response => {
        console.log('res',response)
        this.projectList = response.rows
        this.total = response.total
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
      this.queryParams.projectName = ''
      this.queryParams.status = ''

      this.handleQuery();
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
      // this.reset()
      this.form = row,
        this.openinfo = true;
      this.title = "修改施工信息";
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
      const name = row.projectName;
      this.$confirm(
        '是否确认删除"' + name + '"的企业信息?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(function () {
        console.log('id',row.id)
        return deleteProjectList(row.id);
      })
        .then(() => {

          this.$message({
            type: "success",
            text: "删除成功"
          })
          this.getlist();
        })
        .catch(function () {});
    },
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateProjectList(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.openinfo = false;
                this.getlist();
              }
            });
          } else {
            addProjectList(this.form).then((response) => {
              if (response.code === 200) {
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



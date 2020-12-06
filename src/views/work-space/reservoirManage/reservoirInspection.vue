<template>
  <div class="app-container">
<!--    <div>-->
<!--      <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">事件名称</span>-->
<!--      <el-input v-model="queryParams.inspectionTitle" placeholder="请输入事件名称" clearable size="small"-->
<!--                style="width: 150px;margin-right: 30px"/>-->
<!--      &lt;!&ndash;      <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">用水类型</span>&ndash;&gt;-->
<!--      &lt;!&ndash;      <el-input v-model="queryParams.getWaterType" placeholder="请输入用水类型" clearable size="small"&ndash;&gt;-->
<!--      &lt;!&ndash;                style="width: 150px;margin-right: 30px"/>&ndash;&gt;-->
<!--      <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">事件状态</span>-->
<!--      <el-select v-model="queryParams.done" placeholder="请选择" clearable size="small"-->
<!--                 style="width: 150px;margin-right: 30px">-->
<!--        <el-option-->
<!--          v-for="item in optionsta"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--      <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
<!--      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
<!--    </div>-->

    <el-row :gutter="10" style="margin-top: 20px">
      <!--      <el-col :span="1.5">-->
      <!--        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addinfo">新增</el-button>-->
      <!--      </el-col>-->
      <!--          <el-col :span="1.5">-->
      <!--            <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single">修改</el-button>-->
      <!--          </el-col>-->
      <!--          <el-col :span="1.5">-->
      <!--            <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple">删除</el-button>-->
      <!--          </el-col>-->
      <!--          <el-col :span="1.5">-->
      <!--            <el-button type="info" icon="el-icon-upload2" size="mini">导入</el-button>-->
      <!--          </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button :loading="downloadLoading" type="warning" icon="el-icon-download" size="mini"-->
      <!--                   @click="handleDownload">导出-->
      <!--        </el-button>-->
      <!--      </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="comdata">
      <el-table-column label="事件名称" align="center" prop="inspectionTitle"/>
      <el-table-column label="巡查时间" align="center" prop="createTime"/>
      <el-table-column label="巡查内容" align="center" prop="inspectionDescribation"/>
      <!--      <el-table-column label="单位" align="center" prop="contactName" :show-overflow-tooltip="true"/>-->
      <!--      <el-table-column label="职务" align="center" prop="getWaterNumber"/>-->
      <!--      <el-table-column label="联系方式" align="center" prop="contactNumber"/>-->
      <el-table-column label="事件等级" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level=='1'"  style="color:#67c23a">一般</el-tag>
          <el-tag v-if="scope.row.level=='2'"  style="color:#E6A23C">紧急</el-tag>
          <el-tag v-if="scope.row.level=='3'"  style="color:#F56C6C">特急</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="归属部门" align="center" prop="organization"/>
<!--      <el-table-column label="后续工作" align="center" prop="yearTotal"/>-->
<!--      <el-table-column label="企业对接" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text"  @click="viewCompany()">查看详情</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="事件状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.done=='1'"  type="success">已处理</el-tag>
          <el-tag v-if="scope.row.done=='2'"  type="warning">未处理</el-tag>
          <!--          <i v-if="scope.row.color==='red'" class="iconfont ymq-iconwarning" style="color:#F56C6C"></i>-->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">审核</el-button>
          <!--          <el-button v-if="scope.row.userId !== 1" size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" style="text-align: center"/>
    <!--    <div>-->
    <!--      <el-dialog :visible.sync="openinfo" :title="title">-->
    <!--        <el-form ref="form" :model="form" label-width="100px">-->
    <!--          <el-form-item label="企业名称">-->
    <!--            <el-input v-model="form.projectName"/>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="地址">-->
    <!--            <el-input v-model="form.designScheme"/>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="用水户性质">-->
    <!--            <el-input v-model="form.projectName"/>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="法人">-->
    <!--            <el-input v-model="form.designUnitId"/>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="联系人">-->
    <!--            <el-input v-model="form.projectName"/>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="联系方式">-->
    <!--            <el-input v-model="form.tel"/>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="取水许可证号">-->
    <!--            <el-input v-model="form.num"/>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="期限">-->
    <!--            <el-input v-model="form.num"/>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="用水量">-->
    <!--            <el-input v-model="form.num"/>-->
    <!--          </el-form-item>-->
    <!--        </el-form>-->
    <!--        <div slot="footer" class="dialog-footer">-->
    <!--          <el-button @click="openinfo = false">取 消</el-button>-->
    <!--          <el-button type="primary" @click="submitForm">确 定</el-button>-->
    <!--        </div>-->
    <!--      </el-dialog>-->
    <!--    </div>-->
    <div>
      <el-dialog :visible.sync="openinfo" title="审核详情">
        <el-row :gutter="20" style="padding-top: 10px">
          <el-col :span="12">
            <span style="font-weight: bolder">事件名称：</span>
            <span>{{form.inspectionTitle}}</span>
          </el-col>
          <el-col :span="12">
            <div class="biaoqian">
              <span style="font-weight: bolder">巡查时间：</span>
              <span>{{form.createTime}}</span>
            </div>
          </el-col>
        </el-row>
        <!--        <el-row :gutter="20" style="padding-top: 10px">-->
        <!--          <el-col :span="12">-->
        <!--            <span style="font-weight: bolder">单位：</span>-->
        <!--            <span></span>-->
        <!--          </el-col>-->
        <!--          <el-col :span="12">-->
        <!--            <div class="biaoqian">-->
        <!--              <span style="font-weight: bolder">职务：</span>-->
        <!--              <span></span>-->
        <!--            </div>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
        <!--    <el-row :gutter="20" style="padding-top: 10px">-->
        <!--      <el-col :span="8">-->
        <!--        <div class="biaoqian">-->
        <!--          <span style="font-weight: bolder">开始时间：</span>-->
        <!--          <span>2000</span>-->
        <!--        </div>-->
        <!--      </el-col>-->
        <!--      <el-col :span="8">-->
        <!--        <div class="biaoqian">-->
        <!--          <span style="font-weight: bolder">结束时间：</span>-->
        <!--          <span>xxxxxx</span>-->
        <!--        </div>-->
        <!--      </el-col>-->
        <!--      <el-col :span="8">-->
        <!--        <div class="biaoqian">-->
        <!--          <span style="font-weight: bolder">证明人：</span>-->
        <!--          <span>王老师</span>-->
        <!--        </div>-->
        <!--      </el-col>-->
        <!--    </el-row>-->
        <el-divider />
        <h4>巡查内容</h4>
        <p>{{form.inspectionDescribation}}</p>
        <div>
          <!--      <el-row>-->
          <!--        <el-col :span="6">-->
          <!--          信息属实-->
          <!--        </el-col>-->
          <!--        <el-col :span="6">-->
          <!--          <span>审核时间：</span>-->
          <!--          <span>2019-12-04</span>-->
          <!--        </el-col>-->
          <!--        <el-col :span="6">-->
          <!--          <span>审核人：</span>-->
          <!--          <span>刘明至</span>-->
          <!--        </el-col>-->
          <!--        <el-col :span="5">-->
          <!--          <span>审核状态</span>-->
          <!--          <el-tag type="success" size="small">通过</el-tag>-->
          <!--        </el-col>-->
          <!--      </el-row>-->
        </div>
        <el-divider />
        <h4>巡查结果</h4>
        <p>{{form.result}}</p>
        <div>
          <!--      <el-row>-->
          <!--        <el-col :span="6">-->
          <!--          批准通过-->
          <!--        </el-col>-->
          <!--        <el-col :span="6">-->
          <!--          <span>审核时间：</span>-->
          <!--          <span>2019-12-04</span>-->
          <!--        </el-col>-->
          <!--        <el-col :span="6">-->
          <!--          <span>审核人：</span>-->
          <!--          <span>郭志</span>-->
          <!--        </el-col>-->
          <!--        <el-col :span="5">-->
          <!--          <span>审核状态</span>-->
          <!--          <el-tag type="success" size="small">通过</el-tag>-->
          <!--        </el-col>-->
          <!--      </el-row>-->
        </div>
        <el-divider />
        <div>
          <el-row style="padding-top: 10px">
            <span style="font-weight: bolder">重点水库管护中心意见</span>
          </el-row>
          <el-row style="padding-top: 10px">
            <el-input
              v-model="AuditingReason"
              :rows="4"
              type="textarea"
              placeholder="请输入内容"
            />
          </el-row>
        </div>
        <div class="foot">
                <span slot="footer" class="dialog-footer">
                  <el-button type="success" size="small" plain @click="viewDetail">审核完毕</el-button>
                  <!--                  <el-button type="danger" size="small" plain @click="pass">审核未通过</el-button>-->
<!--                  <el-button type="primary" size="small" plain @click="zhuanyeVisible = false">关闭</el-button>-->
                </span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getDesignList,
  getQualityExport,
  addProjectList,
  updateProjectList,
  deleteProjectList,
  enterpriseInfo,
  shuikuinspection,
  submitshuku
} from '@/api'
import pagination from "@/components/Pagination/index"
import {parseTime} from "@/utils";

export default {
  components: {pagination},
  data() {
    return {
      deptOptions: undefined,
      detailFlag: false,
      downloadLoading: false,
      companyVisible:false,
      openinfo: false,
      title: '',
      filterText: '',
      form: {},
      single: true,
      multiple: true,
      projectList: [],
      loading: true,
      AuditingReason:"",
      pageSize: 10,
      pageNum: 1,
      comdata: [],
      queryParams: {
        inspectionTitle:undefined,
        done:undefined,
      },
      total: 0,
      gridData: [],
      gridData2: [],
      optionsta: [{
        value: '1',
        label: '已处理'
      }, {
        value: '2',
        label: '未处理'
      }],
      value: '',
    };
  },
  mounted() {
    this.getTree()
    this.getlist()
  },
  methods: {
    getlist() {
      this.loading = true
      shuikuinspection(this.queryParams).then(response => {
        console.log('res', response)
        this.comdata = response.data.rows
        this.total = response.data.total
        this.loading = false
        // console.log(this.resourceList)
      })
    },
    reset() {
      this.form = {
        id: undefined,
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
    viewDetail() {
      // console.log('table', row)
      submitshuku(this.form).then(res =>{
        console.log('result',res)
        this.getlist()
      })
      this.openinfo = false;
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
      this.title = "添加企业取水许可证信息";
      this.openinfo = true
    },
    viewCompany(){
      this.companyVisible =true
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
      this.reset()
      this.form = row,
        this.openinfo = true;

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
        console.log('id', row.id)
        return deleteProjectList(row.id);
      })
        .then(() => {

          this.$message({
            type: "success",
            text: "删除成功"
          })
          this.getlist();
        })
        .catch(function () {
        });
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
.foot{
  text-align: center;
  margin-top: 5px;
}
</style>





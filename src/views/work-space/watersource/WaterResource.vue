<template>
  <div class="app-container">
    <div>
      <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">企业名称</span>
      <el-input v-model="queryParams.companyName" placeholder="请输入企业名称" clearable size="small"
                style="width: 150px;margin-right: 30px"/>
      <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">用水类型</span>
      <el-input v-model="queryParams.getWaterType" placeholder="请输入用水类型" clearable size="small"
                style="width: 150px;margin-right: 30px"/>
      <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">取水许可证状态</span>
      <el-select v-model="queryParams.color" placeholder="请选择" clearable size="small"
                 style="width: 150px;margin-right: 30px">
        <el-option
          v-for="item in optionsta"
          :key="item.value"
          style ="margin-bottom: 5px"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
      <el-table-column label="企业名称" align="center" prop="companyName"/>
      <el-table-column label="地址" align="center" prop="address"/>
      <el-table-column label="用水户性质" align="center" prop="getWaterType"/>
      <el-table-column label="法人" align="center" prop="legalRepresentative"/>
      <el-table-column label="联系人" align="center" prop="contactName" :show-overflow-tooltip="true"/>
      <el-table-column label="联系方式" align="center" prop="contactNumber"/>
      <el-table-column label="取水许可证证号" align="center" prop="getWaterNumber"/>
      <el-table-column label="取水许可证状态" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.color==='green'" class="iconfont ymq-iconwarning" style="color:#67c23a"></i>
          <i v-if="scope.row.color==='yellow'" class="iconfont ymq-iconwarning" style="color:#E6A23C"></i>
          <i v-if="scope.row.color==='red'" class="iconfont ymq-iconwarning" style="color:#F56C6C"></i>
        </template>
      </el-table-column>
      <el-table-column label="有效期至" align="center" prop="endTime"/>
      <el-table-column label="年用水量/方" align="center" prop="yearTotal"/>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-if="scope.row.userId !== 1" size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" style="text-align: center"/>
    <div>
      <el-dialog :visible.sync="openinfo" :title="title">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="企业名称">
            <el-input v-model="form.projectName"/>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.designScheme"/>
          </el-form-item>
          <el-form-item label="用水户性质">
            <el-input v-model="form.projectName"/>
          </el-form-item>
          <el-form-item label="法人">
            <el-input v-model="form.designUnitId"/>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.projectName"/>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.tel"/>
          </el-form-item>
          <el-form-item label="取水许可证号">
            <el-input v-model="form.num"/>
          </el-form-item>
          <el-form-item label="期限">
            <el-input v-model="form.num"/>
          </el-form-item>
          <el-form-item label="用水量">
            <el-input v-model="form.num"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openinfo = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
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
  enterpriseInfo
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
      openinfo: false,
      title: '',
      filterText: '',
      form: {},
      single: true,
      multiple: true,
      projectList: [],
      loading: true,
      pageSize: 10,
      pageNum: 1,
      comdata: [],
      queryParams: {
        companyName: undefined,
        getWaterType: undefined,
        color: undefined,
        quality: undefined,
        fileUrl: undefined
      },
      total: 0,
      gridData: [],
      gridData2: [],
      optionsta: [{
        value: 'green',
        label: '有效期内'
      }, {
        value: 'yellow',
        label: '临近过期'
      }, {
        value: 'red',
        label: '已过期'
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
      enterpriseInfo(this.queryParams).then(response => {
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
    viewDetail(row) {
      console.log('table', row)
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
      this.title = "添加企业取水许可证信息";
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
      // this.reset()
      this.form = row,
        this.openinfo = true;
      this.title = "修改水资源企业信息";
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

</style>



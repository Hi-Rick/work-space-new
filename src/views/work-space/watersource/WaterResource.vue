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
    <el-table v-loading="loading" :data="comdata.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
      <el-table-column label="企业名称" align="center" prop="companyName"/>
      <el-table-column label="地址" align="center" prop="address"/>
      <el-table-column label="用水类型" align="center" prop="getWaterType"/>
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
<!--    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" style="text-align: center"/>-->
    <div style="text-align: center; margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10]"
        :total="comdata.length"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
    <div>
      <el-dialog :visible.sync="openinfo" :title="title">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="企业名称">
            <el-input v-model="form.companyName"/>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"/>
          </el-form-item>
          <el-form-item label="用水类型">
            <el-input v-model="form.getWaterType"/>
          </el-form-item>
          <el-form-item label="法人">
            <el-input v-model="form.legalRepresentative"/>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.contactName"/>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.contactNumber"/>
          </el-form-item>
          <el-form-item label="取水许可证号">
            <el-input v-model="form.getWaterNumber"/>
          </el-form-item>
          <el-form-item label="取水许可证状态"  style="width: 500px">
            <el-select v-model="form.color" placeholder="请选择" clearable size="small">
              <el-option
                v-for="item in optionsta"
                :key="item.value"
                style ="margin-bottom: 5px"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
<!--            <el-input v-model=""/>-->
          </el-form-item>
          <el-form-item label="有效期至">
<!--            <el-input v-model="form.endTime"/>-->
            <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="年用水量/方">
            <el-input v-model="form.yearTotal"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
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
  enterpriseInfo,
  addEnterprise,
  updateEnterprise,
  deleteEnterprise
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
      currentPage: 1,
      pageSize: 5,
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
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
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
        companyName: undefined,
        address: undefined,
        getWaterType: undefined,
        legalRepresentative: undefined,
        contactName: undefined,
        contactNumber: undefined,
        getWaterNumber: undefined,
        color: undefined,
        endTime: undefined,
        yearTotal: undefined,

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
    cancel(){
      this.openinfo = false;
      this.getlist()
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
      this.title = "修改企业取水许可证信息";
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
      console.log('row',row)
      const name = row.companyName;
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
        return deleteEnterprise(row.id);
      }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
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
            updateEnterprise(this.form).then((response) => {
              if (response.data.code === 200) {
                this.msgSuccess("修改成功");
                this.openinfo = false;
                this.getlist();
              }
            });
          } else {
            addEnterprise(this.form).then((response) => {
              console.log('add',response)
              if (response.data.code == 200) {
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



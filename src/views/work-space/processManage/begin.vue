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
      <el-input v-model="queryParams.projectName" placeholder="请输入工程名称" clearable size="small"
                style="width: 200px;margin-right: 30px"/>
      <span style="font-size: 14px;color: #606266;font-weight: 700;margin-right: 10px">设计单位</span>
      <el-input v-model="queryParams.projectName" placeholder="请输入设计单位" clearable size="small"
                style="width: 200px;margin-right: 30px"/>
<!--      <el-select v-model="queryParams.status" placeholder="请选择" style="margin-right: 40px">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
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

    <el-table v-loading="loading" :data="projectList">
      <!--          <el-table-column type="selection" width="15" align="center"/>-->
      <!--          <el-table-column width="15" align="center"/>-->
      <!--          <el-table-column label="数据编号" align="center" prop="dataCode"/>-->
      <el-table-column label="工程名称" align="center" prop="businessProject.projectName"/>
      <el-table-column label="工程概况" align="center" prop="businessProject.projectOverview" :show-overflow-tooltip="true"/>
<!--      <el-table-column label="设计方案" align="center" prop="businessProject.designScheme"/>-->
      <el-table-column label="设计单位" align="center" prop="businessProject.designUnit"/>
      <el-table-column label="预算资金" align="center" prop="businessProject.budget"/>
<!--      <el-table-column label="立项批复结果" align="center" prop="businessProposal.result"/>-->
<!--      <el-table-column label="批复详情" align="center" >-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" @click="viewProposal(scope.row.businessProposal)">查看详情</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="概要设计" align="center" />-->
<!--      <el-table-column label="设计评审会" align="center" >-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" @click="viewMeet(scope.row.meetingReview)">查看详情</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="图纸" align="center" prop="businessProposal.drawing" />
      <el-table-column label="招标方案" align="center" prop="businessProposal.projectProposal" />
      <!--          <el-table-column label="工程状态" align="center" prop="status">-->
      <!--            <template slot-scope="scope">-->
      <!--              <el-tag v-if="scope.row.status =='立项阶段'">立项阶段</el-tag>-->
      <!--              <el-tag v-if="scope.row.status =='招标阶段'" type="warning">招标阶段</el-tag>-->
      <!--              <el-tag v-if="scope.row.status =='施工阶段'" type="success">施工阶段</el-tag>-->
      <!--            </template>-->
      <!--          </el-table-column>-->
      <!--          <el-table-column label="创建时间" align="center" prop="businessProject.createTime" :show-overflow-tooltip="true">-->
      <!--          </el-table-column>-->
      <!--          <el-table-column label="更新时间" align="center" prop="businessProject.updateTime" :show-overflow-tooltip="true">-->
      <!--            &lt;!&ndash;                        <template slot-scope="scope">&ndash;&gt;-->
      <!--            &lt;!&ndash;                          <span>{{ updateTime) }}</span>&ndash;&gt;-->
      <!--            &lt;!&ndash;                        </template>&ndash;&gt;-->
      <!--          </el-table-column>-->

      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-if="scope.row.userId !== 1" size="mini" type="text" icon="el-icon-delete"
                     @click="handleDelete(scope.row.businessProject)">删除
          </el-button>
          <!--              <el-button size="mini" type="text" icon="el-icon-key" @click="handleResetPwd(scope.row)"-->
          <!--                        >重置-->
          <!--              </el-button>-->
        </template>
      </el-table-column>
      <el-table-column label="点击完成验收" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  size="mini" type="danger"  @click="yanshou(scope.row.businessProject)">验收</el-button>
<!--          <el-tag v-show="flag" type="success">已验收</el-tag>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" style="text-align: center"/>

    <!--      </el-col>-->
    <!--    </el-row>-->
    <div>
      <el-dialog :visible.sync="openinfo" :title="title">
<!--        <el-tabs v-model="activeName">-->
<!--          <el-tab-pane label="工程信息" name="first">-->
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="工程名称">
                <el-input v-model="form.projectName"/>
              </el-form-item>
              <el-form-item label="工程概况">
                <el-input v-model="form.projectOverview"/>
              </el-form-item>
              <el-form-item label="设计单位">
                <el-select v-model="form.designUnitId" placeholder="请选择" style="margin-right: 40px">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <!--            <el-input v-model="form.designUnitId"/>-->
              </el-form-item>
              <el-form-item label="预算资金">
                <el-input v-model="form.budget"/>
              </el-form-item>
<!--              <el-form-item label="概要设计">-->
<!--                <el-upload-->
<!--                  class="upload-demo"-->
<!--                  action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                  :on-preview="handlePreview"-->
<!--                  :on-remove="handleRemove"-->
<!--                  :before-remove="beforeRemove"-->
<!--                  multiple-->
<!--                  :limit="3"-->
<!--                  :on-exceed="handleExceed"-->
<!--                  :file-list="fileList">-->
<!--                  <el-button size="small" type="primary">点击上传</el-button>-->
<!--                </el-upload>-->
<!--              </el-form-item>-->
              <el-form-item label="图纸">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="招标方案">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
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
              <el-form-item label="创建时间">
                <el-col :span="11">
                  <el-date-picker v-model="form.createTime" value-format=" yyyy-MM-dd " format="yyyy-MM-dd " type="date"
                                  placeholder="选择日期" style="width: 60%;"/>
                </el-col>
              </el-form-item>
              <el-form-item label="更新时间">
                <el-col :span="11">
                  <el-date-picker v-model="form.updateTime" value-format=" yyyy-MM-dd " format="yyyy-MM-dd " type="date"
                                  placeholder="选择日期" style="width: 60%;"/>
                </el-col>
              </el-form-item>

            </el-form>
<!--        </el-tab-pane>-->
<!--          <el-tab-pane label="立项批复情况" name="second">-->
<!--            <el-form ref="form" :model="form" label-width="100px">-->
<!--              <el-form-item label="立项批复时间">-->
<!--                <el-col :span="11">-->
<!--                  <el-date-picker v-model="form.createTime" value-format=" yyyy-MM-dd " format="yyyy-MM-dd " type="date"-->
<!--                                  placeholder="选择日期" style="width: 60%;"/>-->
<!--                </el-col>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="立项批复结果">-->
<!--                <el-input v-model="form.projectOverview"/>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="批复意见">-->
<!--                <el-input v-model="form.designScheme"/>-->
<!--              </el-form-item>-->
<!--              &lt;!&ndash;            <el-form-item label="设计单位">&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-select v-model="form.designUnitId" placeholder="请选择" style="margin-right: 40px">&ndash;&gt;-->
<!--              &lt;!&ndash;                <el-option&ndash;&gt;-->
<!--              &lt;!&ndash;                  v-for="item in options1"&ndash;&gt;-->
<!--              &lt;!&ndash;                  :key="item.value"&ndash;&gt;-->
<!--              &lt;!&ndash;                  :label="item.label"&ndash;&gt;-->
<!--              &lt;!&ndash;                  :value="item.value">&ndash;&gt;-->
<!--              &lt;!&ndash;                </el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              </el-select>&ndash;&gt;-->
<!--              &lt;!&ndash;              &lt;!&ndash;            <el-input v-model="form.designUnitId"/>&ndash;&gt;&ndash;&gt;-->
<!--              &lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--              <el-form-item label="批复报告">-->
<!--                <el-upload-->
<!--                  class="upload-demo"-->
<!--                  action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                  :on-preview="handlePreview"-->
<!--                  :on-remove="handleRemove"-->
<!--                  :before-remove="beforeRemove"-->
<!--                  multiple-->
<!--                  :limit="3"-->
<!--                  :on-exceed="handleExceed"-->
<!--                  :file-list="fileList">-->
<!--                  <el-button size="small" type="primary">点击上传</el-button>-->
<!--                </el-upload>-->
<!--              </el-form-item>-->
<!--              &lt;!&ndash;          <el-form-item label="工程状态">&ndash;&gt;-->
<!--              &lt;!&ndash;            <el-select v-model="form.status" placeholder="请选择" style="margin-right: 40px">&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option&ndash;&gt;-->
<!--              &lt;!&ndash;                v-for="item in options"&ndash;&gt;-->
<!--              &lt;!&ndash;                :key="item.value"&ndash;&gt;-->
<!--              &lt;!&ndash;                :label="item.label"&ndash;&gt;-->
<!--              &lt;!&ndash;                :value="item.value">&ndash;&gt;-->
<!--              &lt;!&ndash;              </el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;            </el-select>&ndash;&gt;-->
<!--              &lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--              &lt;!&ndash;            <el-form-item label="创建时间">&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-col :span="11">&ndash;&gt;-->
<!--              &lt;!&ndash;                <el-date-picker v-model="form.createTime" value-format=" yyyy-MM-dd " format="yyyy-MM-dd " type="date"&ndash;&gt;-->
<!--              &lt;!&ndash;                                placeholder="选择日期" style="width: 60%;"/>&ndash;&gt;-->
<!--              &lt;!&ndash;              </el-col>&ndash;&gt;-->
<!--              &lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--              &lt;!&ndash;            <el-form-item label="更新时间">&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-col :span="11">&ndash;&gt;-->
<!--              &lt;!&ndash;                <el-date-picker v-model="form.updateTime" value-format=" yyyy-MM-dd " format="yyyy-MM-dd " type="date"&ndash;&gt;-->
<!--              &lt;!&ndash;                                placeholder="选择日期" style="width: 60%;"/>&ndash;&gt;-->
<!--              &lt;!&ndash;              </el-col>&ndash;&gt;-->
<!--              &lt;!&ndash;            </el-form-item>&ndash;&gt;-->

<!--            </el-form></el-tab-pane>-->
<!--          <el-tab-pane label="设计评审会" name="third">-->
<!--            <el-form ref="form" :model="form" label-width="100px">-->
<!--              <el-form-item label="参会专家">-->
<!--                <el-input v-model="form.projectName"/>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="组织单位">-->
<!--                <el-input v-model="form.projectOverview"/>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="会议时间">-->
<!--                <el-input v-model="form.designScheme"/>-->
<!--              </el-form-item>-->

<!--              <el-form-item label="专家意见">-->
<!--                <el-input v-model="form.budget"/>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="是否修改">-->
<!--                <el-select v-model="form.designUnitId" placeholder="请选择" style="margin-right: 40px">-->
<!--                  <el-option-->
<!--                    v-for="item in options1"-->
<!--                    :key="item.value"-->
<!--                    :label="item.label"-->
<!--                    :value="item.value">-->
<!--                  </el-option>-->
<!--                </el-select>-->
<!--                &lt;!&ndash;            <el-input v-model="form.designUnitId"/>&ndash;&gt;-->
<!--              </el-form-item>-->
<!--              &lt;!&ndash;          <el-form-item label="工程状态">&ndash;&gt;-->
<!--              &lt;!&ndash;            <el-select v-model="form.status" placeholder="请选择" style="margin-right: 40px">&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option&ndash;&gt;-->
<!--              &lt;!&ndash;                v-for="item in options"&ndash;&gt;-->
<!--              &lt;!&ndash;                :key="item.value"&ndash;&gt;-->
<!--              &lt;!&ndash;                :label="item.label"&ndash;&gt;-->
<!--              &lt;!&ndash;                :value="item.value">&ndash;&gt;-->
<!--              &lt;!&ndash;              </el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;            </el-select>&ndash;&gt;-->
<!--              &lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--              &lt;!&ndash;            <el-form-item label="创建时间">&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-col :span="11">&ndash;&gt;-->
<!--              &lt;!&ndash;                <el-date-picker v-model="form.createTime" value-format=" yyyy-MM-dd " format="yyyy-MM-dd " type="date"&ndash;&gt;-->
<!--              &lt;!&ndash;                                placeholder="选择日期" style="width: 60%;"/>&ndash;&gt;-->
<!--              &lt;!&ndash;              </el-col>&ndash;&gt;-->
<!--              &lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--              &lt;!&ndash;            <el-form-item label="更新时间">&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-col :span="11">&ndash;&gt;-->
<!--              &lt;!&ndash;                <el-date-picker v-model="form.updateTime" value-format=" yyyy-MM-dd " format="yyyy-MM-dd " type="date"&ndash;&gt;-->
<!--              &lt;!&ndash;                                placeholder="选择日期" style="width: 60%;"/>&ndash;&gt;-->
<!--              &lt;!&ndash;              </el-col>&ndash;&gt;-->
<!--              &lt;!&ndash;            </el-form-item>&ndash;&gt;-->

<!--            </el-form></el-tab-pane>-->

<!--        </el-tabs>-->

        <div slot="footer" class="dialog-footer">
          <el-button @click="openinfo = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="ProposalVisible" title="立项批复详情">
        <el-row :gutter="20" style="padding-top: 10px">
          <el-col :span="12">
            <span style="font-weight: bolder">立项批复时间：</span>
            <span>{{proval.createTime}}</span>
          </el-col>
          <el-col :span="12">
            <div class="biaoqian">
              <span style="font-weight: bolder">立项批复结果：</span>
              <span>{{proval.result}}</span>
            </div>
          </el-col>
          <!--      <el-col :span="8">-->
          <!--        <div class="biaoqian">-->
          <!--          <span style="font-weight: bolder">担任职务：</span>-->
          <!--          <span>讲师</span>-->
          <!--        </div>-->
          <!--      </el-col>-->
        </el-row>
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
        <h4>批复意见</h4>
        <p>{{proval.content}}</p>
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
        <h4>批复报告</h4>
        <p>{{proval.replyReport}}</p>
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
        <!--    <el-divider />-->
        <!--    <div>-->
        <!--      <el-row style="padding-top: 10px">-->
        <!--        <span style="font-weight: bolder">科研处意见</span>-->
        <!--      </el-row>-->
        <!--      <el-row style="padding-top: 10px">-->
        <!--        <el-input-->
        <!--          v-model="AuditingReason"-->
        <!--          :rows="4"-->
        <!--          type="textarea"-->
        <!--          placeholder="请输入内容"-->
        <!--        />-->
        <!--      </el-row>-->
        <!--    </div>-->
        <!--    <div class="foot">-->
        <!--        <span slot="footer" class="dialog-footer">-->
        <!--          <el-button type="success" size="small" plain @click="pass">审核通过</el-button>-->
        <!--          <el-button type="danger" size="small" plain @click="pass">审核未通过</el-button>-->
        <!--          <el-button type="primary" size="small" plain @click="zhuanyeVisible = false">关闭</el-button>-->
        <!--        </span>-->
        <!--    </div>-->
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="meetingVisible" title="设计评审会">
        <el-row :gutter="20" style="padding-top: 10px">
          <el-col :span="8">
            <span style="font-weight: bolder">参会专家：</span>
            <span>{{meet.participatingExperts}}</span>
          </el-col>
          <el-col :span="8">
            <div class="biaoqian">
              <span style="font-weight: bolder">组织单位：</span>
              <span>{{meet.organizationalUnitId}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="biaoqian">
              <span style="font-weight: bolder">会议时间：</span>
              <span>{{meet.createTime}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="padding-top: 10px">
          <el-col :span="8">
            <div class="biaoqian">
              <span style="font-weight: bolder">专家意见：</span>
              <span>{{meet.expertOpinion}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="biaoqian">
              <span style="font-weight: bolder">是否修改：</span>
              <span>{{meet.modify}}</span>
            </div>
          </el-col>
          <!--          <el-col :span="8">-->
          <!--            <div class="biaoqian">-->
          <!--              <span style="font-weight: bolder">证明人：</span>-->
          <!--              <span>王老师</span>-->
          <!--            </div>-->
          <!--          </el-col>-->
        </el-row>
        <!--        <el-divider />-->
        <!--        <h4>部门意见</h4>-->
        <!--        <div>-->
        <!--          <el-row>-->
        <!--            <el-col :span="6">-->
        <!--              信息属实-->
        <!--            </el-col>-->
        <!--            <el-col :span="6">-->
        <!--              <span>审核时间：</span>-->
        <!--              <span>2019-12-04</span>-->
        <!--            </el-col>-->
        <!--            <el-col :span="6">-->
        <!--              <span>审核人：</span>-->
        <!--              <span>刘明至</span>-->
        <!--            </el-col>-->
        <!--            <el-col :span="5">-->
        <!--              <span>审核状态</span>-->
        <!--              <el-tag type="success" size="small">通过</el-tag>-->
        <!--            </el-col>-->
        <!--          </el-row>-->
        <!--        </div>-->
        <!--        <el-divider />-->
        <!--        <h4>系部意见</h4>-->
        <!--        <div>-->
        <!--          <el-row>-->
        <!--            <el-col :span="6">-->
        <!--              批准通过-->
        <!--            </el-col>-->
        <!--            <el-col :span="6">-->
        <!--              <span>审核时间：</span>-->
        <!--              <span>2019-12-04</span>-->
        <!--            </el-col>-->
        <!--            <el-col :span="6">-->
        <!--              <span>审核人：</span>-->
        <!--              <span>郭志</span>-->
        <!--            </el-col>-->
        <!--            <el-col :span="5">-->
        <!--              <span>审核状态</span>-->
        <!--              <el-tag type="success" size="small">通过</el-tag>-->
        <!--              <el-tag type="success" size="small">通过</el-tag>-->
        <!--            </el-col>-->
        <!--          </el-row>-->
        <!--        </div>-->
        <!--        <el-divider />-->
        <!--        <div>-->
        <!--          <el-row style="padding-top: 10px">-->
        <!--            <span style="font-weight: bolder">科研处意见</span>-->
        <!--          </el-row>-->
        <!--          <el-row style="padding-top: 10px">-->
        <!--            <el-input-->
        <!--              v-model="AuditingReason"-->
        <!--              :rows="4"-->
        <!--              type="textarea"-->
        <!--              placeholder="请输入内容"-->
        <!--            />-->
        <!--          </el-row>-->
        <!--        </div>-->
        <!--        <div class="foot">-->
        <!--        <span slot="footer" class="dialog-footer">-->
        <!--          <el-button type="success" size="small" plain @click="pass">审核通过</el-button>-->
        <!--          <el-button type="danger" size="small" plain @click="pass">审核未通过</el-button>-->
        <!--          <el-button type="primary" size="small" plain @click="zhuanyeVisible = false">关闭</el-button>-->
        <!--        </span>-->
        <!--        </div>-->
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
  getExportList,
  addProjectList,
  updateProjectList,
  deleteProjectList
} from '@/api/index'
import pagination from "@/components/Pagination/index"
import {parseTime} from "@/utils";

export default {
  components: {pagination},
  data() {
    return {
      deptOptions: undefined,
      activeName: 'first',
      defaultProps: {
        children: " ",
        value: "designUnitId",
        label: "designUnit",
      },
      flag:false,
      downloadLoading: false,
      openinfo: false,
      title: '',
      filterText: '',
      form: {},
      single: true,
      multiple: true,
      ProposalVisible:false,
      meetingVisible:false,
      projectList: [],
      meet:{},
      proval:{},
      loading: true,
      pageSize: 10,
      pageNum: 1,
      queryParams: {
        id: undefined,
        designUnit: undefined,
        designUnitId: undefined,
        projectName: undefined,
        status: undefined
      },
      total: 0,
      options: [{
        value: '1',
        label: '已立项'
      }, {
        value: '2',
        label: '待审批'
      }, {
        value: '3',
        label: '立项失败'
      }],
      options1: [{
        value: '1',
        label: '是'
      }, {
        value: '2',
        label: '否'
      }],
      // value: '',
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
      this.getTree();
      this.title = "添加工程信息";
      this.openinfo = true
    },

    getTree() {
      getDesignList().then(res => {
        this.deptOptions = res.rows;
        console.log(this.deptOptions)
      })
    },
    handleQuery() {
      console.log('status', this.queryParams.status)
      this.queryParams.page = 1;
      this.getlist();
    },
    getlist() {
      this.loading = true
      getProjectList(this.queryParams).then(response => {
        console.log('res',response)
        this.projectList = response.data.data
        // var arr = []
        // for (let i in this.projectList[0]) {
        //   arr.push(this.projectList[0][i]); //属性
        //   //arr.push(obj[i]); //值
        // }
        // console.log(arr);
        this.total = response.data.data.length
        this.loading = false
        // console.log(this.resourceList)
      })

    },
    viewProposal(row){
      console.log(row)
      this.ProposalVisible = true
      this.proval = row
      if(this.proval == undefined){
        this.proval = {
          replyReport:'',
          content:'',
          result:'',
          createTime:'',
        }
        this.$message({
          type:"warning",
          message:'项目待批复中！'
        })
      }
    },
    viewMeet(row){
      this.meetingVisible = true
      this.meet = row
      if(this.meet == undefined){
        this.meet = {
          replyReport:'',
          content:'',
          result:'',
          createTime:'',
        }
        this.$message({
          type:"warning",
          message:'设计评审会记录还未填写！'
        })
      }
    },
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有用户数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return getExportList()
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
        const tHeader = ['工程名称', '工程概况', '设计方案', '设计单位', '预算资金', '工程状态', '创建时间', '更新时间',]
        const filterVal = ['projectName', 'projectOverview', 'designScheme', 'designUnit', 'budget', 'status', 'createTime', 'updateTime']
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
      this.title = "修改工程立项信息";
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
    yanshou(row){
      const name = row.projectName;
      this.$confirm(
        '确认"' + name + '"工程验收完成?',
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
        }
      )

    },
    handleDelete(row) {
      const name = row.projectName;
      this.$confirm(
        '是否确认删除"' + name + '"的工程信息?',
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


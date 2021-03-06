import {get,post} from  '@/utils/request'
import request from '@/utils/request'
export function deleteProjectList(ids) {
  return request({
    url: '/smartwater/engineering/project/' +ids,
    method: 'delete'
  })
}
export function deletebidList(ids) {
  return request({
    url: '/smartwater/engineering/bid/' +ids,
    method: 'delete'
  })
}
export function deleteEnterprise(ids) {
  return request({
    url: '/smartwater/rural_enterpriseInfo/deleteEnterpriseInfoByIds?ids=' +ids,
    method: 'delete'
  })
}
export function deleteWaterQuality(ids) {
  return request({
    url: '/smartwater/display/quality/deleteWaterQuality?waterQualityId=' +ids,
    method: 'delete'
  })
}
export function updatequality(data) {
  return request({
    url: '/smartwater/display/quality',
    method: 'put',
    data
  })
}
export function submitwater(data) {
  return request({
    url: '/smartwater/mobile/water-resource-inspection/hand',
    method: 'put',
    data
  })
}
export function submitproject(data) {
  return request({
    url: '/smartwater/mobile/project-inspection/hand',
    method: 'put',
    data
  })
}
export function submitshuku(data) {
  return request({
    url: '/smartwater/mobile/inspection-log/update',
    method: 'put',
    data
  })
}
export function submitengineeringinfo(data) {
  return request({
    url: '/smartwater/engineering/project',
    method: 'put',
    data
  })
}
export function submitproposalinfo(data) {
  return request({
    url: '/smartwater/engineering/proposal',
    method: 'put',
    data
  })
}
export function submitreviewinfo(data) {
  return request({
    url: '/smartwater/engineering/review',
    method: 'put',
    data
  })
}
export function submitbid(data) {
  return request({
    url: '/smartwater/engineering/bid',
    method: 'put',
    data
  })
}
//修改水资源取水用户
export function updateEnterprise(data) {
  return request({
    url: '/smartwater/rural_enterpriseInfo/updateEnterpriseInfo',
    method: 'put',
    data
  })
}
export let getAllAsset = (query)=> get('/smartwater/data/data_asset/getAllAssetList',query)

export let getTreeList = (query)=> get('/smartwater/data/data_asset/getAssetTreeList',query)

export let getDesignList = (query)=> get('/smartwater/data/unit/list',query)

export let getProjectList = (query)=> get('/smartwater/engineering/project/listProposal',query)

export let getExportList = (query)=> get('/smartwater/engineering/project/export',query)

export let addProjectList = (query)=> post('/smartwater/engineering/project',query)

export let updateProjectList = (query)=> post('/smartwater/engineering/project',query)

export let getWaterList = (query)=> get('/smartwater/display/quality/list',query)

export let getQualityExport = (query)=> get('/smartwater/display/quality/export',query)

export let enterpriseInfo = (query)=> get('/smartwater/rural_enterpriseInfo/list',query)

export let querycompany = (query)=> get('/smartwater/rural_enterpriseInfo/findEnterpriseInfoById?id='+query,query)
//水资源
export let waterinspection = (query)=> get('/smartwater/mobile/water-resource-inspection/list',query)
//工程管理科
export let projectinspection = (query)=> get('/smartwater/mobile/project-inspection/list',query)
//水库
export let shuikuinspection = (query)=> get('/smartwater/mobile/inspection-log/list',query)

export let addEnterprise = (query)=> post('/smartwater/rural_enterpriseInfo/addEnterpriseInfo',query)
//新增水质信息
export let addquality = (query)=> post('/smartwater/display/quality',query)

export let getqualitylist = (query)=> get('/smartwater/display/quality/getList',query)

export let addengineering = (query)=> post('/smartwater/engineering/project',query)

export let updateStatus = (query)=> get('/smartwater/engineering/project/updateStatus',query)

export let getbidlist = (query)=> get('/smartwater/engineering/bid/list',query)

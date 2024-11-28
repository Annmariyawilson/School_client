import commonApi from "./commonApi";
import base_url from "./base_url";

export const registerApi = async (data) => {
  return await commonApi(`${base_url}/reg`, 'POST', "", data);
};
export const loginApi = async (data) => {
  return await commonApi(`${base_url}/log`, 'POST', '', data)
}
export const addStudentApi=async(data,header)=>{
  return await commonApi(`${base_url}/addstudent`,'POST',header,data)
}
export const getStudentsApi=async(header,search)=>{
  console.log(search)
  return await commonApi(`${base_url}/getstudents?search=${search}`,'GET',header,'')
}

export const deleteStudentApi=async(id,header)=>{
  return await commonApi(`${base_url}/deletestudent/${id}`,'DELETE',header,{})
}
export const editStudentApi=async(id,data,header)=>{
  return await commonApi(`${base_url}/updatestudent/${id}`,"PUT",header,data)
}

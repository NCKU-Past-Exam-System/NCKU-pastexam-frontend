import axios from 'axios';
import { api } from './credential';

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    'Content-Type': 'application/json', // Default header for all requests
    'Access-Control-Allow-Origin': '*', // Include this if required for CORS
  },
  withCredentials: true, 
});

export const DownloadFile = async (hash) => {
  const res = await axiosInstance.get(`/file/?hash=${hash}`, {
    responseType: 'blob',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
};
export const DeleteFile = async (hash) => {
  const res = await axiosInstance.delete(`/file/?hash=${hash}`);
  return res;
};
export const UploadFile = async (uid, selectedYear, selectedType, selectedTeacher, formData) => {
  const res = await axiosInstance.post(
    `/file/?course_id=${uid}&year=${selectedYear}&examtype=${selectedType}&teacher=${selectedTeacher}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res;
};
export const FetchMyFileList = async () => {
  const res = await axiosInstance.get(`/list-files-by-user`);
  return res;
};
export const FetchFileListByCourse = async (uid) => {
  const res = await axiosInstance.get(`/filelist/${uid}`);
  return res;
};
export const SearchCourse = async (course_name, instructor, dept, uid) => {
  const res = await axiosInstance.get(`/search`, {
    params: {
      ...(course_name && { course_name }),
      ...(instructor && { instructor }),
      ...(dept && { dept }),
      ...(uid && { uid }),
    },
  });
  return res;
};

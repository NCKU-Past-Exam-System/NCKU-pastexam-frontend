import axios from 'axios';
import { api } from './credential';

export const DownloadFile = async (hash) => {
  const res = await axios.get(`${api}/file/?hash=${hash}`, {
    responseType: 'blob',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
};
export const DeleteFile = async (hash) => {
  const res = await axios.delete(`${api}/file/?hash=${hash}`);
  return res;
};
export const UploadFile = async (uid, selectedYear, selectedType, selectedTeacher, formData) => {
  const res = await axios.post(
    `${api}/file/?course_id=${uid}&year=${selectedYear}&examtype=${selectedType}&teacher=${selectedTeacher}`,
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
  const res = await axios.get(`${api}/list-files-by-user`);
  return res;
};
export const FetchFileListByCourse = async (uid) => {
  const res = await axios.get(`${api}/filelist/${uid}`);
  return res;
};
export const SearchCourse = async (course_name, instructor, dept, uid) => {
  const res = await axios.get(`${api}/search`, {
    params: {
      ...(course_name && { course_name }),
      ...(instructor && { instructor }),
      ...(dept && { dept }),
      ...(uid && { uid }),
    },
  });
  return res;
};

# NCKU-CSIE-Past-Exam-System

<h1 align="left"><a href="https://nckucsie-pastexam.owenowenisme.com" target="_blank" style="text-decoration:none;color:red;">成大資工考古題系統</a></h1>

### 版型參考： [交大資工考古題系統](https://pastexam.nctucsunion.me/main)
---
### RWD尚在建置請使用電腦瀏覽以獲得最佳體驗！

## Built With:

### Front-End:
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,mui" />
  </a>
</p>

### Back-End: https://nckucsie-pastexam-api.owenowenisme.com
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=fastapi,nginx" />
  </a>
</p>

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/courselist`                            | Retrieve all courses.                      |
| `GET`    | `/main/{course_id:id}`                          | List all file in a course post #28.                       |
| `GET`    | `/files/?course_id=${id}&file_name=${filename}`                             | Fetch a file to download of a course.  (Require valid token in header)                       |
| `POST`   | `/uploadfile/?course_id=${}&year=${}&examtype=${}&teacher=${}`     | Upload new file to a course.              |


### Database:
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=mysql" />
  </a>
</p>

---
## 若有需要改善的地方請不吝發 Issue || PR!

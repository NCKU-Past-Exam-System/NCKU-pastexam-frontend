import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="App">
      <h1>成功大學資訊工程學系考古題系統</h1>
      <Link to='/login'>
          登入
        </Link><br/>
      <Link to='/main'>
          訪客參觀
        </Link>


    </div>
  );
}
export default Home;

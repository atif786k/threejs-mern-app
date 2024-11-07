import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "./FIleUpload";
import Viewer from "./ThreeDViewer/Viewer";

const ObjectList = () => {
  const [objList, setObjList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getObjList = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const response = await axios.get("/api/objects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setObjList(response.data.objects);
        console.log(response.data.msg);
      } catch (error) {
        console.log("Failed to fetch objects");
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    getObjList();
  }, []);

  // const [storeSingleObj, setStoreSingleObj] = useState([]);
  const getSingleObjData = async (_id) => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate("/login");
    } else{
      try {
        const response = await axios.get(`/api/objects/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setStoreSingleObj(response.data.singleObj);
        navigate("/viewer", {state: { singleObjData: response.data.singleObj }})
        console.log(response.data.msg);
      } catch (error) {
        console.log("Failed to fetch objects");
        setError(error.message);
      }
    }
  }

  // const [objFileUrl, setObjFileUrl] = useState(null);
  // const [mtlFileUrl, setMtlFileUrl] = useState(null);

  // const handleUploadSuccess = (objUrl, mtlUrl) => {
  //   setObjFileUrl(objUrl);
  //   setMtlFileUrl(mtlUrl);
  // };

  return (
    <div>
      <h1>Object List</h1>
      <div>
        {objList.length > 0 ? (
          objList.map((e, index) => {
            return (
              <ul className="border-green-400 bg-green-500 my-5 cursor-pointer" key={e._id} onClick={() => getSingleObjData(e._id)}> S.No {index}
                <li>{e.name}</li>
                <li>{e.filePath}</li>
                <li>{e.userId}</li>
              </ul>
            );
          })
        ) : (
          <h4>No Objects to show : {error}</h4>
        )}
      </div>
      <div>
        <FileUpload getObjListFunction={getObjList}/>
        {/* <Viewer/> */}
      </div>
    </div>
  );
};

export default ObjectList;

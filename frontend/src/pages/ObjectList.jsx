import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FIleUpload";
import ListCard from "../components/ListCard";
import "./pages.css";

const ObjectList = () => {
  const [objList, setObjList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getObjList = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert('Unauthorized')
      navigate("/");
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
  const token = localStorage.getItem("token");
  const getSingleObjData = async (_id) => {
    if (!token) {
      navigate("/");
    } else {
      try {
        const response = await axios.get(`/api/objects/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setStoreSingleObj(response.data.singleObj);
        navigate("/viewer", {
          state: { singleObjData: response.data.singleObj },
        });
        console.log(response.data.msg);
      } catch (error) {
        console.log("Failed to fetch objects");
        setError(error.message);
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("Logout successfully");
  };

  return (
    <div className="ModelList-page orbitron-font space-y-4">
      <nav className="flex items-center justify-between">
        <h1 className="ModelList-page-heading">Models List</h1>
        {token ? (
          <button onClick={logOut} className="ui-btn ui-wb">
            <span>Logout</span>
          </button>
        ) : (
          <h2>Login first</h2>
        )}
      </nav>
      <div className="flex">
        {objList.length > 0 ? (
          objList.map((e) => {
            return (
              <div key={e._id} onClick={() => getSingleObjData(e._id)}>
                <ListCard ModelName={e.name} />
              </div>
            );
          })
        ) : (
          <h4>No Objects to show : {error}</h4>
        )}
      </div>
      <div>
        <FileUpload getObjListFunction={getObjList} />
      </div>
    </div>
  );
};

export default ObjectList;

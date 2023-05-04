import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios';

function CrewBbsDelete() {
    let history = useNavigate();
    let params = useParams();
    const [loading, setLoading] = useState(false);

    //추가
    const [crewBbsDetails, setCrewBbsDetails]= useState();
    const [cBbsSeq, setCBbsSeq] = useState(params.cBbsSeq);
  
    const deleteCrewBbs = async (cBbsSeq) => {
        setLoading(true);
        try {
          const response = await axios.post(
            "http://localhost:3000/crewBbsDelete",
            { cBbsSeq }
          );
          if (response.data === "YES") {
            alert("게시글이 삭제되었습니다.");
            history('/crewBbsMain/');
          } else {
            alert("게시글을 삭제하지 못했습니다.");
          }
        } catch (error) {
          alert(error);
        }
        setLoading(false);
      };
  
    useEffect(() => {
      deleteCrewBbs(params.cBbsSeq);
    }, [params.cBbsSeq]);

    if (loading) {
      return <div>Loading...</div>;
    }
  
    return null;
}
  
  export default CrewBbsDelete;
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

//검색기능
const CrewSearchBlog = () => {
  const [bbslist, setBbslist] = useState([]);
  const [choice, setChoice] = useState("");
  const [search, setSearch] = useState("");

  const choiceChange = (e) => setChoice(e.target.value);
  const searchChange = (e) => setSearch(e.target.value);

  const fetchData = async (c, s, p) => {
    await axios.get('http://localhost:3000/crewBbsMain', { params:{ "choice":c, "search":s, "pageNumber":p  } })
    .then(function(res){
      console.log(res.data.list);
      setBbslist(res.data.list);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  useEffect(()=>{     // initialize 용도
    fetchData('','', 0);
}, []);

let navigate = useNavigate();

function searchBtn(){
  // choice, search 검사

  if(choice.toString().trim() !== "" && search.toString().trim() !== ""){
      navigate('/crewBbsMain/' + choice + "/" + search);
  }
  else{
      navigate('/crewBbsMain/');
  }
  // 데이터를 다시 한번 갖고 온다
  fetchData(choice, search);
}

  return (
    <form className="ptf-search-form">
      <input
        type="text"
        placeholder="Search in crew"
      />
      <button onClick={()=>searchBtn()}>
        <i className="lnil lnil-search-alt"></i>
      </button>

{/* <table style={{ marginLeft:"auto", marginRight:"auto", marginTop:"3px", marginBottom:"3px" }}>
            <tbody>
            <tr>
                <td style={{ paddingLeft:"3px" }}>
                    <select className="custom-select" value={choice} onChange={choiceChange}>
                        <option value=''>검색</option>
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="writer">작성자</option>
                    </select>
                </td>
                <td style={{ paddingLeft:"5px" }} className="align-middle">
                    <input type="text" className="form-control" placeholder="검색어"
                        value={search} onChange={searchChange}/>
                </td>
                <td style={{ paddingLeft:"5px" }}>
                    <span>
                        <button type="button" className="btn btn-primary" onClick={()=>searchBtn()}>검색</button>
                    </span>
                </td>
            </tr>
            </tbody>
        </table> */}
    </form>
  );
};

export default CrewSearchBlog;

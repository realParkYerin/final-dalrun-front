import React from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

//서버로부터 json 형태의 데이터 받아야 함
// img : img
// cat : type - 모집중, 모집완료
// date : wdate
// title : title

const CrewBlogThree = () => {
  const [crewBbsList, setCrewBbsList] = useState([]);

  const [choice, setChoice] = useState("");
  const [search, setSearch] = useState("");

  let crewBbsParams = useParams();

  const [img, setImg] = useState([]);
  
  const [cBbsSeq, setCBbsSeq] = useState(crewBbsParams.cBbsSeq);

  const [list, setList] = useState([]);
  const [type, setType]=useState("");

  // paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  const choiceChange = (e) => setChoice(e.target.value);
  const searchChange = (e) => setSearch(e.target.value);

  function getimgstr() {
    alert(cBbsSeq);
    axios.get("http://localhost:3000/getimgstr", {
        params: {
          "cBbsSeq": cBbsSeq
        }
      })
      .then((res) => {
        const img = res.data.split('/');
        setImg(img); //상태 변수 업데이트
        alert(setImg);
        const firstImg = img[0];
        alert(firstImg);
      });
  }

  const getCrewBbsList = async(c,s,p) => {
    axios.get('http://localhost:3000/crewBbsMain', {params:{ "choice":c, "search":s, "pageNumber":p  } })
      .then(function(res){
        console.log("allGetCrewBbs resp : " ,res.data.list);
        setCrewBbsList(res.data.list);
        setTotalCnt(res.data.cnt);
            })
            .catch(function(err){
              alert(err);
            })
  }

  //모집중, 모집완료
  function getType(){
    axios.get(`http://localhost:3000/crewBbsMain/${type}`)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
 

  //모집중, 모집완료 함수 호출
  useEffect(function () {
    getCrewBbsList();
    getType();
  }, [crewBbsParams.cBbsSeq], [type])

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
    getCrewBbsList(choice, search);
}

function handlePageChange(page){
    setPage(page);
    getCrewBbsList(choice, search, page-1);
}

//handle
function handlePageTypeChange(type){
  setType(type);
}

  return (
    <><div>
    <button onClick={() => handlePageTypeChange("")}>전체</button>
    <button onClick={() => handlePageTypeChange("모집중")}>모집중</button>
    <button onClick={() => handlePageTypeChange("모집완료")}>모집완료</button>
  </div>
    <button onClick={getimgstr}>getimgstr</button>
    <table style={{ marginLeft:"auto", marginRight:"auto", marginTop:"3px", marginBottom:"3px" }}>
            <tbody>
            <tr>
                <td style={{ paddingLeft:"3px" }}>
                    <select className="custom-select" value={choice} onChange={choiceChange}>
                        <option value=''>검색</option>
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="memId">작성자</option>
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
        </table>
      
      {/* 서버 데이터 */}
      {crewBbsList.map((singleBbs, i) => (
        <div className="col-xl-4 col-lg-4" key={i}>
          <article className="ptf-post ptf-post--style-1">
            <div className="ptf-post__media">
              <Link className="ptf-work__link" to={`/crewBbsBlogDetails/${singleBbs.cBbsSeq}`}></Link>
              <img
                src={"http://localhost:3000/getimg?imgid=" + img[0]}
                alt="blog"
                loading="lazy"
              />
            </div>
            <div className="ptf-post__content">
              <header className="ptf-post__header">
                <div className="ptf-post__meta">
                  <span className="cat">{singleBbs.type}</span>
                  <span className="date">{singleBbs.wdate}</span>
                </div>
                <h3 className="ptf-post__title">
                  <span>&lt;{singleBbs.crewName}&gt;</span><br></br>
                  <Link to={`/crewBbsBlogDetails/${singleBbs.cBbsSeq}`}>{singleBbs.title}</Link>
                </h3>
              </header>
            </div>
          </article>
        </div>
      ))}
    </>
  );
};

export default CrewBlogThree;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios';

function CrewBbsUpdate(){
    let history = useNavigate();

    let params = useParams();
    console.log(params.cBbsSeq);

    const [crewBbsDetails, setCrewBbsDetails]= useState();

    const [cBbsSeq, setCBbsSeq] = useState(params.cBbsSeq);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [crewName, setCrewName] = useState('');
    const [type, setType] = useState('');

    // 데이터를 모두 읽어 들일 때까지 rendering을 조절하는 변수
    const [loading, setLoading] = useState(false);

    const crewBbsData = async(cBbsSeq) => {
        const resp = await axios.get('http://localhost:3000/crewBbsBlogDetail', { params:{"cBbsSeq":cBbsSeq} });

        console.log("crewBbsDetails:" + JSON.stringify(resp.data));
        setCrewBbsDetails(resp.data);
        setTitle(resp.data.title);
        setContent(resp.data.content);
        setCrewName(resp.data.crewName);
        setType(resp.data.type);

        setLoading(true);
    }

    const titleChange = (e) => setTitle(e.target.value);
    const contentChange = (e) => setContent(e.target.value);
    const crewNameChange = (e) => setCrewName(e.target.value);
    const typeChange = (e) => setType(e.target.value);

    useEffect(()=>{
        crewBbsData(params.cBbsSeq);
    }, [params.cBbsSeq])

    function updateBbs(){


        axios.post("http://localhost:3000/crewBbsUpdate", null,
            { params:{"cBbsSeq":cBbsSeq, "title":title, "content":content, "crewName":crewName, "type":type}})
            .then(res => {
                console.log(res.data);
                if(res.data === "YES"){
                    alert("수정되었습니다.");
                    history('/crewBbsMain');
                }else {
                    alert("등록되지 않았습니다.");
                }
            })
            .catch(function(err){
                alert(err);
            }) 
    }

    if(loading === false){
        return <div>Loading...</div>
    }

    return(
        <div className='pyr-bbsWrite'>
        <table className="table table-sm">
            <colgroup>
                <col width="100px"/><col width="500px"/>
            </colgroup>
            <tbody>
            <tr>
                <th>아이디</th>
                <td>
                    <input type="text" value={crewBbsDetails.memId}  className="form-control form-control-lg" readOnly/>
                </td>
            </tr>
            <tr>
                <th className="align-middle">카테고리</th>
                <td>
                    <select value={crewBbsDetails.type} onChange={typeChange}>
                    <option value="모집중">모집중</option>
                    <option value="모집완료">모집완료</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th className="align-middle">크루명</th>
                <td>
                    <input type="text" value={crewName} onChange={crewNameChange} size="50px" className="form-control form-control-lg" placeholder="크루명 기입"/>
                </td>
            </tr>
            <tr>
                <th className="align-middle">제목</th>
                <td>
                    <input type="text" value={title} onChange={titleChange} size="50px" className="form-control form-control-lg" placeholder="제목기입"/>
                </td>
            </tr>
            <tr>	
                <td colSpan="2">
                    <textarea rows="18" value={content} onChange={contentChange} className="form-control" placeholder="내용기입"></textarea>
                </td>
            </tr>
            <tr>	
                <th className="align-middle">이미지 업로드</th>
                <td colSpan="2">
                    <input type='file' rows="18"  className="form-control"></input>
                </td>
            </tr>
            <tr>
                <td colSpan="2" align="right" style={{ paddingTop:"20px" }}>
                    <button type="button" onClick={()=>updateBbs()} className="btn btn-primary">글수정 완료</button>
                </td>
            </tr>
            </tbody>
            </table>
    </div>
    );
};

export default CrewBbsUpdate;
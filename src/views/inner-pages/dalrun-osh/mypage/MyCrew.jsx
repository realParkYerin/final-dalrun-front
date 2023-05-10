
import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from 'axios';
import { GiUpgrade } from "react-icons/gi";
function MyCrew() {

  // 로그인 정보
  const [login, setLogin] = useState([]);

  // 크루 정보
  const [mycrewinfo, setMycrewinfo] = useState([]);

  // 나의 멤버 크루 리스트
  const [crewList, setCrewList] = useState([]);

  // 나의 총합 크루 포인트
  const [crewPoint, setCrewPoint] = useState(0);

  // 나의 크루 포인트 퍼센트
  const [pointPercent, setPointPercent] = useState(0);

  const [imgFile, setImgFile] = useState(null);

  // 크루 탈퇴 경고알림창
  const [modalIsOpen, setModalState] = useState(false);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImgFile(selectedFile);
  };

  const handleImageUploadClick = () => {
    const inputElement = document.getElementById("imageInput");
    inputElement.click();
  };

  function loading() {
    const logindata = JSON.parse(localStorage.getItem('login'));
    if (logindata) {
      console.log(logindata.memId, "님이 접속하였습니다..")
      setLogin(logindata);
      let crewSeq = JSON.parse(localStorage.getItem('login')).crewSeq;
      getMyCrewinfo(crewSeq);
      mycrewMemberList(crewSeq);
      getcrewPoint(crewSeq);


    }
  }
  // 나의 크루 정보 가져오기
  function getMyCrewinfo(crewSeq) {
    axios.get("http://localhost:3000/getMyCrewinfo", { params: { 'crewSeq': crewSeq } })
      .then(function (resp) {
        setMycrewinfo(resp.data);

      }).catch(function (err) {

      })
  };

  // 나의 크루 정보 가져오기
  function mycrewMemberList(crewSeq) {
    axios.get("http://localhost:3000/mycrewMemberList", { params: { 'crewSeq': crewSeq } })
      .then(function (resp) {
        setCrewList(resp.data);

      }).catch(function (err) {

      })
  };
  function crewLeave() {
    axios.get("http://localhost:3000/crewLeave", { params: { 'memId': login.memId } })
      .then(function (resp) {
        localStorage.removeItem('login');
        alert("다시 로그인해주세요..");
      }).catch(function (err) {

      })
  }
  function getcrewPoint(crewSeq) {
    axios.get("http://localhost:3000/getcrewPoint", { params: { 'crewSeq': crewSeq } })
      .then(function (resp) {
        setCrewPoint(resp.data);

      }).catch(function (err) {

      })
  }
  function crewUpgrade() {
    let crewSeq = JSON.parse(localStorage.getItem('login')).crewSeq;
    if (pointPercent >= 100) {
      axios.get("http://localhost:3000/crewUpgrade", { params: { 'crewSeq': crewSeq } })
        .then(function (resp) {
          setCrewPoint(resp.data);

        }).catch(function (err) {

        })
    } else {
      alert("포인트를 더 누적해주세요.")
    }
  }
  function crewLeaveAlart() {
    alert("dd")
  }


  function deleteHandler() {
    setModalState(true);
    // modalIsOpen을 true로 변경.
  }

  function closeModalHandler() {
    setModalState(false);
    // modalIsOpen을 false로 변경.
  }


  useEffect(() => {

    //localStorage.removeItem('login');

    loading();

  }, []);

  useEffect(() => {
    // 출력 확인 useEffect 
    console.log(login)
    console.log(mycrewinfo)
    console.log(crewList)
    console.log(crewPoint)
    console.log(parseInt(crewPoint / 3000 * 100));
    if (mycrewinfo.crewLevel == 1) {
      setPointPercent(parseInt(crewPoint / 3000 * 100));
    }
  })

  return (
    <div className="members container">
      <h4 className="title">내 크루</h4>
      <br />
      {login && mycrewinfo.length != 0 &&
        <div id="crewinform">
          <div className="container-xxl">
            <div className="row">
              <div className="col-4" >
                <div className="row-4" >
                  {/* 서버에서 이미지를 가져올 수 있게 폴더 명만 바꾸면 될 것 같습니다. */}
                  
                  {/* <img src={`http://localhost:3000/dalrun-jy/competition/${mycrewinfo.crewImg}`} style={{ margin: "20px" }} /> */}
                  <img src={`http://localhost:3000/dalrun-jy/competition/marathon_1.jpg`} style={{ margin: "20px" }} />

                  {/* 크루 조장일 때만 수정 가능하게 조건문 걸었습니다. 수정기능 완료 하시면 주석처리 풀어주시면 될 것 같습니다.*/}
                </div>
                <div className="row-4" style={{ marginLeft: "20px" }}>
                  <div style={{ backgroundColor: 'red', width: '60%', height: '10px', display: 'inline-block' ,marginLeft:'5px'}}>
                    <div style={{ backgroundColor: 'blue', height: '100%', width: `${pointPercent}%`,maxWidth:'100%' }}>
                    </div>
                  
                  </div>
                  <p style={{fontSize:'2px', display:'inline-block' }}> {pointPercent}/100%</p>
                 
                  <a
                    className="ptf-social-icon ptf-social-icon--style-3"
                    onClick={crewUpgrade}
                    target="_blank"
                    style={{ marginLeft: '3px' }}

                  >
                    <GiUpgrade />
                  </a>
                </div>
                {/* {login.memId == mycrewinfo.memId &&   */}
                <button onClick={handleImageUploadClick}>이미지 선택</button>
                {/* } */}



              </div>
              <div className="col-7">
                <form name="crew_frm" encType="multipart/form-data">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ margin: "20px", minWidth: "80px" }}>크루명</p>
                    {/* {login.memId === mycrewinfo.memId &&   */}

                    <input type="text" name="crewName" defaultValue={mycrewinfo.crewName} />
                    {/* ||
                 <p>{mycrewinfo.crewName}</p> 
                } */}

                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ margin: "20px", minWidth: "80px" }}>리더</p>
                    <p>{mycrewinfo.memId}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ margin: "20px", minWidth: "80px" }}>인원</p>
                    <p>50/{mycrewinfo.crewMemberCnt}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ margin: "20px", minWidth: "80px" }}>인삿말</p>

                    {/* {login.memId === mycrewinfo.memId &&   */}
                    <input type="text" name="crewSetUp" defaultValue={mycrewinfo.crewSetUp} />

                    {/* ||

                 <p>{mycrewinfo.crewSetUp}</p> 
                } */}

                  </div>
                  <div style={{ float: 'right' }}>
                    {/* {login.memId === mycrewinfo.memId &&   */}

                    <button onClick={handleImageUploadClick}>수정</button>
                    {/* } */}


                  </div>
                </form>
              </div>
            </div>
            <div>
            </div>



          </div>

          <div className="info_con">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <input 
                      type="checkbox" 
                      onChange={(e) => handleAllCheck(e.target.checked)} 
                      checked={checkedList.length === dataList.length ? true : false}
                      />
                  </th>                  
                  <th>번호</th>
                  <th>이름</th>
                  <th>아이디</th>
                  <th>직책</th>
                  <th>등급</th>
                  <th>상태</th>
                  <th>포인트</th>
                  <th>가입일</th>
                </tr>
              </thead>
              <tbody>
                {
                  crewList.map((crew, i) => {
                    return (
                      <tr key={i}>
                      <th>
                        <input 
                          type="checkbox" 
                          onChange={(e) => handleSingleCheck(e.target.checked, crew.orderSeq)} 
                          checked={checkedList.includes(crew.orderSeq) ? true : false}
                        />
                      </th>                      
                        <td>{i + 1}</td>
                        <td>{crew.memberName}</td>
                        <td>{crew.memId}</td>
                        <td>{crew.grade}</td>
                        <td>
                          {crew.memberName === mycrewinfo.memId && "리더" || "팀원"}

                        </td>
                        <td>{crew.state}</td>
                        <td>{crew.point}</td>
                        <td>{crew.regdate}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>
            
            <div style={{ textAlign: 'center' }}>
              <a className="ptf-btn ptf-btn--primary" onClick={crewLeaveAlart}
                style={{ width: '400px', padding: '10px', marginTop: '100px' }}><h5>크루 탈퇴</h5>
              </a>
            </div>
          </div>
        </div>
        ||
        <div>
          <h4 style={{ margin: '50px' }}>해당 정보는 크루 가입이 필요합니다.</h4>

          {/* 크루 가입페이지로 링크 변경해주세요 */}
          <span ><a href="/login" style={{ textDecoration: 'underline', color: '#0d6efd', fontSize: '15px', padding: '0.5rem' }}>크루 가입하러 가기</a></span>
        </div>

      }
    </div>
  )
}

export default MyCrew;
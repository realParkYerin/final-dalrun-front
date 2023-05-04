import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import BlogComment from "../../../../components/blog/BlogComment";
import BlogCommentForm from "../../../../components/blog/BlogCommentForm";
import BlogPostAuthor from "../../../../components/blog/BlogPostAuthor";
import RelatedPost from "../../../../components/blog/RelatedPost";
import CopyRight from "../../../../components/footer/copyright/CopyRight";
import Footer from "../../../../components/footer/Footer";
import Header from "../../../../components/dalrun-pyr/Header";
import ImageGridTwo from "../../../../components/image-grid/ImageGridTwo";
import SocialFour from "../../../../components/social/SocialFour";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const CrewBbsBlogDetails = () => {
let history = useNavigate();

  let crewBbsParams = useParams();
  console.log("crewBbsParams : ", crewBbsParams);
  console.log("crewBbsParams.cBbsSeq : ", crewBbsParams.cBbsSeq);

  const [crewBbsDetails, setCrewBbsDetails]= useState();
  const [loading, setLoading] = useState(false);
  const [cBbsSeq, setCBbsSeq] = useState(crewBbsParams.cBbsSeq);
  const [imgid, setImgId] = useState([]);

//   function getimgstr(){
//     axios.get("http://localhost:3000/getimgstr", {params: {"cBbsSeq": cBbsSeq /* <- 실제 cBbsSeq값이 들어갈 수 있도록 해야함 */}})
//     .then( (res) => {
//         const imgid = res.data.split('/');
//         alert(imgid);
//     });
// }

function getimgstr() {
  axios.get("http://localhost:3000/getimgstr", {
      params: {
        "cBbsSeq": cBbsSeq
      }
    })
    .then((res) => {
      const imgid = res.data.split('/');
      setImgId(imgid); //상태 변수 업데이트
      alert(imgid);

      const firstImg = imgid[0];
      alert(firstImg);
    });
}

  const crewBbsDetailsData = async(cBbsSeq) => {
    const resp = await axios.get('http://localhost:3000/crewBbsBlogDetail', {params:{"cBbsSeq": cBbsSeq}});
    console.log("resp.data : ", resp.data);

    //update state with new data
    setCrewBbsDetails(resp.data);
    setLoading(true); //rendering
  }

  useEffect(()=> {
    crewBbsDetailsData(crewBbsParams.cBbsSeq);
    getimgstr();
  }, [crewBbsParams.cBbsSeq])

  if(loading === false){
    return <div>Loading...</div> //show user - randering 
  }

  const updateBbs = () => {
    history("/crewBbsUpdate/" + crewBbsDetails.cBbsSeq);
}

  const deleteBbs = () => {
    history("/crewBbsDelete/" + crewBbsDetails.cBbsSeq);
  }


  // login한 id와 작성자 id와 같을 시에는 버튼을 보여줌
  function UpdateButtonLoad(){
    let str = localStorage.getItem('login');
    let login = JSON.parse(str);

    if(login.memId !== crewBbsDetails.memId){
      return ""
    }
    return (
      <span>
        &nbsp;<button type="button" onClick={updateBbs} className="btn btn-primary">글 수정</button>
        &nbsp;<button type="button" onClick={deleteBbs} className="btn btn-primary">글 삭제</button>
      </span>
    )
  }

  return (
    <div className="ptf-site-wrapper animsition ptf-is--blog-grid">
      <Helmet>
        <title>DalrunDalrun - Crew Bbs Details</title>
      </Helmet>
      {/* End Page SEO Content */}
      <div className="ptf-site-wrapper__inner">
        <Header />
        {/* End  Header */}

        <div className="main">
          <article className="ptf-single-post">
            {/* <!--Post Header--> */}
            <header className="ptf-single-post__header ptf-single-post__header--style-1">
              <div className="container-xxl">
                <h1 className="ptf-single-post__title">
                  {/* 크루명 가져오기 */}
                  &lt;{crewBbsDetails.type}&gt;<br></br>{crewBbsDetails.crewName}
                </h1>
                <div className="ptf-single-post__meta">
                  {/* 글쓴 회원 아이디 */}
                  <span className="cat">{crewBbsDetails.memId}</span>
                  {/* 글 작성일 */}
                  <span className="date">{crewBbsDetails.wdate}</span>
                  {/* 조회수 */}
                  <span className="date">조회수 : {crewBbsDetails.readcount}</span><br></br>
                </div>
              </div>
            </header>

            {/* <!--Post Media--> */}
            <div className="ptf-single-post__media">
              <div className="container-xxl">
                {/* 크루 대표 이미지 -> 글작성시 첨부한 이미지 */}
                   <img src={"http://localhost:3000/getimg?imgid=" + imgid[0]} alt="blog post" loading="lazy" />
              </div>
            </div>
            {/* <!--Post Wrapper--> */}
            <div className="ptf-single-post__wrapper">
              <div className="container-xxl">
                <div className="row">
                  <div className="col-xl-8 offset-xl-2">
                    {/* <!--Post Info--> */}
                    <div className="ptf-single-post__info">
                      <a className="author" href="#">
                        <i className="lnil lnil-user"></i> <span>크루소개</span>
                      </a>
                      <a className="view" href="#">
                        <i className="lnil lnil-eye"></i>게시판
                      </a>
                      <a className="comments" href="#">
                        <i className="lnil lnil-comments"></i>크루멤버
                      </a>
                      <a className="report" href="#">
                        <i className="lnil lnil-warning"></i>좋아요
                      </a>
                    </div>

                    {/* <!--Post Excerpt--> */}
                    {/* <span className="has-accent-1">Pavel Murren</span> -> 강조*/}
                    {/* title */}
                    <div className="ptf-single-post__excerpt">
                    {crewBbsDetails.title}
                    {/* <span className="has-accent-1">{crewBbsDetails.title}</span> */}
                      {/* To mark the first UK show of artist Henri Barande, graphic
                      designer{" "}
                      <span className="has-accent-1">Pavel Murren</span> and
                      German studio Schultzschultz have created The Lodge
                      Wooden. */}
                    </div>

                    {/* <!--Post Content--> */}
                    {/* content */}
                    <div className="ptf-single-post__content">
                      {crewBbsDetails.content}
                      <div
                        className="ptf-spacer"
                        style={{ "--ptf-xxl": "5rem", "--ptf-md": "2.5rem" }}
                      ></div>
                      {/* 이미지 리스트 뿌리기 */}
                    {/* {imgid.map((img) => (
                   <img src={"http://localhost:3000/getimg?imgid=" + img} alt="blog post" loading="lazy" />
                ))} */}
                   {imgid.map((imgid) => (
                      <img key={imgid} src={`http://localhost:3000/getimg?imgid=${imgid}`} alt="blog post" loading="lazy" />
                    ))}

                      <ImageGridTwo />

                      {/* <!--Spacer--> */}
                      <div
                        className="ptf-spacer"
                        style={{ "--ptf-xxl": "5rem", "--ptf-md": "2.5rem" }}
                      ></div>
                      <p>
                        The short answer is yes. According to Kross, when you
                        think of yourself as another person, it allows you lorem
                        ispumgive yourself more. Notre dame at sumeobjective,
                        helpful feedback.
                      </p>
                      <UpdateButtonLoad />
                      {/* <!--Spacer--> */}
                      <div
                        className="ptf-spacer"
                        style={{
                          "--ptf-xxl": "6.25rem",
                          "--ptf-md": "3.125rem",
                        }}
                      ></div>
                      <div
                        className="ptf-spacer"
                        style={{ "--ptf-xxl": "7.5rem", "--ptf-md": "3.75rem" }}
                      ></div>
                      <h3>Defaulting to Mindfulness</h3>
                      {/* <!--Spacer--> */}
                      <div
                        className="ptf-spacer"
                        style={{
                          "--ptf-xxl": "1.875rem",
                          "--ptf-md": "1.5625rem",
                        }}
                      ></div>
                      <p>
                        Cray post-ironic plaid, Helvetica keffiyeh tousled
                        Carles banjo before they sold out blog photo booth Marfa
                        semiotics Truffaut. Mustache Schlitz next level blog
                        Williamsburg, deep v typewriter tote bag Banksy +1
                        literally.
                      </p>
                      <ul style={{ lineHeight: "2" }}>
                        <li>
                          Welsh novelist Sarah Waters sums it up eloquently
                        </li>
                        <li>
                          In their classic book, Creativity in Business, based
                          on a popular course they co-taught
                        </li>
                        <li>Novelist and screenwriter Steven Pressfield</li>
                      </ul>
                      {/* <!--Spacer--> */}
                      <div
                        className="ptf-spacer"
                        style={{ "--ptf-xxl": "1.875rem" }}
                      ></div>
                      <p>
                        That immediately brought to mind one of{" "}
                        <a
                          className="text-decoration-underline has-accent-4"
                          href="#"
                        >
                          my fondest
                        </a>{" "}
                        memories, involving my daughter when she was just a
                        toddler of one.
                      </p>
                    </div>

                    {/* <!--Post Footer--> */}
                    <footer className="ptf-single-post__footer">
                      {/* <!--Post Tags--> */}
                      <div className="ptf-post-tags">
                        <a href="#">WordPress</a>
                        <a href="#">Theme</a>
                        <a href="#">Creative</a>
                      </div>
                      {/* <!--Post Socials--> */}
                      <div className="ptf-post-socials">
                        <span>Share on</span>
                        <SocialFour />
                      </div>
                    </footer>

                    {/* <!--About Author--> */}
                    <BlogPostAuthor />
                    {/* End .ptf-about-author */}

                    {/* <!--Related Posts--> */}
                    <div className="ptf-related-posts">
                      <h2 className="ptf-related-posts__title">
                        Related Posts
                      </h2>
                      <div className="ptf-isotope-grid">
                        <div
                          className="row"
                          style={{ "--bs-gutter-y": "2rem" }}
                        >
                          <RelatedPost />
                        </div>
                      </div>
                    </div>
                    {/* End .ptf-related-posts */}

                    {/* <!--Comments--> */}
                    <section className="ptf-page-comments">
                      {/* <!--Comments list--> */}
                      <div className="ptf-page-comments__list">
                        <h2 className="ptf-page-comments__title">
                          03 Comments:
                        </h2>
                        <BlogComment />
                      </div>

                      {/* <!--Comments form--> */}
                      <div className="ptf-page-comments__form">
                        <h2 className="ptf-page-comments__title">
                          Leave a comment:
                        </h2>
                        <BlogCommentForm />
                      </div>
                    </section>

                    {/* <!--Post Navigation--> */}
                    <div className="ptf-post-navigation ptf-post-navigation--style-1">
                      <span>Next Post</span>
                      <Link className="h1 ptf-filled-link" to="/blog-details-sidebar">
                        Minimalist Trends
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      {/* End .main */}

      {/* <!--Footer--> */}
      <footer className="ptf-footer ptf-footer--style-1">
        <div className="container-xxl">
          <div className="ptf-footer__top">
            <Footer />
          </div>
          <div className="ptf-footer__bottom">
            <CopyRight />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CrewBbsBlogDetails;

import React from "react";
import Preview from "../views/Preview";
// Homepage Demo
import HomeDefault from "../views/all-home-version/HomeDefault";
import HomeStudio from "../views/all-home-version/HomeStudio";
import HomeAgency from "../views/all-home-version/HomeAgency";
import HomeMinimal from "../views/all-home-version/HomeMinimal";
import HomeTrending from "../views/all-home-version/HomeTrending";
import HomeFreelancer from "../views/all-home-version/HomeFreelancer";
import HomeDark from "../views/all-home-version/HomeDark";
import HomeModern from "../views/all-home-version/HomeModern";
// Service
import Service from "../views/inner-pages/service/Service";
import ServiceDetails from "../views/inner-pages/service/ServiceDetails";

// About
import AboutUs from "../views/inner-pages/about/AboutUs";
import AboutMe from "../views/inner-pages/about/AboutMe";

// Blog
import BlogGrid from "../views/inner-pages/blog/BlogGrid";
import BlogMasonry from "../views/inner-pages/blog/BlogMasonry";
import BlogSidebar from "../views/inner-pages/blog/BlogSidebar";
import BlogDetails from "../views/inner-pages/blog/BlogDetails";
import BlogDetailsSidebar from "../views/inner-pages/blog/BlogDetailsSidebar";

// Portfolio
import WorksGrid from "../views/inner-pages/portfolio/WorksGrid";
import WorksMasonry from "../views/inner-pages/portfolio/WorksMasonry";
import WorksListing from "../views/inner-pages/portfolio/WorksListing";
import WorksCarousel from "../views/inner-pages/portfolio/WorksCarousel";
import WorksShowcase from "../views/inner-pages/portfolio/WorksShowcase";

// Others
import Contact from "../views/inner-pages/Contact";
import PricingInner from "../views/inner-pages/PricingInner";
import Team from "../views/inner-pages/Team";
import ComingSoon from "../views/inner-pages/ComingSoon";
import Faq from "../views/inner-pages/Faq";
import NotFound from "../views/NotFound";
import { Routes, Route } from "react-router-dom";
import ScrollTopBehaviour from "../components/ScrollTopBehaviour";

// admin
import Admin from "../views/dalrun-asj/Admin";
import AdminDashboard from "../views/dalrun-asj/inner/AdminDashboard";
import AdminMember from "../views/dalrun-asj/inner/admin-members/AdminMember";
import AdminCrew from "../views/dalrun-asj/inner/admin-members/AdminCrew";
import AdminProductinquiry from "../views/dalrun-asj/inner/admin-bbs/admin-question/AdminProductinquiry";
import AdminQna from "../views/dalrun-asj/inner/admin-bbs/admin-question/AdminQna";
import AdminShoereview from "../views/dalrun-asj/inner/admin-bbs/AdminShoereview";
import AdminDiary from "../views/dalrun-asj/inner/admin-bbs/AdminDiary";
import AdminCompetition from "../views/dalrun-asj/inner/admin-bbs/AdminCompetition";
import AdminProduct from "../views/dalrun-asj/inner/admin-store/AdminProduct";
import AdminOrder from "../views/dalrun-asj/inner/admin-store/AdminOrder";
import AdminStock from "../views/dalrun-asj/inner/admin-store/AdminStock";
import AdminChart from "../views/dalrun-asj/inner/AdminChart";

const AllRoutes = () => {
  return (
    <>
      <ScrollTopBehaviour />
      <Routes>
        <Route path="/" element={<Preview />} />
        {/*  Homepage Demo */}
        <Route path="/home-default" element={<HomeDefault />} />
        <Route path="/home-studio" element={<HomeStudio />} />
        <Route path="/home-agency" element={<HomeAgency />} />
        <Route path="/home-minimal" element={<HomeMinimal />} />
        <Route path="/home-trending" element={<HomeTrending />} />
        <Route path="/home-freelancer" element={<HomeFreelancer />} />
        <Route path="/home-dark" element={<HomeDark />} />
        <Route path="/home-modern" element={<HomeModern />} />

        {/* Service */}
        <Route path="/service" element={<Service />} />
        <Route path="/service-details" element={<ServiceDetails />} />

        {/* About */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/about-me" element={<AboutMe />} />

        {/* Blog */}
        <Route path="/blog-grid" element={<BlogGrid />} />
        <Route path="/blog-masonry" element={<BlogMasonry />} />
        <Route path="/blog-sidebar" element={<BlogSidebar />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/blog-details-sidebar" element={<BlogDetailsSidebar />} />

        {/* Portfolio */}
        <Route path="/works-grid" element={<WorksGrid />} />
        <Route path="/works-masonry" element={<WorksMasonry />} />
        <Route path="/works-listing" element={<WorksListing />} />
        <Route path="/works-carousel" element={<WorksCarousel />} />
        <Route path="/works-showcase" element={<WorksShowcase />} />

        {/* others */}
        <Route path="/team" element={<Team />} />
        <Route path="/pricing" element={<PricingInner />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/members/member" element={<AdminMember />} />
        <Route path="/admin/members/crew" element={<AdminCrew />} />
        <Route path="/admin/bbs/question/productinquiry" element={<AdminProductinquiry />} />
        <Route path="/admin/bbs/question/qna" element={<AdminQna />} />
        <Route path="/admin/bbs/shoereview" element={<AdminShoereview />} />
        <Route path="/admin/bbs/diary" element={<AdminDiary />} />
        <Route path="/admin/bbs/compet=ition" element={<AdminCompetition />} />
        <Route path="/admin/store/product" element={<AdminProduct />} />
        <Route path="/admin/store/order" element={<AdminOrder />} />
        <Route path="/admin/store/stock" element={<AdminStock />} />
        <Route path="/admin/chart" element={<AdminChart />} />
      </Routes>
    </>
  );
};

export default AllRoutes;

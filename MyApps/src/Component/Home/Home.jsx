import React from "react";
import Header from "../Header/Header";
import "./Home.css";
import Tittle from "../Home-main/Tittle";
import Downimg from "../Home-main/Downimage/Downimg";
import Features from "../Home-main/features/Features";
import Why from "../Home-main/Section-2/Why";
import Cal from "../Home-main/calculatorinfo/Cal";
import Dashboard from "../Home-main/Dashboard/Dashboard";
import Ai from "../Home-main/AI_assit/Ai";
import ServicesSection from "../ServiceArea/ServicesSection";
import HeroSection from "../HeroSection/HeroSection";
const Home = () => {
  return (
    <div>
      <div className="top-section w-full h-220 bg-slate-300">
        <div class="custom-shape-divider-bottom-1748752237">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div>
          <Header></Header>
        </div>

        <Tittle></Tittle>
        
      </div>
      <Downimg></Downimg>
      <div className="inside">
      <Features></Features>
      </div>

<div> 
<ServicesSection></ServicesSection>

</div>



      <div className="whyChooseus">

      <HeroSection></HeroSection>

      </div>

      <div className="new-1">
      <Cal></Cal>
      </div>

      <div className="Dashboard mt-20">
        <Dashboard></Dashboard>
      </div>

      <div className="Ai_Assit mt-20">
      <Ai></Ai>
      </div>
    </div>
  );
};

export default Home;

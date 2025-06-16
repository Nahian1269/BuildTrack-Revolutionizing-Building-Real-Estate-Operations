import React from "react";
import pic from "./21.png";
import pic2 from "./22.png";
import'../calculatorinfo/Cal.css';
const Cal = () => {
  return (
    <div className="ml-40 mr-40 relative">
      <div className="mew bg-slate-400 mt-10 h-100 w-full rounded-full relative ">
        <div className="flex justify-center items-center -ml-50">
          <div className="relative flex items-center">
            <div className="img flex items-center h-110 ">
              <div>
                <img src={pic}></img>
              </div>
              <div className="-ml-80">
                <img src={pic2}></img>
              </div>
            </div>
            <div className=" text relative z-1">
              <h1 className=" put text-4xl">
                Enjoy Your Personal Finance Manager <br></br>
                with Intelligent Calculator
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cal;

import pic from "./28.png";
import nex from "./163.png";
import './Ai.css'
const Ai = () => {
  return (
    <div>
      <div className="w-full h-120 flex">
        <img className="w-2/5 h-120" src={pic}></img>
        <div className=" side1 w-3/5 h-120 bg-purple-500 relative flex justify-center items-center text-center text-5xl ">
          <h1 className="absolute">Free Customer Support <br></br> with <br></br> AI help Assistant</h1>
          <div className="w-25 h-25  rounded-full ml-200 mt-115 border-white border-2 ">
          <img src={nex}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;

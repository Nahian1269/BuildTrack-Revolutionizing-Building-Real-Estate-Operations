import "./why.css";
import ico from "./image 24.png";

const Why = () => {
  return (
    <div className="mark bg-black w-full h-120 relative">
      <div className="background w-full h-120"></div>
      <div className=" grid place-items-center h-120">
        <div className=" check relative flex justify-center items-center text-center">
          <div>
            <div className="flex justify-center">
              <img src={ico}></img>
            </div>

            <h1 className="Tittle text-4xl">Why Choose Us ?</h1>
            <div className="flex justify-center mt-2 mb-3">
              <hr className="w-20 border-3 rounded-xl border-amber-500 "></hr>
            </div>

            <h3 className="main text-2xl">
              We are serving revolutionary build and real state operation
              manager solution with <br></br> smooth UI and High features at low
              cost subscription. This Web application is for<br></br>
              both builders and Customers friendly . Also people can get
              suppliers , Rajuk <br></br>Plan , Rules and Regulation guidelines
              with AI support{" "}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;

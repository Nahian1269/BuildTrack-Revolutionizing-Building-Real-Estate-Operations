import fit2 from "./Component/icons8-property-96.png";
import fit3 from "./Component/icons8-dashboard-96.png";
import fit4 from "./Component/icons8-supplier-96.png";
import fit5 from "./Component/icons8-construction-96.png";
import fit6 from "./Component/icons8-bill-96.png";
import fit7 from "./Component/icons8-plan-96.png";
import "../features/new.css";

const Features = () => {
  return (
    <div>
      <div className="insideus text-black text-4xl font-bold mb-10 text-center">
        <h1 className="xox">Key Features</h1>
      </div>
      <div className="flex justify-center">
        <div className=" grid grid-cols-6 gap-10 text-lg font-bold ">
          <div className="fit-1 text-center btn w-60 h-auto bg-white p-5 hover:bg-orange-100 rounded-3xl  ">
            <div>
              <img src={fit2}></img>
              <h1 className="text-black">Property Manager</h1>
            </div>
          </div>

          <div className="fit-2  text-center btn w-60 h-auto bg-white p-5  hover:bg-orange-100 rounded-3xl">
            <div>
              <img src={fit3}></img>
              <h1 className="text-black">Dashboard</h1>
            </div>
          </div>
          <div className="fit-3  text-center btn w-60 h-auto bg-white p-5  hover:bg-orange-100 rounded-3xl">
            <div>
              <img src={fit4}></img>
              <h1 className="text-black">Supplier</h1>
            </div>
          </div>
          <div className="fit-4  text-center btn w-60 h-auto bg-white p-5  hover:bg-orange-100 rounded-3xl">
            <div>
              <img src={fit5}></img>
              <h1 className="text-black">Developer</h1>
            </div>
          </div>
          <div className="fit-5  text-center btn w-60 h-auto bg-white p-5  hover:bg-orange-100 rounded-3xl">
            <div>
              <img src={fit6}></img>
              <h1 className="text-black">Finance</h1>
            </div>
          </div>
          <div className="fit-6  text-center btn w-60 h-auto bg-white p-5  hover:bg-orange-100 rounded-3xl">
            <div>
              <img src={fit7}></img>
              <h1 className="text-black">Rajuk</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

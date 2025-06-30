import fit2 from "./Component/icons8-property-96.png";
import fit3 from "./Component/icons8-dashboard-96.png";
import fit4 from "./Component/icons8-supplier-96.png";
import fit5 from "./Component/icons8-construction-96.png";
import fit6 from "./Component/icons8-bill-96.png";
import fit7 from "./Component/icons8-plan-96.png";
import "../features/new.css";
import { NavLink } from "react-router-dom";

const features = [
  { img: fit2, label: "Property Manager", link: "/propertypage" },
  { img: fit3, label: "Dashboard", link: "/dashpage" },
  { img: fit4, label: "Supplier", link: "/supplier" },
  { img: fit5, label: "Developer", link: "/devpage" },
  { img: fit6, label: "Finance", link: "/Finpage" },
  { img: fit7, label: "Rajuk", link: "/rajukpage" },
];

const Features = () => {
  return (
    <div>
      <div className="insideus text-black text-4xl font-bold mb-10 text-center">
        <h1 className="xox">Key Features</h1>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-6 gap-10 text-lg font-bold">
          {features.map((feature, idx) => (
            <NavLink
              to={feature.link}
              key={idx}
              className="fit-1 text-center btn w-60 h-auto bg-white p-5 hover:bg-orange-100 rounded-3xl"
              style={{ textDecoration: "none" }}
            >
              <div>
                <img src={feature.img} alt={feature.label} />
                <h1 className="text-black">{feature.label}</h1>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

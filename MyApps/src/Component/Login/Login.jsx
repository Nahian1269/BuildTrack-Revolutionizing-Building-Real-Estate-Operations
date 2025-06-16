import { Outlet } from "react-router-dom";
import Head from "./Component/Head/Head";
import Logmain from "./Component/loginmain/Logmain";


const Login = () => {
    return (
        <div>
        <div>
        <Head></Head>
        </div>
        <div className="flex justify-start ml-50 my-30">
            <Logmain></Logmain>
        </div>
        </div>
    );
};

export default Login;
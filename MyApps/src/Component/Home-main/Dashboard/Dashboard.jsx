import dash from './image 26.png' ;
import'../Dashboard/Dassh.css'
const Dashboard = () => {
    return (
        <div className=''>
  <div className="h-100 w-full flex justify-center items-center">
            <div className='relative'>
                <img className='absolutes' src={dash}></img>
            </div>
            <div className='txt relative'>
                <h1 className='text-2 text-9xl font-bold -ml-40 text-purple-800'>Accessible</h1>
                <h2 className='text-right text-4xl font-bold text-black'>Dashboard</h2>
            </div>
        </div>
        </div>
      
    );
};

export default Dashboard;
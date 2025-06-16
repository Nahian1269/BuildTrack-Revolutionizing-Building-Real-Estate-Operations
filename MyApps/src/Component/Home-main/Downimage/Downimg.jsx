import house from './house.png'
import'../Downimage/Down.css'
const Downimg = () => {
    return (

          <div style={{ position: "relative", height: 200 }}>
      <div
        style={{
          position: "absolute",
          right: 0,
        }} className=' -mt-120'
      >

  <img className='lg:w-220 h-auto' src={house}></img>

      </div>
    </div>

    );
};

export default Downimg;
import React from 'react';

const Sidebar = () => {
    return (
        <div>
            <div className='text-black mt-10'>
                <h1 className='text-3xl font-bold color'>BuildTrack</h1>
                <ul className='text-xl font-medium'>
                    <li className='p-6'>Overview</li>
                    <li className='p-6'>Your Project</li>
                    <li className='p-6'>Rajuk Plan</li>
                    <li className='p-6'>Finance Calculator</li>
                    <li className='p-6'>Contact Developer</li>
                    <li className='p-6'>Supplier</li>
                    <li className='p-6'>Check Bank Loan</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
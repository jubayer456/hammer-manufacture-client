import React, { useEffect, useState } from 'react';
import Tool from './Tool';

const Tools = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetch('https://agile-chamber-23774.herokuapp.com/tools')
            .then(res => res.json())
            .then(data => setTools(data))
    }, [tools])
    return (
        <div className='p-12'>
            <h1 className='text-center text-xl font-bold'>OUR TOOLS</h1>
            <h3 className='text-center text-4xl pb-4'>Tools We Provide</h3>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {tools.map((tool, index) => <Tool
                    key={tool._id}
                    tool={tool}
                ></Tool>)}
            </div>

        </div>
    );
};

export default Tools;
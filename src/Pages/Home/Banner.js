import React from 'react';
import banner from '../../img/banner.jpg'
const Banner = () => {
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse p-12">
                <img src={banner} className="max-w-sm rounded-lg " alt='banner' />
                <div>
                    <h1 className="text-5xl font-bold">Get start your startup business</h1>
                    <p className="py-6">Our mission is to be Earth's most customer-centric company. This is what unites Amazonians across teams and geographies as we are all striving to delight our customers and make their lives easier, one innovative product, service, and idea at a time.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
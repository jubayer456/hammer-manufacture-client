import React from 'react';

const Blog = () => {
    return (
        <div className='p-12'>
            <h1 className='text-5xl text-center'>My Blog</h1>
            <div className=''>
                <h3 className='text-2xl font-bold py-3'>1.How will you improve the performance of a React Application?</h3>
                <p className='text-xl'>need to make sure that the components receive only the required props. This will allow  to control CPU costs and avoid unnecessary rendering of unnecessary features. The solution is to create a functional component that will collect all the props and redistribute them to other components.</p>
                <h3 className='text-2xl font-bold py-3'>What are the different ways to manage a state in a React application?</h3>
                <p className='text-xl'>Four kind of react state management <br />
                    1. Local state:  Local state is data we manage in one or another component.
                    2. Global state: Global state is data we manage across multiple components.
                    3. Server state: Data that comes from an external server that must be integrated with our UI state.
                    4. URL state:  Data that comes from an external server that must be integrated with our UI state.
                </p>
                <h3 className='text-2xl font-bold py-3'>How does prototypical inheritance work?</h3>
                <p className='text-xl '>Prototype Inheritance is a feature of JavaScript that is used to add methods and features to objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, to get and set an [prototype] of an object, we use the object. getPrototypeOf and object</p>
                <h3 className='text-2xl font-bold py-3'>You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h3>
                <p className='text-xl'> Products.filter(product=> product.name)</p>
            </div>
        </div>
    );
};

export default Blog;
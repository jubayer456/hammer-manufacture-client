import React from 'react';

const Contact = () => {
    return (
        <div>
            <p className='text-center text-xl text-praimary font-bold'>contact us</p>
            <h1 className='text-center text-3xl'>Stay connect with us</h1>
            <form action="mailto:talhajubayer678@gmail.com.com" className='flex flex-col gap-4 py-5'>
                <input type="email" placeholder="Email" class="input input-bordered input-primary  w-full  max-w-xs mx-auto" />
                <input type="text" placeholder="Subject" class="input input-bordered input-primary  w-full  max-w-xs mx-auto" />
                <textarea type="text" placeholder="Your Message" class="input input-bordered input-primary w-full  max-w-xs mx-auto" cols="30" rows="5" />
                <button type='submit' className='btn w-24 mx-auto'>submit</button>

            </form>
        </div>
    );
};

export default Contact;
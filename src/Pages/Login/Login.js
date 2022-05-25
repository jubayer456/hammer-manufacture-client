import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../Hooks/useToken';
import Loading from '../Shared/Loading';


const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signInWithEmailAndPassword, user, loading, error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [token] = useToken(gUser || user);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '';
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from])

    if (gLoading || loading) {
        return <Loading></Loading>
    }
    let errorElement;
    if (error || gError) {
        errorElement = <p className='text-red-500'>{error?.message || gError?.message}</p>
    }
    const onSubmit = async data => {
        await signInWithEmailAndPassword(data.email, data.password);
    };
    return (
        <div>
            <div class="card w-96 bg-base-100 shadow-xl mx-auto my-8">
                <div class="card-body">
                    <h2 class="font-bold text-3xl text-center">Login!!!</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input
                                type='email'
                                placeholder="Your Email"
                                class="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+[a-z]{2,3}/,
                                        message: "Please provide a valid email"
                                    }
                                })} />
                            <label class="label">
                                {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}

                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input
                                type='password'
                                placeholder="Your Email"
                                class="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Please provide mimimum 6 length password"
                                    }
                                })} />
                            <label class="label">
                                {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                            <label class="label">
                                <span class="label-text">Forgot password?</span>
                            </label>
                        </div>
                        {errorElement}
                        <input type="submit" class="btn btn-primary w-full" value='Login' />
                    </form>
                    <p>New to hammer manufacture <Link to="/register" className='text-green-500'> Create new account</Link></p>
                    <div class="divider">OR</div>
                    <button className='btn' onClick={() => signInWithGoogle()}>Google login</button>
                </div>

            </div>

        </div>

    );
};

export default Login;
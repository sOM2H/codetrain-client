import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/AuthProvider";
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const auth = useAuth();

  if (auth.token && auth.email){
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    setErrorMessage(null);

    try {
      await auth.loginAction(data)
    } catch (error) {
     setErrorMessage('Invalid email or password');
    }
  };

  return (
    <>
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="row w-100">
          <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
            <div className="card col-lg-4 mx-auto">
              <div className="card-body px-5 py-5">
                <h3 className="card-title text-start mb-3">Login</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      className="form-control p_input"
                      id="email"
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div className="form-group">
                    <label>Password *</label>
                    <input
                      className="form-control p_input"
                      id="password"
                      type="password"
                      {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                  <div className="text-center d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-block enter-btn">Login</button>
                  </div>
                  <p className="sign-up">Don't have an Account?<a href="/signup"> Sign Up</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="../assets/vendors/js/vendor.bundle.base.js"></script>
    </>
  )
};

export default Login;

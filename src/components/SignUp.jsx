import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/AuthProvider";
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const auth = useAuth();

  if (auth.accessToken && auth.login){
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    setErrorMessage(null);

    try {
      await auth.signupAction(data)
    } catch (error) {
     setErrorMessage('This login address has been already taken by another user');
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
                <h3 className="card-title text-start mb-3">Sign Up</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      className="form-control p_input"
                      id="full_name"
                      type="text"
                      {...register('full_name', { required: 'Full Name is required' })}
                    />
                    {errors.full_name && <p>{errors.full_name.message}</p>}
                  </div>
                  <div className="form-group">
                    <label>Login *</label>
                    <input
                      className="form-control p_input"
                      id="login"
                      type="text"
                      {...register('login', { required: 'Login is required' })}
                    />
                    {errors.login && <p>{errors.login.message}</p>}
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
                  <div className="form-group">
                    <label>Password Confirmation*</label>
                    <input
                      className="form-control p_input"
                      id="password_confirmation"
                      type="password"
                      {...register('password_confirmation', { required: 'Password Confirmation is required' })}
                    />
                    {errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}
                  </div>
                  <div className="text-center d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-block enter-btn">Sign Up</button>
                  </div>
                  <p className="sign-up">Already have an Account?<a href="/login"> Login</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="../assets/vendors/js/vendor.bundle.base.js"></script>
    </>
  );
}

export default SignUp;

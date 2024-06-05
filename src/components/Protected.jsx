import React from "react";
import axios from 'axios';

const Login = (props) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/auth/sign_in', data);

      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("access-token", JSON.stringify(response.headers['access-token']));

      setErrorMessage(null);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="form-control"
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
        </div>
        { loading ?
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
          :
            <button type="submit" className="btn btn-primary">Login</button>
        }

      </form>
    </div>
  );
};

export default Login;

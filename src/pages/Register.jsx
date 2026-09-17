import { Navigate } from 'react-router-dom';


export default function Register() {
  return (
    <Navigate
      replace
      to="/login"
    />
  );
}

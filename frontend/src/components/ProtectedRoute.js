
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, ...props }) {

    const { isLoggedIn } = props;

    return (
        isLoggedIn
            ? <Component {...props} />
            : <Navigate to='/sign-in' replace />
    );
}

export default ProtectedRoute;

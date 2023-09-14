import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";


const SocialLogIn = () => {
    const { googleSignIn, facebookSignIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser)
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, photoURL: loggedInUser.photoURL }
                return fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                });
            })
            .then(res => res.json())
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true })
            })
    }

    // const handleFacebookSignIn = () => {
    //     facebookSignIn()
    //         .then(result => {
    //             const loggedInUser = result.user;
    //             console.log(loggedInUser)
    //             const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
    //             return fetch('http://localhost:5000/users', {
    //                 method: 'POST',
    //                 headers: {
    //                     'content-type': 'application/json'
    //                 },
    //                 body: JSON.stringify(saveUser)
    //             });
    //         })
    //         .then(res => res.json())
    //         .then(() => {
    //             Swal.fire({
    //                 position: 'top-end',
    //                 icon: 'success',
    //                 title: 'User created successfully.',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });
    //             navigate(from, { replace: true })
    //         })
    // }
    return (
        <div>
            {/* add google login field */}

            <div className="w-full text-center my-8">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline"><FaGoogle></FaGoogle></button>
                {/* <button onClick={handleFacebookSignIn} className="btn btn-circle btn-outline ms-3"><FaFacebookF /></button> */}
            </div>


        </div>
    );
};

export default SocialLogIn;
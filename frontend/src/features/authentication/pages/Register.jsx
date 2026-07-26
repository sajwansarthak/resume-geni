import React from "react";

const Register = () =>{

    const handleSubmit = (e) =>{
        e.preventDefault()
    }
    return(
        <main>
            <div className="form-container">
                <h1>Register new user</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter username"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter email address" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" placeholder="Enter password" />
                    </div>

                    <button className="button primary-button">Register</button>
                </form>
            </div>
        </main>
    )
}
//after creating the login and register ui -> We have to create anavigation ui so user can switch between register and login

export default Register
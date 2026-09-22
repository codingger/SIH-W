import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

   async function handleLogin() {

    if (!email || !password || !role) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const response = await axios.post(
            "http://localhost:3000/login",
            {
                email: email,
                password: password,
                role: role
            }
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.data)
        );

        if (response.data.role === "citizen") {
            navigate("/");
        }

        else if (response.data.role === "university") {
            navigate("/university");
        }

        else if (response.data.role === "company") {
            navigate("/company");
        }

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Login failed."
        );

    }
}

    async function handleRegister() {

        if (!name || !email || !password || !role) {
            alert("Please fill all fields.");
            return;
        }

        try {

            await axios.post(
                "http://localhost:3000/register",
                {
                    name: name,
                    email: email,
                    password: password,
                    role: role
                }
            );

            alert("Registration successful. You can now login.");

            setName("");
            setEmail("");
            setPassword("");
            setRole("");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed."
            );

        }
    }

    return (
        <div>

            <h1>Login / Register</h1>

            <div>

                <label>Name</label>
                <br />

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                />

            </div>

            <br />

            <div>

                <label>Email</label>
                <br />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />

            </div>

            <br />

            <div>

                <label>Password</label>
                <br />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                />

            </div>

            <br />

            <div>

                <label>Select Role</label>
                <br />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >

                    <option value="">Select Role</option>
                    <option value="citizen">Citizen</option>
                    <option value="university">University</option>
                    <option value="company">Company</option>

                </select>

            </div>

            <br />

            <button onClick={handleLogin}>
                Login
            </button>

            <button onClick={handleRegister}>
                Register
            </button>

        </div>
    );
}

export default Login;

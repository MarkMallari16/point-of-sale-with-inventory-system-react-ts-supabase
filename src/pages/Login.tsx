import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { loginUser } from "../services/api/login";
import { useNavigate } from "react-router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    //login user
    const handleLogin = async () => {
        setError("")

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Invalid email format");
            return;
        }

        setLoading(true)

        try {
            const user = await loginUser(email, password);

            if (user) {
                login(user)
                navigate(`/${user.role}/dashboard`)
                setLoading(false)
            } else {
                setError("Invalid email or password!");
                setLoading(false)
            }
        } catch (error) {
            console.log("Login error", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false)
        }
    }
    const handleKeyEnterLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        if (value) {
            setError("")
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);

        if (value) {
            setError("");
        }
    }

    return (
        <div className="px-4 lg:px-0 bg-emerald-50  min-h-screen grid place-items-center">
            <div className=" bg-white shadow-xl px-10 py-14 rounded-md w-full lg:w-1/4  ring-1 ring-inset ring-gray-200">

                <div className="flex flex-col justify-center items-center text-center">
                    <div className="bg-linear-to-r from-emerald-400 to-emerald-500 mb-4 rounded-md">
                        <span className="material-symbols-outlined p-4">
                            pets
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-medium">Mallari's Poultry Supply</h2>
                        <p className="text-gray-500">Pet Supplies</p>
                    </div>
                </div>
                <div className="mt-10">
                    <label htmlFor="username" className="font-medium">Email</label>
                    <input type="email" value={email} onChange={handleEmailChange} onKeyUp={handleKeyEnterLogin} className="mt-1 input input-md w-full focus:outline-success" placeholder="Enter username" />
                </div>
                <div className="mt-4">
                    <label htmlFor="username" className="font-medium">Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} onKeyUp={handleKeyEnterLogin} className="mt-1 input input-md   w-full focus:outline-success" placeholder="Enter password" />
                </div>
                {error && (
                    <div className="mt-2">
                        <p className="text-error">{error}</p>
                    </div>
                )}
                <div className="mt-4">
                    <button onClick={handleLogin} className="btn btn-md bg-linear-to-r from-emerald-400 to-emerald-500 disabled:opacity-50 disabled:bg-none disabled:text-gray-500 disabled:cursor-not-allowed hover:from-emerald-400 hover:to-emerald-600 w-full transition-all ease-in-out" disabled={loading || !email || !password}>{loading ? 'Logging in...' : 'Log in'}</button>
                </div>
            </div>
        </div>
    )
}

export default Login
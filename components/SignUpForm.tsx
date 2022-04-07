/* eslint-disable prettier/prettier */
import axios from "axios";
import { useState } from "react";

import InputElement from "@components/Input";

const SignUpForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        return axios
            .post("/api/auth/signup", {
                name,
                email,
                password,
            })
            .then(() => {
                alert("Registration successful");
                window.location.replace("/dashboard/overview");
            })
            .catch((e) => {
                setIsSubmitting(false);
                const errorMessage = e.response?.data?.message;
                alert(errorMessage || e.message);
            });
    }

    return (
        <>
            <div className="p-2 border-2 shadow-md box-border">
                <div className="p-4 text-left md:p-7">
                    <h1 className=" text-2xl font-sans font-extrabold ">Start your 14-day free trial</h1>
                    <p>
                        <strong>No credit card required</strong> Try all pro features for 14 days. Upgrade at anytime to
                        Pro for $12/month.
                    </p>{" "}
                    <br />
                    <hr />
                </div>
                <div className="p-2 mb-5">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block">Fullname</label>
                            <InputElement inputype="text" value={name} onInput={(e) => setName(e.currentTarget.value)} />
                        </div>

                        <div className="mb-4">
                            <label className="block">Email</label>
                            <InputElement inputype="email" value={email} onInput={(e) => setEmail(e.currentTarget.value)} />
                        </div>

                        <div className="mt-4">
                            <label className="block">Password</label>
                            <InputElement
                                inputype="password"
                                value={password}
                                onInput={(e) => setPassword(e.currentTarget.value)}></InputElement>
                        </div>

                        <div className="mt-5">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 block w-full text-white bg-black rounded-none">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="bg-slate-100 p-3">
                <p className=" text-gray-500 text-center">
                    By signing up you agree to our{" "}
                    <a href="#" className="text-black font-bold">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-black font-bold">
                        Privacy Policy
                    </a>
                    . Need help?{" "}
                    <a href="#" className="text-black font-bold">
                        Get in touch
                    </a>{" "}
                </p>
            </div>
        </>
    );
};

export default SignUpForm;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/registerSchema";
import "../App.css";

const RegisterForm = () => {
    const [status, setStatus] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onChange",
    });

    const onSubmit = (data) => {
        console.log(data);
        setStatus("success");
        reset();
    };

    const onError = () => {
        setStatus("error");
    };

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h2>Create Account</h2>

                {status === "success" && (
                    <p className="success">Registration Successful!</p>
                )}

                {status === "error" && (
                    <p className="error center">
                        Registration Unsuccessful!
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit, onError)}>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" {...register("fullName")} />
                        {errors.fullName && (
                            <p className="error">{errors.fullName.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                        {errors.email && (
                            <p className="error">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" {...register("password")} />
                        {errors.password && (
                            <p className="error">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" {...register("confirmPassword")} />
                        {errors.confirmPassword && (
                            <p className="error">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="form-group checkbox-group">
                        <input type="checkbox" {...register("terms")} id="terms" />
                        <label htmlFor="terms">I accept Terms & Conditions</label>
                    </div>
                    {errors.terms && (
                        <p className="error">{errors.terms.message}</p>
                    )}


                    <button type="submit" disabled={!isValid}>Register</button>
                    <button type="button" className="reset-btn"
                        onClick={() => { reset(); setStatus(null); }}>
                        Reset
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
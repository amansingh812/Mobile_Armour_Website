"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const error = searchParams.get("error");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    
    // OTP Modal States
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpError, setOtpError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    // Forgot Password Modal States
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [forgotPasswordStep, setForgotPasswordStep] = useState<"email" | "otp" | "password">("email");
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [forgotPasswordOtp, setForgotPasswordOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [forgotPasswordError, setForgotPasswordError] = useState("");
    const [isSendingReset, setIsSendingReset] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [forgotPasswordTimer, setForgotPasswordTimer] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                // Check if it's an email verification error
                if (result.error === "EMAIL_NOT_VERIFIED") {
                    setShowOtpModal(true);
                    startResendTimer();
                    setIsLoading(false);
                } else {
                    setLoginError("Invalid email or password");
                    setIsLoading(false);
                }
            } else {
                router.push(callbackUrl);
            }
        } catch (error) {
            setLoginError("An error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    const startResendTimer = () => {
        setResendTimer(60);
        const interval = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            setOtpError("Please enter all 6 digits");
            return;
        }

        setIsVerifying(true);
        setOtpError("");

        try {
            const response = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otpCode }),
            });

            const data = await response.json();

            if (response.ok) {
                // Now sign in again after verification
                const result = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                });

                if (!result?.error) {
                    router.push(callbackUrl);
                } else {
                    setOtpError("Verification successful! Please login again.");
                    setShowOtpModal(false);
                }
            } else {
                setOtpError(data.message || "Invalid OTP");
            }
        } catch (error) {
            setOtpError("An error occurred. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0) return;

        setIsResending(true);
        setOtpError("");

        try {
            const response = await fetch("/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setOtp(["", "", "", "", "", ""]);
                startResendTimer();
            } else {
                setOtpError(data.message || "Failed to resend OTP");
            }
        } catch (error) {
            setOtpError("An error occurred. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    // Forgot Password Functions
    const startForgotPasswordTimer = () => {
        setForgotPasswordTimer(60);
        const interval = setInterval(() => {
            setForgotPasswordTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleForgotPasswordEmailSubmit = async () => {
        if (!forgotPasswordEmail) {
            setForgotPasswordError("Please enter your email address");
            return;
        }

        setIsSendingReset(true);
        setForgotPasswordError("");

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotPasswordEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                setForgotPasswordStep("otp");
                startForgotPasswordTimer();
            } else {
                setForgotPasswordError(data.message || "Failed to send reset code");
            }
        } catch (error) {
            setForgotPasswordError("An error occurred. Please try again.");
        } finally {
            setIsSendingReset(false);
        }
    };

    const handleForgotPasswordOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...forgotPasswordOtp];
        newOtp[index] = value;
        setForgotPasswordOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`forgot-otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleForgotPasswordOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !forgotPasswordOtp[index] && index > 0) {
            const prevInput = document.getElementById(`forgot-otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handlePasswordReset = async () => {
        const otpCode = forgotPasswordOtp.join("");
        if (otpCode.length !== 6) {
            setForgotPasswordError("Please enter all 6 digits");
            return;
        }

        if (newPassword.length < 6) {
            setForgotPasswordError("Password must be at least 6 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            setForgotPasswordError("Passwords do not match");
            return;
        }

        setIsResettingPassword(true);
        setForgotPasswordError("");

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email: forgotPasswordEmail, 
                    otp: otpCode, 
                    newPassword 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Reset all states and close modal
                setShowForgotPasswordModal(false);
                setForgotPasswordStep("email");
                setForgotPasswordEmail("");
                setForgotPasswordOtp(["", "", "", "", "", ""]);
                setNewPassword("");
                setConfirmPassword("");
                setForgotPasswordError("");
                
                // Show success message
                setLoginError("");
                alert("Password reset successfully! You can now login with your new password.");
            } else {
                setForgotPasswordError(data.message || "Failed to reset password");
            }
        } catch (error) {
            setForgotPasswordError("An error occurred. Please try again.");
        } finally {
            setIsResettingPassword(false);
        }
    };

    const handleResendForgotPasswordOtp = async () => {
        if (forgotPasswordTimer > 0) return;

        setIsSendingReset(true);
        setForgotPasswordError("");

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotPasswordEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                setForgotPasswordOtp(["", "", "", "", "", ""]);
                startForgotPasswordTimer();
            } else {
                setForgotPasswordError(data.message || "Failed to resend code");
            }
        } catch (error) {
            setForgotPasswordError("An error occurred. Please try again.");
        } finally {
            setIsSendingReset(false);
        }
    };

    return (
        <div className="auth-container login-container">
            <div className="auth-card login-card">
                <h1 className="auth-title login-title">Welcome Back</h1>

                {(error || loginError) && (
                    <div className="error-message">
                        <div className="error-icon">
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p>
                                {error === "CredentialsSignin"
                                    ? "Invalid email or password"
                                    : loginError || "An error occurred. Please try again."}
                            </p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <div className="input-container">
                            <div className="input-icon">
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"

                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="input-container">
                            <div className="input-icon">
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="forgot-password-link">
                        <button
                            type="button"
                            onClick={() => {
                                setForgotPasswordEmail(email);
                                setShowForgotPasswordModal(true);
                            }}
                            className="forgot-password-button"
                        >
                            Forgot your password?
                        </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="auth-button login-button"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="spinner h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : "Sign In"}
                        </button>
                    </div>
                </form>

                <div className="auth-link-text">
                    <p>
                        Don't have an account?{" "}
                        <Link href="/account/register" className="auth-link login-link">
                            Create an account
                        </Link>
                    </p>
                </div>

                <div className="divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">Or continue with</span>
                </div>

                <div className="mt-6">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="social-button"
                    >
                        <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign up with Google
                    </button>
                </div>
            </div>

            {/* OTP Verification Modal */}
            {showOtpModal && (
                <div className="otp-modal-overlay" onClick={() => setShowOtpModal(false)}>
                    <div className="otp-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="otp-modal-header">
                            <h2 className="otp-modal-title">Verify Your Email</h2>
                            <button 
                                className="otp-modal-close"
                                onClick={() => setShowOtpModal(false)}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="otp-modal-body">
                            <div className="otp-icon">
                                <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>

                            <p className="otp-description">
                                We've sent a 6-digit verification code to<br />
                                <strong>{email}</strong>
                            </p>

                            {otpError && (
                                <div className="otp-error">
                                    {otpError}
                                </div>
                            )}

                            <div className="otp-inputs">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="otp-input"
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleVerifyOtp}
                                disabled={isVerifying || otp.join("").length !== 6}
                                className="otp-verify-button"
                            >
                                {isVerifying ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="spinner h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying...
                                    </span>
                                ) : "Verify Email"}
                            </button>

                            <div className="otp-resend">
                                {resendTimer > 0 ? (
                                    <p className="otp-timer">
                                        Resend code in {resendTimer}s
                                    </p>
                                ) : (
                                    <button
                                        onClick={handleResendOtp}
                                        disabled={isResending}
                                        className="otp-resend-button"
                                    >
                                        {isResending ? "Sending..." : "Resend Code"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Forgot Password Modal */}
            {showForgotPasswordModal && (
                <div className="otp-modal-overlay" onClick={() => setShowForgotPasswordModal(false)}>
                    <div className="otp-modal forgot-password-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="otp-modal-header">
                            <h2 className="otp-modal-title">
                                {forgotPasswordStep === "email" && "Reset Password"}
                                {forgotPasswordStep === "otp" && "Enter Reset Code"}
                                {forgotPasswordStep === "password" && "Set New Password"}
                            </h2>
                            <button 
                                className="otp-modal-close"
                                onClick={() => {
                                    setShowForgotPasswordModal(false);
                                    setForgotPasswordStep("email");
                                    setForgotPasswordError("");
                                }}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="otp-modal-body">
                            {/* Step 1: Email Input */}
                            {forgotPasswordStep === "email" && (
                                <>
                                    <div className="otp-icon">
                                        <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.414-6.414A6 6 0 0121 9z" />
                                        </svg>
                                    </div>

                                    <p className="otp-description">
                                        Enter your email address and we'll send you a code to reset your password.
                                    </p>

                                    {forgotPasswordError && (
                                        <div className="otp-error">
                                            {forgotPasswordError}
                                        </div>
                                    )}

                                    <div className="forgot-password-input-group">
                                        <input
                                            type="email"
                                            value={forgotPasswordEmail}
                                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="forgot-password-input"
                                            autoFocus
                                        />
                                    </div>

                                    <button
                                        onClick={handleForgotPasswordEmailSubmit}
                                        disabled={isSendingReset || !forgotPasswordEmail}
                                        className="otp-verify-button"
                                    >
                                        {isSendingReset ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="spinner h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending Code...
                                            </span>
                                        ) : "Send Reset Code"}
                                    </button>
                                </>
                            )}

                            {/* Step 2: OTP Input */}
                            {forgotPasswordStep === "otp" && (
                                <>
                                    <div className="otp-icon">
                                        <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>

                                    <p className="otp-description">
                                        We've sent a 6-digit reset code to<br />
                                        <strong>{forgotPasswordEmail}</strong>
                                    </p>

                                    {forgotPasswordError && (
                                        <div className="otp-error">
                                            {forgotPasswordError}
                                        </div>
                                    )}

                                    <div className="otp-inputs">
                                        {forgotPasswordOtp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`forgot-otp-${index}`}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleForgotPasswordOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleForgotPasswordOtpKeyDown(index, e)}
                                                className="otp-input"
                                                autoFocus={index === 0}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setForgotPasswordStep("password")}
                                        disabled={forgotPasswordOtp.join("").length !== 6}
                                        className="otp-verify-button"
                                    >
                                        Continue
                                    </button>

                                    <div className="otp-resend">
                                        {forgotPasswordTimer > 0 ? (
                                            <p className="otp-timer">
                                                Resend code in {forgotPasswordTimer}s
                                            </p>
                                        ) : (
                                            <button
                                                onClick={handleResendForgotPasswordOtp}
                                                disabled={isSendingReset}
                                                className="otp-resend-button"
                                            >
                                                {isSendingReset ? "Sending..." : "Resend Code"}
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Step 3: New Password Input */}
                            {forgotPasswordStep === "password" && (
                                <>
                                    <div className="otp-icon">
                                        <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.414-6.414A6 6 0 0121 9z" />
                                        </svg>
                                    </div>

                                    <p className="otp-description">
                                        Enter your new password below
                                    </p>

                                    {forgotPasswordError && (
                                        <div className="otp-error">
                                            {forgotPasswordError}
                                        </div>
                                    )}

                                    <div className="forgot-password-input-group">
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="New password (min. 6 characters)"
                                            className="forgot-password-input"
                                            autoFocus
                                        />
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm new password"
                                            className="forgot-password-input"
                                        />
                                    </div>

                                    <button
                                        onClick={handlePasswordReset}
                                        disabled={isResettingPassword || !newPassword || !confirmPassword}
                                        className="otp-verify-button"
                                    >
                                        {isResettingPassword ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="spinner h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Resetting Password...
                                            </span>
                                        ) : "Reset Password"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

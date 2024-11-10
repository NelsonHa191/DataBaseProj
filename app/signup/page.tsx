"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // 1. Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });

      if (authError) throw authError;

      // Check if the user was created and email confirmation is required
      if (authData.user && !authData.user.confirmed_at) {
        // 2. Insert additional user data into profiles table
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
          },
        ]);

        if (profileError) throw profileError;

        // Show success message and redirect
        alert(
          "Registration successful! Please check your email to confirm your account."
        );
        router.push("/login?message=check-email");
      } else {
        alert("Registration successful!");
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Logo/Brand */}
        <div className="mb-12 relative">
          <div className="w-16 h-16 bg-gradient-to-tr from-gray-700 to-gray-500 rounded-full flex items-center justify-center transform rotate-45">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-full transform -rotate-45">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-white text-transparent bg-clip-text">
                  N
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 w-full text-center">
            <span className="text-gray-300 text-xl font-medium">Nova</span>
          </div>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-6 bg-gray-900/50 p-8 rounded-2xl backdrop-blur-xl border border-gray-800"
        >
          <h1 className="text-2xl font-medium text-gray-200 text-center mb-8">
            Create your account
          </h1>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                           text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600
                           transition-colors"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                           text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600
                           transition-colors"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600
                         transition-colors"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600
                         transition-colors"
                placeholder="Create a strong password"
                required
                minLength={6}
              />
              <p className="mt-2 text-xs text-gray-500">
                Must be at least 6 characters long
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600
                         transition-colors"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 bg-gray-800 border-gray-700 rounded"
            />
            <span className="text-sm text-gray-400 ml-2">
              I agree to the{" "}
              <Link href="/terms" className="text-gray-300 hover:text-white">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-gray-300 hover:text-white">
                Privacy Policy
              </Link>
            </span>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center">
            <span className="text-gray-500">Already have an account? </span>
            <Link href="/login" className="text-gray-300 hover:text-white">
              Sign in
            </Link>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

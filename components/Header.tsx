"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthStatus {
  isAuthenticated: boolean;
  role?: string;
}

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", { 
          credentials: "include",
          cache: "no-store"
        });
        
        if (!response.ok) {
          throw new Error("Auth check failed");
        }
        
        const data: AuthStatus = await response.json();
        setIsAuthenticated(data.isAuthenticated);
        setIsAdmin(data.role === "ADMIN");
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      
      if (response.ok) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <header className="w-full bg-color-background flex items-center border-b border-gray-800">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/cine-scope-logo.svg"
                alt="logo-cine-scope"
                width={40}
                height={20}
              />
              <span className="text-2xl font-bold">CineScope</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-color-background flex items-center border-b border-gray-800 ">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/cine-scope-logo.svg"
              alt="logo-cine-scope"
              width={40}
              height={20}
            />
            <span className="text-2xl font-bold">CineScope</span>
          </Link>
        </div>
        <div className="flex gap-4 text-xl">
          {isAuthenticated && (
            <Link
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              href="/profile"
            >
              <Image
                src="/images/account-header-logo.svg"
                alt="logo-perfil"
                width={20}
                height={20}
              />
              <span>Perfil</span>
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/admin-header-logo.svg"
                alt="logo-administrador"
                width={20}
                height={20}
              />
              <span>Administrador</span>
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer text-red-500"
            >
              <span>Sair</span>
            </button>
          )}
          {!isAuthenticated && (
            <Link
              href="/login"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/login-header-logo.svg"
                alt="logo-login"
                width={20}
                height={20}
              />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

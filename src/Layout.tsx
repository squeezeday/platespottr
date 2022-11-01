import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import IPlate from "./types/plate";

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}
export default function Layout({ children }: IProps) {
  return (
    <>
      <header className="bg-gray-800 w-full fixed top-0 z-20 h-16 px-4 flex items-center">
        <div className="container m-auto flex justify-between">
          <div className="space-x-4">
            <Link to="/">Home</Link>
            <Link to="/gallery">Wall of fame</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/account">Account</Link>
            {/* <button onClick={() => supabase.auth.signOut()}>Log out</button> */}
          </div>
        </div>
      </header>
      <div className="container mt-16 p-4">{children}</div>
    </>
  );
}

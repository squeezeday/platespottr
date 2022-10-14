import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import IPlate from "./types/plate";

interface IProps {
  number: string;
}
export default function Plate({ number }: IProps) {
  return (
    <div className="rounded border-2 border-slate-800 flex flex-row w-32 m-4">
      <div className="bg-blue-700 w-4  text-white text-xs flex items-center justify-center">
        <p>S</p>
      </div>
      <h2 className="text-xl font-bold p-1 px-2">XXX {number}</h2>
    </div>
  );
}

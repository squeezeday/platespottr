import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import IPlate from "./types/plate";

interface IProps {
  number: string;
}
export default function Plate({ number }: IProps) {
  return (
    <div className=" bg-white text-black border-2 border-slate-800 flex flex-row w-full rounded items-center justify-center">
      <h2 className="text-xl font-bold p-1 px-2 text-center">XXX {number}</h2>
    </div>
  );
}

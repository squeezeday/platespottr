import { useState, useEffect } from "react";
import Plate from "./Plate";
import { supabase } from "./supabaseClient";
import IPlate from "./types/plate";

interface IProps {
  plate: IPlate;
}
export default function Entry({ plate }: IProps) {
  return (
    <>
      <div className="border rounded shadow w-full flex flex-col items-center">
        <img
          src={`https://res.cloudinary.com/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload/w_300,h_300,c_fill/${plate.cloudinary_id}.jpg`}
          className="object-cover w-full"
        />
        <Plate number={plate.number} />
        <p className="text-xs m-1">{plate.profiles?.name}</p>
      </div>
    </>
  );
}

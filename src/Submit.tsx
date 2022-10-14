import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useForm } from "react-hook-form";
import { Session } from "@supabase/supabase-js";
import Uploader from "./Uploader";
import Loading from "./Loading";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import { useAppContext } from "./context/AppContext";
import { useGeolocated } from "react-geolocated";
import IPlate from "./types/plate";
import Entry from "./Entry";

interface IFormModel {
  number: string;
}

interface IProps {
  session: Session | null;
}
export default function Submit({ session }: IProps) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [plate, setPlate] = useState<IPlate | undefined>();

  const { state } = useAppContext();
  const [isDuplicate, setIsDuplicate] = useState<boolean | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormModel>();

  const upload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("upload_preset", "jeztry9x");
    formData.append("file", file);
    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUD_NAME
    }/image/upload`;
    const ret = await fetch(url, { method: "POST", body: formData });
    const res = await ret.json();
    return res.public_id;
  };

  const checkDupe = async (v: string) => {
    setIsDuplicate(state.plates.findIndex((x) => x.number === v) !== -1);
  };

  const doSubmit = async (formData: IFormModel) => {
    try {
      if (!file) return false;
      setLoading(true);
      const cloudinary_id = await upload(file);
      const plate: IPlate = {
        ...formData,
        cloudinary_id,
        longitude,
        latitude,
        user_id: session?.user.id,
        profile_id: session?.user.id,
      };
      const { data, error } = await supabase.from("plates").insert(plate);
      setLoading(false);
      if (error) throw new Error(error.message);
      reset();
      setFile(undefined);
      setIsSuccess(true);
      setPlate(plate);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Uploader
        onFileChanged={async (f, lat, lon) => {
          setFile(f);
          setLatitude(lat);
          setLongitude(lon);
        }}
        file={file}
      />
      <form onSubmit={handleSubmit(doSubmit)}>
        <input
          type="text"
          className="w-full max-w-sm border-2 border-slate-400 rounded p-1 px-2 mr-2 focus:outline-none active:outline-none"
          placeholder="Plate number"
          id="id"
          autoComplete="off"
          maxLength={3}
          pattern="\d\d\w"
          {...register("number", {
            required: "Required field",
            minLength: 3,
            maxLength: 3,
          })}
          onBlur={(e) => checkDupe(e.target.value)}
        />
        <p className="text-red-500 basis-full">
          {isDuplicate ? "Already claimed!" : null} {errors?.number?.message}
        </p>

        <button
          type="submit"
          disabled={isSubmitting || isDuplicate === true}
          className="border rounded p-2 my-4 flex items-center"
        >
          Submit
          {isSubmitting ? (
            <Loading className="ml-2 w-5 h-5 inline" />
          ) : (
            <ChevronRightIcon className="ml-2 w-5 h-5 inline" />
          )}
          {isSuccess ? (
            <CheckCircleIcon className="ml-2 w-5 h-5 inline text-green-500" />
          ) : (
            <></>
          )}
        </button>
      </form>
      {plate && (
        <div className="w-52">
          <Entry plate={plate} />
        </div>
      )}
    </>
  );
}

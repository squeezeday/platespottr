import { ChangeEvent, useRef, useState } from "react";
import PhotoIcon from "@heroicons/react/24/solid/PhotoIcon";
import { supabase } from "./supabaseClient";
import FileResizer from "react-image-file-resizer";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import * as exifr from "exifr";

interface IProps {
  file?: File;
  onFileChanged: (file: File, latitude: number, longitude: number) => void;
}
export default function Uploader({ file, onFileChanged }: IProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0] as File;
      let latitude = 0;
      let longitude = 0;
      const gpsRes = await exifr.gps(file);
      if (gpsRes) {
        latitude = gpsRes.latitude;
        longitude = gpsRes.longitude;
      }
      onFileChanged(file, latitude, longitude);
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onClick = async (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    fileInputRef?.current?.click();
  };
  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
  };
  return (
    <>
      <div
        className="my-4 border-dashed border border-udni-teal rounded bg-white text-slate-300 flex flex-col justify-center items-center select-none"
        onClick={onClick}
        onDrop={onDrop}
        onDragOver={(e) => console.log(e)}
      >
        <input
          type="file"
          name="file"
          accept="image/*"
          capture="environment"
          onChange={onFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        {file ? (
          <img src={URL.createObjectURL(file)} className="h-80" />
        ) : (
          <div className="p-8 flex flex-col justify-center items-center">
            <PhotoIcon className="w-8 h-8 m-2" />
            <p>Click here to upload</p>
          </div>
        )}
      </div>
      <div className="">
        {loading === true && <p>Loading..</p>}
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
}

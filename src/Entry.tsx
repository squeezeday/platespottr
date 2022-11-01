import dayjs from "dayjs";
import Plate from "./Plate";
import IPlate from "./types/plate";

interface IProps {
  plate: IPlate;
}
export default function Entry({ plate }: IProps) {
  return (
    <>
      <div className="border rounded shadow w-full flex flex-col items-center">
        <a
          href={`https://res.cloudinary.com/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload/w_640,h_640,c_fit/${plate.cloudinary_id}.jpg`}
          target="_blank"
        >
          <img
            src={`https://res.cloudinary.com/${
              import.meta.env.VITE_CLOUD_NAME
            }/image/upload/w_300,h_300,c_fill/${plate.cloudinary_id}.jpg`}
            className="object-cover w-full"
          />
        </a>
        <Plate number={plate.number} />
        <p className="text-xs m-1">{plate.profiles?.name}</p>
        <p className="text-xs m-1">
          {dayjs(plate.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
    </>
  );
}

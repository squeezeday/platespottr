import IProfile from "./profile";

export default interface IPlate {
  id?: string;
  number: string;
  user_id?: string;
  profiles?: IProfile;
  profile_id?: string;
  cloudinary_id?: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
}

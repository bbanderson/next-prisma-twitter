import React from "react";
import { RANDOM_PROFILE_IMG_SRC } from "src/constants";

const ProfileImage = ({
  imgSrc,
  alt,
  randomSeed,
}: {
  imgSrc?: string | null;
  alt?: string;
  randomSeed?: number;
}) => {
  return (
    <img
      src={imgSrc ?? `${RANDOM_PROFILE_IMG_SRC}?random=${randomSeed}`}
      alt={alt}
      className="w-14 h-14 rounded-full"
    />
  );
};

export default ProfileImage;

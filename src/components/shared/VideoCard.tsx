import { VideoCardProps } from "../../interfaces.ts";

const VideoCard = ({
  thumbnail,
  owner,
  title,
  description,
  views,
}: VideoCardProps) => {
  return (
    <div className="flex flex-col">
      <img width={20} height={20} src={thumbnail} alt="thumbnail"></img>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="flex justify-evenly w-[50%]">
          <img src={owner.avatar} alt="owner" />
          <h3>{owner.username}</h3>
          <small>{views}</small>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

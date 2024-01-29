export type IUser = {
  username: string;
  fullname: string;
  avatar: string;
  coverImage: string;
};

export type IVideos = {
  _id: string;
  videoFile: string;
  thumbnail: string;
  owner: IUser;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: Boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type VideoCardProps = {
  thumbnail: string;
  owner: IUser;
  title: string;
  description: string;
  views: number;
};

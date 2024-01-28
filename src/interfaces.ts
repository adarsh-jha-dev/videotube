export type IUser = {};

export type IVideos = {
  _id: string;
  videoFile: string;
  thumbnail: string;
  owner: string;
  title: string;
  description: string;
  duration: Number;
  views: Number;
  isPublished: Boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: Number;
};

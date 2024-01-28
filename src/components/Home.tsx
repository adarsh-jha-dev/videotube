import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_VIDEOTUBE_BACKEND_BASE_URL}/videos/getall`
        );
        setVideos(response.data.data);
      } catch (error) {
        toast("Some error occured while fetching the videos");
        console.log(error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold text-white">Home Page</h1>
      <div></div>
      <ToastContainer />
    </div>
  );
};

export default Home;

import ReactPlayer from "react-player";

const Video = () => {
  return (
    <div className="video-container">
      <ReactPlayer
        className={"video-box"}
        url={"video/sample.mp4"}
        width={"100%"}
        height={"100%"}
        muted={true}
        controls={false}
        playing={true}
        loop={true}
      />
    </div>
  );
};

export default Video;

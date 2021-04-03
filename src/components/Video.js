import React from "react";
import ReactPlayer from "react-player";
import StyledVideoWrapper from "../components/styles/StyledVideoWrapper";
import StyledVideo from "../components/styles/StyledVideo";

const Video = ({ active, autoplay, endCallback, progressCallback }) => (
  <StyledVideo>
    <StyledVideoWrapper>
      <ReactPlayer
        controls
        width='100%'
        height='100%'
        style={{ position: "absolute", top: "0" }}
        playing={autoplay}
        url={active.video}
        onEnded={endCallback}
        onProgress={progressCallback}
      />
    </StyledVideoWrapper>
  </StyledVideo>
);

export default Video;

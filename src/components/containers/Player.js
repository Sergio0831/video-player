import React, { useState, useEffect } from "react";
import Video from "../Video";
import Playlist from "./Playlist";
import { ThemeProvider } from "styled-components";
import StyledPlayer from "../styles/StyledPlayer";

const theme = {
  bgColor: "#353535",
  bgColorItem: "#414141",
  bgColorActive: "#405c63",
  bgColorPlayed: "#526d4e",
  border: "none",
  borderPlayed: "none",
  color: "#fff"
};

const themeLight = {
  bgColor: "#fff",
  bgColorItem: "#fff",
  bgColorActive: "#86a7b1",
  bgColorPlayed: "#7d9979",
  border: "1px solid #353535",
  borderPlayed: "none",
  color: "#353535"
};

const Player = ({ match, history, location }) => {
  const videos = JSON.parse(document.querySelector('[name="videos"]').value);

  console.log(videos);

  const [state, setState] = useState({
    videos: videos.playlist,
    activeVideo: videos.playlist[0],
    nightMode: true,
    playlistId: videos.playlistId,
    autoplay: false
  });

  useEffect(() => {
    const videoId = match.params.activeVideo;

    if (videoId !== undefined) {
      const newActiveVideo = state.videos.findIndex(
        (video) => video.id === videoId
      );
      setState((prev) => ({
        ...prev,
        activeVideo: prev.videos[newActiveVideo],
        autoplay: location.autoplay
      }));
    } else {
      history.push({
        pathname: `/${state.activeVideo.id}`,
        autoplay: false
      });
    }
  }, [
    history,
    location.autoplay,
    match.params.activeVideo,
    state.activeVideo,
    state.activeVideo.id,
    state.videos
  ]);

  const nightModeCallback = () => {
    setState((prevState) => ({
      ...prevState,
      nightMode: !prevState.nightMode
    }));
  };

  const endCallback = (props) => {
    const videoId = props.match.params.activeVideo;
    const currentVideoIndex = state.videos.findIndex(
      (video) => video.id === videoId
    );

    const nextVideo =
      currentVideoIndex === state.videos.length - 1 ? 0 : currentVideoIndex + 1;

    props.history.push({
      pathname: `${state.videos[nextVideo].id}`,
      autoplay: false
    });
  };

  const progressCallback = (e) => {
    if (e.playedSeconds > 10 && e.playedSeconds < 11) {
      // const videos = { ...state.videos };
      // const playedVideo = videos.find(
      //   (video) => video.id === state.activeVideo.id
      // );

      // playedVideo.played = true;
      // setState((prevState) => ({ ...prevState, videos }));

      setState({
        ...state,
        videos: state.videos.map((video) => {
          return video.id === state.activeVideo.id
            ? { ...video, played: true }
            : video;
        })
      });
    }
  };

  return (
    <ThemeProvider theme={state.nightMode ? theme : themeLight}>
      {state.videos !== null ? (
        <StyledPlayer>
          <Video
            active={state.activeVideo}
            autoplay={state.autoplay}
            endCallback={endCallback}
            progressCallback={progressCallback}
          />
          <Playlist
            videos={state.videos}
            active={state.activeVideo}
            nightModeCallback={nightModeCallback}
            nightMode={state.nightMode}
          />
        </StyledPlayer>
      ) : null}
    </ThemeProvider>
  );
};

export default Player;

import React from "react";
import StyledPlaylistitem from "../components/styles/StyledPlaylistItem";

const PlaylistItem = ({ video, active, played }) => (
  <StyledPlaylistitem active={active} played={played}>
    <div className='wbn-player__video-nr'>{video.num}</div>
    <div className='wbn-player__video-name'>{video.title}</div>
    <div className='wbn-player__video-time'>{video.duration}</div>
  </StyledPlaylistitem>
);

export default PlaylistItem;

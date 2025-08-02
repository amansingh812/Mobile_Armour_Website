"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import RoofixPopup from "../hero/roofix-popup";

function Video2({}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const imageUrl = "/img/video-bg-2.jpg";
  return (
    <div
      id="video-3"
      className="container video-section"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="video-inner-box">
        <div className="play-btn">
          {isClient && (
            <RoofixPopup>
              <ReactPlayer
                width="100%"
                height={500}
                url="https://www.youtube.com/watch?v=hvSq38FChGU"
                controls
              />
            </RoofixPopup>
          )}
        </div>
      </div>
    </div>
  );
}

export default Video2;

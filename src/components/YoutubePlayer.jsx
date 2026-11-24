import React from 'react'

export default function YouTubePlayer() {
  return (
    <div className="youtube-container">
      <iframe
        src="https://www.youtube-nocookie.com/embed/0AV462byEdI"
        title="Entrenamiento PAUSA"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

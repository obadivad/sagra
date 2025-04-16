export function SpotifyEmbed() {
  return (
    <div className="rounded-md overflow-hidden bg-zinc-900 border border-zinc-800">
      <iframe
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXc8kgYqQLMfH?utm_source=generator"
        width="100%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="border-0"
      ></iframe>
    </div>
  )
}

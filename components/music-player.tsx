"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface MusicPlayerProps {
  tracks: {
    id: string
    title: string
    artist: string
    duration: number
    audioUrl: string
  }[]
  className?: string
}

export function MusicPlayer({ tracks, className }: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = new Audio(currentTrack.audioUrl)
    audioRef.current = audio

    audio.volume = volume

    const updateProgress = () => {
      setProgress(audio.currentTime)
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1)
      } else {
        setIsPlaying(false)
        setProgress(0)
      }
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("loadedmetadata", updateProgress)

    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("loadedmetadata", updateProgress)
    }
  }, [currentTrack.audioUrl, currentTrackIndex, tracks.length])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrackIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
    }
  }

  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0]
    setProgress(newProgress)
    if (audioRef.current) {
      audioRef.current.currentTime = newProgress
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (isMuted) setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className={cn("bg-white rounded-lg p-4 shadow-lg border-2 border-primary/20", className)}>
      <div className="mb-4">
        <h3 className="font-semibold text-lg">{currentTrack.title}</h3>
        <p className="text-sm text-gray-600">{currentTrack.artist}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 w-10">{formatTime(progress)}</span>
          <Slider
            value={[progress]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleProgressChange}
            className="flex-1"
          />
          <span className="text-xs text-gray-600 w-10">{formatTime(duration)}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleMute} className="text-gray-600 hover:text-primary">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              disabled={currentTrackIndex === 0}
              className="text-gray-600 hover:text-primary"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="icon"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              disabled={currentTrackIndex === tracks.length - 1}
              className="text-gray-600 hover:text-primary"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          <div className="w-[88px]" />
        </div>
      </div>
    </div>
  )
}

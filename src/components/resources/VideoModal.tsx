import { useEffect, useRef } from 'react'
import { X, Clock, ExternalLink } from 'lucide-react'
import type { Resource } from '../../data/resourcesData'
import { getYouTubeEmbedUrl, isYouTubeUrl } from '../../data/resourcesData'

interface Props {
  resource: Resource | null
  onClose: () => void
}

export default function VideoModal({ resource, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // ── Keyboard + scroll lock ─────────────────────────────────────────────────
  useEffect(() => {
    if (!resource) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [resource, onClose])

  // ── Pause + reset native video on close ───────────────────────────────────
  useEffect(() => {
    if (!resource && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [resource])

  if (!resource) return null

  const isYT      = resource.isUrl && isYouTubeUrl(resource.urlFile)
  const embedUrl  = isYT ? getYouTubeEmbedUrl(resource.urlFile) : null
  const isNativeVideo = resource.type === 'video' && !resource.isUrl
  const fallbackIconByType: Record<Resource['type'], string> = {
    video: '🎬',
    document: '📄',
    form: '📝',
    ebook: '📘',
    presentation: '📊',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={resource.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-gray-100">
          <div className="min-w-0">
            <p className="text-[10px] font-medium text-orange-500 uppercase tracking-wider mb-0.5">
              {resource.type}
            </p>
            <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
              {resource.title}
            </h3>
            {resource.duration && (
              <span className="inline-flex items-center gap-1 mt-1 text-[11px] text-gray-400">
                <Clock className="w-3 h-3" />
                {resource.duration}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video area — always 16:9 aspect ratio */}
        <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
          {isYT && embedUrl ? (
            // ── YouTube iframe ───────────────────────────────────────────────
            <iframe
              key={resource.id}
              src={`${embedUrl}?autoplay=1&rel=0&modestbranding=1`}
              title={resource.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : isNativeVideo ? (
            // ── Native MP4 ───────────────────────────────────────────────────
            <video
              ref={videoRef}
              key={resource.id}
              src={`/videos/${resource.urlFile}`}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full object-contain bg-black"
              onError={e => {
                const target = e.currentTarget
                target.style.display = 'none'
                const fallback = document.createElement('div')
                fallback.className = 'absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black'
                fallback.innerHTML = `<span style="font-size:2rem">🎬</span><p style="color:#9ca3af;font-size:0.75rem">Video file not available in this environment.</p>`
                target.parentElement?.appendChild(fallback)
              }}
            />
          ) : (
            // ── Non-video fallback (doc / form / ebook) ──────────────────────
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-950">
              <span className="text-5xl">{fallbackIconByType[resource.type]}</span>
              <p className="text-sm text-gray-400">{resource.title}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-2">
            <span className={[
              'text-[10px] font-medium px-2 py-0.5 rounded-full',
              resource.level === 'Beginner'     && 'bg-green-50 text-green-600',
              resource.level === 'Intermediate' && 'bg-yellow-50 text-yellow-600',
              resource.level === 'Advanced'     && 'bg-blue-50 text-blue-600',
            ].filter(Boolean).join(' ')}>
              {resource.level}
            </span>
            <span className="text-[11px] text-gray-400">{resource.category.replace(/-/g, ' ')}</span>
          </div>

          {/* Open externally if it's a URL */}
          {resource.isUrl && (
            <a
              href={resource.urlFile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-orange-500 hover:text-orange-700 font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in new tab
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

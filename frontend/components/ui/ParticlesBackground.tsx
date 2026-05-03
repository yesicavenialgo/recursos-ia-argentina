'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface Ripple {
  x: number
  y: number
  age: number
}

const MAX_DIST = 130
const RIPPLE_MAX_AGE = 45
const RIPPLE_REACH = 220

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = window.innerWidth
    let h = window.innerHeight
    const ripples: Ripple[] = []

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    resize()

    const count = Math.min(Math.floor((w * h) / 12000), 90)
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.2 + 0.8,
    }))

    const onClick = (e: MouseEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, age: 0 })
    }

    window.addEventListener('resize', resize)
    document.addEventListener('click', onClick)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        else if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        else if (p.y > h) p.y = 0
      }

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < MAX_DIST * MAX_DIST) {
            const opacity = (1 - Math.sqrt(d2) / MAX_DIST) * 0.18
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(77,166,245,${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // dots
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(77,166,245,0.65)'
        ctx.fill()
      }

      // ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.age++
        if (r.age > RIPPLE_MAX_AGE) { ripples.splice(i, 1); continue }
        const t = r.age / RIPPLE_MAX_AGE

        for (const p of particles) {
          const dx = p.x - r.x
          const dy = p.y - r.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < RIPPLE_REACH) {
            const alpha = (1 - t) * (1 - dist / RIPPLE_REACH) * 0.85
            ctx.beginPath()
            ctx.moveTo(r.x, r.y)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `rgba(116,187,252,${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }

        // expanding ring
        ctx.beginPath()
        ctx.arc(r.x, r.y, t * 110, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(77,166,245,${(1 - t) * 0.25})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

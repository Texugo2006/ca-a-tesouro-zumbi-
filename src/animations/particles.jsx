import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ theme = 'pirates', count = 35 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const themeColors = {
      pirates: ['#F4C542', '#FFE082', '#6DD5FA', '#E0A96D'],
      forest: ['#2F6B4F', '#A8E6CF', '#F4C542', '#88D49E'],
      temple: ['#E65100', '#F4C542', '#FF8A65', '#C63C3C'],
      frozen: ['#FFFFFF', '#6DD5FA', '#E0F7FA', '#B3E5FC']
    };

    const colors = themeColors[theme] || themeColors.pirates;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * (theme === 'frozen' ? 0.8 : 1.2),
      speedY: theme === 'frozen' 
        ? Math.random() * 1.5 + 0.5 
        : theme === 'temple'
        ? -(Math.random() * 1.8 + 0.4)
        : (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseAngle: Math.random() * Math.PI * 2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseAngle += p.pulseSpeed;

        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulseAngle) * 0.25);

        // Wrapping boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [theme, count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}

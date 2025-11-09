import React, { useEffect, useMemo, useRef } from 'react';

// A lightweight 2D canvas visualizer that parses simple keywords
export default function VisualizerPanel({ instructions }) {
  const canvasRef = useRef(null);

  const spec = useMemo(() => describe(instructions), [instructions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.floor(width * DPR);
    canvas.height = Math.floor(height * DPR);
    ctx.scale(DPR, DPR);

    // background
    ctx.clearRect(0, 0, width, height);
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, 'rgba(99,102,241,0.18)');
    grad.addColorStop(1, 'rgba(14,165,233,0.18)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // draw grid
    drawGrid(ctx, width, height);

    // draw shapes from spec
    spec.shapes.forEach((s) => drawShape(ctx, width, height, s));

    // title
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = '600 14px Inter, ui-sans-serif, system-ui';
    ctx.fillText(spec.title, 12, 20);
  }, [spec]);

  return (
    <div className="h-full w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
      <canvas ref={canvasRef} className="h-[280px] sm:h-[320px] md:h-[360px] lg:h-[420px] w-full" />
    </div>
  );
}

function drawGrid(ctx, w, h) {
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  const step = 24;
  for (let x = 0; x < w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
    ctx.stroke();
  }
}

function drawShape(ctx, w, h, s) {
  const cx = w / 2;
  const cy = h / 2;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((s.rotate || 0) * Math.PI / 180);

  ctx.fillStyle = s.fill;
  ctx.strokeStyle = s.stroke;
  ctx.lineWidth = 2;

  if (s.type === 'box') {
    const rw = s.w; const rh = s.h;
    roundRect(ctx, -rw/2, -rh/2, rw, rh, 10);
    ctx.fill();
    ctx.stroke();
  }

  if (s.type === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, s.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  if (s.type === 'slots') {
    const count = s.count || 3;
    const spacing = s.spacing || 12;
    const width = s.slotW || 8;
    const height = s.slotH || 40;
    ctx.fillStyle = s.slotFill || 'rgba(0,0,0,0.25)';
    for (let i = 0; i < count; i++) {
      const x = -((count-1) * spacing) / 2 + i * spacing;
      roundRect(ctx, x - width/2, -height/2, width, height, 3);
      ctx.fill();
    }
  }

  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function describe(text = '') {
  const t = text.toLowerCase();
  const shapes = [];

  // infer base body
  if (/(box|rect|organizer|holder|case|container)/.test(t)) {
    shapes.push({ type: 'box', w: 260, h: 140, fill: 'rgba(99,102,241,0.35)', stroke: 'rgba(255,255,255,0.6)', rotate: 0 });
  } else if (/(cylinder|cup|tube)/.test(t)) {
    shapes.push({ type: 'circle', r: 90, fill: 'rgba(99,102,241,0.35)', stroke: 'rgba(255,255,255,0.6)' });
  } else {
    shapes.push({ type: 'box', w: 220, h: 120, fill: 'rgba(99,102,241,0.25)', stroke: 'rgba(255,255,255,0.6)' });
  }

  // add slots for pens
  if (/(pen|pencil)/.test(t)) {
    shapes.push({ type: 'slots', count: 4, spacing: 28, slotH: 60 });
  }

  // phone stand angle cue
  if (/(phone|smartphone)/.test(t)) {
    shapes.push({ type: 'box', w: 140, h: 10, rotate: -18, fill: 'rgba(255,255,255,0.35)', stroke: 'rgba(255,255,255,0.7)' });
  }

  // rounded style if stated
  if (/rounded|soft|friendly/.test(t)) {
    shapes.push({ type: 'circle', r: 6, fill: 'rgba(255,255,255,0.75)', stroke: 'transparent' });
  }

  const title = `Prototype sketch • ${truncate(text || 'Start describing your idea')}`;
  return { title, shapes };
}

function truncate(s, len = 48) {
  if (s.length <= len) return s;
  return s.slice(0, len - 1) + '…';
}

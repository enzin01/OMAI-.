"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type Testimonial = { name: string; text: string };

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const instructionsId = useId();

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || !testimonials.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 900px)");
    let cycleWidth = 0;
    let position = 0;
    let lastWrittenScroll = -1;
    let frame = 0;
    let previousTime = 0;
    let resumeAt = 0;
    let inView = false;
    let pointerId: number | null = null;
    let dragX: number | null = null;

    const pauseForReading = () => { resumeAt = performance.now() + 1800; };

    // Three identical sets keep a full viewport available on either side.
    const moveTo = (next: number) => {
      if (!cycleWidth) return;
      const loopStart = cycleWidth / 2;
      position = loopStart + ((next - loopStart) % cycleWidth + cycleWidth) % cycleWidth;
      viewport.scrollLeft = position;
      lastWrittenScroll = viewport.scrollLeft;
    };

    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const middle = track.children[testimonials.length] as HTMLElement | undefined;
      if (!first || !middle) return;
      const nextWidth = middle.offsetLeft - first.offsetLeft;
      if (!nextWidth) return;
      const progress = cycleWidth ? ((position % cycleWidth) + cycleWidth) % cycleWidth / cycleWidth : 0;
      cycleWidth = nextWidth;
      moveTo(cycleWidth * (1 + progress));
    };

    const animate = (now: number) => {
      const elapsed = previousTime ? Math.min(now - previousTime, 64) : 0;
      previousTime = now;
      if (pointerId === null && now >= resumeAt && !pausedRef.current) {
        moveTo(position + elapsed * cycleWidth / (mobile.matches ? 28000 : 34000));
      }
      frame = requestAnimationFrame(animate);
    };

    const updateAnimation = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (inView && !document.hidden && !reducedMotion.matches) {
        frame = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      // Native touch, trackpad and keyboard scrolling always take priority.
      if (Math.abs(viewport.scrollLeft - lastWrittenScroll) < 0.5) return;
      pauseForReading();
      moveTo(viewport.scrollLeft);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      pointerId = event.pointerId;
      pauseForReading();
      if (event.pointerType !== "touch") {
        dragX = event.clientX;
        viewport.dataset.dragging = "true";
        viewport.setPointerCapture(event.pointerId);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (pointerId !== event.pointerId || dragX === null) return;
      event.preventDefault();
      moveTo(position + dragX - event.clientX);
      dragX = event.clientX;
    };

    const endPointer = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      dragX = null;
      delete viewport.dataset.dragging;
      pauseForReading();
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    };

    const onBlur = () => {
      pointerId = null;
      dragX = null;
      delete viewport.dataset.dragging;
      pauseForReading();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        if (event.repeat) return;
        pausedRef.current = !pausedRef.current;
        setPaused(pausedRef.current);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        pauseForReading();
        moveTo(position + (event.key === "ArrowRight" ? 1 : -1) * cycleWidth / testimonials.length);
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) onBlur();
      updateAnimation();
    };

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateAnimation();
    }, { rootMargin: "120px" });
    const resize = new ResizeObserver(measure);
    measure();
    resize.observe(viewport);
    resize.observe(track);
    intersection.observe(viewport);
    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("wheel", pauseForReading, { passive: true });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("lostpointercapture", endPointer);
    viewport.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerup", endPointer);
    window.addEventListener("pointercancel", endPointer);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", updateAnimation);

    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resize.disconnect();
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("wheel", pauseForReading);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("lostpointercapture", endPointer);
      viewport.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerup", endPointer);
      window.removeEventListener("pointercancel", endPointer);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", updateAnimation);
    };
  }, [testimonials.length]);

  return (
    <>
      <p className="testimonial-sr-only" id={instructionsId}>
        Arraste as avaliações para os dois lados ou use as setas do teclado. Pressione Espaço para pausar ou retomar o movimento automático.
      </p>
      <div
        className="testimonial-viewport"
        ref={viewportRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Depoimentos fictícios da OMAI"
        aria-describedby={instructionsId}
        tabIndex={0}
      >
        <div className="testimonial-track" ref={trackRef}>
          {[0, 1, 2].flatMap((copy) => testimonials.map((item) => (
            <article className="testimonial-card" key={`${copy}-${item.name}`} aria-hidden={copy !== 1 ? true : undefined}>
              <div className="testimonial-top">
                <strong>{item.name}</strong>
                <Image unoptimized className="google-mark" src="/assets/google-review-icon-transparent.webp" alt={copy === 1 ? "Google" : ""} width={25} height={25} draggable={false} />
              </div>
              <div className="testimonial-stars" aria-label={copy === 1 ? "5 estrelas" : undefined}>
                {Array.from({ length: 5 }, (_, star) => (
                  <Star key={star} size={17} fill="currentColor" aria-hidden="true" />
                ))}
                <Image unoptimized className="verified-mark" src="/assets/verified-review-icon-transparent.webp" alt={copy === 1 ? "Verificado" : ""} width={17} height={17} draggable={false} />
              </div>
              <p>{item.text}</p>
              <small>Exemplo ilustrativo</small>
            </article>
          )))}
        </div>
      </div>
      <span className="testimonial-sr-only" role="status">{paused ? "Movimento automático pausado." : ""}</span>
    </>
  );
}

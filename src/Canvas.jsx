import react from "react";
import CanvasImages from "./CanvasImages";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Canvas = ({ details }) => {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;

  const canvasRef = useRef(null);
  const [index, setIndex] = useState({ value: startIndex });

  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      ease: "power1.inOut",
      repeat: -1,
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });

    gsap.from(canvasRef.current, {
      opacity: 0,
      scale: 0.3,
      duration: 0.5,
      ease: "power1.inOut",
    });
  });

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = CanvasImages[index.value];
    image.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";
      ctx.scale(scale, scale);
      // ctx.drawImage(image, 0, 0);
      ctx.drawImage(image, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
  }, [index]);

  return (
    <div className="main">

    <canvas
      data-scroll
      data-scroll-speed= {Math.random().toFixed(1)}
      ref={canvasRef}
      style={{ width: `${size * 1.2}px`, height: `${size * 1.2}px`,position: "absolute", top: `${top}%`, left: `${left}%`, zIndex: `${zIndex}` }}
      className="canvas"
      ></canvas>
      </div>
  );
};

export default Canvas;

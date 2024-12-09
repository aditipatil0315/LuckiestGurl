import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";

function App() {
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  const [showCanvas, setShowCanvas] = useState(false);

  const cursorHandler = (e) => {
    gsap.to(".growingSpan", {
      x: e.clientX,
      y: e.clientY,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });

          gsap.to(".main", {
            color: "#feedc9",
            backgroundColor: "#4C0000",
            duration: 1,
            ease: "power2.inOut",
          });
        } else {
          gsap.to(".main", {
            color: "#000",
            backgroundColor: "#fff",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1,
            duration: 1,
            ease: "power1.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className="main" onMouseMove={cursorHandler}>
        <span
          ref={growingSpan}
          className="growingSpan fixed top-0 left-0  bg-[#4C0000] block w-7 h-7 z-10 rounded-full"
          
        ></span>
        <div className="w-full min-h-screen    ">
          {showCanvas &&
            data[0].map((item, index) => <Canvas key={index} details={item} />)}

          <div className="w-full h-screen relative ">
            <nav className=" w-full p-6 z-50">
              <div className="flex justify-between items-center">
                <div className=" bannertext text-2xl font-bold italic font-[Playfair Display]">
                  luckiest gurl
                </div>
                <ul className="flex gap-8 font-medium text-[17px]">
                  {["Home", "About", "Work", "Contact"].map((link, index) => (
                    <li key={index}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="text-md hover:opacity-70 transition-opacity"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            <div className="textcontainer w-full  px-[30%]">
              <div className="text w-[60%] leading-[1.5]">
                <h3 className="text-3xl font-bold">
                  At The Luckiest Gurl, we believe every woman deserves to feel
                  radiant and confident.
                </h3>
                <p className="text-md font-medium mt-4">
                  Our beauty agency offers personalized services tailored to
                  enhance your unique charm, making every day your luckiest.
                  Step into a world where beauty meets empowerment, because you
                  deserve nothing less than extraordinary.
                </p>

                <p className="py-2 mt-4 cursor-pointer">Scroll</p>
              </div>
            </div>

              <p className="absolute bottom-[30%] left-24 ">click on the text below</p>
            <div className="bannertext banner w-full absolute bottom-[-5%] left-20">
              <div className="div absolute z-50 bg-transparent bottom-[-5%] left-2 "
                
          {...showCanvas ? 
  
 ( gsap.to(".bannertext" , {
  textShadow: "none",

}) ): 

{
  onMouseEnter: () => {
    gsap.to(growingSpan.current, {
      scale: 3,
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(".bannertext", {
      textShadow: "3px 3px 1px #feedc9",
      ease: "power2.inOut",
    });
  },
  onMouseLeave: () => {
    gsap.to(growingSpan.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(".bannertext", {
      textShadow: "none", 
      duration: 0.3,
      ease: "power2.inOut",
    });
  }
}}>
  
                
                
                  
              <h1
                ref={headingref}
                className="text-[12rem] font-bold italic tracking-normal  "
                
                >
                the luckiest gurl
              </h1>
                </div>
            </div>
          </div>
        </div>
        <div className="seceondpage w-full h-screen mt-28 relative">
          <div className="w-full min-h-screen  relative">
            {showCanvas &&
              data[1].map((item, index) => (
                <Canvas key={index} details={item} />
              ))}
          </div>
          <h3 className="text-5xl font-medium absolute top-[5%] left-36 ">
            what we do
          </h3>
          <h5 className="text-[34px] font-normal mt-4 absolute top-[5%] right-36 w-[30%] ">
            We aim to boost confidence and celebrate individuality through
            personalized beauty services.{" "}
          </h5>
          <p className="text-[18px] font-normal mt-4 absolute top-[50%] right-36 w-[30%]">
            At The Luckiest Gurl, we specialize in providing a range of beauty
            and wellness services tailored to enhance your natural glow and
            confidence.  <br></br>
            <br></br>From professional makeup artistry and skincare
            consultations to hair styling and grooming, we cater to your unique
            needs for every occasion. <br /> <br />
          </p>

          <img
            src="https://i.pinimg.com/736x/2c/8b/c1/2c8bc1d1c3e277e8a43dcdf38958a3e0.jpg"
            alt=""
            className="w-[30%] absolute top-[20%] left-28 rounded-[120px] shadow-2xl "
          />
        </div>

        <div className="thirdpage w-full relative">
          <div className="w-full min-h-[100vh] ">
            {showCanvas &&
              data[2].map((item, index) => (
                <Canvas key={index} details={item} />
              ))}
          </div>

          <div className="bannertext w-full absolute top-[5%] left-24">
            <h1 className="text-[7rem]  font-bold italic tracking-tight ">
              we provide beauty to your <br />soul.
            </h1>
          </div>

          <div className="images flex gap-20 absolute bottom-[-10%] w-full justify-center">
            <img src="https://i.pinimg.com/736x/06/93/b4/0693b48dd00bc813922eb1f128e88d17.jpg" alt="" className="w-[20%] rounded-[100px] shadow-slate-900 shadow-2xl " />
            <img src="https://i.pinimg.com/736x/5a/d5/d0/5ad5d02ef7a1506469b53820560bbab7.jpg" alt="" className="w-[20%] rounded-[100px] shadow-slate-900 shadow-2xl" />
            <img src="https://i.pinimg.com/736x/2c/8b/c1/2c8bc1d1c3e277e8a43dcdf38958a3e0.jpg" alt="" className="w-[20%] rounded-[100px] shadow-slate-900 shadow-2xl" />
          </div>
        </div>

        <div className="pageFour mt-28 w-full h-[70px] ">

        </div>
      </div>
    </>
  );
}

export default App;

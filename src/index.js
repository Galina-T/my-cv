import "./scss/main.scss";
import "./fonts/fonts.scss";

import {
  gsap,
  ScrollTrigger,
  Draggable,
  Flip,
  MotionPathPlugin,
} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin);

let introAnimation = () => {
  const tlIntro = gsap.timeline({ defaults: { duration: 1 } });

  tlIntro
    .set(".intro__content", { position: "fixed" })
    .to(".arrow", { autoAlpha: 0 })
    .to(".intro", { paddingRight: "65%", paddingLeft: "0", duration: 3 })
    .to(".logo-overlay-circle", { height: 320, width: 320, duration: 3 })
    .to(".logo-overlay-circle", { borderRadius: "10px", duration: 2 })
    .to(".logo-overlay-circle", { height: "80%", duration: 2 })
    .to(".logo-overlay-circle", { marginTop: 100, duration: 2 });

  ScrollTrigger.create({
    animation: tlIntro,
    trigger: ".intro",
    start: "top top",
    scrub: true,
  });

  return tlIntro;
};

let speechBubblesAnimation = () => {
  const tlSpeechBubbles = gsap.timeline({ defaults: { duration: 0.5 } });

  tlSpeechBubbles
    .fromTo(".bubble2", { scale: 0 }, { scale: 1 })
    .fromTo(".bubble3", { scale: 0 }, { scale: 1 })
    .fromTo(".bubble1", { scale: 0 }, { scale: 1 }, "+=1");

  ScrollTrigger.create({
    animation: tlSpeechBubbles,
    trigger: ".main__trigger-pin",
    start: "top top",
    endTrigger: ".main__trigger-pin",
    end: "bottom top",
    scrub: true,
    pin: ".main__content",
    pinSpacing: false,
  });

  return tlSpeechBubbles;
};

let bugAnimation = () => {
  const tlBug = gsap.timeline({ defaults: { duration: 1 } });

  tlBug
    .to(".bug", {
      y: "-200%",
      x: "-130%",
      rotate: -20,
    })
    .to(".bug", {
      y: "-470%",
      x: "-170%",
      rotate: -10,
    })
    .to(".bug", {
      y: "-700%",
      x: "-70%",
      rotate: 15,
    });

  ScrollTrigger.create({
    animation: tlBug,
    trigger: ".main__trigger-pin",
    start: "top top",
    scrub: true,
  });

  return tlBug;
};

let eyesAnimation = () => {
  const tlEyes = gsap.timeline({
    defaults: { duration: 0.2 },
    repeat: -1,
    repeatDelay: 2,
  });

  tlEyes
    .from(".eyes", { scaleY: 0, repeat: 4, yoyo: true })
    .from(".eyes", { scaleY: 0, repeat: 2, yoyo: true, delay: 2 });

  return tlEyes;
};

let speechAnimation = () => {
  const tlSpeech = gsap.timeline({ defaults: { duration: 2 } });

  tlSpeech.fromTo(".speech", { scale: 0 }, { scale: 1 });

  ScrollTrigger.create({
    animation: tlSpeech,
    trigger: ".main",
    start: "bottom bottom",
    scrub: true,
  });

  return tlSpeech;
};

const start = (wide) => {
  if (wide < 1024) {
    const tl1 = speechBubblesAnimation();
    const tl2 = bugAnimation();
    const tl3 = eyesAnimation();

    return () => {
      tl1.revert().kill();
      tl2.revert().kill();
      tl3.revert().kill();
    };
  } else {
    const tl1 = introAnimation();
    const tl2 = speechBubblesAnimation();
    const tl3 = bugAnimation();
    const tl4 = eyesAnimation();
    const tl5 = speechAnimation();

    return () => {
      tl1.revert().kill();
      tl2.revert().kill();
      tl3.revert().kill();
      tl4.revert().kill();
      tl5.revert().kill();
    };
  }
};

let windowWide = window.innerWidth;
let kill = start(windowWide);

window.onresize = function () {
  const widthAfterResize = window.innerWidth;

  if (windowWide !== widthAfterResize) {
    windowWide = widthAfterResize;

    kill();
    kill = start(windowWide);
  }
};

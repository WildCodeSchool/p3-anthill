import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import "./BackgrdParticles.css";

function BackgrdParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  return (
    <div className="particles">
      <Particles
        id="tsparticles"
        className="bgr-particles"
        init={particlesInit}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 200,
                duration: 1.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#ffeba7", "#9ea93f", "#e49893", "#efc0b4"],
            },
            links: {
              color: {
                value: "#ffeba7",
              },
              distance: 200,
              enable: true,
              opacity: 0.5,
              width: 1.5,
            },
            // collisions: {
            //   enable: true,
            // },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 4,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 600,
              },
              value: 100,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}

export default BackgrdParticles;

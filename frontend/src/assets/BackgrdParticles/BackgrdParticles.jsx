import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

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
                distance: 300,
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
              opacity: 0.4,
              width: 1.5,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 2000,
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

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function BackgrdParticles() {
  const particlesInit = useCallback(async (engine) => {
    console.error(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.error(container);
  }, []);

  return (
    <div className="particles">
      <Particles
        id="tsparticles"
        className="background"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 1.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#ffeba7", "#ececec", "#102770"],
            },
            links: {
              color: ["#ffeba7", "#ececec"],
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
                area: 800,
              },
              value: 120,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}

export default BackgrdParticles;

import StarsCanvas from "./Stars";

type GradientInput =
  | string
  | {
      from: string;
      via?: string;
      to: string;
      direction?: string;
    };

function buildGradient(input: GradientInput, defaultDirection: string) {
  if (typeof input === "string") return input;
  const dir = input.direction ?? defaultDirection;
  if (input.via) {
    return `linear-gradient(${dir}, ${input.from} 0%, ${input.via} 50%, ${input.to} 100%)`;
  }
  return `linear-gradient(${dir}, ${input.from} 0%, ${input.to} 100%)`;
}

interface BlobDef {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  height: string;
  background: string;
  borderRadius?: string;
  blur?: string;
  opacity?: number;
  animationDelay?: string;
  className?: string;
}

const defaultBlobs: BlobDef[] = [
  {
    top: "0",
    left: "0",
    width: "600px",
    height: "600px",
    background: "rgba(38, 79, 144, 0.3)",
    borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
    blur: "100px",
    opacity: 1,
    className: "animate-pulse",
  },
  {
    top: "20%",
    right: "0",
    width: "500px",
    height: "700px",
    background: "rgba(92, 60, 165, 0.3)",
    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
    blur: "120px",
    opacity: 0.7,
    animationDelay: "1s",
  },
  {
    bottom: "0",
    left: "20%",
    width: "550px",
    height: "550px",
    background: "rgba(119, 34, 77, 0.25)",
    borderRadius: "30% 70% 70% 30% / 30% 50% 50% 70%",
    blur: "110px",
    opacity: 0.8,
    animationDelay: "2s",
  },
  {
    top: "50%",
    left: "50%",
    width: "450px",
    height: "650px",
    background: "rgba(6,182,212,0.2)",
    borderRadius: "70% 30% 50% 50% / 40% 60% 40% 60%",
    blur: "130px",
    animationDelay: "0.5s",
  },
];

interface BackgroundEffectsProps {
  gradientA?: GradientInput; // bottom-right gradient
  gradientB?: GradientInput; // top-left gradient
  opacity?: number;
  blobs?: BlobDef[];
}

export function BackgroundEffects({
  gradientA,
  gradientB,
  opacity = 0.5,
  blobs,
}: BackgroundEffectsProps) {
  const gA = gradientA ?? {
    from: "rgba(0, 0, 0, 0.2)",
    via: "rgba(0, 0, 0, 0.2)",
    to: "rgba(24, 9, 17, 0.3)",
  };
  const gB = gradientB ?? {
    from: "rgba(0, 0, 0, 0.2)",
    via: "rgba(0, 0, 0, 0.2)",
    to: "rgba(24, 9, 17, 0.3)",
    direction: "to top left",
  };

  const gradientAStyle = { background: buildGradient(gA, "to bottom right") };
  const gradientBStyle = { background: buildGradient(gB, "to top left") };

  return (
    <>
      {/* Stars canvas as full fixed background */}
      <StarsCanvas className="fixed inset-0 -z-30 w-full h-full pointer-events-none" />

      {/* Animated Gradient Background (renders above stars) */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ opacity }}
      >
        {/* Base gradient layers (configurable) */}
        <div className="absolute inset-0" style={gradientAStyle}></div>
        <div className="absolute inset-0" style={gradientBStyle}></div>

        {/* Irregular blob shapes (configurable) */}
        {(blobs ?? defaultBlobs).map((b, i) => {
          const style: React.CSSProperties = {
            width: b.width,
            height: b.height,
            background: b.background,
            borderRadius: b.borderRadius,
            filter: b.blur ? `blur(${b.blur})` : undefined,
            opacity: b.opacity,
            animationDelay: b.animationDelay,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
          };
          const classes = `absolute ${b.className ?? ""}`.trim();
          return <div key={i} className={classes} style={style}></div>;
        })}
      </div>

      {/* Enhanced Noise Texture (above gradients) */}
      <div
        className="fixed inset-0 z-20 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      ></div>
    </>
  );
}

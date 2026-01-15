import spaceBackground from "@/assets/space-background.png";

const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Space background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${spaceBackground})`,
          opacity: 0.6 
        }}
      />
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90" />
      {/* Green mist animated overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent animate-pulse" style={{ animationDuration: '8s' }} />
    </div>
  );
};

export default SpaceBackground;

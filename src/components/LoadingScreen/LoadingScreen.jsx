import Lottie from 'react-lottie-player';
import rocketAnimation from './rocket-launch.json'; // Baixe uma animação de foguete no LottieFiles

const LoadingScreen = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  const textStyle = {
    marginTop: '20px',
    fontSize: '1.5rem',
    animation: 'blink 10s infinite'
  };

  return (
    <div style={containerStyle}>
      <Lottie
        loop
        animationData={rocketAnimation}
        play
        style={{ width: 200, height: 200 }}
      />
      <p style={textStyle}>Preparando análise...</p>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;

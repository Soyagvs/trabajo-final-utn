import BgVideo from "../../assets/video/video.webm";
import "./Home.css";

export const Home = () => {
  return (
    <main>
      <div className="home-container">
        <h1 className="home-h1">Historias de hackers</h1>
        <p className="home-p">
          Aqui encontraras a los hackers mas conocidos del mundo, son buenos o malos? esa sera tu decision.
        </p>
        <figure>
          <video className="home-video" autoPlay playsInline loop muted>
            <source src={BgVideo} />
          </video>
        </figure>
      </div>
    </main>
  );
};

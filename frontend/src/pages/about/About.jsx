import "./About.css";
import Aboutimg from "../../assets/img/about-img.webp";

export const About = () => {
  return (
    <main className="about-container">
      <div className="about-container-div">
        <h2 className="title-about">Sobre mi</h2>
        <div className="text-about">
          <img src={Aboutimg} alt="" className="img-about" decoding="async"/>
          <p className="text-title">
            Haz escuchado alguna ves historias sobre estos hackers mas
            peligrosos del mundo? aqui te mostrare sus historias para que puedas
            conocerlos, si tenes historias puedes ir a la seccion de contacto y
            mandarme por ese medio la historia y yo la estare publicando ..
          </p>
        </div>
      </div>
    </main>
  );
};

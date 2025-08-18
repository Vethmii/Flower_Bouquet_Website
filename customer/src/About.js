import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Nonimi Flora</h1>
        <p>
          Rooted in creativity and a love for nature, Nonimi Flora is dedicated to crafting elegant, meaningful flower bouquets for every occasion. Each arrangement is made with care, passion, and a personal touch that sets us apart.
        </p>
      </header>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          Started as a small, heartfelt venture, Nonimi Flora has blossomed into a passion for crafting beautiful, meaningful flower bouquets. Each arrangement is made with dedication and creativity, reflecting our love for nature and the joy it can bring to everyday moments. While we currently serve our local area, we have dreams of blooming across Colombo in the future.
        </p>
      </section>

      <section className="our-mission">
        <h2>Our Mission</h2>
        <p>
          "To bring the natural beauty and joy of fresh flowers into the lives of people across Colombo, creating memorable moments through thoughtfully crafted arrangements that speak from the heart."
        </p>
      </section>

      <p>At Nonimi flora, we believe every flower arrangement tells a story. Our mission is to help you tell yours beautifully.</p>

      <section className="team-images">
        <img src="/images/image-31.jpg" alt="Bouquet example" />
        <img src="/images/image-34.jpg" alt="Flower arrangement" />
      </section>
    </div>
  );
}

export default About;

class HeroContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="jumbotron">
      <div tabindex="0" class="container-jumbotron">
          <h1>Asep Resto</h1>
          <h2>Manjakan lidahmu</h2>
          <div class="garis"></div>
          <p>Nikmati Cita rasa di setiap gigitan.</p>
      </div>
      </div>`;
  }
}

customElements.define('hero-section', HeroContent);

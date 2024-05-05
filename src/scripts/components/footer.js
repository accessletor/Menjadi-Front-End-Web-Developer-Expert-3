class HeroContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer tabindex="0">
      <p>Submition Dicoding &#169; 2024 - Hunger Apps</p>
      </footer>
      `;
  }
}

customElements.define('custom-footer', HeroContent);

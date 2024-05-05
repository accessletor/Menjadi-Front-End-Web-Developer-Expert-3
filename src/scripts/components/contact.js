class HeroContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="contact">
        <div tabindex="0" class="contact-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63393.465978273976!2d108.36941044573416!3d-6.758681218804516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f203c08621a2d%3A0xbc3dd5b0c6cac82c!2sKec.%20Dukupuntang%2C%20Kabupaten%20Cirebon%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1710303036556!5m2!1sid!2sid" width="100%" height="auto" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div tabindex="0" class="contact-form">
          <h2 tabindex="0">Contact Us</h2>
          <form action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="247636ca-c499-4538-a414-4fa1e479910e">
            <input tabindex="0" type="text" placeholder="name" class="contact-form-text"/>
            <input tabindex="0" type="text" placeholder="email" class="contact-form-text"/>
            <textarea tabindex="0" placeholder="message" class="contact-form-textarea"></textarea>
            <button tabindex="0" type="submit" name="submit" class="contact-form-btn">submit</button>
          </form>
        </div>
      </section>
    `;
  }
}

customElements.define('section-contact', HeroContent);

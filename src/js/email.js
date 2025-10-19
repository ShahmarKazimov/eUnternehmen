
(function(){
  emailjs.init("q9B9LMYmWEzkuOdOc");
})();

document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_nlsgtni", "template_bffyn8c", this)
    .then(() => {
      alert("Message sent successfully!");
      this.reset();
    })
    .catch(err => {
      console.error("Error:", err);
      alert("Message not sent. Please try again.");
    });
});

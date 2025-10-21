
(function () {
  emailjs.init("q9B9LMYmWEzkuOdOc");
})();

document.getElementById("signupForm").addEventListener("submit", function (e) {
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

// Pricing buttons handler
document.addEventListener('DOMContentLoaded', function () {
  const starterButtons = document.querySelectorAll('.pricing__button--starter');
  const proButtons = document.querySelectorAll('.pricing__button--pro');

  starterButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      sessionStorage.setItem('selectedPlan', 'starter');
      sessionStorage.setItem('selectedPlanName', 'Starter');
      sessionStorage.setItem('selectedPlanPrice', '69.90');
      window.location.href = '/contact.html';
    });
  });

  proButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      sessionStorage.setItem('selectedPlan', 'professional');
      sessionStorage.setItem('selectedPlanName', 'Professional');
      sessionStorage.setItem('selectedPlanPrice', '79.90');
      window.location.href = '/contact.html';
    });
  });
});

const selectedPlan = sessionStorage.getItem('selectedPlan');

if (selectedPlan) {
  const select = document.getElementById('plan');
  select.value = selectedPlan;
} else {
  select.value = "";
}

document.getElementById('plan').addEventListener('change', function () {
  const selectedValue = this.value;
  sessionStorage.setItem('selectedPlan', selectedValue);
});

  window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('selectedPlan');
  });
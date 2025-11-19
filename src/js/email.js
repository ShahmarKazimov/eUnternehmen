(function () {
  emailjs.init("q9B9LMYmWEzkuOdOc");
})();

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect form data manually
  const formData = new FormData(this);
  const emailData = {};

  // Get all form fields
  formData.forEach((value, key) => {
    emailData[key] = value;
  });

  // Get plan information from sessionStorage
  const selectedPlan = sessionStorage.getItem('selectedPlan');
  const selectedPlanPrice = sessionStorage.getItem('selectedPlanPrice');

  // Fallback to form data if sessionStorage is empty
  let planName = selectedPlan;
  let planPrice = selectedPlanPrice;

  if (!planName && emailData.plan) {
    planName = emailData.plan;
    // Set default prices based on plan
    if (emailData.plan === 'Starter') {
      planPrice = '69.90';
    } else if (emailData.plan === 'Pro') {
      planPrice = '79.90';
    }
  }

  // Format plan as expected by template: "PlanName: €XX.XX"
  if (planName && planPrice) {
    emailData['planName:planPrice'] = `${planName}: €${planPrice}`;
  } else if (planName) {
    emailData['planName:planPrice'] = planName;
  } else {
    emailData['planName:planPrice'] = 'Not specified';
  }


  emailjs.send("service_nlsgtni", "template_bffyn8c", emailData)
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
      sessionStorage.setItem('selectedPlan', 'Starter');
      sessionStorage.setItem('selectedPlanPrice', '69.90');
      window.location.href = '/contact.html';
    });
  });

  proButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      sessionStorage.setItem('selectedPlan', 'Pro');
      sessionStorage.setItem('selectedPlanPrice', '79.90');
      window.location.href = '/contact.html';
    });
  });

  // Initialize plan selector
  initializePlanSelector();

  // Update price display on page load
  updatePriceDisplay();

  // Move the select logic inside DOMContentLoaded to ensure the element exists
  const select = document.getElementById('plan');

  if (select) {
    const selectedPlan = sessionStorage.getItem('selectedPlan');

    if (selectedPlan) {
      select.value = selectedPlan;
    } else {
      select.value = "";
    }

    select.addEventListener('change', function () {
      const selectedValue = this.value;
      sessionStorage.setItem('selectedPlan', selectedValue);
    });
  }
});

// Plan selector functionality
function initializePlanSelector() {
  const planOptions = document.querySelectorAll('.plan-option');
  const hiddenSelect = document.getElementById('plan');

  if (planOptions.length === 0 || !hiddenSelect) return;

  // Get selected plan from storage and set initial state
  const selectedPlan = sessionStorage.getItem('selectedPlan');

  if (selectedPlan) {
    planOptions.forEach(option => {
      const value = option.getAttribute('data-value');
      if (value === selectedPlan) {
        option.classList.add('selected');
        hiddenSelect.value = selectedPlan;
      } else {
        option.classList.remove('selected');
      }
    });
  }

  // Add click handlers to plan options
  planOptions.forEach(option => {
    option.addEventListener('click', function () {
      const value = this.getAttribute('data-value');

      // Remove selected class from all options
      planOptions.forEach(opt => opt.classList.remove('selected'));

      // Add selected class to clicked option
      this.classList.add('selected');

      // Update hidden select value
      hiddenSelect.value = value;

      // Save to session storage with plan price
      sessionStorage.setItem('selectedPlan', value);

      // Set plan price based on selection
      let planPrice = '';
      if (value === 'Starter') {
        planPrice = '69.90';
      } else if (value === 'Pro') {
        planPrice = '79.90';
      }
      sessionStorage.setItem('selectedPlanPrice', planPrice);      // Update price display
      updatePriceDisplay();

      // Trigger change event on hidden select
      hiddenSelect.dispatchEvent(new Event('change'));
    });
  });
};

// Update price display from sessionStorage
function updatePriceDisplay() {
  const priceDisplay = document.getElementById('priceDisplay');
  const priceCard = document.querySelector('.price-card__price');

  if (!priceDisplay) return;

  const selectedPrice = sessionStorage.getItem('selectedPlanPrice');

  if (selectedPrice) {
    priceDisplay.textContent = selectedPrice;
    if (priceCard) {
      priceCard.style.display = 'block';
    }
  } else {
    // If no price selected, hide the entire price section
    if (priceCard) {
      priceCard.style.display = 'none';
    }
  }
}

// FAQ
const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq =>{
    faq.addEventListener("click", () => {
        faq.classList.toggle("active");
    })
})



// Hover effect (submit button)
const submitButton = document.querySelector('.inputBox input[type="submit"]');

submitButton.addEventListener('mouseenter', function() {
    submitButton.style.backgroundColor = '#3c3c6f';
});

submitButton.addEventListener('mouseleave', function() {
    submitButton.style.backgroundColor = '#0e3959';
});



// Modal (after submission)
var form = document.querySelector('.contactUs form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  openModal();
});

// Function to open the modal
function openModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
}

var modal = document.getElementById("myModal");
var sendButton = document.querySelector('.contactUs input[type="submit"]');
var closeBtn = document.querySelector(".modal-content .close");

sendButton.onclick = function() {
  modal.style.display = "block";
}

closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}



// Pop-up chat
document.getElementById('open-chat-btn').addEventListener('click', toggleChat);

function toggleChat() {
    var chatPopup = document.getElementById('chat-popup');
    if (chatPopup.style.display === 'block') {
        chatPopup.style.display = 'none';
    } else {
        chatPopup.style.display = 'block';
    }
}

document.getElementById('open-chat-btn').addEventListener('click', toggleChat);


const btnClose = document.getElementById('btn-close');

function openChat() {
    document.getElementById('chat-popup').style.display = 'block';
}

function closeChat() {
  chatPopup.style.display = 'none';
}

document.getElementById('btn-send').addEventListener('click', () => {
  const message = document.getElementById('chat-input').value;
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML += `<div class="message">${message}</div>`;
  document.getElementById('chat-input').value = '';
});

btnClose.addEventListener('click', closeChat);



// to top button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', function () {
    var scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});
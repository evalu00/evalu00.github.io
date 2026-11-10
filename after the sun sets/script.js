/* background color fade ! */

function rememberColor() {
  const color = getComputedStyle(document.body).backgroundColor;
  sessionStorage.setItem("previousBackground", color);
}

// remember the color before opening another page
document.querySelectorAll("a.choice").forEach(function(link) {
  link.addEventListener("click", rememberColor);
});

// fade from the previous color when the new page opens
window.addEventListener("pageshow", function() {
  const oldColor = sessionStorage.getItem("previousBackground");

  if (oldColor) {
    const newColor = getComputedStyle(document.body).backgroundColor;

    document.body.style.setProperty("--old-color", oldColor);
    document.body.style.setProperty("--new-color", newColor);

    document.body.classList.remove("color-fade");
    void document.body.offsetWidth;
    document.body.classList.add("color-fade");

    sessionStorage.removeItem("previousBackground");
  }
});


/* retrace ur steps ! */

const backButton = document.querySelector(".retrace");

if (backButton) {
  backButton.addEventListener("click", function() {

    // remember the color before going back
    rememberColor();

    // go back to the previous page
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }

  });
}


/* audio ! */

const audio = document.getElementById("background-sound");
const soundButton = document.querySelector(".sound-label");

if (audio && soundButton) {

  /* update sound label and icon */

  function updateSoundButton() {

    if (audio.paused) {
      soundButton.textContent = "SOUND OFF";
      soundButton.classList.add("sound-off");
    } else {
      soundButton.textContent = "SOUND ON";
      soundButton.classList.remove("sound-off");
    }

  }


  /* try autoplay */

  audio.play().then(function() {
    updateSoundButton();
  }).catch(function() {

    // some browsers block autoplay
    soundButton.textContent = "PLAY SOUND";
    soundButton.classList.add("sound-off");

  });


  /* sound on & off ! */

  soundButton.addEventListener("click", function() {

    if (audio.paused) {

      audio.play().then(function() {
        updateSoundButton();
      }).catch(function() {
        soundButton.textContent = "PLAY SOUND";
        soundButton.classList.add("sound-off");
      });

    } else {

      audio.pause();
      updateSoundButton();

    }

  });

}
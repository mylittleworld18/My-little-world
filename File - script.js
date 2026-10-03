/* =========================
   OUR LITTLE WORLD
   SCRIPT.JS
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PAGE ELEMENTS
     ========================= */

  const homePage = document.getElementById("homePage");
  const memoriesPage = document.getElementById("memoriesPage");
  const envelopePage = document.getElementById("envelopePage");
  const letterPage = document.getElementById("letterPage");
  const giftsPage = document.getElementById("giftsPage");

  const openStoryButton = document.getElementById("openStoryButton");
  const moreButton = document.getElementById("moreButton");
  const envelope = document.getElementById("envelope");
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const nextLetterButton = document.getElementById("nextLetterButton");

  const ourSong = document.getElementById("ourSong");
  const letterTune = document.getElementById("letterTune");


  /* =========================
     HELPER FUNCTIONS
     ========================= */

  function showPage(pageToShow) {

    const pages = [
      homePage,
      memoriesPage,
      envelopePage,
      letterPage,
      giftsPage
    ];

    pages.forEach(page => {
      if (page) {
        page.classList.add("hidden");
      }
    });

    if (pageToShow) {
      pageToShow.classList.remove("hidden");
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }


  /* =========================
     PAGE 1 → PAGE 2
     ========================= */

  if (openStoryButton) {

    openStoryButton.addEventListener("click", () => {

      showPage(memoriesPage);

      /*
        If the first song was already playing,
        stop it when moving forward.
      */

      if (ourSong) {
        ourSong.pause();
        ourSong.currentTime = 0;
      }

    });

  }


  /* =========================
     PAGE 2 → PAGE 3
     ========================= */

  if (moreButton) {

    moreButton.addEventListener("click", () => {

      if (ourSong) {
        ourSong.pause();
        ourSong.currentTime = 0;
      }

      showPage(envelopePage);

    });

  }


  /* =========================
     ENVELOPE → LETTER
     ========================= */

  let envelopeOpened = false;

  if (envelopeWrapper && envelope) {

    envelopeWrapper.addEventListener("click", () => {

      if (envelopeOpened) {
        return;
      }

      envelopeOpened = true;

      envelope.classList.add("opened");

      /*
        Start the second music when
        the envelope is opened.
      */

      if (letterTune) {

        letterTune.currentTime = 0;

        const playPromise = letterTune.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            /*
              Some browsers may block autoplay.
              The user has already tapped the envelope,
              so normally playback should be allowed.
            */
          });
        }

      }

      /*
        Give the envelope animation time to play
        before showing the letter.
      */

      setTimeout(() => {

        showPage(letterPage);

        envelopeOpened = false;
        envelope.classList.remove("opened");

      }, 1100);

    });

  }


  /* =========================
     LETTER → GIFTS
     ========================= */

  if (nextLetterButton) {

    nextLetterButton.addEventListener("click", () => {

      /*
        IMPORTANT:
        Stop tune.mp3 immediately.
      */

      if (letterTune) {
        letterTune.pause();
        letterTune.currentTime = 0;
      }

      showPage(giftsPage);

    });

  }


  /* =========================
     GIFT BOXES
     ========================= */

  const giftOpenButtons = document.querySelectorAll(".gift-open-button");
  const giftBoxButtons = document.querySelectorAll(".gift-box-button");

  const bouquetSurprise = document.getElementById("bouquetSurprise");
  const hugSurprise = document.getElementById("hugSurprise");
  const loveSurprise = document.getElementById("loveSurprise");

  const surprises = {
    bouquet: bouquetSurprise,
    hug: hugSurprise,
    love: loveSurprise
  };


  function openGift(giftName) {

    const selectedSurprise = surprises[giftName];

    if (!selectedSurprise) {
      return;
    }

    /*
      Make sure other surprise screens
      are closed first.
    */

    Object.values(surprises).forEach(surprise => {

      if (surprise) {
        surprise.classList.add("hidden");
      }

    });

    selectedSurprise.classList.remove("hidden");

    /*
      Start the special animation
      depending on the gift.
    */

    if (giftName === "bouquet") {
      createFlowers();
    }

    if (giftName === "love") {
      createHearts();
    }

  }


  /* =========================
     GIFT BUTTON EVENTS
     ========================= */

  giftBoxButtons.forEach(button => {

    button.addEventListener("click", () => {

      const giftName = button.dataset.gift;

      openGift(giftName);

    });

  });


  giftOpenButtons.forEach(button => {

    button.addEventListener("click", () => {

      const giftName = button.dataset.gift;

      openGift(giftName);

    });

  });


  /* =========================
     CLOSE GIFT SURPRISES
     ========================= */

  const closeButtons = document.querySelectorAll(".close-surprise");

  closeButtons.forEach(button => {

    button.addEventListener("click", () => {

      const giftName = button.dataset.close;

      const selectedSurprise = surprises[giftName];

      if (selectedSurprise) {
        selectedSurprise.classList.add("hidden");
      }

    });

  });


  /* =========================
     CLICK OUTSIDE SURPRISE
     ========================= */

  Object.values(surprises).forEach(surprise => {

    if (!surprise) {
      return;
    }

    surprise.addEventListener("click", event => {

      /*
        Only close when clicking the dark
        background, not the actual card.
      */

      if (event.target === surprise) {
        surprise.classList.add("hidden");
      }

    });

  });


  /* =========================
     BOUQUET FLOWER ANIMATION
     ========================= */

  function createFlowers() {

    const area = document.getElementById("flowerAnimationArea");

    if (!area) {
      return;
    }

    area.innerHTML = "";

    const flowers = [
      "🌸",
      "🌷",
      "🌼",
      "🌺",
      "💐",
      "🪻",
      "🌹",
      "🌸"
    ];

    for (let i = 0; i < 30; i++) {

      const flower = document.createElement("span");

      flower.className = "falling-flower";

      flower.textContent =
        flowers[Math.floor(Math.random() * flowers.length)];

      flower.style.left = Math.random() * 100 + "%";

      flower.style.animationDuration =
        (3 + Math.random() * 3) + "s";

      flower.style.animationDelay =
        Math.random() * 1.8 + "s";

      flower.style.fontSize =
        (18 + Math.random() * 20) + "px";

      area.appendChild(flower);

    }

  }


  /* =========================
     LOVE HEART ANIMATION
     ========================= */

  function createHearts() {

    const area = document.getElementById("heartAnimationArea");

    if (!area) {
      return;
    }

    area.innerHTML = "";

    const hearts = [
      "💙",
      "💙",
      "💖",
      "💕",
      "✨",
      "💗",
      "♡"
    ];

    for (let i = 0; i < 28; i++) {

      const heart = document.createElement("span");

      heart.className = "floating-heart";

      heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

      heart.style.left = Math.random() * 100 + "%";

      heart.style.animationDuration =
        (3 + Math.random() * 3) + "s";

      heart.style.animationDelay =
        Math.random() * 2 + "s";

      heart.style.fontSize =
        (18 + Math.random() * 25) + "px";

      area.appendChild(heart);

    }

  }


  /* =========================
     ESC KEY
     ========================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      Object.values(surprises).forEach(surprise => {

        if (surprise) {
          surprise.classList.add("hidden");
        }

      });

    }

  });


  /* =========================
     INITIAL STATE
     ========================= */

  showPage(homePage);

});
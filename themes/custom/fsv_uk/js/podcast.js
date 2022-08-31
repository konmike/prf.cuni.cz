const APIController = (function () {
  const clientId = drupalSettings.clientId;
  const clientSecret = drupalSettings.clientSecret;

  // private methods
  const _getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    return data.access_token;
  };

  const _getEpisodes = async () => {
    const token = await _getToken();

    const result = await fetch(
      // `https://api.spotify.com/v1/shows/1dNqQuHMd9o1ns1mn8Ut7S/episodes?market=ES`,
      `https://api.spotify.com/v1/shows/73kX0Bae7x1ToI9dJ6Nu2O/episodes?market=ES`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.items;
  };

  return {
    getEpisodes() {
      return _getEpisodes();
    },
  };
})();

// UI Module
const UIController = (function () {
  //object to hold references to html selectors
  const DOMElements = {
    selectFeed: "#feed",
  };

  //public methods
  return {
    //method to get input fields
    inputField() {
      return {
        feed: document.querySelector(DOMElements.selectFeed),
      };
    },

    createEpisode(id, name, description) {
      const html = `<li><article class="episode"><h3>${name}</h3><div class="episode--description">${description}</div><iframe class="episode--iframe" loading="lazy" src="https://open.spotify.com/embed-podcast/episode/${id}?theme=0" width="100%" height="232" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"></iframe></article></li>`;
      document
        .querySelector(DOMElements.selectFeed)
        .insertAdjacentHTML("beforeend", html);
    },
  };
})();

const APPController = (function (UICtrl, APICtrl) {
  // -- get input field object ref
  // const DOMInputs = UICtrl.inputField();

  // get genres on page load
  const loadEpisodes = async () => {
    const episodes = await APICtrl.getEpisodes();
    // console.log(episodes);

    // -- populate our genres select element
    episodes.forEach((element) =>
      UICtrl.createEpisode(element.id, element.name, element.description)
    );
  };

  return {
    init() {
      loadEpisodes();
    },
  };
})(UIController, APIController);

APPController.init();

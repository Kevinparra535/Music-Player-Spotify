// Controls

window.onSpotifyWebPlaybackSDKReady = () => {
  const token =
    "BQBKqKQVYYiNbzyMz-2GFiUZuOmQyu2p7U-eAjPNUB0FDg-D8QIR-GU2Cfx3cEanWb5pMvyAh_d0lBjftpq-kYxnPi7pLc5SJz2zUb8eETAV5ivBWVYvQrw8hy_MJz8IxNI-cFPCWzFvcDRYDKmNa-wK_4ZM_D6-p6rLuRPseuSurX09WvY";
  const player = new Spotify.Player({
    name: "Reproductor de Kevin",
    getOAuthToken: (cb) => {
      cb(token);
    },
  });

  // Error handling
  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("playback_error", ({ message }) => {
    console.error(message);
  });

  // Playback status updates
  player.addListener("player_state_changed", (state) => {
    console.log(state);
    console.log("Estas Conectado a spotify!");

    state.track_window.current_track.artists.map((subject) => {
      names = subject.name;
      return;
    });
    $(".artists__name").html(names);

    $(".song__name").html(state.track_window.current_track.name);
    $(".album__name").html(state.track_window.current_track.album.name);

    $(".cover").attr(
      "src",
      state.track_window.current_track.album.images[0].url
    );

    if (state.paused) {
      $(".play").attr("src", "./../src/images/icons/play.png");
    } else if (state.paused == false) {
      $(".play").attr("src", "./../src/images/icons/pause.png");
    }
  });

  // Ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
  });

  // Not Ready
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  player.getCurrentState().then((state) => {
    if (!state) {
      console.error("User is not playing music through the Web Playback SDK");
      return;
    }

    let {
      current_track,
      next_tracks: [next_track],
    } = state.track_window;

    console.log("Currently Playing", current_track);
    console.log("Playing Next", next_track);
  });

  player.addListener(
    "player_state_changed",
    ({ position, duration, track_window: { current_track } }) => {
      console.log("Currently Playing", current_track);
      console.log("Position in Song", position);
      console.log("Duration of Song", duration);

      var segundosP = duration / 1000;
      const segundos = Math.round(segundosP % 0x3c);
      const minutos = Math.floor(segundosP / 0x3c) % 0x3c;

      var dataMax = `${minutos}:${segundos}`;
      var range__slider = document.querySelector(".range__slider");
      range__slider.setAttribute("data-max", dataMax);
      $(".timeMax").html(dataMax);
    }
  );

  let slider__volume = document.getElementById("slider__volume");
  slider__volume.oninput = function () {
    let volume_percentage = slider__volume.value / 100;
    player.setVolume(volume_percentage).then(() => {});
  };

  $(".play").bind("click", (event) => {
    event.preventDefault();

    player.togglePlay().then(() => {
      console.log("Toggled playback!");
    });
  });

  $(".next").bind("click", (event) => {
    event.preventDefault();

    player.nextTrack().then(() => {
      console.log("Skipped to next track!");
    });
  });

  $(".prev").bind("click", (event) => {
    event.preventDefault();

    player.previousTrack().then(() => {
      console.log("Set to previous track!");
    });
  });

  // Connect to the player!
  player.connect();
};

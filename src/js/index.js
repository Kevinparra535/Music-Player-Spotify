// Controls

const play = document.getElementById("controls_play");
const pause = document.getElementById("controls_pause");
const prev = document.getElementById("controls_prev");
const next = document.getElementById("controls_next");

window.onSpotifyWebPlaybackSDKReady = () => {
  const token =
    "BQBKrdDlwObeo69nal3_FQGUVmGEUfuBs9DCNQNkS0DRCRN1e7TQKZ3y9huJL1dsCVjlq4eZW5QJ_j_TWubViM5NTNIqC8aEVrslfyLqfbs5Rs5Je1SUUkRdaOHk_F4wEkhE-isb64f4dI_3YomENEdCpywo0TAhkphqJbDlozKyCcx6IeM";
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

    document.getElementById("controls_title").innerHTML =
      state.track_window.current_track.name;

    state.track_window.current_track.artists.map((subject) => {
      let names = subject.name;
      document.getElementById("controls_artits").innerHTML = names;
      console.log(names);
    });
  });

  // Ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
  });

  // Not Ready
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  // Connect to the player!
  player.connect();

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

  pause.addEventListener("click", (event) => {
    event.preventDefault();

    player.pause().then(() => {
      console.log("Paused!");
    });
  });

  play.addEventListener("click", (event) => {
    event.preventDefault();

    player.resume().then(() => {
      console.log("Resumed!");
    });
  });

  prev.addEventListener("click", (event) => {
    event.preventDefault();

    player.previousTrack().then(() => {
      console.log("Set to previous track!");
    });
  });

  next.addEventListener("click", (event) => {
    event.preventDefault();

    player.nextTrack().then(() => {
      console.log("Skipped to next track!");
    });
  });
};

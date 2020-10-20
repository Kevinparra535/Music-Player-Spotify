// Controls

window.onSpotifyWebPlaybackSDKReady = () => {
  const token =
    "BQCiItKzhIRVJWo_FDQbaykk8lX16RWw8WXCwlsI-uxeqmNI6AdONhlVMZ4n7TJiHTu3N3SLPEgDuWoXrnD0jqwzzByqvc3tVvMxMtZ5dzzLR7pVKTsmiSCwdUmUovkpt_ySfHZm12OTOFv5fnHYF5xXYIBf50R03IITE5nTRxS2ylH6TiY";
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

    $(".header__alert").html("Estas Conectado a spotify!").addClass("success");
    console.log("Estas Conectado a spotify!");

    $(".player__dataName").html(state.track_window.current_track.name);

    state.track_window.current_track.artists.map((subject) => {
      names = subject.name;
      return;
    });
    $(".player__dataArtista").html(names);

    $(".player__album").attr(
      "src",
      state.track_window.current_track.album.images[0].url
    );

    if (state.paused) {
      $(".image__play").attr("src", "./../src/images/icons/play.png");
    } else if(state.paused == false) {
      $(".image__play").attr("src", "./../src/images/icons/pause.png");
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

  $(".player__play").bind("click", (event) => {
    event.preventDefault();

    player.togglePlay().then(() => {
      console.log("Toggled playback!");
    });
  });

  $(".player__next").bind("click", (event) => {
    event.preventDefault();

    player.nextTrack().then(() => {
      console.log("Skipped to next track!");
    });
  });

  // Connect to the player!
  player.connect();
};

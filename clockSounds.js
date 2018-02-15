const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
const play = document.querySelector('.play');

let myBuffer;

// Why initialize these with numbers? Not just an empty array [] ?
let points = [];

//timing for each number in the soundfile
// zero
points[0] = 39.288;
points[1] = 39.893;
points[2] = 40.104;
points[3] = 40.810;
points[4] = 41.300;
points[5] = 42.008;
points[6] = 42.344;
points[7] = 42.940;
points[8] = 43.297;
points[9] = 43.918;

// one
points[10] = 0.128;
points[11] = 0.515;
points[12] = 0.655;
points[13] = 1.079;
points[14] = 1.181;
points[15] = 1.556;
points[16] = 1.813;
points[17] = 2.092;
points[18] = 2.552;
points[19] = 2.917;

// two
points[20] = 3.085;
points[21] = 3.721;
points[22] = 3.788;
points[23] = 4.450;
points[24] = 4.574;
points[25] = 5.110;
points[26] = 5.327;
points[27] = 5.898;
points[28] = 6.104;
points[29] = 6.698;

// three
points[30] = 6.743;
points[31] = 7.324;
points[32] = 7.543;
points[33] = 8.151;
points[34] = 8.452;
points[35] = 9.165;
points[36] = 9.421;
points[37] = 10.039;
points[38] = 10.428;
points[39] = 10.876;

// four
points[40] = 11.023;
points[41] = 11.744;
points[42] = 11.959;
points[43] = 12.787;
points[44] = 12.986;
points[45] = 13.789;
points[46] = 14.026;
points[47] = 14.805;
points[48] = 15.136;
points[49] = 15.865;

// five
points[50] = 16.136;
points[51] = 16.886;
points[52] = 17.238;
points[53] = 18.066;
points[54] = 18.341;
points[55] = 19.166;
points[56] = 19.504;
points[57] = 20.274;
points[58] = 20.586;
points[59] = 21.392;

// six
points[60] = 21.577;
points[61] = 22.163;
points[62] = 22.366;
points[63] = 22.912;
points[64] = 23.087;
points[65] = 23.613;
points[66] = 23.774;
points[67] = 24.357;
points[68] = 24.452;
points[69] = 25.033;

// seven
points[70] = 25.166;
points[71] = 25.618;
points[72] = 25.887;
points[73] = 26.409;
points[74] = 26.711;
points[75] = 27.259;
points[76] = 27.510;
points[77] = 27.970;
points[78] = 28.112;
points[79] = 28.609;

// eight
points[80] = 28.632;
points[81] = 29.451;
points[82] = 29.816;
points[83] = 30.568;
points[84] = 30.994;
points[85] = 31.720;
points[86] = 31.928;
points[87] = 32.671;
points[88] = 32.845;
points[89] = 33.651;

// nine
points[90] = 33.777;
points[91] = 34.606;
points[92] = 34.786;
points[93] = 35.560;
points[94] = 36.046;
points[95] = 36.709;
points[96] = 37.144;
points[97] = 37.855;
points[98] = 38.172;
points[99] = 38.972;

// colon
points[110] = 44.111;
points[111] = 44.603;
points[112] = 45.074;
points[113] = 45.703;
points[114] = 46.073;
points[115] = 46.635;
points[116] = 46.999;
points[117] = 47.554;
points[118] = 47.755;
points[119] = 48.345;

// silences
points[120] = 49.9;
points[121] = 50.1;
points[122] = 49.9;
points[123] = 49.92;

/**
* Gets the audio data and load it
* into a buffer
*/
function getAudioData() {

  let request = new XMLHttpRequest();
  request.open('GET', 'clockSounds.wav', true);
  request.responseType = 'arraybuffer';
  request.send();

  request.onload = function() {
    let audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
      myBuffer = buffer;
    }, (e) => {
      "Error with decoding audio data" + e.error;
    });
  }
}

/**
* play digit sound
* @param {number} i index for points array
*/
function playSound(i) {
  let source = audioCtx.createBufferSource();
  source.buffer = myBuffer;
  source.connect(audioCtx.destination);
  source.start(0, points[i], points[i + 1] - points[i]);

  return source;
}

/**
* Plays a sound and gets a new time when the sound stops playing
* @param {number} i index for points array
*/
function playEnd(i) {
  let source = playSound(i);
  source.onended = function() {
  getTime();
  }
}

/**
* Sets play duration
*/
function setDelay(arr, i, duration, func) {
  setTimeout(() => {
    func(arr[i])
  }, duration)
}

/**
* populates array of time digits
* @param {number} hours
* @param {number} minutes
* @param {number} seconds
*/
function setCurrentTime(hours, minutes, seconds) {
  let digits = [];
  digits[0] = Math.floor(hours / 10);
  digits[1] = hours - digits[0] * 10;
  digits[2] = 11;
  digits[3] = Math.floor(minutes / 10);
  digits[4] = minutes - digits[3] * 10;
  digits[5] = 11;
  digits[6] = Math.floor(seconds / 10);
  digits[7] = seconds - digits[6] * 10;

  return digits;
}

/**
* populates array of audio start and end times
* @param {array} digits array of time digits
*/
function setAudioLocations(digits) {
  let locations = [];

  for (let i = 0; i < 8; i++) {
    let rand = Math.floor(Math.random() * 5);
    let location = digits[i] * 10 + rand * 2;

    if (i > 0) {

      while (location === digits[i - 1]) {
        rand = Math.floor(Math.random() * 5);
        location = digits[i] * 10 + rand * 2;
      } // end while
    } // end if

    locations[i] = location;
  } // end for loop

  // add silence to end?
  locations[8] = 120;

  // why?
  if (locations[0] < 10) {
    locations[0] = 122;
  }

  return locations;
}

/**
* Plays the audio
* @param {array} locations array of indices for points array
*/
function playSounds(locations) {

  // initial duration for the loop
  let duration = (points[locations[0] + 1] - points[locations[0]]) * 1010.0;

  // Loop through digits, setting play duration
  for (let i = 0; i <= 8; i++) {
    if (i < 8) {
      setDelay(locations, i, duration, playSound)
      duration = duration + (points[locations[i] + 1] - points[locations[i]]) * 1010.0;
    }
    // play silence, call playEnd which calls getTime again, repopulates digits with new time
    if (i === 8) {
      setDelay(locations, i, duration, playEnd)
    }
  }
}

/**
* Gets a new time after audio finishes playing
*/
function getTime() {

  let d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  let digits = setCurrentTime(hours, minutes, seconds)
  let locations = setAudioLocations(digits)

  playSounds(locations)

  // Log time to console
  console.log(`${digits[0]}${digits[1]}:${digits[3]}${digits[4]}:${digits[6]}${digits[7]}`)

}

// Get audio data
getAudioData();

// Play button click listener
play.onclick = function() {
  play.disabled = true;
  getTime();
}

// get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build functions
const togglePlay = () => {
  video[video.paused ? 'play' : 'pause']();
  // ! alternatively
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
};

const updateButton = (event) => {
  toggle.textContent = event.type === 'play' ? '❚ ❚' : '►';
  // ! alternatively
  // if (event.type === 'play') {
  //   toggle.textContent = '❚ ❚'
  // } else {
  //   toggle.textContent = '►'
  // }
};

const skip = (event) => {
  // console.log(event.target.dataset.skip);
  video.currentTime += parseInt(event.target.dataset.skip);
  console.log(video.currentTime);
};

const handleRangeUpdate = (event) => {
  // console.log(event.target.value);
  // console.log(event.target.name);
  video[event.target.name] = event.target.value;
};

const handleProgress = () => {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

// ! flag for mousedown
let mousedown = false;
const scrub = (e) => {
  console.log(e);
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
};

// hook event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// !
progress.addEventListener('click', scrub);
// ! neat trick: mousedown && scrub
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => {
  mousedown = true;
});
progress.addEventListener('mouseup', () => {
  mousedown = false;
});

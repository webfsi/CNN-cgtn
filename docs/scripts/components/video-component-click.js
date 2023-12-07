// videoComponent.js
class VideoComponent {
	constructor(container) {
		this.container = container;
		this.video = this.container.querySelector('[data-video-st="video"]');
		this.videoStart = this.container.querySelector('[data-video-st="video-start"]');
		this.playBtn = this.container.querySelector('[data-video-st="button"]');
		this.isSeeking = false;

		this.bindEvents();
	}

	bindEvents() {
		this.playBtn.addEventListener('click', () => this.handlePlayBtnClick());
		this.video.addEventListener('play', () => this.handleVideoPlay());
		this.video.addEventListener('pause', () => this.handleVideoPause());
		this.video.addEventListener('seeked', () => this.handleVideoSeeked());
		this.video.addEventListener('seeking', () => this.handleVideoSeeking());
	}

	handlePlayBtnClick() {
		if (!this.container.classList.contains('is-visible')) {
			this.container.classList.add('is-visible');
			this.enableSound();
		}
		if (this.videoStart && !this.videoStart.classList.contains('is-hidden')) {
			this.videoStart.classList.add('is-hidden');
		}
		this.loadAndPlayVideo();
	}

	loadAndPlayVideo() {
		const source = this.video.querySelector('source[data-src]');
		if (source) {
			source.setAttribute('src', source.getAttribute('data-src'));
			source.removeAttribute('data-src');
			this.video.load();
		}
		this.video.play();
		this.updateVideoClasses(true);
	}

	enableSound() {
		if (this.video.muted) {
			this.video.muted = false;
		}
	}

	updateVideoClasses(isPlaying) {
		if (isPlaying) {
			this.container.classList.add('is-active');
			this.video.classList.add('is-play');
			this.playBtn.classList.add('is-hidden');
		} else {
			this.container.classList.remove('is-active');
			this.video.classList.remove('is-play');
			this.playBtn.classList.remove('is-hidden');
		}
	}

	handleVideoPlay() {
		this.isSeeking = false;
		this.updateVideoClasses(true);
	}

	handleVideoPause() {
		this.isSeeking = true;
		setTimeout(() => {
			if (this.video.paused) {
				this.updateVideoClasses(false);
			}
		}, 100);
	}

	handleVideoSeeked() {
		this.isSeeking = false;
	}

	handleVideoSeeking() {
		this.isSeeking = true;
	}
}

document.querySelectorAll('[data-video-st="container"]').forEach((container) => {
	new VideoComponent(container);
});

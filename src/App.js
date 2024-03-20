import {Lightning, Registry, VideoPlayer, Log} from '@lightningjs/sdk'
import Loader from './Loader.js'

export default class App extends Lightning.Component {

	static _template() {
		return {
			Wrapper: {
				w: 1920, h: 1080,
				Loader: { type: Loader },
			},
		}
	}

	_firstActive() {
		this.tag('Loader').start()
		VideoPlayer.consumer(this)
		setTimeout(() => {
			VideoPlayer.open('http://video.metrological.com/fireplace_720p.mp4')
			VideoPlayer.loop(true)
		},2500);
		this._GcInterval = Registry.setInterval(() => {
			Log.info('calling GC ..')
			this.stage.gc()
		}, 180000)
	}

	_inactive(){
		Registry.clearInterval(this._GcInterval)
	}

	_handlePlay() {
		VideoPlayer.play()
	}
	$videoPlayerEvent(event) {
		switch (event){
			case 'TimeUpdate': {
				if (Math.floor(VideoPlayer.currentTime) >= Math.floor(VideoPlayer.duration)-5 && Math.floor(VideoPlayer.currentTime) > 0){
					VideoPlayer.seek(0)
				}
				break
			}
			case 'Seeked':
			case 'Play':
			case 'CanPlay': {
				Log.info('event:', event)
				if (this._seekingTimeOut) Registry.clearTimeout(this._seekingTimeOut)
				VideoPlayer.play()
				break
			}
			case 'Seeking': {
				if (this._seekingTimeOut) Registry.clearTimeout(this._seekingTimeOut)
				this._seekingTimeOut = Registry.setTimeout(() => {
					VideoPlayer.play()
					this._seekingTimeOut = null
				}, 3000)
				break
			}
			case 'Playing' : {
				this.tag('Loader').alpha = 0
				break
			}
		}
	}

	_handleExit() {
		VideoPlayer.close()
	}
}

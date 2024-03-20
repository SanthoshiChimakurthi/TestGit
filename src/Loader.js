import { Lightning, Utils } from '@lightningjs/sdk';

export default class Loader extends Lightning.Component {

	static _template() {
		return {
			Spinner: {
				FP1: { x: 1920 / 2, y: 1080 / 2, h: 110, w: 110, mount: 0.5, alpha: 0, src: Utils.asset('images/fireplace1.png') },
				FP2: { x: 1920 / 2, y: 1080 / 2, h: 110, w: 110, mount: 0.5, alpha: 0, src: Utils.asset('images/fireplace2.png') },
				FP3: { x: 1920 / 2, y: 1080 / 2, h: 110, w: 110, mount: 0.5, alpha: 0, src: Utils.asset('images/fireplace3.png') },
				FP4: { x: 1920 / 2, y: 1080 / 2, h: 110, w: 110, mount: 0.5, alpha: 0, src: Utils.asset('images/fireplace4.png') },
				FP5: { x: 1920 / 2, y: 1080 / 2, h: 110, w: 110, mount: 0.5, alpha: 0, src: Utils.asset('images/fireplace5.png') }
			}
		};
	}

	start() {
		this.tag("Spinner").setSmooth('alpha', 1, { timingFunction: 'ease-out', duration: 1 });
		this._spinnerAnimation.start();
	}

	stop() {
		this.tag('Spinner').transition('alpha').on('finish', () => {
			if (this.tag('Spinner').alpha === 0) {
				this._spinnerAnimation.stop();
			}
		});

		this.tag("Spinner").setSmooth('alpha', 0, { timingFunction: 'ease-out', duration: 2, delay: 1 });
	}

	_init() {
		this._spinnerAnimation = this.animation({
			duration: 1.2, repeat: -1, actions: [
				{ t: 'FP1', p: 'alpha', v: { 0: { v: 0 }, 0.15: { v: 1 }, 0.30: { v: 0 } } },
				{ t: 'FP2', p: 'alpha', v: { 0: { v: 0 }, 0.15: { v: 0 }, 0.30: { v: 1 }, 0.45: { v: 0 } } },
				{ t: 'FP3', p: 'alpha', v: { 0: { v: 0 }, 0.30: { v: 0 }, 0.45: { v: 1 }, 0.60: { v: 0 } } },
				{ t: 'FP4', p: 'alpha', v: { 0: { v: 0 }, 0.45: { v: 0 }, 0.60: { v: 1 }, 0.75: { v: 0 } } },
				{ t: 'FP5', p: 'alpha', v: { 0: { v: 0 }, 0.60: { v: 0 }, 0.75: { v: 1 }, 0.90: { v: 0 } } }
			]
		});
	}
}

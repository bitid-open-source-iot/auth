export class Icon {

	public src: string;
	public type: string;
	public sizes: string;
	public purpose: string;

	constructor(args: ICON) {
		if (typeof (args.src) != 'undefined' && args.src != null) {
			this.src = args.src;
		}
		if (typeof (args.type) != 'undefined' && args.type != null) {
			this.type = args.type;
		}
		if (typeof (args.sizes) != 'undefined' && args.sizes != null) {
			this.sizes = args.sizes;
		}
		if (typeof (args.purpose) != 'undefined' && args.purpose != null) {
			this.purpose = args.purpose;
		}
	}

}

export interface ICON {
	src: string;
	type: string;
	sizes: string;
	purpose: string;
}

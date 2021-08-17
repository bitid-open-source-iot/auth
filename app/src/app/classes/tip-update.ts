export class TipUpdate {

	public app: any = {};
	public role = 0;
	public data: string;
	public appId: string;
	public title: string;
	public itemId: string;
	public subtitle: string;

	constructor(args?: TIP_UPDATE) {
		if (typeof (args) != 'undefined' && args !== null) {
			if (typeof (args.app) != 'undefined' && args.app !== null) {
				if (typeof (args.app.name) != 'undefined' && args.app.name !== null) {
					this.app.name = args.app.name;
				}
				if (typeof (args.app.icon) != 'undefined' && args.app.icon !== null) {
					this.app.icon = args.app.icon;
				}
			}
			if (typeof (args.role) != 'undefined' && args.role !== null) {
				this.role = args.role;
			}
			if (typeof (args.data) != 'undefined' && args.data !== null) {
				this.data = args.data;
			}
			if (typeof (args.appId) != 'undefined' && args.appId !== null) {
				this.appId = args.appId;
			}
			if (typeof (args.title) != 'undefined' && args.title !== null) {
				this.title = args.title;
			}
			if (typeof (args.itemId) != 'undefined' && args.itemId !== null) {
				this.itemId = args.itemId;
			}
			if (typeof (args.subtitle) != 'undefined' && args.subtitle !== null) {
				this.subtitle = args.subtitle;
			}
		}
	}

}

export interface TIP_UPDATE {
	app: {
		name: string;
		icon: string;
	};
	role: number;
	data: string;
	appId: string;
	title: string;
	itemId: string;
	subtitle: string;
}

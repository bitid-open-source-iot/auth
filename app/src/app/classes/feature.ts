export class Feature {

	public app: any = {};
	public role = 0;
	public appId: string;
	public title: string;
	public featureId: string;
	public description: string;

	constructor(args?: FEATURE) {
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
			if (typeof (args.appId) != 'undefined' && args.appId !== null) {
				this.appId = args.appId;
			}
			if (typeof (args.title) != 'undefined' && args.title !== null) {
				this.title = args.title;
			}
			if (typeof (args.featureId) != 'undefined' && args.featureId !== null) {
				this.featureId = args.featureId;
			}
			if (typeof (args.description) != 'undefined' && args.description !== null) {
				this.description = args.description;
			}
		}
	}

}

export interface FEATURE {
	app: {
		name: string;
		icon: string;
	};
	role: number;
	appId: string;
	title: string;
	featureId: string;
	description: string;
}

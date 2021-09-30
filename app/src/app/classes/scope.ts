export class Scope {

	public app: any = {};
	public url: string;
	public role = 0;
	public appId: string;
	public scopeId: string;
	public description: string;

	constructor(args?: FEATURE) {
		if (typeof (args) != 'undefined' && args != null) {
			if (typeof (args.app) != 'undefined' && args.app != null) {
				if (typeof (args.app.name) != 'undefined' && args.app.name != null) {
					this.app.name = args.app.name;
				}
				if (typeof (args.app.icon) != 'undefined' && args.app.icon != null) {
					this.app.icon = args.app.icon;
				}
			}
			if (typeof (args.url) != 'undefined' && args.url != null) {
				this.url = args.url;
			}
			if (typeof (args.role) != 'undefined' && args.role != null) {
				this.role = args.role;
			}
			if (typeof (args.appId) != 'undefined' && args.appId != null) {
				this.appId = args.appId;
			}
			if (typeof (args.scopeId) != 'undefined' && args.scopeId != null) {
				this.scopeId = args.scopeId;
			}
			if (typeof (args.description) != 'undefined' && args.description != null) {
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
	url: string;
	role: number;
	appId: string;
	scopeId: string;
	description: string;
}

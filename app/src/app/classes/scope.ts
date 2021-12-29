export class Scope {

	public app = <{
		name: string | undefined;
		icon: string | undefined;
	}>{
			name: undefined,
			icon: undefined
		};
	public url: string | undefined;
	public role: 0 | 1 | 2 | 3 | 4 | 5 = 0;
	public appId: string | undefined;
	public scopeId: string | undefined;
	public description: string | undefined;

	constructor(args?: FEATURE) {
		if (typeof (args) != 'undefined' && args != null) {
			if (typeof (args.app) != 'undefined' && args.app != null) {
				if (typeof (args.app.name) != 'undefined' && args.app.name != null) {
					this.app.name = args.app.name;
				};
				if (typeof (args.app.icon) != 'undefined' && args.app.icon != null) {
					this.app.icon = args.app.icon;
				};
			};
			if (typeof (args.url) != 'undefined' && args.url != null) {
				this.url = args.url;
			};
			if (typeof (args.role) != 'undefined' && args.role != null) {
				this.role = args.role;
			};
			if (typeof (args.appId) != 'undefined' && args.appId != null) {
				this.appId = args.appId;
			};
			if (typeof (args.scopeId) != 'undefined' && args.scopeId != null) {
				this.scopeId = args.scopeId;
			};
			if (typeof (args.description) != 'undefined' && args.description != null) {
				this.description = args.description;
			};
		}
	}

}

export interface FEATURE {
	app: {
		name: string;
		icon: string;
	};
	url: string;
	role: 0 | 1 | 2 | 3 | 4 | 5;
	appId: string;
	scopeId: string;
	description: string;
}

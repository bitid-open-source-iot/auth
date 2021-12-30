import { Accessor } from './accessor';

export class Token {

	public app = <{
		name: string | undefined,
		icon: string | undefined
	}>{
			name: undefined,
			icon: undefined
		};
	public token = <{
		scopes?: string[] | undefined;
		expiry?: Date | undefined;
		timezone?: number | undefined;
		description?: number | undefined;
	}>{
		scopes: undefined,
		expiry: undefined,
		timezone: undefined,
		description: undefined
	};
	public role: 0 | 1 | 2 | 3 | 4 | 5 = 0;
	public apps: Accessor[] = [];
	public appId: string | undefined;
	public users: Accessor[] = [];
	public groups: Accessor[] = [];
	public device: string | undefined;
	public tokenId: string | undefined;
	public disabled: boolean = false;
	public description: string | undefined;

	constructor(args?: TOKEN) {
		if (typeof (args) != 'undefined' && args != null) {
			if (typeof (args.app) != 'undefined' && args.app != null) {
				if (typeof (args.app.icon) != 'undefined' && args.app.icon != null) {
					this.app.icon = args.app.icon;
				};
				if (typeof (args.app.name) != 'undefined' && args.app.name != null) {
					this.app.name = args.app.name;
				};
			};
			if (typeof (args.token) != 'undefined' && args.token != null) {
				if (typeof (args.token.scopes) != 'undefined' && args.token.scopes != null) {
					this.token.scopes = args.token.scopes;
				};
				if (typeof (args.token.expiry) != 'undefined' && args.token.expiry != null) {
					this.token.expiry = new Date(args.token.expiry);
				};
				if (typeof (args.token.timezone) != 'undefined' && args.token.timezone != null) {
					this.token.timezone = args.token.timezone;
				};
				if (typeof (args.token.description) != 'undefined' && args.token.description != null) {
					this.token.description = args.token.description;
				};
			};
			if (typeof (args.role) != 'undefined' && args.role != null) {
				this.role = args.role;
			};
			if (typeof (args.apps) != 'undefined' && args.apps != null) {
				this.apps = args.apps.map(o => new Accessor(o));
			};
			if (typeof (args.appId) != 'undefined' && args.appId != null) {
				this.appId = args.appId;
			};
			if (typeof (args.users) != 'undefined' && args.users != null) {
				this.users = args.users.map(o => new Accessor(o));
			};
			if (typeof (args.groups) != 'undefined' && args.groups != null) {
				this.groups = args.groups.map(o => new Accessor(o));
			};
			if (typeof (args.device) != 'undefined' && args.device != null) {
				this.device = args.device;
			};
			if (typeof (args.tokenId) != 'undefined' && args.tokenId != null) {
				this.tokenId = args.tokenId;
			};
			if (typeof (args.disabled) != 'undefined' && args.disabled != null) {
				this.disabled = args.disabled;
			};
			if (typeof (args.description) != 'undefined' && args.description != null) {
				this.description = args.description;
			};
		};
	};

}

interface TOKEN {
	app?: {
		icon?: string | undefined;
		name?: any | undefined;
	};
	token?: {
		scopes?: string[] | undefined;
		expiry?: Date | undefined;
		timezone?: number | undefined;
		description?: number | undefined;
	};
	role?: 0 | 1 | 2 | 3 | 4 | 5;
	apps?: Accessor[];
	appId?: string | undefined;
	users?: Accessor[];
	groups?: Accessor[];
	device?: string | undefined;
	tokenId?: string | undefined;
	disabled?: boolean | undefined;
	selected?: boolean | undefined;
	description?: string | undefined;
}

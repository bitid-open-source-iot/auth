import { Accessor } from './accessor';

export class Token {

	public app = <{
		name: string | undefined,
		icon: string | undefined
	}>{
			name: undefined,
			icon: undefined
		};
	public role = 0;
	public appId: string | undefined;
	public apps: Accessor[] = [];
	public users: Accessor[] = [];
	public groups: Accessor[] = [];
	public device: string | undefined;
	public expiry: string | undefined;
	public scopes: string[] = [];
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
			if (typeof (args.scopes) != 'undefined' && args.scopes != null) {
				this.scopes = args.scopes;
			};
			if (typeof (args.groups) != 'undefined' && args.groups != null) {
				this.groups = args.groups.map(o => new Accessor(o));
			};
			if (typeof (args.device) != 'undefined' && args.device != null) {
				this.device = args.device;
			};
			if (typeof (args.expiry) != 'undefined' && args.expiry != null) {
				this.expiry = args.expiry;
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

export interface TOKEN {
	app?: {
		icon?: string;
		name?: any;
	};
	role?: number;
	apps?: Accessor[];
	appId?: string;
	users?: Accessor[];
	groups?: Accessor[];
	device?: string;
	scopes?: string[];
	expiry?: string;
	tokenId?: string;
	disabled?: boolean;
	selected?: boolean;
	description?: string;
}

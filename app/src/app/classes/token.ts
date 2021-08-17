import { User, USER } from './user';

export class Token {

	public app: any = { };
	public role = 0;
	public appId: string;
	public users: USER[] = [];
	public device: string;
	public expiry: string;
	public scopes: string[] = [];
	public tokenId: string;
	public disabled: boolean;
	public selected: boolean;
	public description: string;

	constructor(args?: TOKEN) {
		if (typeof (args) != 'undefined' && args !== null) {
			if (Array.isArray(args.users)) {
				this.users = args.users.map(user => new User(user));
			}
			if (Array.isArray(args.scopes)) {
				this.scopes = args.scopes;
			}
			if (typeof (args.app) != 'undefined' && args.app !== null) {
				if (typeof (args.app.icon) != 'undefined' && args.app.icon !== null) {
					this.app.icon = args.app.icon;
				}
				if (typeof (args.app.name) != 'undefined' && args.app.name !== null) {
					this.app.name = args.app.name;
				}
			}
			if (typeof (args.role) != 'undefined' && args.role !== null) {
				this.role = args.role;
			}
			if (typeof (args.appId) != 'undefined' && args.appId !== null) {
				this.appId = args.appId;
			}
			if (typeof (args.device) != 'undefined' && args.device !== null) {
				this.device = args.device;
			}
			if (typeof (args.expiry) != 'undefined' && args.expiry !== null) {
				this.expiry = args.expiry;
			}
			if (typeof (args.tokenId) != 'undefined' && args.tokenId !== null) {
				this.tokenId = args.tokenId;
			}
			if (typeof (args.disabled) != 'undefined' && args.disabled !== null) {
				this.disabled = args.disabled;
			}
			if (typeof (args.selected) != 'undefined' && args.selected !== null) {
				this.selected = args.selected;
			}
			if (typeof (args.description) != 'undefined' && args.description !== null) {
				this.description = args.description;
			}
		}
	}

}

export interface TOKEN {
	app?: {
		icon?: string;
		name?: any;
	};
	role?: number;
	appId?: string;
	users?: USER[];
	device?: string;
	scopes?: string[];
	expiry?: string;
	tokenId?: string;
	disabled?: boolean;
	selected?: boolean;
	description?: string;
}

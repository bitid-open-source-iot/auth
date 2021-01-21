import { User, USER } from './user';

export class App {

	public url: string;
	public role = 0;
	public icon: string;
	public name: string;
	public users: USER[] = [];
	public appId: string;
	public scopes: string[] = [];
	public secret: string;
	public domains: string[] = [];

	constructor(args?: APP) {
		if (typeof (args) != 'undefined' && args !== null) {
			if (Array.isArray(args.users)) {
				this.users = args.users.map(user => new User(user));
			}
			if (Array.isArray(args.scopes)) {
				this.scopes = args.scopes;
			}
			if (Array.isArray(args.domains)) {
				this.domains = args.domains;
			}
			if (typeof (args.url) != 'undefined' && args.url !== null) {
				this.url = args.url;
			}
			if (typeof (args.role) != 'undefined' && args.role !== null) {
				this.role = args.role;
			}
			if (typeof (args.icon) != 'undefined' && args.icon !== null) {
				this.icon = args.icon;
			}
			if (typeof (args.name) != 'undefined' && args.name !== null) {
				this.name = args.name;
			}
			if (typeof (args.appId) != 'undefined' && args.appId !== null) {
				this.appId = args.appId;
			}
			if (typeof (args.secret) != 'undefined' && args.secret !== null) {
				this.secret = args.secret;
			}
		}
	}

}

export interface APP {
	theme?: {
		color?: string;
		background?: string;
	};
	google?: {

	};
	url?: string;
	role?: number;
	icon?: string;
	name?: string;
	users?: USER[];
	appId?: string;
	scopes?: string[];
	secret?: string;
	domains?: string[];
}

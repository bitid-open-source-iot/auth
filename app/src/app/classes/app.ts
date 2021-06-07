import { Icon } from './icon';
import { User, USER } from './user';

export class App {

	public url: string;
	public role = 0;
	public icon: string;
	public name: string;
	public icons: Icon[] = [];
	public users: USER[] = [];
	public appId: string;
	public theme: any = {};
	public google: any = {};
	public scopes: string[] = [];
	public secret: string;
	public private: boolean;
	public domains: string[] = [];
	public organizationOnly: number;

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
			if (typeof (args.theme) != 'undefined' && args.theme !== null) {
				if (typeof (args.theme.color) != 'undefined' && args.theme.color !== null) {
					this.theme.color = args.theme.color;
				}
				if (typeof (args.theme.background) != 'undefined' && args.theme.background !== null) {
					this.theme.background = args.theme.background;
				}
			}
			if (typeof (args.google) != 'undefined' && args.google !== null) {
				if (typeof (args.google.database) != 'undefined' && args.google.database !== null) {
					this.google.database = args.google.database;
				}
				if (typeof (args.google.credentials) != 'undefined' && args.google.credentials !== null) {
					this.google.credentials = args.google.credentials;
				}
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
			if (typeof (args.icons) != 'undefined' && args.icons !== null) {
				this.icons = args.icons.map(o => new Icon(o));
			}
			if (typeof (args.appId) != 'undefined' && args.appId !== null) {
				this.appId = args.appId;
			}
			if (typeof (args.private) != 'undefined' && args.private !== null) {
				this.private = args.private;
			}
			if (typeof (args.secret) != 'undefined' && args.secret !== null) {
				this.secret = args.secret;
			}
			if (typeof (args.organizationOnly) != 'undefined' && args.organizationOnly !== null) {
				this.organizationOnly = args.organizationOnly;
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
		database?: string;
		credentials?: any;
	};
	url?: string;
	role?: number;
	icon?: string;
	name?: string;
	icons?: Icon[];
	users?: USER[];
	appId?: string;
	scopes?: string[];
	secret?: string;
	private?: boolean;
	domains?: string[];
	organizationOnly?: number;
}

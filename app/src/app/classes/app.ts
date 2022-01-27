import { Accessor } from './accessor';

export class App {

	public icons = <{
		icon72x72?: string | undefined;
		icon96x96?: string | undefined;
		icon128x128?: string | undefined;
		icon144x144?: string | undefined;
		icon152x152?: string | undefined;
		icon192x192?: string | undefined;
		icon384x384?: string | undefined;
		icon512x512?: string | undefined;
	}>{
			icon72x72: undefined,
			icon96x96: undefined,
			icon128x128: undefined,
			icon144x144: undefined,
			icon152x152: undefined,
			icon192x192: undefined,
			icon384x384: undefined,
			icon512x512: undefined
		};
	public theme = <{
		color: string | undefined;
		background: string | undefined;
	}>{
			color: undefined,
			background: undefined
		};
	public google = <{
		database: string | undefined;
		credentials: any | undefined;
	}>{
			database: undefined,
			credentials: undefined
		};
	public url: string | undefined;
	public apps: Accessor[] = [];
	public role: 0 | 1 | 2 | 3 | 4 | 5 = 0;
	public icon: string | undefined;
	public name: string | undefined;
	public users: Accessor[] = [];
	public appId: string | undefined;
	public config: Object = {};
	public scopes: string[] = [];
	public groups: Accessor[] = [];
	public secret: string | undefined;
	public private: boolean | undefined;
	public domains: string[] = [];
	public favicon: string | undefined;
	public organizationOnly: number | undefined;

	constructor(args?: APP) {
		if (typeof (args) != 'undefined' && args != null) {
			if (typeof (args.icons) != 'undefined' && args.icons != null) {
				if (typeof (args.icons.icon72x72) != 'undefined' && args.icons.icon72x72 != null) {
					this.icons.icon72x72 = args.icons.icon72x72;
				};
				if (typeof (args.icons.icon96x96) != 'undefined' && args.icons.icon96x96 != null) {
					this.icons.icon96x96 = args.icons.icon96x96;
				};
				if (typeof (args.icons.icon128x128) != 'undefined' && args.icons.icon128x128 != null) {
					this.icons.icon128x128 = args.icons.icon128x128;
				};
				if (typeof (args.icons.icon144x144) != 'undefined' && args.icons.icon144x144 != null) {
					this.icons.icon144x144 = args.icons.icon144x144;
				};
				if (typeof (args.icons.icon152x152) != 'undefined' && args.icons.icon152x152 != null) {
					this.icons.icon152x152 = args.icons.icon152x152;
				};
				if (typeof (args.icons.icon192x192) != 'undefined' && args.icons.icon192x192 != null) {
					this.icons.icon192x192 = args.icons.icon192x192;
				};
				if (typeof (args.icons.icon384x384) != 'undefined' && args.icons.icon384x384 != null) {
					this.icons.icon384x384 = args.icons.icon384x384;
				};
				if (typeof (args.icons.icon512x512) != 'undefined' && args.icons.icon512x512 != null) {
					this.icons.icon512x512 = args.icons.icon512x512;
				};
			};
			if (typeof (args.theme) != 'undefined' && args.theme != null) {
				if (typeof (args.theme.color) != 'undefined' && args.theme.color != null) {
					this.theme.color = args.theme.color;
				};
				if (typeof (args.theme.background) != 'undefined' && args.theme.background != null) {
					this.theme.background = args.theme.background;
				};
			};
			if (typeof (args.google) != 'undefined' && args.google != null) {
				if (typeof (args.google.database) != 'undefined' && args.google.database != null) {
					this.google.database = args.google.database;
				};
				if (typeof (args.google.credentials) != 'undefined' && args.google.credentials != null) {
					this.google.credentials = args.google.credentials;
				};
			};
			if (typeof (args.url) != 'undefined' && args.url != null) {
				this.url = args.url;
			};
			if (typeof (args.apps) != 'undefined' && args.apps != null) {
				this.apps = args.apps.map(o => new Accessor(o));
			};
			if (typeof (args.role) != 'undefined' && args.role != null) {
				this.role = args.role;
			};
			if (typeof (args.icon) != 'undefined' && args.icon != null) {
				this.icon = args.icon;
			};
			if (typeof (args.name) != 'undefined' && args.name != null) {
				this.name = args.name;
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
			if (typeof (args.config) != 'undefined' && args.config != null) {
				this.config = args.config;
			};
			if (typeof (args.domains) != 'undefined' && args.domains != null) {
				this.domains = args.domains;
			};
			if (typeof (args.private) != 'undefined' && args.private != null) {
				this.private = args.private;
			};
			if (typeof (args.secret) != 'undefined' && args.secret != null) {
				this.secret = args.secret;
			};
			if (typeof (args.favicon) != 'undefined' && args.favicon != null) {
				this.favicon = args.favicon;
			};
			if (typeof (args.organizationOnly) != 'undefined' && args.organizationOnly != null) {
				this.organizationOnly = args.organizationOnly;
			};
		}
	}

}

interface APP {
	icons?: {
		icon72x72?: string;
		icon96x96?: string;
		icon128x128?: string;
		icon144x144?: string;
		icon152x152?: string;
		icon192x192?: string;
		icon384x384?: string;
		icon512x512?: string;
	};
	theme?: {
		color?: string;
		background?: string;
	};
	google?: {
		database?: string;
		credentials?: any;
	};
	url?: string;
	apps?: Accessor[]
	role?: 0 | 1 | 2 | 3 | 4 | 5;
	icon?: string;
	name?: string;
	users?: Accessor[];
	appId?: string;
	config?: Object;
	scopes?: string[];
	groups?: Accessor[];
	secret?: string;
	private?: boolean;
	domains?: string[];
	favicon?: string;
	organizationOnly?: number;
}

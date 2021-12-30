import { Accessor } from "./accessor";

export class Group {

	public role: 0 | 1 | 2 | 3 | 4 | 5 = 0;
	public apps: Accessor[] = [];
	public users: Accessor[] = [];
	public appId: string[] = [];
	public groups: Accessor[] = [];
	public groupId: string | undefined;
	public description: string | undefined;
	public organizationOnly: number | undefined;

	constructor(args?: GROUP) {
		if (typeof (args) != 'undefined' && args != null) {
			if (typeof (args.role) != 'undefined' && args.role != null) {
				this.role = args.role;
			};
			if (typeof (args.apps) != 'undefined' && args.apps != null) {
				this.apps = args.apps.map((o: Accessor) => new Accessor(o));
			};
			if (typeof (args.users) != 'undefined' && args.users != null) {
				this.users = args.users.map((o: Accessor) => new Accessor(o));
			};
			if (typeof (args.appId) != 'undefined' && args.appId != null) {
				this.appId = args.appId;
			};
			if (typeof (args.groups) != 'undefined' && args.groups != null) {
				this.groups = args.groups.map((o: Accessor) => new Accessor(o));
			};
			if (typeof (args.groupId) != 'undefined' && args.groupId != null) {
				this.groupId = args.groupId;
			};
			if (typeof (args.description) != 'undefined' && args.description != null) {
				this.description = args.description;
			};
			if (typeof (args.organizationOnly) != 'undefined' && args.organizationOnly != null) {
				this.organizationOnly = args.organizationOnly;
			};
		};
	}

}

interface GROUP {
	role?: 0 | 1 | 2 | 3 | 4 | 5;
	apps?: Accessor[];
	users?: Accessor[];
	appId?: string[];
	groups?: Accessor[];
	groupId?: string;
	description?: string;
	organizationOnly?: number;
}

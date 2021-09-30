import { User } from './user';

export class Group {

	public role: number = 0;
	public users: User[] = [];
	public appId: string[] = [];
	public groupId: string;
	public description: string;
	public organizationOnly: number;

	constructor(args?: GROUP) {
		if (typeof (args) != 'undefined' && args != null) {
			if (typeof (args.role) != 'undefined' && args.role != null) {
				this.role = args.role;
			}
			if (typeof (args.users) != 'undefined' && args.users != null) {
				this.users = args.users.map(o => new User(o));
			}
			if (typeof (args.appId) != 'undefined' && args.appId != null) {
				this.appId = args.appId;
			}
			if (typeof (args.groupId) != 'undefined' && args.groupId != null) {
				this.groupId = args.groupId;
			}
			if (typeof (args.description) != 'undefined' && args.description != null) {
				this.description = args.description;
			}
			if (typeof (args.organizationOnly) != 'undefined' && args.organizationOnly != null) {
				this.organizationOnly = args.organizationOnly;
			}
		}
	}

}

export interface GROUP {
	role: number;
	users: User[];
	appId: string[];
	groupId: string;
	description: string;
	organizationOnly: number;
}

export class Accessor {

	public id: string | undefined;
	public type: 'app' | 'user' | 'group' | undefined;
	public role: 0 | 1 | 2 | 3 | 4 | 5 = 0;
	public avatar: string | undefined;
	public description: string | undefined;

	constructor(args?: ACCESSOR) {
		if (typeof (args) != 'undefined' && args != null) {
			if (typeof (args.id) != 'undefined' && args.id != null) {
				this.id = args.id;
			};
			if (typeof (args.type) != 'undefined' && args.type != null) {
				this.type = args.type;
			};
			if (typeof (args.role) != 'undefined' && args.role != null) {
				this.role = args.role;
			};
			if (typeof (args.avatar) != 'undefined' && args.avatar != null) {
				this.avatar = args.avatar;
			};
			if (typeof (args.description) != 'undefined' && args.description != null) {
				this.description = args.description;
			};
		};
	}

}

interface ACCESSOR {
	id?: string;
	type?: 'app' | 'user' | 'group';
	role?: 0 | 1 | 2 | 3 | 4 | 5;
	avatar?: string;
	description?: string;
}
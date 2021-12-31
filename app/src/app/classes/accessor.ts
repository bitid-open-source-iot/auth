export class Accessor {

	public id: string | undefined;
	public type: 'app' | 'user' | 'group' | undefined;
	public role: 0 | 1 | 2 | 3 | 4 | 5 = 0;

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
		};
	}

}

interface ACCESSOR {
	id?: string;
	type?: 'app' | 'user' | 'group';
	role?: 0 | 1 | 2 | 3 | 4 | 5;
}
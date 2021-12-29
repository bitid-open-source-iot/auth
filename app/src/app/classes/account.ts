export class Account {

	public name: NAME = {
		last: null,
		first: null,
		middle: null
	};
	public number: NUMBER = {
		tel: null,
		mobile: null
	};
	public address: ADDRESS = {
		billing: {
			company: {
				vat: null,
				reg: null
			},
			street: null,
			suburb: null,
			country: null,
			cityTown: null,
			additional: null,
			postalCode: null
		},
		physical: {
			company: {
				vat: null,
				reg: null
			},
			street: null,
			suburb: null,
			country: null,
			cityTown: null,
			additional: null,
			postalCode: null
		},
		same: false
	};
	public identification: IDENTIFICATION = {
		type: null,
		number: null
	};
	public email: string;
	public userId: string;
	public picture: string;
	public language: string;
	public timezone: number;
	public username: string;
	public validated: number;
	public serverDate: string;

	constructor(args?: ACCOUNT) {
		if (typeof (args) != 'undefined' && args != null) {
			if (typeof (args.name) != 'undefined' && args.name != null) {
				if (typeof (args.name.last) != 'undefined' && args.name.last != null) {
					this.name.last = args.name.last;
				}
				if (typeof (args.name.first) != 'undefined' && args.name.first != null) {
					this.name.first = args.name.first;
				}
				if (typeof (args.name.middle) != 'undefined' && args.name.middle != null) {
					this.name.middle = args.name.middle;
				}
			}
			if (typeof (args.number) != 'undefined' && args.number != null) {
				if (typeof (args.number.tel) != 'undefined' && args.number.tel != null) {
					this.number.tel = args.number.tel;
				}
				if (typeof (args.number.mobile) != 'undefined' && args.number.mobile != null) {
					this.number.mobile = args.number.mobile;
				}
			}
			if (typeof (args.address) != 'undefined' && args.address != null) {
				if (typeof (args.address.billing) != 'undefined' && args.address.billing != null) {
					if (typeof (args.address.billing.company) != 'undefined' && args.address.billing.company != null) {
						if (typeof (args.address.billing.company.vat) != 'undefined' && args.address.billing.company.vat != null) {
							this.address.billing.company.vat = args.address.billing.company.vat;
						}
						if (typeof (args.address.billing.company.reg) != 'undefined' && args.address.billing.company.reg != null) {
							this.address.billing.company.reg = args.address.billing.company.reg;
						}
					}
					if (typeof (args.address.billing.street) != 'undefined' && args.address.billing.street != null) {
						this.address.billing.street = args.address.billing.street;
					}
					if (typeof (args.address.billing.suburb) != 'undefined' && args.address.billing.suburb != null) {
						this.address.billing.suburb = args.address.billing.suburb;
					}
					if (typeof (args.address.billing.country) != 'undefined' && args.address.billing.country != null) {
						this.address.billing.country = args.address.billing.country;
					}
					if (typeof (args.address.billing.cityTown) != 'undefined' && args.address.billing.cityTown != null) {
						this.address.billing.cityTown = args.address.billing.cityTown;
					}
					if (typeof (args.address.billing.additional) != 'undefined' && args.address.billing.additional != null) {
						this.address.billing.additional = args.address.billing.additional;
					}
					if (typeof (args.address.billing.postalCode) != 'undefined' && args.address.billing.postalCode != null) {
						this.address.billing.postalCode = args.address.billing.postalCode;
					}
				}
				if (typeof (args.address.physical) != 'undefined' && args.address.physical != null) {
					if (typeof (args.address.physical.company) != 'undefined' && args.address.physical.company != null) {
						if (typeof (args.address.physical.company.vat) != 'undefined' && args.address.physical.company.vat != null) {
							this.address.physical.company.vat = args.address.physical.company.vat;
						}
						if (typeof (args.address.physical.company.reg) != 'undefined' && args.address.physical.company.reg != null) {
							this.address.physical.company.reg = args.address.physical.company.reg;
						}
					}
					if (typeof (args.address.physical.street) != 'undefined' && args.address.physical.street != null) {
						this.address.physical.street = args.address.physical.street;
					}
					if (typeof (args.address.physical.suburb) != 'undefined' && args.address.physical.suburb != null) {
						this.address.physical.suburb = args.address.physical.suburb;
					}
					if (typeof (args.address.physical.country) != 'undefined' && args.address.physical.country != null) {
						this.address.physical.country = args.address.physical.country;
					}
					if (typeof (args.address.physical.cityTown) != 'undefined' && args.address.physical.cityTown != null) {
						this.address.physical.cityTown = args.address.physical.cityTown;
					}
					if (typeof (args.address.physical.additional) != 'undefined' && args.address.physical.additional != null) {
						this.address.physical.additional = args.address.physical.additional;
					}
					if (typeof (args.address.physical.postalCode) != 'undefined' && args.address.physical.postalCode != null) {
						this.address.physical.postalCode = args.address.physical.postalCode;
					}
				}
				if (typeof (args.address.same) != 'undefined' && args.address.same != null) {
					this.address.same = args.address.same;
				}
			}
			if (typeof (args.identification) != 'undefined' && args.identification != null) {
				if (typeof (args.identification.type) != 'undefined' && args.identification.type != null) {
					this.identification.type = args.identification.type;
				}
				if (typeof (args.identification.number) != 'undefined' && args.identification.number != null) {
					this.identification.number = args.identification.number;
				}
			}
			if (typeof (args.email) != 'undefined' && args.email != null) {
				this.email = args.email;
			}
			if (typeof (args.userId) != 'undefined' && args.userId != null) {
				this.userId = args.userId;
			}
			if (typeof (args.picture) != 'undefined' && args.picture != null) {
				this.picture = args.picture;
			}
			if (typeof (args.language) != 'undefined' && args.language != null) {
				this.language = args.language;
			}
			if (typeof (args.timezone) != 'undefined' && args.timezone != null) {
				this.timezone = args.timezone;
			}
			if (typeof (args.username) != 'undefined' && args.username != null) {
				this.username = args.username;
			}
			if (typeof (args.validated) != 'undefined' && args.validated != null) {
				this.validated = args.validated;
			}
			if (typeof (args.serverDate) != 'undefined' && args.serverDate != null) {
				this.serverDate = args.serverDate;
			}
		}
	}

}

export interface ACCOUNT {
	name?: NAME;
	number?: NUMBER;
	address?: ADDRESS;
	identification?: IDENTIFICATION;
	email?: string;
	userId?: string;
	picture?: string;
	language?: string;
	timezone?: number;
	username?: string;
	validated?: number;
	serverDate?: string;
}

interface NAME {
	last?: string;
	first?: string;
	middle?: string;
}

interface NUMBER {
	tel?: string;
	mobile?: string;
}

interface ADDRESS {
	same?: boolean;
	billing?: ADDRESSITEM;
	physical?: ADDRESSITEM;
}

interface ADDRESSITEM {
	company?: {
		vat?: string;
		reg?: string;
	};
	street?: string;
	suburb?: string;
	country?: string;
	cityTown?: string;
	additional?: string;
	postalCode?: string;
}

interface IDENTIFICATION {
	type?: string;
	number?: string;
}

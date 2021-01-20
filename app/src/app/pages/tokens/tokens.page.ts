import { TokensService } from 'src/app/services/tokens/tokens.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'tokens-page',
	styleUrls: ['./tokens.page.scss'],
	templateUrl: './tokens.page.html'
})

export class TokensPage implements OnInit, OnDestroy {

	constructor(private service: TokensService) { }

	public tokens: MatTableDataSource<any> = new MatTableDataSource<any>();
	public columns: string[] = ['icon', 'app', 'options'];
	public loading: boolean;

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'app',
				'role',
				'device',
				'scopes',
				'expiry',
				'tokenId',
				'description'
			]
		});

		if (response.ok) {
			this.tokens.data = response.result;
		} else {
			this.tokens.data = [];
		}

		this.loading = false;
	}

	public async options(app) { }

	ngOnInit(): void {
		this.list();
	}

	ngOnDestroy(): void { }

}

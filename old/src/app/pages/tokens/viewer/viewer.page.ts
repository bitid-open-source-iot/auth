import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Token, TokensService } from 'src/app/services/tokens/tokens.service';
import { Router, ActivatedRoute} from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-token-viewer',
    styleUrls:      ['./viewer.page.scss'],
    templateUrl:    './viewer.page.html'
})

export class TokenViewerPage implements OnInit, OnDestroy {
    
    constructor(private route: ActivatedRoute, private toast: ToastService, private router: Router, private service: TokensService) {};

    public token:           Token;
    public roles:           any[]   = environment.roles;
    public tokenId:         string;
    public loading:         boolean;
    private subscriptions:  any     = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'app',
                'role',
                'device',
                'expiry',
                'scopes',
                'tokenId',
                'description'
            ],
            'tokenId': this.tokenId
        });

        this.loading = false;

        if (response.ok) {
            this.token = response.result;
        } else {
            this.router.navigate(['/tokens']);
            this.toast.error('issue loading token!');
        };
    };

    public GetRoleTitle(value) {
        let title;
        this.roles.map(role => {
            if (role.value == value) {
                title = role.title;
            };
        });
        return title;
    };

    ngOnInit(): void {
        this.subscriptions.route = this.route.params.subscribe(params => {
            this.tokenId = params.tokenId;
            this.get();
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.route.unsubscribe();
    };

}
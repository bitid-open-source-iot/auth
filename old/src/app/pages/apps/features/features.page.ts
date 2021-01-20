import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ActivatedRoute } from '@angular/router';
import { FeaturesService } from 'src/app/services/features/features.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-features-page',
    styleUrls: ['./features.page.scss'],
    templateUrl: './features.page.html'
})

export class AppFeaturesPage implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private toast: ToastService, private config: ConfigService, private service: FeaturesService) { };

    public appId: string;
    public columns: string[] = ['title', 'description', 'options'];
    public loading: boolean;
    public features: MatTableDataSource<any> = new MatTableDataSource<any>();
    private subscriptions: any = {};

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'filter': [
                'title',
                'featureId',
                'description'
            ],
            'appId': this.appId
        });

        this.loading = false;

        if (response.ok) {
            this.features.data = response.result;
        } else {
            this.toast.error('issue loading app!');
        };
    };

    ngOnInit(): void {
        this.subscriptions.config = this.config.loaded.subscribe(loaded => {
            if (loaded) {
                const params = this.route.snapshot.queryParams;
                this.appId = params.appId;
                this.list();
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.config.unsubscribe();
    };

}
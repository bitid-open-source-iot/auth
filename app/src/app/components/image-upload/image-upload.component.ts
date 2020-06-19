import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Input, Component } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';

@Component({
    selector:       'app-image-upload',
    styleUrls:      ['./image-upload.component.scss'],
    templateUrl:    './image-upload.component.html',
})

export class ImageUploadComponent {

    @Input('value')     public value:       string;
    @Input('label')     public label:       string = 'icon';
    @Input('required')  public required:    boolean;

    public change: Subject<string> = new Subject();

    constructor(private localstorage: LocalstorageService) {};

    public loading: string;

    public async upload() {
        const input     = document.createElement('input');
        input.type      = 'file';
        input.accept    = 'image/*';
        input.onchange  = (event: any) => {
            let files = event.target.files;
            if (files.length > 0) {
                const formData: any = new FormData();
                const request = new XMLHttpRequest();

                for(var i = 0; i < files.length; i++) {
                    formData.append("uploads[]", files[i], files[i].name);
                };
                
                request.onreadystatechange = (event) => {
                    if (request.readyState == 4) {
                        if (request.status == 200) {
                            let res = JSON.parse(request.response);
                            this.change.next(environment.drive + "/drive/files/get?fileId=" + res.fileId + "&token=" + res.token);
                        };
                    };
                };

                const url = [environment.drive, '/drive/files/upload?', 'email', '=', this.localstorage.get('email'), '&', 'appId', '=', environment.appId].join('');

                request.open("POST", url, true);
                request.setRequestHeader('Authorization', this.localstorage.get('token'));
                request.send(formData);
            };
        };

        input.click();
    };

}
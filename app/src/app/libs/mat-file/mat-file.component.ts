import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Input, OnInit, Component, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mat-file',
    styleUrls: ['./mat-file.component.scss'],
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: MatFileComponent
        }
    ],
    templateUrl: './mat-file.component.html',
    encapsulation: ViewEncapsulation.None
})

export class MatFileComponent implements ControlValueAccessor, OnInit {

    constructor(private el: ElementRef, private toast: ToastService, private renderer: Renderer2, private localstorage: LocalstorageService) { }

    @Input('src') public src: string;
    @Input('accept') public accept: string = 'image/*';
    @Input('required') public required: boolean;
    @Input('min-width') public minWidth: number = 0;
    @Input('max-width') public maxWidth: number = 0;
    @Input('min-height') public minHeight: number = 0;
    @Input('max-height') public maxHeight: number = 0;

    onChange = (src) => {};

    onTouched = () => {};

    touched = false;

    disabled = false;

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    writeValue(src: string) {
        this.src = src;
    }

    registerOnChange(onChange: any) {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    ngOnInit(): void {
        if (this.required && !this.src) {
            this.renderer.setStyle(this.el.nativeElement, 'color', '#F44336');
            this.renderer.setStyle(this.el.nativeElement, 'border-width', '2px');
            this.renderer.setStyle(this.el.nativeElement, 'border-color', '#F44336');
        } else {
            this.renderer.setStyle(this.el.nativeElement, 'color', '#000000');
            this.renderer.setStyle(this.el.nativeElement, 'border-width', '1px');
            this.renderer.setStyle(this.el.nativeElement, 'border-color', '#e0e0e0');
        };

        this.renderer.listen(this.el.nativeElement, 'click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = this.accept;
            input.multiple = false;

            input.onchange = (event: any) => {
                const files = event.target.files;
                if (files.length > 0) {
                    const img = new Image();
                    var _URL = window.URL || window.webkitURL;
                    var objectUrl = _URL.createObjectURL(files[0]);
                    img.onload = (ev: any) => {
                        debugger
                        if (ev.target.width < this.minWidth && this.minWidth > 0) {
                            this.toast.show('The width of your image must be greater than ' + this.minWidth + 'px');
                            return false;
                        };
                        if (ev.target.width > this.maxWidth && this.maxWidth > 0) {
                            this.toast.show('The width of your image must be less than ' + this.maxWidth + 'px');
                            return false;
                        };
                        if (ev.target.height < this.minHeight && this.minHeight > 0) {
                            this.toast.show('The height of your image must be greater than ' + this.minHeight + 'px');
                            return false;
                        };
                        if (ev.target.height > this.maxHeight && this.maxHeight > 0) {
                            this.toast.show('The height of your image must be less than ' + this.maxHeight + 'px');
                            return false;
                        };
                        _URL.revokeObjectURL(objectUrl);
                    };
                    img.src = objectUrl;

                    const formData: any = new FormData();
                    const request = new XMLHttpRequest();

                    for (let i = 0; i < files.length; i++) {
                        formData.append('uploads[]', files[i], files[i].name);
                    }

                    request.onreadystatechange = () => {
                        if (request.readyState == 4) {
                            if (request.status == 200) {
                                const res = JSON.parse(request.response);
                                this.src = [environment.drive, '/drive/files/get?fileId=', res.fileId, '&token=', res.token].join('');
                                this.renderer.setStyle(this.el.nativeElement, 'color', '#000000');
                                this.renderer.setStyle(this.el.nativeElement, 'border-width', '1px');
                                this.renderer.setStyle(this.el.nativeElement, 'border-color', '#e0e0e0');
                                this.onChange(this.src);
                            }
                        }
                    };

                    const url = [environment.drive, '/drive/files/upload?', 'email', '=', this.localstorage.get('email'), '&', 'appId', '=', environment.appId].join('');

                    request.open('POST', url, true);
                    request.setRequestHeader('Authorization', this.localstorage.get('token'));
                    request.send(formData);
                }
            };

            input.click();
        });
    }

}

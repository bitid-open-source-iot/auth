import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Input, Output, Renderer2, Directive, ElementRef, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';

@Directive({
	selector: '[upload]'
})

export class UploadDirective implements OnChanges, AfterViewInit {

	@Input('upload-src') private src: string;
	@Input('upload-accept') private accept = 'image/*';
	@Output('upload-change') private change: EventEmitter<any> = new EventEmitter<any>();

	constructor(private el: ElementRef, private renderer: Renderer2, private localstorage: LocalStorageService) {
		this.element = this.el.nativeElement;
		this.renderer.setStyle(this.element, 'margin-bottom', '20px');
		this.renderer.setStyle(this.element, 'background-size', 'cover');
		this.renderer.setStyle(this.element, 'background-repeat', 'norepeat');
		this.renderer.setStyle(this.element, 'background-position', 'center center');
	}

	private element: HTMLElement;

	ngOnChanges(): void {
		this.renderer.setStyle(this.element, 'background-image', ['url(', this.src, ')'].join(''));
	}

	ngAfterViewInit(): void {
		this.renderer.setStyle(this.element, 'background-image', ['url(', this.src, ')'].join(''));
		this.renderer.listen(this.element, 'click', event => {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = this.accept;
			input.multiple = false;

			input.onchange = (event: any) => {
				const files = event.target.files;
				if (files.length > 0) {
					const formData: any = new FormData();
					const request = new XMLHttpRequest();

					for (let i = 0; i < files.length; i++) {
						formData.append('uploads[]', files[i], files[i].name);
					}

					request.onreadystatechange = (event) => {
						if (request.readyState == 4) {
							if (request.status == 200) {
								const res = JSON.parse(request.response);
								const file = [environment.drive, '/drive/files/get?fileId=', res.fileId, '&token=', res.token].join('');
								this.renderer.setStyle(this.element, 'background-image', ['url(', file, ')'].join(''));
								this.change.emit(file);
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

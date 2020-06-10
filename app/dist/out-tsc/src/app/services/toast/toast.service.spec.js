import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
describe('ToastService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ToastService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=toast.service.spec.js.map
import { TestBed } from '@angular/core/testing';
import { AppsService } from './apps.service';
describe('AppsService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AppsService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=apps.service.spec.js.map
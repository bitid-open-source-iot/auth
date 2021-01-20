import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
describe('ApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(ApiService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=api.service.spec.js.map
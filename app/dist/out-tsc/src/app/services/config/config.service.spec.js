import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
describe('ConfigService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConfigService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=config.service.spec.js.map
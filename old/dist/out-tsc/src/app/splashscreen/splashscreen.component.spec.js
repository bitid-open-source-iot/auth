import { async, TestBed } from '@angular/core/testing';
import { SplashScreen } from './splashscreen.component';
describe('SplashScreen', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SplashScreen]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SplashScreen);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=splashscreen.component.spec.js.map
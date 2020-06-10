import { async, TestBed } from '@angular/core/testing';
import { UnsubscribeComponent } from './unsubscribe.component';
describe('UnsubscribeComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UnsubscribeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(UnsubscribeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=unsubscribe.component.spec.js.map
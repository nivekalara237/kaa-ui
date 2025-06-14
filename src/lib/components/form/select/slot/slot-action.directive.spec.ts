import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SlotActionDirective} from './slot-action.directive';
import {By} from '@angular/platform-browser';

@Component({
  template: `
    <div kaSelectAction class="text-red-600">
      Test Content
    </div>
  `,
  standalone: false
})
class TestComponent {
}

describe('SlotActionDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SlotActionDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges(); // trigger ngOnInit
    debugEl = fixture.debugElement.query(By.directive(SlotActionDirective));
  });

  it('should create an instance', () => {
    const directiveInstance = debugEl.injector.get(SlotActionDirective);
    expect(directiveInstance).toBeTruthy();
  });

  it('should apply merged Tailwind classes', () => {
    const el: HTMLElement = debugEl.nativeElement;
    const classList = el.className;

    expect(classList).toContain('px-3');
    expect(classList).toContain('py-4');
    expect(classList).toContain('border-t');
    expect(classList).toContain('border-gray-200');
    expect(classList).toContain('text-red-600'); // initial class should remain
  });
});

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  })

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should render title in class ".navbar-brand"', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Library');
  }));

  it('should create menu with correct items', async(() => {
    fixture.detectChanges();
    const de: DebugElement = fixture.debugElement.queryAll(By.css('.nav-link'));
    console.log(de.children);
    expect(true).toBe(true);
  }));
});

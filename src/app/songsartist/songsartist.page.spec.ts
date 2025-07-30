import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongsartistPage } from './songsartist.page';

describe('SongsartistPage', () => {
  let component: SongsartistPage;
  let fixture: ComponentFixture<SongsartistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsartistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

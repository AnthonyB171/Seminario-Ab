import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongsmodalPage } from './songsmodal.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('SongsmodalPage', () => {
  let component: SongsmodalPage;
  let fixture: ComponentFixture<SongsmodalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        SongsmodalPage // Importa el componente standalone
      ],
      providers: [
        provideAnimations() // Por si el componente usa animaciones
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SongsmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

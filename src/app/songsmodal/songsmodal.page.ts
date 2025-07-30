import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-songsmodal',
  templateUrl: './songsmodal.page.html',
  styleUrls: ['./songsmodal.page.scss'],
})
export class SongsmodalPage implements OnInit {
  @Input() songs: any[] = [];
  @Input() albumId!: string; // Opcional, si necesitas usarlo

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log('🎵 Modal iniciado');
    console.log('albumId recibido:', this.albumId);
    console.log('songs recibidas:', this.songs);
  }
   dismissModal() {
    (document.activeElement as HTMLElement)?.blur(); // Evita problema aria-hidden
    this.modalCtrl.dismiss();
  }

  async selectSong(song: any) {
    console.log('Canción seleccionada:', song);
    await this.modalCtrl.dismiss({ song });
  }
}



import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-songsmodal',
  templateUrl: './songsmodal.page.html',
  styleUrls: ['./songsmodal.page.scss'],
})
export class SongsmodalPage {
  @Input() songs: any[] = [];

  constructor(private modalCtrl: ModalController) {}
  ngOnInit() {
    console.log('🎵 Modal iniciado');
    console.log('albumId recibido:', this.albumId);
    console.log('songs recibidas:', this.songs);
  }
  albumId(arg0: string, albumId: any) {
    throw new Error('Method not implemented.');
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}


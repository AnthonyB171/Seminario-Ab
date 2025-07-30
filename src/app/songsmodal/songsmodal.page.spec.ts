import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songsmodal',
  templateUrl: './songsmodal.page.html',
  styleUrls: ['./songsmodal.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class SongsmodalPage {
  @Input() songs: any;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}

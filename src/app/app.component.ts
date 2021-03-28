import { Component } from '@angular/core';
import { AgoraService } from './agora.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedButton = null;

  constructor(private agoraService: AgoraService) { }

  onStartCallHandler(event: MouseEvent): void {
    this.agoraService.joinCall();
  }

  onLeaveCallHandler(event: MouseEvent): void {
    console.log('Event Transfered to App component => Leaving the call..');
    this.agoraService.endCall();
  }
}

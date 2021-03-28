import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-moderator-view',
  templateUrl: './moderator-view.component.html',
  styleUrls: ['./moderator-view.component.css']
})
export class ModeratorViewComponent {

  @Output() startCallEvent = new EventEmitter<MouseEvent>();
  @Output() answerEvent = new EventEmitter<MouseEvent>();
  @Output() leaveCallEvent = new EventEmitter<MouseEvent>();

  onStartCallHandler(event: MouseEvent): void {
    this.startCallEvent.emit(event);
  }

  onLeaveCallHandler(event: MouseEvent): void {
    this.leaveCallEvent.emit(event);
  }

}

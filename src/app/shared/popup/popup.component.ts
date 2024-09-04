import { Component } from '@angular/core';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  check=faCircleCheck
  isVisible: boolean = false;

  constructor() { }


}

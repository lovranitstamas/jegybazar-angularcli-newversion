import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements AfterViewInit {

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detach();
  }

}

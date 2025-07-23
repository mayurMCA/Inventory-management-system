import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule],
  templateUrl: './dashbord.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {}

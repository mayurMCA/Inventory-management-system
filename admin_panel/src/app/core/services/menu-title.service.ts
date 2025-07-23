import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MenuTitleService {
  public $titleData = new Subject<{
    title: string,
    subTitle: string,
    type: string,
  }>();

  set(data: any) {
    this.$titleData.next(data)
  }

}

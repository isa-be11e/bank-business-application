import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'menu-tile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-tile.component.html'
})
export class MenuTile {
  @Input() icon: string;
  @Input() heading: string;
  @Input() route: string;
}

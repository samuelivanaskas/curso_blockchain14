import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(private router: Router){ }

  criarCarteira(): void
  {
    this.router.navigate(["/login/register"]);
  }

  importarCarteira(): void
  {
    this.router.navigate(["/login/import"]);
  }
}

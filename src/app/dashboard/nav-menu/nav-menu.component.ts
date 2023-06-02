import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private route: Router,
    private toastr: ToastrService) {

  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  showMenu() : boolean {
     return this.route.url != "/login/user" &&
     this.route.url != "/login/register" &&
     this.route.url != "/login/import";
  }

  desconectar()
  {
    localStorage.removeItem('wallet');
    this.toastr.success('Carteira desconectada!');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit{

  wallet!: string | null;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.wallet = localStorage.getItem('wallet');

    if(!this.wallet)
    {
      this.route.navigate(['/login/user']);
    }
  }


}

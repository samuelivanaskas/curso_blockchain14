import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public precoBitcoin : any;
  wallet!: string | null;
  constructor(private http: HttpClient,
    private router: Router){}

  ngOnInit(): void {
    this.wallet = localStorage.getItem('wallet');

    if(!this.wallet)
    {
      this.router.navigate(['/login/user']);
    }

    this.precoBitcoin = this.http.get('https://www.mercadobitcoin.net/api/BTC/ticker')
    .subscribe(response => this.precoBitcoin = response)
  }
}

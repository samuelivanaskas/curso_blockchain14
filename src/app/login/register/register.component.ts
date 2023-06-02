import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from 'src/app/services/wallet.service';
import { CreateWalletRequest } from 'src/models/CreateWalletRequest';
import { Wallet } from 'src/models/Wallet';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  returnUrl: string = "";
  registerFormGroup! : FormGroup;
  submitted = false;
  checkboxConfirmacao = false;
  request = new CreateWalletRequest();
  wallet = new Wallet();
  seedPhrase: Array<string> | undefined;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private walletService: WalletService) {
      this.registerFormGroup = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
        checkboxConfirmacao : [undefined, Validators.required]
      });

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get registerForm() { return this.registerFormGroup.controls; }

   createuser()
   {
     this.submitted = true;

     if (this.registerFormGroup.invalid) {
       return;
     }

     this.request.Password = this.registerForm['password'].value;

     if(this.checkboxConfirmacao && this.registerForm['password'].value != "")
     {
        this.walletService.create(this.request)
        .subscribe({
          next: (response) => {
            this.wallet = response
            this.seedPhrase = this.wallet.seedPhrase.split(' ').filter((x) => x);
          },
          error: (error) => console.log("Ocorreu erro na requisição:" + error)
        })
     }
     else
     {
        this.toastr.error('Você deve concordar com os termos!');
     }
  }

  confirmUser()
  {
    localStorage.setItem('wallet', this.wallet.publicKey);
    this.toastr.success('Carteira conectada!');
    this.router.navigate([this.returnUrl]);
  }
}




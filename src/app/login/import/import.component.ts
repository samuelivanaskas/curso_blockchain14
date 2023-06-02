import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms':
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from 'src/app/services/wallet.service';
import { RestoreWalletRequest } from 'src/models/RestoreWalletRequest';
import { Wallet } from 'src/models/Wallet';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {
  seedForm!: FormGroup;
  registerFormGroup! : FormGroup;
  submitted = false;
  checkboxConfirmacao = false;
  returnUrl: string = "";
  request = new RestoreWalletRequest();
  wallet = new Wallet();

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private walletService: WalletService) {

    this.seedForm = this.formBuilder.group({
      seedWords: this.formBuilder.array(Array(12).fill('').map(() => this.formBuilder.control('', Validators.required))),
    });

    this.registerFormGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      checkboxConfirmacao : [undefined, Validators.required]
    });
  }


  get registerForm() { return this.registerFormGroup.controls; }
  get seedWords(): FormArray {
    return this.seedForm.get('seedWords') as FormArray;
  }

  restorewallet()
  {
    this.submitted = true;

    if (this.registerFormGroup.invalid || this.seedForm.invalid) {
      return;
    }

    const seedPhraseValues: string[] = this.seedWords.controls.map(control => control.value);
    const seedPhraseString: string = seedPhraseValues.join(' ');

    this.request.Password = this.registerForm['password'].value;
    this.request.SeedPhrase = seedPhraseString;

    if(this.checkboxConfirmacao && this.registerForm['password'].value != "")
    {
        this.walletService.restore(this.request)
        .subscribe({
          next: (response) => {
            this.wallet = response

            if(this.wallet.publicKey)
            {
              localStorage.setItem('wallet', this.wallet.publicKey);
              this.toastr.success('Carteira conectada!');
              this.router.navigate([this.returnUrl]);
            }
          },
          error: (error) => console.log("Ocorreu erro na requisição:" + error)
        });
    }
    else
    {
        this.toastr.error('Você deve concordar com os termos!');
    }
  }
}

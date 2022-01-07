import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from 'src/app/models/account';
import { Products } from 'src/app/models/products';
import Swal from 'sweetalert2';
import { AccountService } from '../../../../services/account.service';




@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  account: Account = null;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    const id = this.activatedRoute.snapshot.params.id;
    this.accountService.detail(id).subscribe(
      data => {
        this.account = data;
      },
      err => {
        Swal.fire(
          'Oopps..',
          'No has podido acceder a la cuenta',
          'error'
        )
      }
    );
  }

}

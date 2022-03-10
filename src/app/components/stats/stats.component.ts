import { Component, OnInit } from '@angular/core';
import { faEye, faClock, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReplacementsData } from 'src/app/models/replacementsData';
import { RepositionService } from 'src/app/services/reposition.service';
import { TokenService } from 'src/app/services/token.service';



@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  page = 1;
  pageSize = 4;
  replacementsData: ReplacementsData[] = [];
  size = 10;
  myAccountId: string;
  faClock = faClock;
  faFileExcel = faFileExcel;
  faFilePdf = faFilePdf;
  faEye = faEye;

  constructor(
    private tokenService: TokenService,
    private repositionService: RepositionService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getAccount();
    this.loadHistorial();
  }

  loadHistorial(): void{
    this.repositionService.historyReplacement(this.myAccountId).subscribe(
      data => {
        this.replacementsData = data;
        this.spinner.hide();
      },
      err => {
        console.log(err);
      }
    );
  }

  getAccount(): string{
    return this.myAccountId = this.tokenService.getAccount();
  }

  exportData(id: string): void{
    this.repositionService.exportData(id).subscribe(
      data => {
        var newBlob = new Blob([data], {type: "application/pdf"});
        var fileUrl = URL.createObjectURL(newBlob);
        var a = document.createElement('a');
        a.href = fileUrl;
        a.target = '_blank';
        a.download = 'data.pdf';
        document.body.appendChild(a);
        a.click();      
      }
    )
  }

  exportDataExcel(id: string): void{
    this.repositionService.exportDataExcel(id).subscribe(
      data => {
        var newBlob = new Blob([data], {type: "application/octet-stream"});
        var fileUrl = URL.createObjectURL(newBlob);
        var a = document.createElement('a');
        a.href = fileUrl;
        a.target = '_blank';
        a.download = 'data.xlsx';
        document.body.appendChild(a);
        a.click();     
      }
    )
  }

}

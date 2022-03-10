import { Component, OnInit } from '@angular/core';
import { parseMetadata } from '@angular/localize/src/utils';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ReplacementItems } from 'src/app/models/replacementItems';
import { RepositionService } from 'src/app/services/reposition.service';


@Component({
  selector: 'app-replacement-detail',
  templateUrl: './replacement-detail.component.html',
  styleUrls: ['./replacement-detail.component.css']
})
export class ReplacementDetailComponent implements OnInit {

  public replacementItem: ReplacementItems[] = [];
  faArrowleft = faArrowLeft;

  constructor(
    private activatedRoute: ActivatedRoute,
    private repositionService: RepositionService
  ) { }

  ngOnInit() {
    this.loadReposition();
  }

  loadReposition(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.repositionService.repositionDetail(id).subscribe(
          data => {
            this.replacementItem = data;
          },
          err => {
            console.log(err.error);
          }
        )
      }
    })
  }

}

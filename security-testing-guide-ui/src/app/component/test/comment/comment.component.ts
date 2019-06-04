import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../../service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(public commentService: CommentService) { }

  ngOnInit() {
  }

}

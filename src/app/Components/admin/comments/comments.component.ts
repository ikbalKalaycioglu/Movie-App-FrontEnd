import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/models/Comment';
import { CommentDetail } from 'src/app/models/CommentDetail';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  filterText: string;
  comments: CommentDetail[];

  constructor(private commentService: CommentService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.commentService.getAll().subscribe(data => this.comments = data.data);
  }

  displayChange(commentDetail: CommentDetail) {
    const comment: Comment = {
      contentId: commentDetail.contentId,
      display: !commentDetail.display,
      id: commentDetail.id,
      message: commentDetail.message,
      userId: commentDetail.userId
    }
    this.commentService.update(comment).subscribe(data => {
      this.toastr.info("Display changed", "success");
    });
  }



}

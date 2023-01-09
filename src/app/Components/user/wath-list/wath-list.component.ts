import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WatchListDto } from 'src/app/models/watchListDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { WatchListService } from 'src/app/services/watch-list.service';

@Component({
  selector: 'app-wath-list',
  templateUrl: './wath-list.component.html',
  styleUrls: ['./wath-list.component.css']
})
export class WathListComponent implements OnInit {

  watchList: WatchListDto[] = []
  deletedId: number = -1;
  posterURL = "https://localhost:44341/images/"


  constructor(private toastr: ToastrService, private authService: AuthService, private userService: UserService, private watchListService: WatchListService) { }


  ngOnInit(): void {
    this.getContentByUserId()
  }

  getContentByUserId() {
    this.watchListService.getByUserId(this.authService.getCurrentUserId).subscribe(response => {
      this.watchList = response.data
    })
  }

  removeContent(id : number) {
    this.watchListService.remove(id).subscribe(response => {
      this.toastr.success(response.message, "Succesful !")
      window.location.reload();
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WatchList } from 'src/app/models/watchList';
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
  watchedList: WatchListDto[] = []
  notWatchedList: WatchListDto[] = []
  deletedId: number = -1;
  posterURL = "https://localhost:44341/images/"
  change: boolean = true;

  constructor(private toastr: ToastrService, private authService: AuthService, private userService: UserService, private watchListService: WatchListService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getContentByUserId()
  }

  getContentByUserId() {
    this.watchListService.getByUserId(this.authService.getCurrentUserId).subscribe(response => {
      this.watchList = response.data
      this.watchList.forEach(element => {
        if (element.watched == true) {
          this.watchedList.push(element);
        }
        else {
          this.notWatchedList.push(element);
        }
      });
    })
  }

  removeContent(id: number) {
    this.watchListService.remove(id).subscribe(response => {
      this.toastr.success(response.message, "Succesful !")
    })
    window.location.reload();
  }

  changeWatched(watchList: WatchList) {
    this.watchListService.changeWatched(watchList).subscribe(response => {
      this.toastr.success(response.message, "Succesful !")
    })
    window.location.reload();
  }

  watchListFunc() {
    this.change = true;
  }

  watchedListFunc() {
    this.change = false;
  }
}

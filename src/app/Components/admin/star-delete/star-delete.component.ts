import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Star } from 'src/app/models/star';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-star-delete',
  templateUrl: './star-delete.component.html',
  styleUrls: ['./star-delete.component.css']
})
export class StarDeleteComponent implements OnInit {
  
  currentStar: Star = {
    starId: 0,
    bio: "",
    bornDate: new Date(),
    contentId: 0,
    firstName: "",
    lastName: ""
  }
  star: Star[] = []

  constructor(private starService: StarService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getStar()
  }

  getStar() {
    this.starService.getStar().subscribe(response => {
      this.star = response.data
    })
  }

  remove(id: number) {
    this.starService.remove(id).subscribe(response => {
      console.log(response.message);
      this.toastr.show(response.message, "Deleted !")
      setTimeout(() => {
        window.location.reload()
      }, 500);
    }, responseError => {
      this.toastr.error("Not Deleted", "Error !")
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Director } from 'src/app/models/director';
import { DirectorService } from 'src/app/services/director.service';

@Component({
  selector: 'app-director-delete',
  templateUrl: './director-delete.component.html',
  styleUrls: ['./director-delete.component.css']
})
export class DirectorDeleteComponent implements OnInit {

  currentDirector: Director = {
    directorId: 0,
    bio: "",
    bornDate: new Date(),
    contentId: 0,
    firstName: "",
    lastName: ""
  }
  director: Director[] = []

  constructor(private directorService: DirectorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDirector();
  }

  getDirector() {
    this.directorService.getDirectors().subscribe(response => {
      this.director = response.data
    })
  }

  remove(id: number) {
    this.directorService.remove(id).subscribe(response => {
      this.toastr.show(response.message, "Deleted !")
      setTimeout(() => {
        window.location.reload()
      }, 500);
    }, responseError => {
      this.toastr.error("Not Deleted", "Error !")
    })
  }
}

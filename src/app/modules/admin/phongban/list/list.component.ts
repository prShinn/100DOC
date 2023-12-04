import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/Common/api/api.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  dsPhongBan: any[] = [];
  constructor(private _api: ApiService, private dialog: MatDialog) {}
  ngOnInit() {
    this.getListPhongBan();
  }
  getListPhongBan() {
    this._api.getEntity(this._api.getPhongBans(), (res: any) => {
      this.dsPhongBan = res;
    });
  }
  btnCreate(item = null) {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: item,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getListPhongBan();
      }
    });
  }
}

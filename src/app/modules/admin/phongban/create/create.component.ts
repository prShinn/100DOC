import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/Common/api/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPhongBanModel } from 'src/app/modules/Models/PhongBan.Model';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  isEdit: boolean = false;
  editItem: IPhongBanModel = {};
  isLoading: boolean = false;
  phongBanForm = new FormGroup({
    name: new FormControl(),
    fullName: new FormControl(),
    address: new FormControl(),
    description: new FormControl(),
  });
  constructor(
    private _api: ApiService,
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPhongBanModel
  ) {
    if (this.data) {
      this.isEdit = true;
      this.editItem = this.data;
      this.setValueForm();
    }
  }
  ngOnInit() {}

  setValueForm() {
    this.phongBanForm.patchValue({
      name: this.editItem.name,
      fullName: this.editItem.fullName,
      address: this.editItem.address,
      description: this.editItem.description,
    });
  }
  btnSave() {
    this.editItem = {
      name: this.phongBanForm.get('name')?.value,
      fullName: this.phongBanForm.get('fullName')?.value,
      address: this.phongBanForm.get('address')?.value,
      description: this.phongBanForm.get('description')?.value,
    };

    if (this.isEdit) {
      this.editItem.id = this.data.id;
      this._api.putEntity(
        this._api.updatePhongBans(this.editItem.id),
        this.editItem,
        (res: any) => {
          this.closeModal(true);
        }
      );
    } else {
      this._api.postEntity(
        this._api.createPhongBans(),
        this.editItem,
        (res: any) => {
          console.log('res: ', res);
          this.editItem = res;
          this.closeModal(true);
        }
      );
    }
  }
  closeModal(result: any = false) {
    this.dialogRef.close(result);
  }
}

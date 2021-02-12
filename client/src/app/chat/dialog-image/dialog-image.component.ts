import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { StoreUserService } from '../shared/services/store-user.service';

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.css']
})
export class DialogImageComponent implements OnInit {
  link:string=""


  constructor(public dialogRef: MatDialogRef<DialogImageComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any,) {}

  ngOnInit() {
  }

  public onSave(): void {
    this.dialogRef.close({
      link:this.link
    });
  }





}

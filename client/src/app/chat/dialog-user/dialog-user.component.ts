import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { StoreUserService } from '../shared/services/store-user.service';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required]);
  previousUsername: string;

  constructor(public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any,
    private storedUser: StoreUserService) {
    this.previousUsername = storedUser.getStoredUser() ? storedUser.getStoredUser() : (params.username ? params.username : undefined);
    this.usernameFormControl.setValue(storedUser.getStoredUser() ? storedUser.getStoredUser() : (params.username ? params.username : ""));
  }



  public onSave(): void {
    this.dialogRef.close({
      username: this.usernameFormControl.value,
      dialogType: this.params.dialogType,
      previousUsername: this.previousUsername
    });
  }

  ngOnInit() {
  }

  names:string[] = ["Jack27","JustCoffe","24Code","StudentLife","IWTKM","MickTheKing","JustEmy","ThatGuy19","Mario64","CSGuy","LotOfCode","PunchCancel","Faster11","ToHard","WutThis","FluffyUnicorn","GreenBaegle","YoloGuy","IceSlider","HelloWorld"]
  public onRandomSave(): void {
    let name = this.names[Math.floor(Math.random()*this.names.length)]
    this.dialogRef.close({
      username: name,
      dialogType: this.params.dialogType,
      previousUsername: this.previousUsername
    });
  }



}

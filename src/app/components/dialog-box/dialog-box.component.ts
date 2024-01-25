import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
})
export class DialogBoxComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    year: new FormControl(this.data?.year ?? ''),
    chip: new FormControl(this.data?.chip ?? ''),
    SSD: new FormControl(this.data?.SSD ?? ''),
    memory: new FormControl(this.data?.memory ?? ''),
    display: new FormControl(this.data?.display ?? '')
    
  });

  isNew: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(this.data) this.isNew = false
  }

  public onSubmit(){

    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      image: "assets/images/apple-macbook-pro-13-apple-m2-8c.png",
      configure: {
        chip: this.myForm.value.chip,
        SSD: this.myForm.value.SSD,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display
      }
    }

    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  ngOnInit() {}
}

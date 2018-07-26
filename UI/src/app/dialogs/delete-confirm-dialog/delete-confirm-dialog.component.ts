import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {

  deleted: Boolean = false;
  constructor(private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>
  ) { }

  ngOnInit() {
  }

  delete() {
    this.deleted = true;
    this.dialogRef.close(this.deleted);
  }

}

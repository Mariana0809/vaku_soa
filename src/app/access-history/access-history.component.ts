import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { collectionData, Firestore,collection,query } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-access-history',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './access-history.component.html',
  styleUrl: './access-history.component.css'
})
export class AccessHistoryComponent implements OnInit {
  firestore = inject(Firestore);
  listAccess: any[] = [];

  ngOnInit(): void {
    const accesosRef = collection(this.firestore, 'historial_de_acceso');
    const accesosQuery = query(accesosRef,orderBy('fechaAcceso', 'desc'));

    collectionData(accesosQuery,{ idField: 'id' }).subscribe(data => {
      this.listAccess = data;
    });
  }
}

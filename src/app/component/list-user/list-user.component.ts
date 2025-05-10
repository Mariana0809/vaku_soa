import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit {
  firestore = inject(Firestore);

  empleados: any[] = [];

  ngOnInit() {
    const empleadosRef = collection(this.firestore, 'empleados');
    collectionData(empleadosRef, {idField: 'id'}).subscribe(data => {
      this.empleados = data;
    });
  }

  eliminarEmpleado(id: string) {
    const confirmacion = confirm('¿Estás seguro de eliminar este empleado?');
    if (confirmacion) {
      const docRef = doc(this.firestore, `empleados/${id}`);
      deleteDoc(docRef).then(() => {
        alert('Empleado eliminado');
      }).catch(err => {
        console.error(err);
        alert('Error al eliminar el empleado');
      });
    }
  }
}

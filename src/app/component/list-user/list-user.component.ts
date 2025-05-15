import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  // Modal
  modalAbierto = false;
  empleadoEdit: any = {};

  ngOnInit() {
    const empleadosRef = collection(this.firestore, 'empleados');
    collectionData(empleadosRef, { idField: 'id' }).subscribe(data => {
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

  abrirModal(empleado: any) {
    this.empleadoEdit = { ...empleado }; // Copia para evitar modificar directamente
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.empleadoEdit = {};
  }

  guardarCambios() {
    // Validar que ningún campo esté vacío o con solo espacios
    if (
      !this.empleadoEdit.persRole?.trim() ||
      !this.empleadoEdit.persEmail?.trim() ||
      !this.empleadoEdit.persPhone?.trim() ||
      !this.empleadoEdit.persAddress?.trim()
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const docRef = doc(this.firestore, `empleados/${this.empleadoEdit.id}`);
    updateDoc(docRef, {
      persRole: this.empleadoEdit.persRole.trim(),
      persEmail: this.empleadoEdit.persEmail.trim(),
      persPhone: this.empleadoEdit.persPhone.trim(),
      persAddress: this.empleadoEdit.persAddress.trim(),
    }).then(() => {
      alert('Cambios guardados correctamente');
      this.cerrarModal();
    }).catch(err => {
      console.error(err);
      alert('Error al guardar los cambios');
    });
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  firestore = inject(Firestore);

  empleado: any = {
    persNames: '',
    persLastNames: '',
    persDocument: '',
    persSex: '',
    persAddress: '',
    persDateBirth: '',
    persRole: '',
    persEmail: '',
    persPhone: ''
  };

  auth = inject(Auth);

  onSubmit() {
    // Validación de campos vacíos
    const camposVacios = Object.values(this.empleado)
      .some(valor => !valor || (typeof valor === 'string' && valor.trim() === ''));
    if (camposVacios) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Validación de correo electrónico
    if (!this.isValidEmail(this.empleado.persEmail)) {
      alert('Correo electrónico inválido');
      return;
    }

    // Validación del teléfono: 7 a 15 dígitos numéricos
    if (!this.isValidPhone(this.empleado.persPhone)) {
      alert('Teléfono inválido. Debe contener solo números (7-15 dígitos)');
      return;
    }

    // Validación de fecha de nacimiento (no puede ser futura)
    const birthDate = new Date(this.empleado.persDateBirth);
    const today = new Date();
    if (birthDate >= today) {
      alert('La fecha de nacimiento no puede ser futura');
      return;
    }

    // Si todas las validaciones pasan, se crea el empleado en Firebase
    this.crearEmpleado();
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  isValidPhone(phone: string): boolean {
    return /^[0-9]{7,15}$/.test(phone);
  }

  async crearEmpleado() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      this.empleado.persEmail,
      this.empleado.persPassword
    );
      const uid = userCredential.user.uid;
    const empleadosRef = collection(this.firestore, 'empleados');
    await addDoc(empleadosRef, {
      ...this.empleado,
      uid
    });

      // Reiniciar el formulario al estado inicial
      this.empleado = {
        persNames: '',
        persLastNames: '',
        persDocument: '',
        persSex: '',
        persAddress: '',
        persDateBirth: '',
        persRole: '',
        persEmail: '',
        persPhone: ''
      };
    } catch (error) {
      console.error(error);
      alert('Error al crear el empleado');
    }
  }
}

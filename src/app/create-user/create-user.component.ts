import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, query, where, getDocs, addDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  firestore = inject(Firestore);
  auth = inject(Auth);

  empleado: any = {
    persNames: '',
    persLastNames: '',
    persDocument: '',
    persSex: '',
    persAddress: '',
    persDateBirth: '',
    persRole: '',
    persEmail: '',
    persPhone: '',
    persPassword: '', // Nuevo campo para la contraseña
  };

  onSubmit() {
    // Validación de campos vacíos
    const camposVacios = Object.values(this.empleado).some(
      (valor) => !valor || (typeof valor === 'string' && valor.trim() === '')
    );
    if (camposVacios) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (!this.isValidEmail(this.empleado.persEmail)) {
      alert('Correo electrónico inválido');
      return;
    }

    if (!this.isValidPhone(this.empleado.persPhone)) {
      alert('Teléfono inválido. Debe contener solo números (7-15 dígitos)');
      return;
    }

    const birthDate = new Date(this.empleado.persDateBirth);
    const today = new Date();
    if (birthDate >= today) {
      alert('La fecha de nacimiento no puede ser futura');
      return;
    }

    // Validar si el correo ya existe en Firestore
    this.validarCorreoYCrearEmpleado();
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  isValidPhone(phone: string): boolean {
    return /^[0-9]{7,15}$/.test(phone);
  }

  async validarCorreoYCrearEmpleado() {
    try {
      const empleadosRef = collection(this.firestore, 'empleados');
      const q = query(empleadosRef, where('persEmail', '==', this.empleado.persEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert('El correo ya está registrado en la base de datos.');
        return;
      }

      // Registrar en Authentication
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.empleado.persEmail,
        this.empleado.persPassword // Firebase la encripta automáticamente
      );

      // Eliminar la contraseña antes de guardar en Firestore
      const empleadoSinPassword = { ...this.empleado };
      delete empleadoSinPassword.persPassword;

      // Agregar UID al documento Firestore
      await addDoc(empleadosRef, {
        ...empleadoSinPassword,
        uid: userCredential.user.uid,
      });

      // Reiniciar formulario
      this.empleado = {
        persNames: '',
        persLastNames: '',
        persDocument: '',
        persSex: '',
        persAddress: '',
        persDateBirth: '',
        persRole: '',
        persEmail: '',
        persPhone: '',
        persPassword: '',
      };

      alert('Empleado registrado correctamente en Auth y Firestore.');
    } catch (error: any) {
      console.error('Error al crear usuario:', error);
      alert(`Error al registrar usuario: ${error.message}`);
    }
  }
}

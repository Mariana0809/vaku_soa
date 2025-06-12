import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  collectionData,
  Firestore,
  collection,
  query,
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-access-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './access-history.component.html',
  styleUrl: './access-history.component.css',
})
export class AccessHistoryComponent implements OnInit {
  firestore = inject(Firestore);
  listAccess: any[] = [];

  // Filtros
  searchEmail: string = '';
  sortOrder: string = 'desc';
  startDate: string = '';
  endDate: string = '';
  filterProvider: string = '';

  ngOnInit(): void {
    const accesosRef = collection(this.firestore, 'historial_de_acceso');
    const accesosQuery = query(accesosRef, orderBy('fechaAcceso', 'desc'));

    collectionData(accesosQuery, { idField: 'id' }).subscribe((data) => {
      this.listAccess = data;
    });
  }

  // Obtener lista única de proveedores
  get uniqueProviders(): string[] {
    const providers = this.listAccess.map((item) => item.provider);
    return [...new Set(providers)];
  }

  // Aplicar todos los filtros y ordenamiento
  get filteredAndSortedAccess() {
    let filtered = this.listAccess;

    // Filtro por búsqueda de email
    if (this.searchEmail.trim() !== '') {
      filtered = filtered.filter((access) =>
        access.email.toLowerCase().includes(this.searchEmail.toLowerCase())
      );
    }

    // Filtro por proveedor
    if (this.filterProvider !== '') {
      filtered = filtered.filter(
        (access) => access.provider === this.filterProvider
      );
    }

    // Filtro por rango de fechas
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      end.setHours(23, 59, 59, 999); // incluir todo el día final

      filtered = filtered.filter((access) => {
        const accessDate = access.fechaAcceso?.toDate();
        return accessDate >= start && accessDate <= end;
      });
    }

    // Ordenamiento por fecha
    filtered = filtered.sort((a, b) => {
      const dateA = a.fechaAcceso?.toDate();
      const dateB = b.fechaAcceso?.toDate();

      if (!dateA || !dateB) return 0;

      return this.sortOrder === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    return filtered;
  }
}

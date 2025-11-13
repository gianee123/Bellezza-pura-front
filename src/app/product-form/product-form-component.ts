import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ProductService } from '../shared/product-service'
import { Router } from '@angular/router';

// Importaciones de Angular Material necesarias para el formulario
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form-component.html',
  styleUrls: ['./product-form-component.css'],
  
 
  standalone: true, 
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    
    // Módulos de Material
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule,    
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule, 
    MatDividerModule
  ]
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;

  categories: string[] = [
    'Cuidado Facial',
    'Maquillaje',
    'Cuidado Corporal',
    'Perfumería',
    'Capilar',
    'Accesorios'
  ];

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required]], 
      description: ['', [Validators.maxLength(500)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      stock: [null, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      image: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]], // Regex simple para URL
      isAvailable: [true] 
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      const rawData = this.productForm.value;
      const { isAvailable, ...productDataToSend } = rawData;
 
      this.productService.addProduct(productData).subscribe({
        next: (response) => {
          // El producto fue creado con éxito en la API
          console.log('✅ Producto creado:', response);
          alert('✅ Producto registrado con éxito!');
          
          // Redirigir al listado para verificar (Ruta: /products)
          this.router.navigate(['/products']); 
        },
        error: (err) => {
          // Si el backend falla, mostrar el error
          console.error('❌ Error al registrar en la API:', err);
          alert('❌ Error: La API rechazó el producto. Revisa la consola.');
        }
      });
      
    } else {
      console.error('El formulario no es válido.');
      this.productForm.markAllAsTouched(); 
    }
  }
}
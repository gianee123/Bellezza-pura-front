import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ProductService } from '../shared/product-service';
import { Product } from '../shared/product-interface';
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
  
  /*Variables para manejar la edición*/
  isEditMode = false;
  productId: string | null = null;

  categories: string[] = [
    'Cuidado Facial',
    'Maquillaje',
    'Cuidado Corporal',
    'Perfumería',
    'Capilar',
    'Accesorios'
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    // definición inicial del formulario
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required]], 
      description: ['', [Validators.maxLength(500)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      stock: [null, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      image: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]], 
      isAvailable: [true] 
    });

    // logica de edicion
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      
      if (this.productId) {
        this.isEditMode = true;
        this.loadProductData(this.productId); 
      }
    });
  }

  // metodo para cargar datos del producto en modo edicion, existentes
  loadProductData(id: string): void {
    this.productService.getProduct(id).subscribe({
      next: (product: Product) => {

      // Usamos patchValue para llenar los campos
      this.productForm.patchValue({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        isAvailable: product.isAvailable 
      });
    },
    
      error: (err) => {
        console.error('Error al precargar el producto:', err);
        alert('Error: No se pudieron cargar los datos. Volviendo al listado.');
        this.router.navigate(['/products']);
      }
    });
  }


  // metodo para crear o actualizar producto
  onSubmit(): void {
    if (this.productForm.valid) {
      const rawData = this.productForm.value;
      const { isAvailable, ...productDataToSend } = rawData; 
      
      let request; // variable para almacenar el Observable (Crear o Actualizar)
      
      if (this.isEditMode && this.productId) {
        request = this.productService.updateProduct(this.productId, productDataToSend);
      } else {
        request = this.productService.addProduct(productDataToSend);
      }

      request.subscribe({
        next: (response) => {
          console.log(`✅ Producto ${this.isEditMode ? 'actualizado' : 'registrado'}:`, response);
          alert(`✅ Producto ${this.isEditMode ? 'actualizado' : 'registrado'} con éxito!`);
          this.router.navigate(['/products']); 
        },
        error: (err) => {
          console.error('❌ Error en la API:', err);
          alert('❌ Error: La API rechazó la operación. Revisa la consola.');
        }
      });
    } else {
      console.error('El formulario no es válido.');
      this.productForm.markAllAsTouched(); 
    }
  }
}
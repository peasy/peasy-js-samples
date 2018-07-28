import { OnInit, Component } from '@angular/core';
import { InventoryListViewModel } from './inventory-list-viewmodel';
import { InventoryService } from '../../services/inventory.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  public viewModel: InventoryListViewModel;

  constructor(private inventoryService: InventoryService, private productService: ProductService) {
    this.viewModel = new InventoryListViewModel(this.inventoryService, this.productService);
  }

  public async ngOnInit() {
    // this.viewModel = new InventoryListViewModel(this.inventoryService, this.productService);
  }

  public async destroy(id: string): Promise<void> {
    await this.viewModel.destroy(id);
  }
}

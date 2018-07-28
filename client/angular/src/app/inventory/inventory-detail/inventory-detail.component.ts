import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ViewModelArgs, InventoryItem } from '../../contracts';
import { InventoryService } from '../../services/inventory.service';
import { InventoryDetailViewModel } from './inventory-detail-viewmodel';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private inventoryService: InventoryService,
    private productService: ProductService) { }

  public viewModel: InventoryDetailViewModel;

  public async ngOnInit(): Promise<void> {
    let inventoryItemId = this.route.snapshot.params['id'];
    if (inventoryItemId.toLowerCase() === 'new') { inventoryItemId = null; }
    this.viewModel = new InventoryDetailViewModel({
      service: this.inventoryService,
      entityID: inventoryItemId
    } as ViewModelArgs<InventoryItem>, this.productService);
  }

  public goBack(): void {
    this.location.back();
  }

  public async save(): Promise<void> {
    if (await this.viewModel.save()) {
      this.goBack();
    }
  }

}

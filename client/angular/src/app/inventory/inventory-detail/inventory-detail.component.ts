import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ViewModelArgs, InventoryItem } from '../../contracts';
import { InventoryDetailViewModel } from './inventory-detail-viewmodel';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public viewModel: InventoryDetailViewModel) { }

  public async ngOnInit(): Promise<void> {
    let inventoryItemId = this.route.snapshot.params['id'];
    if (inventoryItemId.toLowerCase() === 'new') { inventoryItemId = null; }
    this.viewModel.loadData({
      entityID: inventoryItemId
    } as ViewModelArgs<InventoryItem>);
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

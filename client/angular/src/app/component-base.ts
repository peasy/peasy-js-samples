import { OnInit, OnDestroy } from '@angular/core';
import { ViewModelBase } from './view-model-base';

export abstract class ComponentBase implements OnInit, OnDestroy {

  constructor(protected viewModel: ViewModelBase) {
  }

  public async ngOnInit(): Promise<void> {
    this.viewModel.listen();
  }

  public async ngOnDestroy(): Promise<void> {
    this.viewModel.dispose();
  }
}

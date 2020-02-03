import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface VirtualDataInterface {
  index: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() config: { columns: { key: string, width: number }[]; };
  @Input() datasource: any[];

  @ViewChild('virtualTable', { static: false }) nzTableComponent: NzTableComponent;
  private destroy$ = new Subject();
  listOfData: VirtualDataInterface[] = [];
  sortName: string | null = null;
  sortValue: string | null = null;
  columns: string[];
  constructor() { }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }


  search(): void {
    const data = this.listOfData;
    if (this.sortName && this.sortValue) {
      this.listOfData = [...data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
            ? 1
            : -1
      )];
    } else {
      this.listOfData = [...data];
    }
  }

  scrollToIndex(index: number): void {
    this.nzTableComponent.cdkVirtualScrollViewport.scrollToIndex(index);
  }

  trackByIndex(_: number, data: VirtualDataInterface): number {
    return data.index;
  }

  ngOnInit(): void {
    this.listOfData = this.datasource;
  }

  ngAfterViewInit(): void {
    this.nzTableComponent.cdkVirtualScrollViewport.scrolledIndexChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        console.log('scroll index to', data);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { 
  AG_GRID_COLUMN_PERSISTENCE_KEY, 
  AG_GRID_FILTER_PERSISTENCE_KEY, 
  AG_GRID_GROUP_PERSISTENCE_KEY, 
  AG_GRID_PAGINATION_PERSISTENCE_KEY, 
  AG_GRID_PIVOT_PERSISTENCE_KEY,
} from './constants';
import { LocalStorageService } from './services';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
 ];

 public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  enableValue: true,
  enablePivot: true,
  enableRowGroup: true
 };
 
 public rowData$!: Observable<any[]>;
 public gridApi!: GridApi;
 public gridColumnApi!: ColumnApi;

 constructor(
  private http: HttpClient,
  private localStorageService: LocalStorageService,
) {}

 onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;

  this.rowData$ = this.http
    .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json');
 }


 onFilterChanged() {
  const filterState: any = this.gridApi.getFilterModel();

  this.localStorageService.setItem(AG_GRID_FILTER_PERSISTENCE_KEY, filterState);
 }

 onSaveGridColumnState() {
  const columnState: any = this.gridColumnApi.getColumnState();
  const groupState: any = this.gridColumnApi.getColumnGroupState();

  this.localStorageService.setItem(AG_GRID_COLUMN_PERSISTENCE_KEY, columnState);
  this.localStorageService.setItem(AG_GRID_GROUP_PERSISTENCE_KEY, groupState);
 }

 onSavePivotModeState() {
  const isPivotMode: boolean = this.gridColumnApi.isPivotMode();

  this.localStorageService.setItem(AG_GRID_PIVOT_PERSISTENCE_KEY, isPivotMode);
 }

 onPaginationChanged() {
  const pageNumber: Number = this.gridApi.paginationGetCurrentPage();

  this.localStorageService.setItem(AG_GRID_PAGINATION_PERSISTENCE_KEY, pageNumber);
 }
}
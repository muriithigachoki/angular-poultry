import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarmService } from 'src/app/services/farm.service';
import { AddFarmComponent } from '../add-farm/add-farm.component';
import { Router } from '@angular/router';
import { EditFarmComponent } from './edit-farm/edit-farm.component';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.css'],
})
export class FarmsComponent implements OnInit {
  constructor(
    private farm: FarmService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  selectedFarm: any;
  farmlist: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getFarms();
  }

  showFarmDetails(farm: any) {
    if (farm && farm.id) {
      this.farm.getFarmById(farm.id).subscribe((details: any) => {
        farm.description = details.description;
        this.selectedFarm = farm;
      });
    } else {
      console.error('Invalid farm data');
    }
  }

  getFarms() {
    this.farm.getFarms().subscribe((response: any) => {
      this.farmlist = response;
      console.log(this.farmlist);

      if (!this.selectedFarm && this.farmlist.length > 0) {
        const farmWithId1 = this.farmlist.find((farm) => farm.id === 1);
        if (farmWithId1) {
          this.showFarmDetails(farmWithId1);
        }
      }
    });
  }

  addFarm(id: any) {
    this.openDialog(AddFarmComponent, id);
  }
  UpdateFarm(selectedFarm: any) {
    console.log(this.selectedFarm.id);
    this.openDialog(EditFarmComponent, selectedFarm);
  }

  openDialog(component: any, id: any): void {
    const popup = this.dialog.open(component, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { id },
    });

    popup.afterClosed().subscribe(() => {
      this.getFarms();
    });
  }

  navigateToFarmIncomes() {
    // Assuming you have an incomes route
    this.router.navigate(['/incomes'], {
      queryParams: { farmId: this.selectedFarm.id },
    });
  }
  navigateToFarmExpenses() {
    // Assuming you have an incomes route
    this.router.navigate(['/expenses'], {
      queryParams: { farmId: this.selectedFarm.id },
    });
  }
}

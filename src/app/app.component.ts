
import { Component } from '@angular/core';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { FormGroup, FormControl } from '@angular/forms';

//Types of data
export interface Data {
  name: string;
  dept: string;
  zone: string;
  station: string;
  model: string;
  lastUpdated: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  today: number = Date.now(); //Temporary time for Last Updated value
  title = 'SaveClear';

  enableEdit = false;
  enableEditIndex = null;
  saveClicked = false;
  preName:string;
  preDept:string;
  preZone:string;
  preStation:string;
  preModel:string;
  preLastUpdated:number;

  errorMessage:string = "";
  

  //Constant data for each drop down list
  Departments:string[] = [
    "Trim", "Chassis", "SUPPLIER", "N/A"
  ]

  Zones:string[] = [
    "Zone 1", "Zone 2", "Zone 3", "Zone 4", "T3A", "C1B"
  ]

  Stations:string[] = [
    "LH FRONT SEAT DECK", "CENTER SEAT BELT", "T3A04E", "C1B31E"
  ]

  Models:string[] = [
    "F150", "EXPLORER", "AVIATOR"
  ]




  backendData:Data[] = [
    {name: "C 311", dept: "Chassis", zone: "C1B", station: "LH FRONT SEAT DECK", model: "F150", lastUpdated: this.today},
    {name: "C 341A", dept: "Chassis", zone: "Zone 4", station: "LH FRONT SEAT DECK", model: "F150", lastUpdated: this.today},
    {name: "C 348", dept: "Trim", zone: "Zone 3", station: "CENTER SEAT BELT", model: "EXPLORER", lastUpdated: this.today},
    {name: "C 260", dept: "N/A", zone: "Zone 2", station: "T3A04E", model: "AVIATOR", lastUpdated: this.today},
    {name: "C 260", dept: "Trim", zone: "T3A", station: "C1B31E", model: "EXPLORER", lastUpdated: this.today},
  ]


  enableEditMethod(error, index, row) {
    this.saveClicked = false;
    this.enableEdit = true;
    this.enableEditIndex = index;
    this.preName = row.name;
    this.preDept = row.dept;
    this.preZone = row.zone;
    this.preStation = row.station;
    this.preModel = row.model;
    this.preLastUpdated = row.lastUpdated;
    this.errorMessage = "";
    console.log(index, error);
  }

  cancel(row) {
    console.log('cancel');
    this.errorMessage = "";
    const index: number = this.backendData.indexOf(row);
    if (index != -1)
    {
      this.backendData[index].name = this.preName;
      this.backendData[index].dept = this.preDept;
      this.backendData[index].zone = this.preZone;
      this.backendData[index].station = this.preStation;
      this.backendData[index].model = this.preModel;
      this.backendData[index].lastUpdated = this.preLastUpdated;
    }
    this.enableEditIndex = null;
  }

  saveSegment(row) {
    const index: number = this.backendData.indexOf(row);
    this.saveClicked = true;
    tempString:String;
    if (index != -1)
    {
      this.backendData[index].name = row.name;
      this.backendData[index].dept = row.dept;
      this.backendData[index].zone = row.zone;
      this.backendData[index].station = row.station;
      this.backendData[index].model = row.model;
      if (this.validateUpdate(row))
      {
        this.errorMessage = "";
        this.today = Date.now();
        this.backendData[index].lastUpdated = this.today;
      }
      else {
        this.errorMessage = "*error: No changes recorded";
      }
      
    }
    this.enableEditIndex = null;
  }

  

  deleteSegment(row) {
  const index: number = this.backendData.indexOf(row);
  if (index != -1)
    {
      this.errorMessage = "*update: Connector " + this.backendData[index].name + " was removed";
      this.backendData.splice(index, 1);
    }
  }

  validateUpdate(row): Boolean {
    if (row.name == this.preName && 
        row.dept == this.preDept &&
        row.zone == this.preZone &&
        row.station == this.preStation &&
        row.model == this.preModel &&
        row.lastUpdated == this.preLastUpdated)
        {
          return false;
        } else {
          return true;
        }
  }




}

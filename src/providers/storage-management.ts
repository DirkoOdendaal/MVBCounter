import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Data, Record } from '../models';

const STORAGE_KEY = 'countHistory';

@Injectable()
export class StorageManagement {
  public dataStore: Data;
  constructor(private storage: Storage) {

    storage.set(STORAGE_KEY, 'Max');

    let data: Data = {
      counter_increment: 1,
      count_history: []
    }

    this.dataStore = data;
    this.getData().then(result => {
      if (!result) {
        this.setData();
      }
    });

  }

  getData() : Promise<Data> {
    return this.storage.get(STORAGE_KEY).then((data) => {
      return data;
    })
  }

  setData() {
    this.storage.set(STORAGE_KEY, this.dataStore).then((successData) => {
      console.log("Data Stored");
      console.log(successData);
    });
  }

  setCountIncrement(counterIncrement: number) {
    this.dataStore.counter_increment = counterIncrement;
    this.setData();
  }

  addCountHistory(countHistory: Record) {
    this.dataStore.count_history.push(countHistory);
    this.setData();
  }

  clearCountHistory() {
    this.dataStore.count_history = [];
    this.setData();
  }
}

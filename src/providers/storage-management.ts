import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Data, Record } from '../models';

const STORAGE_KEY = 'countHistory';

@Injectable()
export class StorageManagement {
  public dataStore: Data;
  constructor(private nativeStorage: NativeStorage) {

    // storage.set(STORAGE_KEY, 'Max');

    let data: Data = {
      counter_increment: 1,
      count_history: []
    }

    this.dataStore = data;
    this.getData().then(result => {
      if (!result) {
        console.log('get data');
        console.log(result);
        this.setData();
      }
    });

  }

  async getData() : Promise<Data> {
    return this.nativeStorage.getItem(STORAGE_KEY).then((data) => {
      console.log('getting data');
      console.log(data);
      return data;
    })
  }

  setData() {
    this.nativeStorage.setItem(STORAGE_KEY, this.dataStore).then((successData) => {
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

import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Data, Record } from '../models';

const STORAGE_KEY = 'countHistory';

@Injectable()
export class StorageManagement {
  public dataStore: Data;
  constructor(private nativeStorage: NativeStorage) {

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

  async getData() : Promise<Data> {
    return this.nativeStorage.getItem(STORAGE_KEY).then((data) => {
      return data;
    })
  }

  setData() {
    this.nativeStorage.setItem(STORAGE_KEY, this.dataStore).then();
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

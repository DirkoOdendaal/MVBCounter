import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { StorageManagement } from '../../providers/storage-management';
import { Record } from '../../models';
import { Insomnia } from '@ionic-native/insomnia';

@Component({
    selector: 'history',
    templateUrl: 'history.component.html'
})
export class HistoryComponent {

    historyRecords: Record[];

    constructor(public navCtrl: NavController, public menu: MenuController, public storage: StorageManagement, private insomnia: Insomnia) {
        menu.enable(true);

        this.storage.getData().then(result => {
            console.log('result vals');
            console.log(result);
            if (result) {
                this.historyRecords = result.count_history;
            }
        });

        this.insomnia.allowSleepAgain()
            .then(
                () => console.log('success'),
                () => console.log('error')
            );
    }

}
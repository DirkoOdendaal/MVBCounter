import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { StorageManagement } from '../../providers/storage-management';
import { Record } from '../../models';
import { Insomnia } from '@ionic-native/insomnia';

@Component({
    selector: 'game-count',
    templateUrl: 'game-count.component.html'
})
export class GameCountComponent {

    addValue = 1;
    counterValue = 0;

    constructor(public navCtrl: NavController, public menu: MenuController, public storage: StorageManagement, private insomnia: Insomnia) {
        menu.enable(true);

        this.storage.getData().then(result => {
            if (result) {
                this.addValue = +result.counter_increment;
            }
        });

        this.insomnia.keepAwake()
            .then(
                () => console.log('success'),
                () => console.log('error')
            );
    }

    count() {
        this.counterValue = this.counterValue + this.addValue;
    }

    onChange(ev: any) {
        console.log('Changed', ev);
    }

    openPage(page: any) {
        this.navCtrl.setRoot(page);
    }

    saveCount() {
        // save counter value to history
        let record: Record = {
            count_value: this.counterValue,
            count_date_time: new Date()
        };
        this.storage.addCountHistory(record);

        // set counter back to 0
        this.counterValue = 0;

    }
}

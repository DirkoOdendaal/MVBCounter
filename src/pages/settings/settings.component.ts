import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { StorageManagement } from '../../providers/storage-management';
import { Insomnia } from '@ionic-native/insomnia';

@Component({
    selector: 'settings',
    templateUrl: 'settings.component.html'
})
export class SettingsComponent {
    public settingsForm;
    counterValue = 1;

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        public formBuilder: FormBuilder,
        public alerCtrl: AlertController,
        public storage: StorageManagement,
        private insomnia: Insomnia) {

        menu.enable(true);

        this.storage.getData().then(result => {
            if (result) {
                this.counterValue = result.counter_increment;
                this.settingsForm.controls['counterNumber'].setValue(result.counter_increment);
            }
        });

        this.settingsForm = formBuilder.group({
            counterNumber: [this.counterValue]
        });

        this.settingsForm.valueChanges.subscribe(val => {
            this.counterValue = val;
            this.storage.setCountIncrement(val.counterNumber);
        });

        this.insomnia.allowSleepAgain()
            .then(
                () => console.log('success'),
                () => console.log('error')
            );
    }

    openPage(page: any) {
        this.navCtrl.setRoot(page);
    }

    doConfirm() {
        let confirm = this.alerCtrl.create({
            title: 'Clear history',
            message: 'Are you sure that you want to clear the counting history?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('No clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        console.log('Yes clicked');
                        this.storage.clearCountHistory();
                    }
                }
            ]
        });
        confirm.present()
    }
}

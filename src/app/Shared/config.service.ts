import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    /**
     * Firebase connection settings
     */
    public static FIREBASE_CONFIG = {
        apiKey: 'AIzaSyBwfeyfytjfVOWfoeTt4uTGEcSkGRrJJtA',
        authDomain: 'sitedrop-c39b3.firebaseapp.com',
        databaseURL: 'https://sitedrop-c39b3.firebaseio.com',
        storageBucket: 'sitedrop-c39b3.appspot.com',
        messagingSenderId: '225275273329'
    };
};

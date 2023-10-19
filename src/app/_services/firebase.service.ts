import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  // Method to add data to the database
  addData(data: any): Promise<any> {
    return this.db.list('trnetrUsers').push(data);
  }
}
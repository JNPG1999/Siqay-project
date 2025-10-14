import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _supaBaseClient = inject(SupabaseService).supabaseClient;

  constructor() { }

  session(){
    return this._supaBaseClient.auth.getSession();
  }

  logIn(credentials:SignUpWithPasswordCredentials){
    return this._supaBaseClient.auth.signInWithPassword(credentials)
  }

  signOut(){
    return this._supaBaseClient.auth.signOut();
  }

}

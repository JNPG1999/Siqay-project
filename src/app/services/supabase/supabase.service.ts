import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../environments/environments.development';
import { createClient, Session, SignInWithPasswordCredentials, SupabaseClient } from '@supabase/supabase-js';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabaseClient: SupabaseClient;
  session = signal<Session | null>(null);
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.supabaseClient = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY,
      {
        auth: {
          // En SSR: todo desactivado; en navegador: activado
          persistSession: this.isBrowser,
          autoRefreshToken: this.isBrowser,
          detectSessionInUrl: this.isBrowser,
        },
      }
    );
    this.supabaseClient.auth.getSession().then(({ data }) => {
      this.session.set(data.session);
    });

    this.supabaseClient.auth.onAuthStateChange((event, session) => {
      this.session.set(session);
    });
  }



  // getSession(){
  //   return this.supabaseClient.auth.getSession();
  // }

  // logIn(credentials: SignInWithPasswordCredentials){
  //   return this.supabaseClient.auth.signInWithPassword(credentials)
  // }

  // signOut(){
  //   return this.supabaseClient.auth.signOut();
  // }

  getTokenSupabase(){
    return this.session()?.access_token;
  }

  getIsAuthenticated(): boolean {
    return !!this.session();
  }



}

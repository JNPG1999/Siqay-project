import {
  Injectable,
  Inject,
  PLATFORM_ID,
  signal,
  computed,
} from '@angular/core';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environments.development';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  supabaseClient!: SupabaseClient;
  session = signal<Session | null>(null);
  isReady = signal(false);
  //isReady = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  /** Promise que se resuelve cuando la sesión ya fue cargada */
  readyPromise: Promise<void>;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.supabaseClient = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY,
      {
        auth: {
          persistSession: this.isBrowser,
          autoRefreshToken: this.isBrowser,
          detectSessionInUrl: this.isBrowser,
        },
      }
    );

    // ✅ Creamos una promesa que se resuelve cuando la sesión esté lista
    this.readyPromise = new Promise((resolve) => {
      this.supabaseClient.auth.getSession().then(({ data }) => {
        console.log('🟩 Sesión restaurada (readyPromise):', data.session);
        this.session.set(data.session);
        //this.isReady.next(true);
        this.isReady.set(true);
        resolve(); // 🔥 solo aquí se marca como lista
      });

      this.supabaseClient.auth.onAuthStateChange((_event, session) => {
        this.session.set(session);
        //this.isReady.next(true);
        this.isReady.set(true);
        resolve(); // 🔥 por si se inicializa después
      });
    });
  }

  /** Computed reactivo */
  isAuthenticated = computed(() => !!this.session());

  getToken() {
    return this.session()?.access_token;
  }
}

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private themeCookieName = 'darkMode';
    private darkThemeClass = 'dark-mode';

    constructor(private cookieService: CookieService) { }

    setDarkMode(isDarkMode: boolean): void {
        if (isDarkMode) {
            document.body.classList.add(this.darkThemeClass);
            this.cookieService.set(this.themeCookieName, 'true');
        } else {
            document.body.classList.remove(this.darkThemeClass);
            this.cookieService.set(this.themeCookieName, 'false');
        }
    }

    isDarkMode(): boolean {
        return this.cookieService.get(this.themeCookieName) === 'true';
    }

    initializeTheme(): void {
        this.setDarkMode(this.isDarkMode());
    }
}

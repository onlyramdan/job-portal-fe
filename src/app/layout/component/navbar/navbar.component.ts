import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    @Output() toggleSidebar = new EventEmitter<void>();

    constructor(private router: Router) {}

    onToggleSidebar() {
        this.toggleSidebar.emit();
    }

    signOut() {
      localStorage.removeItem('token');
      this.router.navigate(['auth/login']);
    }
}

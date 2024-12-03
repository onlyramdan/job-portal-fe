import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@projects/auth/service/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    currentUserRole: string = '';
    sidebarItems: { name: string; route: string ; icon: string}[] = [];

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.getSideBarItems();
    }

    getSideBarItems(): void{
        this.currentUserRole = this.authService.getLoginData().roleCode;
        const roleBasedItems: { [key: string]: { name: string; route: string; icon: string }[] } = {
            ADM:[
                { name: 'Dashboard', route: '/admin/dashboard', icon: 'fa fa-home' },
                { name: 'Vacancy Management', route: '/admin/vacancies', icon: 'fa fa-briefcase' },
                { name: 'Job Management', route: '/admin/jobs', icon: 'fa-solid fa-briefcase' },
                { name: 'User Management', route: '/admin/users', icon: 'fa fa-users'},
                { name: 'Location Management', route: '/admin/locations', icon: 'fa-solid fa-location-dot' }
            ],
            HR:[
            ]
        };
        this.sidebarItems = roleBasedItems[this.currentUserRole] || [];
    }
}

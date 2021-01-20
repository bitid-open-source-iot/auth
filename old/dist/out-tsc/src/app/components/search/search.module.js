import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
let SearchModule = class SearchModule {
};
SearchModule = __decorate([
    NgModule({
        imports: [
            FormsModule,
            CommonModule,
            MatIconModule,
            MatInputModule,
            MatButtonModule,
            MatTooltipModule
        ],
        exports: [
            SearchComponent
        ],
        declarations: [
            SearchComponent
        ]
    })
], SearchModule);
export { SearchModule };
//# sourceMappingURL=search.module.js.map
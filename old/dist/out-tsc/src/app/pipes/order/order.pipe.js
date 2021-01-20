import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let OrderPipe = class OrderPipe {
    transform(array, key, reverse) {
        return array.sort((a, b) => {
            if (a[key] < b[key]) {
                if (reverse) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else if (a[key] > b[key]) {
                if (reverse) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            else {
                return 0;
            }
            ;
        });
    }
    ;
};
OrderPipe = __decorate([
    Pipe({
        name: 'orderBy'
    })
], OrderPipe);
export { OrderPipe };
//# sourceMappingURL=order.pipe.js.map
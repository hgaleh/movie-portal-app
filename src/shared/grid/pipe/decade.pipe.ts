import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'decade',
    pure: true
})
export class DecadePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return value ? `${value} - ${value + 10}` : 'All Decades';
    }
}
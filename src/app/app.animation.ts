import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter', style({
        opacity: 0
      })),
      query(':leave', style({
        display: 'none'
      })),
      group([
        query(':enter', [
          animate('1000ms ease-out', style({
            opacity: 1
          }))
        ])
      ])
    ])
  ]);
import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'component-render',
    template: '<div #container></div>'
})
export class ComponentRenderComponent implements OnInit, AfterViewInit {
    @ViewChild("container", { read: ViewContainerRef}) container!:  ViewContainerRef;
    resolver = inject(ComponentFactoryResolver);
    constructor(
        private elementRef: ElementRef
    ) { }


    ngAfterViewInit(): void {
        const hostElement = this.elementRef.nativeElement;
        Array.from(hostElement.children).forEach(child => {
            this.container.element.nativeElement.appendChild(child);
        })
    }

    ngOnInit() { }
}
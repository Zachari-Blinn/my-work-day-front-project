import { NgFor } from "@angular/common";
import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from "@angular/core";

export interface TrainingStep {
  name: string;
  isDone: boolean;
  isCurrent?: boolean;
}

@Component({
  standalone: true,
  selector: 'step-progress',
  imports: [
    NgFor
  ],
  templateUrl: './step-progress.component.html',
  styleUrls: ['./step-progress.component.scss'],
  exportAs: 'step-progress'
})
export class StepProgressComponent implements AfterViewInit {
  
  @ViewChild('content', { static: true }) content!: ElementRef;

  
  public steps: TrainingStep[] = [
    {
      name: 'Step 1',
      isDone: true,
    },
    {
      name: 'Step 2',
      isDone: true,
    },
    {
      name: 'Step 3',
      isDone: true,
    },
    {
      name: 'Step 4',
      isDone: false,
      isCurrent: true,
    },
    {
      name: 'Step 5',
      isDone: false,
    },
    {
      name: 'Step 6',
      isDone: false,
    },
  ];
  
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Appel initial pour définir les classes lorsque le contenu est chargé
    this.setClasses();
  }

  private setClasses() {
    const element = this.content.nativeElement;
    const isScrollable = element.scrollHeight > element.clientHeight;
    const isScrolledToBottom = element.scrollHeight <= element.clientHeight + element.scrollTop + 1;
    const isScrolledToTop = element.scrollTop === 0;

    if (isScrollable) {
      this.renderer[isScrolledToBottom ? 'removeClass' : 'addClass'](element, 'is-bottom-overflowing');
      this.renderer[isScrolledToTop ? 'removeClass' : 'addClass'](element, 'is-top-overflowing');
    } else {
      this.renderer.removeClass(element, 'is-bottom-overflowing');
      this.renderer.removeClass(element, 'is-top-overflowing');
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    // Appel lors du défilement de l'élément de contenu
    this.setClasses();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Appel lors de la redimension de la fenêtre au cas où cela affecterait le défilement
    this.setClasses();
  }
}

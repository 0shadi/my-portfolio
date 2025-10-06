import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss'
})
export class CoverComponent implements AfterViewInit {
  public currentLocation = 1;
  public numOfPages = 3;
  public maxLocation = this.numOfPages+1;
  // public isNextButtonDisabled = false;

  public pages!: NodeListOf<HTMLElement>;
  flippedPages:boolean[] =[false, false, false,false, false]; // assuming a maximum of 5 pages for simplicity
  

  @ViewChild('book') book!: ElementRef;
  @ViewChild('prevBtn') prevBtn!: ElementRef;
  @ViewChild('nextBtn') nextBtn!: ElementRef;

  constructor(
    private renderer: Renderer2
  ){
  }

  ngAfterViewInit(): void {
    // query DOM after Angular renders it
    this.pages = document.querySelectorAll(".paper");
    this.updateZIndex();
  }
  
  openBook(){
    const bookElement = this.book.nativeElement;
    this.renderer.setStyle(bookElement, 'transform', 'translateX(50%)');
    // bookElement.style.transform = "translateX(50%)";

    const prevBtnElement = this.prevBtn.nativeElement;
    this.renderer.setStyle(prevBtnElement, 'transform', 'translateX(-180px)');
    // prevBtnElement.style.transform = "translateX(-180px)";

    const nextBtnElement = this.nextBtn.nativeElement;
    this.renderer.setStyle(nextBtnElement, 'transform', 'translateX(180px)');
    // nextBtnElement.style.transform = "translateX(180px)";
  }

  closeBook(isAtBegginig:boolean){
    if(isAtBegginig){
      const bookElement = this.book.nativeElement;
      this.renderer.setStyle(bookElement, 'transform', 'translateX(0%)');
    }
    else{
      const bookElement = this.book.nativeElement;
      this.renderer.setStyle(bookElement, 'transform', 'translateX(100%)');
    }
    
    const prevBtnElement = this.prevBtn.nativeElement;
    this.renderer.setStyle(prevBtnElement, 'transform', 'translateX(0px)');

    const nextBtnElement = this.nextBtn.nativeElement;
    this.renderer.setStyle(nextBtnElement, 'transform', 'translateX(0px)');
  }

  goNextPage(){
    if(this.currentLocation < this.maxLocation){
      // switch(this.currentLocation){
      //   case 1:
      //     this.openBook();
      //     this.is1Flipped = true;
      //     break;
      //   case 2:
      //     this.is2Flipped = true;
      //     break;
      //   case 3:
      //     this.is3Flipped = true;
      //     this.closeBook();
      //     break;
      //   default:
      //     throw new Error("Unknown state");
      // }
      // this.currentLocation++;

      this.flippedPages[this.currentLocation] = true;

      console.log("Current location is ",this.currentLocation);
      console.log("Flipped page statues is ",this.flippedPages);

      this.updateZIndex();

      if(this.currentLocation === 1){
        this.openBook();
      }

      else if(this.currentLocation === this.maxLocation-1){
        this.closeBook(false);
      }

      
      this.currentLocation++;
      
      console.log("Next location is ",this.currentLocation);
  }
}
  updateZIndex(){
    this.pages.forEach((page, index) => {
    if (index < this.currentLocation-1) {
      // Pages that are already flipped → lower z-index
      page.style.zIndex = String(index);
    } else {
      // Pages yet to be flipped → higher z-index
      page.style.zIndex = String(this.pages.length*2 - index);
    }
  });
  }

  goPrevPage(){ 
    console.log("Current location is ",this.currentLocation);
    console.log("Flipped page statues is ",this.flippedPages);
    this.flippedPages[this.currentLocation-1] = false;
    
    console.log("Flipped page status is ",this.flippedPages);

    if(this.currentLocation > 0){
      this.currentLocation--;
      this.flippedPages[this.currentLocation] = false;
    }

    if(this.currentLocation === 1){
        this.closeBook(true);
      }

      else if(this.currentLocation === this.maxLocation-1){
        this.openBook();
      }

    this.updateZIndex();

    console.log("Prev location is ",this.currentLocation);

  }
}


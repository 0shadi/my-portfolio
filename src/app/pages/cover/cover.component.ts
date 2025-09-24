import { AfterViewInit, Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss'
})
export class CoverComponent implements AfterViewInit {
  public currentLocation = 1;
  public numOfPages = 3;
  public pages!: NodeListOf<HTMLElement>;

  flippedPages:boolean[] =[false, false, false];
  public maxLocation = this.flippedPages.length;
   

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

  }

  closeBook(){

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
      this.currentLocation++;

      this.updateZIndex();

      if(this.currentLocation === 1){
        this.openBook();
      }
      else if(this.currentLocation === this.maxLocation){
        this.closeBook(); 
      }
  }
}
  updateZIndex(){
    this.pages.forEach((page, index) => {
    if (index < this.currentLocation) {
      // Pages that are already flipped → lower z-index
      page.style.zIndex = String(index);
    } else {
      // Pages yet to be flipped → higher z-index
      page.style.zIndex = String(this.pages.length - index);
    }
  });
  }

  goPrevPage(){

  }
}


/* eslint-disable @typescript-eslint/member-ordering */
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare let Tawk_API: any;

@Injectable({
  providedIn: 'root'
})
export class TawkService {

  private loaded: boolean;
  private renderer: Renderer2;
  private loadSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document)
    {
      this.renderer = rendererFactory.createRenderer(null, null);
      this.load();
    }

  private load = () => {
    if(this.loaded) {return;}
    const s = this.renderer.createElement('script');
    s.type = 'text/javascript';
    s.text = `https://embed.tawk.to/60a7fe6a185beb22b30f8e30/1f683jkgi`;
    this.renderer.appendChild(this.document.body, s);
    Tawk_API.onLoad = this.loadedEvent.bind(this);
  };

  private loadedEvent = () => {
    this.loaded = true;
    this.loadSubject.next(this.loaded);
  };

  public UpdateTawkUser(user: any) {
    this.loadedWrapper(() => this.updateAtrributes(user));
  }
  private loadedWrapper = (func: any) => {
    if(!this.loaded){
      const sub = this.loadSubject.asObservable().subscribe({
        next: () => {
          func();
          sub.unsubscribe();
        }, error: () => {}
      });
    } else { func(); }
  };

  // eslint-disable-next-line max-len
  public ExpandChatWindow = (show: boolean = false) => this.loadedWrapper(() => show ? Tawk_API.maximize() : Tawk_API.minimize());

  // eslint-disable-next-line max-len
  public SetChatVisibility = (show: boolean = false) => this.loadedWrapper(() => show ? Tawk_API.showWidget() : Tawk_API.hideWidget());

  private updateAtrributes = (user: any) => {
    Tawk_API.setAttributes({
      name  : `${user.firstname} ${user.surname}`,
      email : user.email, id : user.id,
    }, (error: any) => {});
  };
}

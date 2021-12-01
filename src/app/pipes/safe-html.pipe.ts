import { Pipe, PipeTransform } from '@angular/core';
<<<<<<< Updated upstream
import { DomSanitizer } from '@angular/platform-browser';
=======
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
>>>>>>> Stashed changes

@Pipe({
    name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

<<<<<<< Updated upstream
    transform(value: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
=======
    public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
                case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
                case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
                case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
                case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
                case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
                default: throw new Error(`Invalid safe type specified: ${type}`);
            }
      }
>>>>>>> Stashed changes
}

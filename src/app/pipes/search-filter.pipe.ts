import { Pipe, PipeTransform } from '@angular/core';
import { CommentDetail } from '../models/CommentDetail';
import { ContentDetail } from '../models/contentDetail';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: ContentDetail[], filterText: string): ContentDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value.filter((c: ContentDetail) => c.title.toLocaleLowerCase().includes(filterText)):value
  }
  
}

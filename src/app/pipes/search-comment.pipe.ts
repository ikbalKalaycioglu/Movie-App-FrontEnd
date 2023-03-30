import { Pipe, PipeTransform } from '@angular/core';
import { CommentDetail } from '../models/CommentDetail';

@Pipe({
  name: 'searchComment'
})
export class SearchCommentPipe implements PipeTransform {

  transform(value: CommentDetail[], filterText: string): CommentDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    if (filterText) {
      return value.filter(data => data.message.toLocaleLowerCase().includes(filterText))

    } else {
      return value
    }
  }

}

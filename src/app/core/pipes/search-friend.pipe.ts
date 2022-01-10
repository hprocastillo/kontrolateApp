import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFriend'
})
export class SearchFriendPipe implements PipeTransform {

  transform(items: Array<any>, textSearch: string): any {
    const data = textSearch.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase() === data ||
      item.email.toLowerCase() === data ||

      item.name.toLowerCase().includes(data) ||
      item.email.toLowerCase().includes(data));
  }
}

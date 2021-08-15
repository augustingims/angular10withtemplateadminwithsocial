import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
  transform(input: any[], filter: any, field?: string): any {
    if (typeof filter === 'undefined' || filter === '') {
      return input;
    }

    // if filter is of type 'function' compute current value of filter, otherwise return filter
    const currentFilter = typeof filter === 'function' ? filter() : filter;

    if (typeof currentFilter === 'number') {
      return input.filter(this.filterByNumber(currentFilter, field));
    }
    if (typeof currentFilter === 'boolean') {
      return input.filter(this.filterByBoolean(currentFilter, field));
    }
    if (typeof currentFilter === 'string') {
      return input.filter(this.filterByString(currentFilter, field));
    }
    if (typeof currentFilter === 'object') {
      // filter by object ignores 'field' if specified
      return input.filter(this.filterByObject(currentFilter));
    }

    // 'symbol' && 'undefined'
    return input.filter(this.filterDefault(currentFilter, field));
  }

  private filterByNumber(filter, field?) {
    return value =>
      (value && !filter) || (typeof value === 'object' && field)
        ? value[field] && typeof value[field] === 'number' && value[field] === filter
        : typeof value === 'number' && value === filter;
  }

  private filterByBoolean(filter, field?) {
    return value =>
      typeof value === 'object' && field
        ? value[field] && typeof value[field] === 'boolean' && value[field] === filter
        : typeof value === 'boolean' && value === filter;
  }

  private filterByString(filter, field?) {
    return value =>
      (value && !filter) || (typeof value === 'object' && field)
        ? value[field] && typeof value[field] === 'string' && value[field].toLowerCase().includes(filter.toLowerCase())
        : typeof value === 'string' && value.toLowerCase().includes(filter.toLowerCase());
  }

  private filterDefault(filter, field?) {
    return value => ((value && !filter) || (typeof value === 'object' && field) ? value[field] && filter === value : filter === value);
  }

  private filterByObject(filter) {
    return value => {
      const keys = Object.keys(filter);
      let isMatching = false;

      // all fields defined in filter object must match
      for (const key of keys) {
        if (typeof filter[key] === 'number') {
          isMatching = this.filterByNumber(filter[key])(value[key]);
        } else if (typeof filter[key] === 'boolean') {
          isMatching = this.filterByBoolean(filter[key])(value[key]);
        } else if (typeof filter[key] === 'string') {
          isMatching = this.filterByString(filter[key])(value[key]);
        } else {
          isMatching = this.filterDefault(filter[key])(value[key]);
        }
      }
      return isMatching;
    };
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticleListConfig } from '../../models/article-list-config.model';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {
  constructor (
    private articlesService: ArticlesService,
    private cd: ChangeDetectorRef
  ) {}
  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  @Input() limit:number;
  @Input()
  set config(config:ArticleListConfig){
    if(config){
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }

  }
  setPageTo(pageNumber:any) {
    this.currentPage = pageNumber;
    this.runQuery();
  }
  trackByFn(index:any, item:any) {
    return index;
  }

  runQuery(){
    this.loading = true;
    this.results = [];

    if(this.limit){
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.articlesService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data.articles;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
      this.cd.markForCheck();
    });
  }
}

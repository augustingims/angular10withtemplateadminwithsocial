import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorityDetailComponent} from './authority-detail.component';
import {AuthorityUpdateComponent} from './authority-update.component';
import {AuthorityDeleteComponent} from './authority-delete.component';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {EventManager, IAuthority, ITEMS_PER_PAGE, ParseLinks} from '../../shared';
import {AuthorityService} from './authority.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {AccountService} from '../../core/auth/account.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent implements OnInit, OnDestroy {

    authorities: IAuthority[];
    authorityListModification?: Subscription;

    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    search = '';

    constructor(
        private authorityService: AuthorityService,
        private accountService: AccountService,
        private parseLinks: ParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: EventManager,
        private spinner: NgxSpinnerService,
        private modalService: NgbModal
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    ngOnInit() {
      window.dispatchEvent(new Event('resize'));
      this.authorityListModification = this.eventManager.subscribe('userListModification', () => this.loadAll());
      this.loadAll();
    }

    ngOnDestroy() {
      this.routeData.unsubscribe();
      if (this.authorityListModification) {
        this.eventManager.destroy(this.authorityListModification);
      }
    }

    loadAll() {
        this.spinner.show();
        this.authorityService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IAuthority[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body));
    }

    trackIdentity(index, item: IAuthority) {
        return item.name;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'name') {
            result.push('name');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/authorities'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    deleteAuthority(authority: IAuthority) {
        const modalRef = this.modalService.open(AuthorityDeleteComponent, { size: 'sm', backdrop: 'static' });
        modalRef.componentInstance.authority = authority;
        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
            },
            reason => {
                // Left blank intentionally, nothing to do here
            }
        );
    }

    newAuthority() {
        const modalRef = this.modalService.open(AuthorityUpdateComponent, { size: 'sm', backdrop: 'static' });

        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
                console.log(result);
            },
            reason => {
                // Left blank intentionally, nothing to do here
                console.log(reason);
            }
        );
    }

    detailAuthority(authority: IAuthority) {
        const modalRef = this.modalService.open(AuthorityDetailComponent, { size: 'sm', backdrop: 'static' });
        modalRef.componentInstance.authority = authority;
        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
            },
            reason => {
                // Left blank intentionally, nothing to do here
            }
        );
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.authorities = data;
        this.spinner.hide();
    }

    private onError(error) {
        this.spinner.hide();
    }

}

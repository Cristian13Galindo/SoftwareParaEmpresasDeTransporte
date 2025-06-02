import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let tokenServiceMock: jasmine.SpyObj<TokenService>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    tokenServiceMock = jasmine.createSpyObj('TokenService', ['getToken', 'saveToken']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['refreshToken', 'logout', 'isAuthenticated']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenInterceptor,
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ]
    });

    interceptor = TestBed.inject(TokenInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header with bearer token', () => {
    const token = 'dummy-token';
    tokenServiceMock.getToken.and.returnValue(token);

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
  });

  it('should handle 401 error and refresh token', () => {
    const token = 'dummy-token';
    tokenServiceMock.getToken.and.returnValue(token);
    authServiceMock.refreshToken.and.returnValue(of({ token: 'new-token' }));

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(authServiceMock.refreshToken).toHaveBeenCalled();
    expect(tokenServiceMock.saveToken).toHaveBeenCalledWith('new-token');
  });

  it('should log out user on 403 error', () => {
    const token = 'dummy-token';
    tokenServiceMock.getToken.and.returnValue(token);

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 403, statusText: 'Forbidden' });

    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should remove tokens and redirect to login on 401 error', () => {
    const token = 'dummy-token';
    tokenServiceMock.getToken.and.returnValue(token);

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
    expect(window.location.href).toContain('/login');
  });

  it('should remove tokens on 401 error without redirecting during development', () => {
    const token = 'dummy-token';
    tokenServiceMock.getToken.and.returnValue(token);

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
    expect(window.location.href).not.toContain('/login');
  });
});

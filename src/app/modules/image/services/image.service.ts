import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import {
  TImageRequest,
  TImageResponse,
  TImageUpdateRequest,
} from '../types/image.types';
import { environment } from 'src/environments/environment';
import { TApiResponse } from 'src/app/types/api-response.type';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  http = inject(HttpClient);

  constructor() {}

  getAllImages(): Observable<TApiResponse<TImageResponse[]>> {
    return this.http.get<TApiResponse<TImageResponse[]>>(
      `${environment.API_URL}images`
    );
  }

  postImage(data: TImageRequest): Observable<TApiResponse<TImageResponse>> {
    return this.http.post<TApiResponse<TImageResponse>>(
      `${environment.API_URL}images`,
      data
    );
  }

  editImage(
    data: TImageUpdateRequest
  ): Observable<TApiResponse<TImageResponse>> {
    return this.http.put<TApiResponse<TImageResponse>>(
      `${environment.API_URL}images`,
      data
    );
  }

  deleteImage(id: number): Observable<TApiResponse<TImageResponse>> {
    return this.http.delete<TApiResponse<TImageResponse>>(
      `${environment.API_URL}images/${id}`
    );
  }

  checkIfURLisValid(url: string): Observable<boolean> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map((response) => {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.startsWith('image/')) {
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error validating URL', error);
        return of(false);
      })
    );
  }
}

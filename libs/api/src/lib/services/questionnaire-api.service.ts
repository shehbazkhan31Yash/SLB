import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Questionnaire } from '../models';

@Injectable({ providedIn: 'root' })
export class QuestionnaireApiService {
  getQuestionnaire(id: string): Observable<Questionnaire> {
    return of({
      id,
      title: 'Security Questionnaire',
      schema: {
        fields: [
          {
            key: 'productName',
            type: 'input',
            props: { label: 'Product Name', required: true },
          },
          {
            key: 'securityLevel',
            type: 'select',
            props: {
              label: 'Security Level',
              options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ],
            },
          },
          {
            key: 'evidence',
            type: 'file',
            props: { label: 'Upload Evidence', required: true },
          },
        ],
      },
    }).pipe(delay(500));
  }

  submitQuestionnaire(id: string, responses: any): Observable<void> {
    return of(void 0).pipe(delay(500));
  }
}

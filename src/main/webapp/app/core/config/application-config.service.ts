///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationConfigService {
  // private endpointPrefix = '';
  // private microfrontend = false;

  private endpointPrefix: string | undefined = '';
  private microfrontend = false;

  setEndpointPrefix(endpointPrefix: string): void {
    this.endpointPrefix = endpointPrefix;
  }

  setMicrofrontend(microfrontend = true): void {
    this.microfrontend = microfrontend;
  }

  isMicrofrontend(): boolean {
    return this.microfrontend;
  }

  // getEndpointFor(api: string, microservice?: string): string {
  //   if (microservice) {
  //     return `${this.endpointPrefix}services/${microservice}/${api}`;
  //   }
  //   return `${this.endpointPrefix}${api}`;
  // }


  /**
   * Fix for the error in the containerised app which reads like
   * "Failed to load resource: the server responded with status 405(not allowed)
   * "undefinedapi/aithenticate:1"
   * @param api
   * @param microservice
   */
  getEndpointFor(api: string, microservice?: string): string {
    if (microservice) {
      if (this.endpointPrefix === undefined) {
        return `services/${microservice}/${api}`;
      }
      return `${this.endpointPrefix}services/${microservice}/${api}`;
    }
    if (this.endpointPrefix === undefined) {
      return `${api}`;
    }
    return `${this.endpointPrefix}${api}`;
  }
}

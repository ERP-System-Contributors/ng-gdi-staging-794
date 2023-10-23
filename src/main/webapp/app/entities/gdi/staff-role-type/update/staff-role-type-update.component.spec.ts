import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { StaffRoleTypeFormService } from './staff-role-type-form.service';
import { StaffRoleTypeService } from '../service/staff-role-type.service';
import { IStaffRoleType } from '../staff-role-type.model';

import { StaffRoleTypeUpdateComponent } from './staff-role-type-update.component';

describe('StaffRoleType Management Update Component', () => {
  let comp: StaffRoleTypeUpdateComponent;
  let fixture: ComponentFixture<StaffRoleTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let staffRoleTypeFormService: StaffRoleTypeFormService;
  let staffRoleTypeService: StaffRoleTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StaffRoleTypeUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(StaffRoleTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StaffRoleTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    staffRoleTypeFormService = TestBed.inject(StaffRoleTypeFormService);
    staffRoleTypeService = TestBed.inject(StaffRoleTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const staffRoleType: IStaffRoleType = { id: 456 };

      activatedRoute.data = of({ staffRoleType });
      comp.ngOnInit();

      expect(comp.staffRoleType).toEqual(staffRoleType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStaffRoleType>>();
      const staffRoleType = { id: 123 };
      jest.spyOn(staffRoleTypeFormService, 'getStaffRoleType').mockReturnValue(staffRoleType);
      jest.spyOn(staffRoleTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ staffRoleType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: staffRoleType }));
      saveSubject.complete();

      // THEN
      expect(staffRoleTypeFormService.getStaffRoleType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(staffRoleTypeService.update).toHaveBeenCalledWith(expect.objectContaining(staffRoleType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStaffRoleType>>();
      const staffRoleType = { id: 123 };
      jest.spyOn(staffRoleTypeFormService, 'getStaffRoleType').mockReturnValue({ id: null });
      jest.spyOn(staffRoleTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ staffRoleType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: staffRoleType }));
      saveSubject.complete();

      // THEN
      expect(staffRoleTypeFormService.getStaffRoleType).toHaveBeenCalled();
      expect(staffRoleTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStaffRoleType>>();
      const staffRoleType = { id: 123 };
      jest.spyOn(staffRoleTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ staffRoleType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(staffRoleTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
